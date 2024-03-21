import { MAILING_LIST } from "@/lib/constants";
import EmailInput from "../EmailInput";

const HomeEmailSection = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 py-16">
      <div className="flex flex-col gap-1.5">
        <h3 className="subtitle text-center">{MAILING_LIST.title}</h3>
        <p className="text-center">{MAILING_LIST.description}</p>
      </div>
      <EmailInput />
    </section>
  );
};
export default HomeEmailSection;
