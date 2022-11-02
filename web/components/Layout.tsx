import { FC, ReactNode } from "react";
import { User } from "../model/User";
import { Navigation } from "./Navigation";

export const Layout: FC<{ children: ReactNode, user?: User }> = ({ children, user }) => {
  return (
    <>
      <Navigation user={user} />
      <main className="mt-20 min-h-full h-full">{children}</main>
    </>
  );
};
