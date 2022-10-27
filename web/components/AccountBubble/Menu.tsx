import { FC, forwardRef, ReactNode, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { User } from "../../model/User";

interface MenuProps {
  close: () => void;
  user: User;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ user, close }, ref) => {
    return (
      <nav
        ref={ref}
        className="absolute top-[110%] -left-full rounded-xl w-32 bg-base-300 flex flex-col justify-start border-[1px] border-neutral "
      >
        <MenuOption onClick={close}>Profile</MenuOption>
        <MenuOption onClick={close}>Settings</MenuOption>
        <MenuOption onClick={close}>Sign Out</MenuOption>
      </nav>
    );
  }
);
Menu.displayName = "Menu";

const MenuOption: FC<{ children: ReactNode, onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <li onClick={onClick} className="list-none p-2 first-of-type:rounded-t-xl last-of-type:rounded-b-xl last-of-type:border-none hover:bg-neutral border-b-[1px] border-neutral">
      {children}
    </li>
  );
};