import { FC, ReactNode, useRef, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { User } from "../model/User";
import Link from "next/link";
import { Menu } from "./AccountBubble/Menu";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface LoggedInWrapperProps {
  children: ReactNode;
  onClick: () => void;
}

interface LoggedOutWrapperProps {
  children: ReactNode;
  href: string;
}

interface AccountBubbleLoggedIn {
  isLoggedIn: true;
  user: User;
}

interface AccountBubbleLoggedOut {
  isLoggedIn: false;
  user?: never;
}

interface WrapperProps extends LoggedInWrapperProps, LoggedOutWrapperProps {
  isLoggedIn: boolean;
}

type AccountBubbleProps = AccountBubbleLoggedIn | AccountBubbleLoggedOut;

export const AccountBubble: FC<AccountBubbleProps> = ({ isLoggedIn, user }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const close = () => {
    if (!open) {
      return;
    }

    setOpen(false);
  };
  const bubbleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick([bubbleRef, menuRef], close);

  return (
    <div
      ref={bubbleRef}
      className="avatar placeholder flex w-20 justify-center relative"
    >
      <Wrapper
        onClick={open ? close : toggleOpen}
        href="/sign-in"
        isLoggedIn={isLoggedIn}
      >
        {isLoggedIn ? (
          <span className="text-xl uppercase">
            {user.username.substring(0, 1)}
          </span>
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
      </Wrapper>
      {open && <Menu ref={menuRef} user={user!} close={toggleOpen} />}
    </div>
  );
};

const Wrapper: FC<WrapperProps> = ({ children, onClick, isLoggedIn, href }) => {
  if (isLoggedIn) {
    return <LoggedInWrapper onClick={onClick}>{children}</LoggedInWrapper>;
  }

  return <LoggedOutWrapper href={href}>{children}</LoggedOutWrapper>;
};

const LoggedInWrapper: FC<LoggedInWrapperProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-focus hover:bg-neutral transition-colors text-neutral-content rounded-full w-12 h-12 grid place-items-center cursor-pointer"
    >
      {children}
    </button>
  );
};

const LoggedOutWrapper: FC<LoggedOutWrapperProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="bg-neutral-focus hover:bg-neutral transition-colors text-neutral-content rounded-full w-12 h-12 grid place-items-center cursor-pointer">
        {children}
      </a>
    </Link>
  );
};
