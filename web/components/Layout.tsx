import { FC, ReactNode } from "react";
import { Navigation } from "./Navigation";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="mt-20">{children}</main>
    </>
  );
};
