import NavLogo from "../NavLogo";
import Link from "next/link";
import { ModeToggle } from "../theme-toggle";

const HomeNavbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-5 sm:justify-start sm:gap-8">
      <NavLogo home={true} />
      <>
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
        <ModeToggle />
        {/* <Link href="#testimonials">Testimonials</Link> */}
      </>
    </nav>
  );
};
export default HomeNavbar;
