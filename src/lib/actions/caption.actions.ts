"use server";

import { Caption } from "../models";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";

export async function createCaption({
  imageId,
  userId,
  caption,
}: {
  imageId: string;
  userId: string;
  caption: {
    topText: string;
    bottomText: string;
    strokeWidth: number;
    topTextSize: number;
    bottomTextSize: number;
    yPadding: number;
    xPadding: number;
    whiteSpace: number;
    topTextAlign: string;
    bottomTextAlign: string;
    topTextVerticalAlign: string;
    bottomTextVerticalAlign: string;
    topTextHorizontalAlign: string;
    bottomTextHorizontalAlign: string;
    font: string;
    italic: boolean;
    bold: boolean;
    uppercase: boolean;
  };
}) {
  try {
    await connectToDatabase();

    const newCaption = await Caption.create({
      author: userId,
      imageId,
      ...caption,
    });

    if (!newCaption) throw Error("Failed to create a caption");

    return { success: true, captionId: newCaption.id };
  } catch (error) {
    handleError(error);
    return { success: false };
  }
}

export async function getCaptionCount({
  userId,
  imageId,
}: {
  userId: string;
  imageId: string;
}) {
  return 1;
}

export async function getCaptionById({ id }: { id: string }) {
  try {
    await connectToDatabase();

    const caption = await Caption.findById({ _id: id });

    if (!caption) throw Error("Failed to find caption");

    return JSON.parse(JSON.stringify(caption));
  } catch (error) {
    handleError(error);
  }
}

export async function getAuthoredCaptionsById({
  imageId,
  author,
}: {
  imageId: string;
  author: string;
}) {
  try {
    await connectToDatabase();

    const captions = await Caption.find({ author, imageId });

    if (!captions) throw Error("Failed to find captions by this author");

    return JSON.parse(JSON.stringify(captions));
  } catch (error) {
    handleError(error);
  }
}
