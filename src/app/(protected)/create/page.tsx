import { options } from "@/app/api/auth/[...nextauth]/options";
import GenerateImages from "@/components/Dashboard/GenerateImages";
import InfoBanner from "@/components/InfoBanner";
import LeaveButton from "@/components/LeaveButton";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";

const CreatePage = async () => {
  const session = await getServerSession(options);

  return (
    <>
      <InfoBanner />
      <div className="border-b">
        <Navbar />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 p-6 lg:p-8">
        <LeaveButton />
        <GenerateImages session={session} />
      </section>
    </>
  );
};
export default CreatePage;
