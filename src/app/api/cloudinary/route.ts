import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.imageUrl) {
      throw new Error("No image URL found in the response.");
    }

    const response = await fetch(body.imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME!,
      api_key: process.env.CLOUD_KEY!,
      api_secret: process.env.CLOUD_SECRET!,
    });

    const cloudinaryUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: [body.userId],
            public_id: body.imageId,
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          },
        )
        .end(buffer);
    });

    revalidatePath("/dashboard");

    return Response.json({ cloudinaryUpload }, { status: 201 });
  } catch (error) {
    handleError(error);
  }
}
