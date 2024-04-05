import { getServerSession } from "next-auth";
import NavLogo from "./NavLogo";
import UserDropdown from "./UserDropdown";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { getUserByEmail } from "@/lib/actions";
import { badgeVariants } from "@/components/ui/badge";
import { NAVBAR_BADGE_LINK, PRODUCT_TYPE } from "@/lib/constants";
import { FaCoins } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa6";

const Navbar = async () => {
  const session = await getServerSession(options);
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 py-4">
      <NavLogo />
      <div className="flex items-center gap-3">
        {(PRODUCT_TYPE === "subscription" || PRODUCT_TYPE === "one_time") &&
          user.plan !== "Free" && (
            <Link
              className={badgeVariants({ variant: "default" })}
              href={NAVBAR_BADGE_LINK}
            >
              <span className="flex items-center gap-2 text-sm">
                {user.plan}
              </span>
            </Link>
          )}

        {PRODUCT_TYPE === "credits" && (
          <Link
            className={badgeVariants({ variant: "outline" })}
            href={NAVBAR_BADGE_LINK}
          >
            <span className="flex items-center gap-2 text-sm">
              <FaCoins /> {user.credits}
            </span>
          </Link>
        )}

        {/* <Button asChild className="w-fit">
          <Link href="/create">Generate Image</Link>
        </Button> */}
        <UserDropdown image={session?.user?.image!} />
      </div>
    </nav>
  );
};
export default Navbar;
