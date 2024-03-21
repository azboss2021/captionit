"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
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
import { generateImage } from "@/lib/actions/images.actions";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import SingleLinkDialog from "../SingleLinkDialog";
import { useState } from "react";
import { IMAGE_RATIOS } from "@/lib/constants";

const FormSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters long"),
  ratio: z.enum(["square", "landscape", "portrait"], {
    required_error: "You need to select an image ratio",
  }),
  standard: z.enum(["standard", "hd"], {
    required_error: "You need to select an image ratio",
  }),
});

const GenerateImageForm = ({
  setPhase,
}: {
  setPhase: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const enoughCredits = false;
  const [open, setOpen] = useState(false);

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
    await generateImage({
      imageDetails: IMAGE_RATIOS.find((obj) => obj.ratio === data.ratio),
      prompt: data.prompt,
      standard: data.standard,
      userId: "HELLO",
    });
  };

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-4">
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
                      <FormControl>
                        <RadioGroupItem value="square" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Square (1024x1024)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="landscape" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Landscape (1024x1792)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="portrait" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Portrait (1792x1024)
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="standard" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Standard
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
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
          {enoughCredits ? (
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate Image
            </LoadingButton>
          ) : (
            <SingleLinkDialog
              dialogTitle="Not enough credits :'("
              dialogDescription="It costs money to generate these images, so we have to charge. Get more credits below!"
              triggerButtonContent="Generate Image"
              buttonContent="Get Credits"
              open={open}
              onOpenChange={setOpen}
              link="/credits"
            />
          )}
        </form>
      </Form>
    </section>
  );
};
export default GenerateImageForm;
