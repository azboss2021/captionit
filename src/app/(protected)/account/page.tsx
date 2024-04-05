import Navbar from "@/components/Navbar";
import InfoBanner from "@/components/InfoBanner";
import { getTransactionsByUserId, getUserByEmail } from "@/lib/actions";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import type { Metadata } from "next";
import { SAAS_DESCRIPTION, SAAS_NAME } from "@/lib/constants";
import LeaveButton from "@/components/LeaveButton";
import AccountTransactions from "@/components/AccountTransactions";
import AccountInformation from "@/components/AccountInformation";
import AccountActions from "@/components/AccountActions";

export const metadata: Metadata = {
  title: `${SAAS_NAME} - Dashboard`,
  description: SAAS_DESCRIPTION,
};

const AccountPage = async () => {
  const session = await getServerSession(options);
  const user = await getUserByEmail(session?.user?.email as string);
  const transactions = await getTransactionsByUserId(user._id);

  return (
    <>
      <InfoBanner />
      <div className="border-b">
        <Navbar />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
        <LeaveButton />
        <AccountInformation user={user} />
        <AccountActions user={user} />
        <AccountTransactions transactions={transactions!} />
      </section>
    </>
  );
};
export default AccountPage;
