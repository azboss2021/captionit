import NavLogo from "../NavLogo";
import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import HomeCTAButton from "./HomeCTAButton";
import SignInButton from "./SignInButton";

const HomeNavbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
      <NavLogo home={true} />
      <div className="flex items-center gap-12">
        <Link
          href="#pricing"
          className="hidden hover:underline md:block"
          data-disable-nprogress={true}
        >
          Pricing
        </Link>
        <Link
          href="#demo"
          className="hidden hover:underline md:block"
          data-disable-nprogress={true}
        >
          Demo
        </Link>
        <Link
          href="#faq"
          className="hidden hover:underline md:block"
          data-disable-nprogress={true}
        >
          FAQ
        </Link>
        {/* <LongModeToggle /> */}
        {/* <ModeToggle /> */}
        {/* <Link href="#testimonials">Testimonials</Link> */}
      </div>
      <SignInButton />
    </nav>
  );
};
export default HomeNavbar;
