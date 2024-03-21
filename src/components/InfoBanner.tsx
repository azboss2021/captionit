import Link from "next/link";
import { FaArrowRight, FaCoins, FaRocket } from "react-icons/fa";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  INFO_BANNER_CREDITS,
  INFO_BANNER_SUBSCRIPTION,
  PRODUCT_TYPE,
} from "@/lib/constants";
import { getPlan, getUserByEmail } from "@/lib/actions";

const InfoBanner = async () => {
  let showBanner = false;
  let infoBanner = { content: "", link: "", buttonContent: "" };
  const session = await getServerSession(options);

  if (PRODUCT_TYPE === "subscription" || PRODUCT_TYPE === "one_time") {
    const plan = await getPlan(session?.user?.email as string);
    if (!plan) return null;
    showBanner = plan === "Free";
    infoBanner = INFO_BANNER_SUBSCRIPTION;
  } else if (PRODUCT_TYPE === "credits") {
    const user = await getUserByEmail(session?.user?.email as string);
    if (!user) return null;
    showBanner = user.credits === 0;
    infoBanner = INFO_BANNER_CREDITS;
  }

  return (
    showBanner && (
      // <section className="relative flex items-center justify-center gap-3 overflow-hidden border-b bg-gradient-to-r from-pink-500 to-violet-600 p-2 text-white">
      <section className="relative flex items-center justify-center gap-3 overflow-hidden border-b bg-black p-2  text-sm font-semibold text-white dark:bg-white dark:text-black">
        {/* <Image
          src="/space_background.svg"
          height={2000}
          width={2000}
          alt="banner background"
          className="animate-slow-spin absolute -z-10 opacity-80"
          priority={true}
        /> */}
        {PRODUCT_TYPE === "credits" && <FaCoins size={16} />}
        {(PRODUCT_TYPE === "subscription" || PRODUCT_TYPE === "one_time") && (
          <FaRocket size={18} />
        )}
        {infoBanner.content}

        {infoBanner.link && (
          <Link
            href={infoBanner.link}
            className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black hover:opacity-80 dark:bg-black dark:text-white"
          >
            {/* <Link
            href={infoBanner.link}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-black hover:opacity-80"
          > */}
            {infoBanner.buttonContent} <FaArrowRight size={12} />
          </Link>
        )}
      </section>
    )
  );
};
export default InfoBanner;
