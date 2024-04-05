import { Schema, model, models } from "mongoose";

// ===== USER =====
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      default: "Free",
    },
    subscriptionId: {
      type: String,
    },
    credits: {
      type: Number,
      default: 10,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    emailSentAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// ===== Deleted Users to Track Transactions =====
const DeletedUserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ===== Mailing List =====
const MailSubscriberSchema = new Schema(
  {
    userEmail: {
      type: String,
      unique: true,
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// ===== TRANSACTION =====
const TransactionSchema = new Schema({
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  product: {
    type: String,
  },
  subscriptionId: {
    type: String,
  },
  credits: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    size: {
      type: String,
    },
    standard: {
      type: Boolean,
    },
    cloudinaryId: {
      type: String,
    },
    prompt: {
      type: String,
    },
    style: {
      type: String,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true },
);

const CaptionSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageId: {
    type: String,
  },
  topText: {
    type: String,
  },
  bottomText: {
    type: String,
  },
  strokeWidth: {
    type: Number,
  },
  topTextSize: {
    type: Number,
  },
  bottomTextSize: {
    type: Number,
  },
  yPadding: {
    type: Number,
  },
  xPadding: {
    type: Number,
  },
  whiteSpace: {
    type: Number,
  },
  topTextAlign: {
    type: String,
  },
  bottomTextAlign: {
    type: String,
  },
  topTextVerticalAlign: {
    type: String,
  },
  bottomTextVerticalAlign: {
    type: String,
  },
  topTextHorizontalAlign: {
    type: String,
  },
  bottomTextHorizontalAlign: {
    type: String,
  },
  font: {
    type: String,
  },
  italic: {
    type: Boolean,
  },
  bold: {
    type: Boolean,
  },
  uppercase: {
    type: Boolean,
  },
});

const Image = models?.Image || model("Image", ImageSchema);
const User = models?.User || model("User", UserSchema);
const DeletedUser =
  models?.DeletedUser || model("DeletedUser", DeletedUserSchema);
const MailSubscriber =
  models?.MailSubscriber || model("MailSubscriber", MailSubscriberSchema);
const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);
const Caption = models?.Caption || model("Caption", CaptionSchema);

export { Image, User, DeletedUser, MailSubscriber, Transaction, Caption };
