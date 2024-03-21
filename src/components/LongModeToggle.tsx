"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { FaMoon, FaSun } from "react-icons/fa6";

const LongModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="flex cursor-pointer items-center gap-2 p-4"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? (
        <>
          <FaMoon size={14} />
        </>
      ) : (
        <>
          <FaSun size={14} />
        </>
      )}
    </Button>
  );
};
export default LongModeToggle;
