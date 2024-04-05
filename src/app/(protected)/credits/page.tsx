import Pricing from "@/components/Pricing";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { SAAS_DESCRIPTION, SAAS_NAME } from "@/lib/constants";
import LeaveButton from "@/components/LeaveButton";

export const metadata: Metadata = {
  title: `${SAAS_NAME} - Credits`,
  description: SAAS_DESCRIPTION,
};

const ProPage = () => {
  return (
    <>
      <div className="border-b">
        <Navbar />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 p-6 lg:p-8">
        <LeaveButton dashboard={true} />
        {/* <h2 className="text-xl font-bold">Pricing Plan</h2> */}
        <Pricing />
      </section>
    </>
  );
};

export default ProPage;
