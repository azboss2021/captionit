import { options } from "@/app/api/auth/[...nextauth]/options";
import ImageCreation from "@/components/ImageCreation";
import InfoBanner from "@/components/InfoBanner";
import LeaveButton from "@/components/LeaveButton";
import Navbar from "@/components/Navbar";
import { getUserByEmail } from "@/lib/actions";
import { getCaptionCount } from "@/lib/actions/caption.actions";
import { Image } from "@/lib/models";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";

const CaptionPage = async ({ params }: { params: { id: string } }) => {
  await connectToDatabase();
  const image = await Image.findOne({ cloudinaryId: params.id });
  const height = image.size.split("x")[0];
  const width = image.size.split("x")[1];
  const session = await getServerSession(options);
  const user = await getUserByEmail(session?.user?.email as string);
  const captionCount = await getCaptionCount({
    userId: user._id,
    imageId: params.id,
  });

  return (
    <>
      <InfoBanner />
      <div className="border-b">
        <Navbar />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 p-4 pb-32 lg:p-8">
        <LeaveButton />

        <ImageCreation
          id={params.id}
          width={width}
          height={height}
          userId={user._id}
          captionCount={captionCount}
        />
      </section>
    </>
  );
};
export default CaptionPage;
