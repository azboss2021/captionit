import InfoBanner from "@/components/InfoBanner";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { SAAS_DESCRIPTION, SAAS_NAME } from "@/lib/constants";
import GenerateImageForm from "@/components/Dashboard/GenerateImageForm";
import PublicImages from "@/components/Dashboard/PublicImages";
import GenerateImages from "@/components/Dashboard/GenerateImages";
import PreviouslyGeneratedImages from "@/components/Dashboard/PreviouslyGeneratedImages";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";

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

      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 lg:px-8">
        {/* <h2 className="text-center text-xl font-bold">Generate Image</h2> */}
        <Button asChild className="mx-auto w-fit">
          <Link href="/create">Generate Image</Link>
        </Button>
        <PreviouslyGeneratedImages />
        <PublicImages />
      </section>
    </>
  );
};
export default DashboardPage;
