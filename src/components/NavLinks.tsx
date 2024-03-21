import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import LongModeToggle from "./LongModeToggle";

const NavLinks = () => {
  return (
    <>
      <Link
        href="#pricing"
        className="hover:underline"
        data-disable-nprogress={true}
      >
        Pricing
      </Link>
      <Link
        href="#demo"
        className="hover:underline"
        data-disable-nprogress={true}
      >
        Demo
      </Link>
      <Link
        href="#faq"
        className="hover:underline"
        data-disable-nprogress={true}
      >
        FAQ
      </Link>
      {/* <LongModeToggle /> */}
      <ModeToggle />
      {/* <Link href="#testimonials">Testimonials</Link> */}
    </>
  );
};
export default NavLinks;
