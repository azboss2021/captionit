"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const PageLoadProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        color={"#3d61ff"}
        height="4px"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};
export default PageLoadProgressBar;
