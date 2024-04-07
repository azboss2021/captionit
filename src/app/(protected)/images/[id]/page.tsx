import { options } from "@/app/api/auth/[...nextauth]/options";
import CloudinaryImage from "@/components/Dashboard/CloudinaryImage";
import ImageAuthorSection from "@/components/Dashboard/ImageAuthorSection";
import ImageUpvote from "@/components/Dashboard/ImageUpvote";
import InfoBanner from "@/components/InfoBanner";
import LeaveButton from "@/components/LeaveButton";
import Navbar from "@/components/Navbar";
import YourCaptions from "@/components/YourCaptions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserByEmail } from "@/lib/actions";
import { getAuthoredCaptionsById } from "@/lib/actions/caption.actions";
import { getIsUpvoted, getVoteCount } from "@/lib/actions/images.actions";
import { SAAS_DESCRIPTION, SAAS_NAME } from "@/lib/constants";
import { Image, User } from "@/lib/models";
import { connectToDatabase } from "@/lib/mongoose";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${SAAS_NAME} - View Image`,
  description: SAAS_DESCRIPTION,
};

const ImagePage = async ({ params }: { params: { id: string } }) => {
  const sessionPromise = getServerSession(options);
  const dbImagePromise = Image.findOne({ cloudinaryId: params.id });

  await connectToDatabase();
  const [session, dbImage] = await Promise.all([
    sessionPromise,
    dbImagePromise,
  ]);

  const voteCount = await getVoteCount({ cloudinaryId: params.id });
  const userPromise = session?.user?.email
    ? getUserByEmail(session.user.email as string)
    : Promise.resolve(null);
  const imageAuthorPromise = dbImage
    ? User.findOne({ _id: dbImage.author })
    : Promise.resolve(null);

  const [user, imageAuthor] = await Promise.all([
    userPromise,
    imageAuthorPromise,
  ]);

  const isUpvoted = await getIsUpvoted({
    cloudinaryId: params.id,
    userId: user._id,
  });

  const captions = await getAuthoredCaptionsById({
    imageId: params.id,
    author: user._id,
  });

  return (
    <>
      {/* <InfoBanner /> */}
      <div className="border-b">
        <Navbar />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-8 p-6 pb-32 lg:p-8 lg:pb-32">
        <LeaveButton />

        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div className="mx-auto cursor-pointer">
            <CloudinaryImage
              publicId={params.id}
              page={true}
              width={200}
              height={200}
              className="max-h-[400px] w-auto"
            />
          </div>

          <div className="-my-4 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline">
              {dbImage.standard ? "Standard" : "HD"}
            </Badge>
            <Badge variant="outline">{dbImage.size}</Badge>
            {dbImage.style && dbImage.style !== "None" && (
              <Badge variant="outline">{dbImage.style}</Badge>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold">Prompt</span>
            <span className="w-full text-left">{dbImage.prompt}</span>
          </div>

          <div className="flex justify-between">
            <ImageAuthorSection
              authorImage={imageAuthor.image}
              authorName={imageAuthor.name}
            />
            <ImageUpvote
              isUpvoted={isUpvoted}
              upvoteCount={voteCount}
              userId={user._id}
              cloudinaryId={params.id}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {captions.length > 0 && (
            <span className="font-bold">Your Captions</span>
          )}
          <YourCaptions
            captions={captions}
            width={dbImage.size.split("x")[0]}
            height={dbImage.size.split("x")[1]}
          />
        </div>

        <div className="mx-auto">
          <Button asChild>
            <Link href={`/caption/create/${params.id}`}>
              Caption This Image
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};
export default ImagePage;
