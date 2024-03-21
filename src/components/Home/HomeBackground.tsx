const HomeBackground = () => {
  return (
    <>
      {/* <div
        className="fixed inset-0 -z-50 bg-right-top bg-no-repeat opacity-10 blur-3xl dark:opacity-5"
        style={{ backgroundImage: "url('/blob.svg')" }}
      /> */}
      <div
        className="fixed inset-0 -z-10 flex h-full w-full items-center justify-center bg-center bg-repeat opacity-30 dark:opacity-50"
        style={{ backgroundImage: "url('/grid.svg')" }}
      />
    </>
  );
};
export default HomeBackground;
