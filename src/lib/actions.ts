"use server";

import { connectToDatabase } from "./mongoose";
import { dateIsLessThan, handleError } from "./utils";
import { DeletedUser, MailSubscriber, Transaction, User } from "./models";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import {
  CreateTransactionParams,
  DatabaseTransaction,
  TransactionParams,
} from "./types";
import { MAIL_SUBSCRIBE_DELAY_MS, PRODUCT_TYPE, SAAS_NAME } from "./constants";
import EmailTemplate from "@/components/EmailTemplate";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";

export async function createUser({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  try {
    await connectToDatabase();

    const newUser = await User.create({ name, email, image });

    const alreadyExists = await MailSubscriber.findOne({ userEmail: email });

    if (!alreadyExists) {
      const mailSubscriber = await MailSubscriber.create({ userEmail: email });

      if (!mailSubscriber) throw Error("Could not create new mail subscriber");
    }

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function checkMailSubscribed(email: string) {
  try {
    await connectToDatabase();

    const alreadyExists = await MailSubscriber.findOne({ userEmail: email });

    return !!alreadyExists;
  } catch (error) {
    handleError(error);
  }
}

export async function removeMailSubscriber(email: string) {
  try {
    await connectToDatabase();

    const subscriber = await MailSubscriber.findOne({ userEmail: email });

    if (dateIsLessThan(subscriber.updatedAt, MAIL_SUBSCRIBE_DELAY_MS)) {
      return "ERROR: Cannot update so often.";
    }

    const deletedSubscriber = await MailSubscriber.updateOne(
      {
        userEmail: email,
      },
      { subscribed: false },
    );

    if (!deletedSubscriber)
      return "ERROR: User was not removed from subscription list";

    revalidatePath("/account");

    return JSON.parse(JSON.stringify(deletedSubscriber));
  } catch (error) {
    handleError(error);
  }
}

export async function addMailSubscriber(email: string) {
  try {
    await connectToDatabase();

    const subscriber = await MailSubscriber.findOne({ userEmail: email });

    if (dateIsLessThan(subscriber.updatedAt, MAIL_SUBSCRIBE_DELAY_MS)) {
      return "ERROR: Cannot update so often.";
    }

    const addedSubscriber = await MailSubscriber.updateOne(
      {
        userEmail: email,
      },
      { subscribed: true },
    );

    if (!addedSubscriber)
      return "ERROR: User was not added to subscription list";

    revalidatePath("/account");

    return JSON.parse(JSON.stringify(addedSubscriber));
  } catch (error) {
    handleError(error);
  }
}

export async function createMailSubscriber(email: string) {
  try {
    await connectToDatabase();

    const alreadyExists = await MailSubscriber.findOne({ userEmail: email });

    revalidatePath("/account");

    if (alreadyExists) return "ERROR: User already subscribed to mail";

    const mailSubscriber = await MailSubscriber.create({ userEmail: email });

    if (!mailSubscriber) return null;

    return JSON.parse(JSON.stringify(mailSubscriber));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getPlan(email: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    return user.plan;
  } catch (error) {
    handleError(error);
  }
}

export async function checkUserExists(email: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (user) return user;

    return null;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(email: string, name: string, image: string) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, image },
      {
        new: true,
      },
    );

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(id: string, email: string) {
  try {
    await connectToDatabase();

    const deletedUserCreated = await DeletedUser.create({ userId: id });

    if (!deletedUserCreated) {
      throw Error("Did not go into deleted users");
    }

    const removeFromMail = await MailSubscriber.deleteOne({ userEmail: email });

    if (!removeFromMail) {
      throw Error("Did not remove from mail list");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete({ _id: id });

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function decreaseCredits(id: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: id },
      { $inc: { credits: -creditFee } },
      { new: true },
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

export async function increaseCredits(id: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: id },
      { $inc: { credits: creditFee } },
      { new: true },
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

export async function checkoutCredits(transaction: TransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const amount = Number(transaction.amount);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.product,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      product: transaction.product,
      credits: transaction.credits as number,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/credits?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/credits?canceled=true`,
  });
  redirect(session.url!);
}

export async function checkoutSubscription(transaction: TransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const amount = Number(transaction.amount);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.product,
          },
          recurring: {
            interval: transaction.monthly ? "month" : "year",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      product: transaction.product,
      buyerId: transaction.buyerId,
    },
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/credits?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/credits?canceled=true`,
  });

  redirect(session.url!);
}

export async function checkoutOneTime(transaction: TransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const amount = Number(transaction.amount);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.product,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      product: transaction.product,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/credits?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/credits?canceled=true`,
  });
  redirect(session.url!);
}

export async function checkoutPhysicalProduct(transaction: TransactionParams) {}

export async function checkoutDigitalProduct(transaction: TransactionParams) {}

export async function endSubscription(subscriptionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const canceledSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      cancel_at_period_end: true,
    },
  );

  return canceledSubscription;
}

export async function continueSubscription(subscriptionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const continueSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      cancel_at_period_end: false,
    },
  );

  return continueSubscription;
}

export async function getSubscription(subscriptionId: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription) return subscription;
    else return null;
  } catch (error) {
    handleError(error);
  }
}

export async function getTransactionBySubscriptionId(subscriptionId: string) {
  try {
    await connectToDatabase();
    const transaction = await Transaction.findOne({ subscriptionId });
    if (transaction) return transaction;
    else return null;
  } catch (error) {
    handleError(error);
  }
}

export async function getTransactionsByUserId(userId: string) {
  try {
    await connectToDatabase();
    const transactions: DatabaseTransaction[] = await Transaction.find({
      buyerId: userId,
    }).sort({ createdAt: -1 });
    if (transactions) return transactions;
    else return null;
  } catch (error) {
    handleError(error);
  }
}

export async function updateSubscription(
  id: string,
  subscriptionId: string,
  plan: string,
) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { plan, subscriptionId },
      { new: true },
    );
    if (!updatedUser)
      throw new Error("User plan and subscription update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updatePlan(id: string, plan: string) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { plan },
      { new: true },
    );
    if (!updatedUser) throw new Error("User plan update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    const newTransaction = await Transaction.create({
      ...transaction,
    });
    if (PRODUCT_TYPE === "subscription" && transaction.subscriptionId) {
      await updateSubscription(
        transaction.buyerId,
        transaction.subscriptionId,
        transaction.product,
      );
    } else if (PRODUCT_TYPE === "credits" && transaction.credits) {
      await increaseCredits(transaction.buyerId, transaction.credits as number);
    } else if (PRODUCT_TYPE === "one_time") {
      await updatePlan(transaction.buyerId, transaction.product);
    }
    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}

export async function sendEmail({
  userEmail,
  name,
  subject,
  message,
  email,
}: {
  userEmail: string;
  name: string;
  subject: string;
  message: string;
  email: string;
}) {
  try {
    const user = await User.findOne({ email: userEmail });

    if (user.emailSentAt && dateIsLessThan(user.emailSentAt, 43200000)) {
      return {
        error: "Could not process this request so soon. Try again later",
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailResponse = await resend.emails.send({
      from: `${SAAS_NAME} support <support@cwilson.fun>`,
      to: "cwilsonfun@gmail.com",
      subject: subject,
      react: EmailTemplate({ name, message, email }),
    });

    await User.updateOne({ email: userEmail }, { emailSentAt: Date.now() });

    return { success: true, emailResponse };
  } catch (error) {
    return { success: false, error };
  }
}
