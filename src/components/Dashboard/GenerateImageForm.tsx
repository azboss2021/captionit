"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "../LoadingButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createImage } from "@/lib/actions/images.actions";
import { Textarea } from "../ui/textarea";
import SingleLinkDialog from "../SingleLinkDialog";
import { useEffect, useState } from "react";
import { IMAGE_RATIOS } from "@/lib/constants";
import { decreaseCredits, getUserByEmail } from "@/lib/actions";
import { FaCoins } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Image } from "@/lib/models";
import { createClient } from "next-server-task/client";
import { type GenerateImage } from "@/app/api/generate-image/route";
const client = createClient<GenerateImage>();

const FormSchema = z.object({
  prompt: z
    .string()
    .min(10, "Prompt must be between 10 - 1500 characters")
    .max(1500, "Prompt must be between 10 - 1500 characters"),
  ratio: z.enum(["square", "landscape", "portrait"], {
    required_error: "You need to select an image ratio",
  }),
  standard: z.enum(["standard", "hd"], {
    required_error: "You need to select an image ratio",
  }),
});

const GenerateImageForm = ({
  setPhase,
  setLoadingState,
  session,
}: {
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  setLoadingState: React.Dispatch<React.SetStateAction<string>>;
  session: Session | null;
}) => {
  const [enoughCredits, setEnoughCredits] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [defaultCost, setDefaultCost] = useState(10);
  const [ratioCost, setRatioCost] = useState(0);
  const [qualityCost, setQualityCost] = useState(0);
  const [open, setOpen] = useState(false);
  const [userCredits, setUserCredits] = useState<number>(0);
  const router = useRouter();

  const { mutate, isMutating } = client.useTask("/api/generate-image");

  useEffect(() => {
    const getCredits = async () => {
      const user = await getUserByEmail(session?.user?.email as string);
      setUserId(user._id);
      setUserCredits(user.credits);
      checkCredits(user.credits);
    };

    getCredits();
  }, []);

  useEffect(() => {
    checkCredits(userCredits);
  }, [qualityCost, ratioCost]);

  const checkCredits = (credits: number) => {
    if (credits < defaultCost + ratioCost + qualityCost) {
      setEnoughCredits(false);
    } else setEnoughCredits(true);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
      ratio: "square",
      standard: "standard",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (enoughCredits === null)
      return toast.error("Something went wrong. Please try again");

    if (enoughCredits !== null && !enoughCredits) {
      setOpen(true);
      return;
    }

    if (!userId) return toast.error("Something went wrong. Please try again");

    setPhase((curr) => curr + 1);

    const imageId = crypto.randomUUID();

    await decreaseCredits(userId, defaultCost + qualityCost + ratioCost);

    try {
      const newImage = await createImage({
        userId,
        prompt: data.prompt,
        size: IMAGE_RATIOS.find((obj) => obj.ratio === data.ratio)
          ?.size as string,
        style: "None",
        standard: data.standard === "standard" ? true : false,
        imageId,
      });

      const generateImageResult = await mutate({
        userId,
        imageDetails: IMAGE_RATIOS.find((obj) => obj.ratio === data.ratio),
        prompt: data.prompt,
        standard: data.standard,
        imageId,
      });
      const imageUrl = generateImageResult.url;

      const response = await fetch("/api/cloudinary", {
        method: "POST",
        body: JSON.stringify({ imageUrl, userId, imageId }),
      });

      if (!response.ok) throw Error("Status code: " + response.status);
    } catch (error) {
      console.error(error);
      return;
    }

    router.push(`images/${imageId}`);
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-4">
      <h2 className="text-center text-xl font-bold">Generate Image</h2>
      <SingleLinkDialog
        dialogTitle="Not enough credits :'("
        dialogDescription="It costs money to generate these images, so we have to charge. Get more credits below!"
        buttonContent="Get Credits"
        open={open}
        onOpenChange={setOpen}
        link="/credits"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Image Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cute kitten sitting on a puppy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ratio"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Image Ratio (WxH)</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl onClick={() => setRatioCost(0)}>
                        <RadioGroupItem value="square" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Square (1024x1024)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl onClick={() => setRatioCost(5)}>
                        <RadioGroupItem value="landscape" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Landscape (1792x1024)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl onClick={() => setRatioCost(5)}>
                        <RadioGroupItem value="portrait" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Portrait (1024x1792)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="standard"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Image Quality</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl onClick={() => setQualityCost(0)}>
                        <RadioGroupItem value="standard" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Standard
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl onClick={() => setQualityCost(5)}>
                        <RadioGroupItem value="hd" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        High Definition
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2">
              Cost <FaCoins /> {defaultCost + ratioCost + qualityCost}
            </p>
            <LoadingButton
              type="submit"
              disabled={!userId}
              loading={form.formState.isSubmitting}
              className="font-semibold"
              size="lg"
            >
              Generate Image for {defaultCost + ratioCost + qualityCost} Credits
            </LoadingButton>
          </div>
        </form>
      </Form>
    </section>
  );
};
export default GenerateImageForm;
