import { FaCopyright, FaDiscord } from "react-icons/fa";
import LogoImage from "../LogoImage";
import Link from "next/link";
import {
  DISCORD_LINK,
  SAAS_AUTHOR,
  SAAS_NAME,
  SAAS_SLOGAN,
  SUPPORT_EMAIL,
} from "@/lib/constants";

// EDIT THESE
const copyrightYear = 2024;
const more = false;

const HomeFooter = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col flex-wrap items-center gap-10 px-8 py-24 text-center lg:flex-row lg:items-start lg:justify-between lg:pb-48 lg:text-left">
      <div className="flex flex-col items-center gap-2 lg:items-start">
        <span className="flex items-center gap-2 text-lg font-bold">
          <LogoImage /> {SAAS_NAME}
        </span>
        <div className="flex flex-col text-muted-foreground">
          <span>{SAAS_SLOGAN}</span>
          <span className="flex items-center gap-1">
            Copyright <FaCopyright /> {copyrightYear} - All rights reserved
          </span>
        </div>
      </div>

      {DISCORD_LINK && (
        <div className="flex flex-col items-center gap-1 font-bold lg:hidden">
          Join the community!
          <Link
            href={DISCORD_LINK}
            className="flex w-fit items-center gap-2 rounded-lg bg-[#7289da] px-3 py-1 text-white"
          >
            <FaDiscord /> Join Us
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <h3 className="font-bold tracking-wide text-muted-foreground">
            LINKS
          </h3>
          <div className="flex flex-col gap-1.5 ">
            <Link href="#pricing">Pricing</Link>
            <Link href={`mailto:${SUPPORT_EMAIL}`}>Support</Link>
            {DISCORD_LINK && (
              <Link
                href={DISCORD_LINK}
                target="_blank"
                className="hidden items-center gap-2 rounded-lg bg-[#7289da] px-3 py-1 font-bold text-white lg:flex"
              >
                <FaDiscord /> Join Us
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-center lg:text-left">
          <h3 className="font-bold tracking-wide text-muted-foreground">
            LEGAL
          </h3>
          <div className="flex flex-col gap-1.5 ">
            <Link href="/tos" target="_blank">
              Terms of services
            </Link>
            <Link href="privacy-policy" target="_blank">
              Privacy policy
            </Link>
          </div>
        </div>

        {more && (
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <h3 className="font-bold tracking-wide text-muted-foreground">
              MORE
            </h3>
            <div className="flex flex-col gap-1.5 ">
              <Link href="">[MORE LINKS HERE]</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default HomeFooter;
