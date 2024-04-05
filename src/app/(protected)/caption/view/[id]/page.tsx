import CaptionDisplay from "@/components/CaptionDisplay";
import InfoBanner from "@/components/InfoBanner";
import LeaveButton from "@/components/LeaveButton";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getCaptionById } from "@/lib/actions/caption.actions";
import { Image } from "@/lib/models";
import { connectToDatabase } from "@/lib/mongoose";
import { FaFlag } from "react-icons/fa6";

const ViewCaptionPage = async ({ params }: { params: { id: string } }) => {
  const caption = await getCaptionById({ id: params.id });
  await connectToDatabase();
  const dbImage = await Image.findOne({ cloudinaryId: caption.imageId });

  if (!caption) {
    throw Error("Caption does not exist");
  }

  return (
    <>
      <InfoBanner />
      <div className="border-b">
        <Navbar />
      </div>
      <section className="mx-auto flex max-w-7xl flex-col gap-8 p-6 pb-32 lg:p-8">
        <LeaveButton />

        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div className="mx-auto max-h-[400px]">
            <CaptionDisplay
              caption={caption}
              width={dbImage.size.split("x")[0]}
              height={dbImage.size.split("x")[1]}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="destructive" className="flex items-center gap-2">
              Report <FaFlag />
            </Button>
            <Button>Save Image</Button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ViewCaptionPage;
