import { getUserByEmail } from "@/lib/actions";
import { getServerSession } from "next-auth";
import cloudinary from "cloudinary";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ImageColumnGenerator from "../ImageColumnGenerator";

const PreviouslyGeneratedImages = async () => {
  const session = await getServerSession(options);
  const user = await getUserByEmail(session?.user?.email as string);
  const images = (await cloudinary.v2.search
    .expression(`tags:${user._id}`)
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute()) as { resources: { public_id: string }[] };

  if (images.resources.length === 0) return null;

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full justify-between text-xl font-semibold">
        Your Images
      </div>
      <ImageColumnGenerator images={images} />
    </section>
  );
};
export default PreviouslyGeneratedImages;
