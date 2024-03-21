import InfoBanner from "@/components/InfoBanner";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { SAAS_DESCRIPTION, SAAS_NAME } from "@/lib/constants";
import GenerateImageForm from "@/components/Dashboard/GenerateImageForm";
import PublicImages from "@/components/Dashboard/PublicImages";
import GenerateImages from "@/components/Dashboard/GenerateImages";

export const metadata: Metadata = {
  title: `${SAAS_NAME} - Dashboard`,
  description: SAAS_DESCRIPTION,
};

const DashboardPage = async () => {
  return (
    <>
      {/* <ConfettiComponent createdAt={user.createdAt} /> */}
      <InfoBanner />
      <div className="border-b">
        <Navbar />
      </div>

      <section className="mx-auto flex max-w-xl flex-col gap-8 p-8">
        <h2 className="text-center text-xl font-extrabold">Generate Image</h2>
        <GenerateImages />
        <PublicImages />
      </section>
    </>
  );
};
export default DashboardPage;
