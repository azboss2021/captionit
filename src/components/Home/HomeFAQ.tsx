import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_LINKS, FAQ_QUESTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HomeFAQ = ({ stack }: { stack?: boolean }) => {
  return (
    <section
      id="faq"
      className={cn(
        `mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-24 lg:flex-row`,
        `${stack && "px-0 lg:flex-col lg:py-8"}`,
      )}
    >
      <div className="flex basis-1/2 flex-col items-start gap-2">
        <h3 className={`${stack ? "text-xl font-bold" : "title"}`}>
          Frequently Asked Questions
        </h3>
        {stack ? null : (
          <p className="max-w-xl text-xl font-bold">
            Have another question? Contact me by{" "}
            {FAQ_LINKS.twitter.length > 0 && (
              <Link
                href={FAQ_LINKS.twitter}
                target="_blank"
                className="underline"
              >
                Twitter or by{" "}
              </Link>
            )}
            <Link
              href={FAQ_LINKS.mailLink}
              target="_blank"
              className="underline"
            >
              email
            </Link>
          </p>
        )}
      </div>
      <Accordion type="single" collapsible className="w-full basis-1/2">
        {FAQ_QUESTIONS.map((question, index) => (
          <AccordionItem
            value={`faq_item_${index}`}
            key={`accordian_question_${index}`}
          >
            <AccordionTrigger className="text-lg font-semibold">
              {question.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {question.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
export default HomeFAQ;
