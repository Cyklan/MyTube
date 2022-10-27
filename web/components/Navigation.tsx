import { FC } from "react";
import { AccountBubble } from "./AccountBubble";
import { Logo } from "./Logo";
import { Search } from "./Search";

export const Navigation: FC = () => {
  return (
    <nav className="w-screen bg-base-300 border-b-base-200 h-20 rounded-b-xl shadow-lg flex fixed top-0 justify-between items-center">
      <Logo />
      <Search />
      <AccountBubble isLoggedIn={false} />
    </nav>
  );
};
