import { FC } from "react";
import { UserIcon } from "@heroicons/react/24/solid"

export const AccountBubble: FC = () => {
  return (
    <div className="avatar placeholder flex w-20 justify-center">
      <div className="bg-neutral-focus hover:bg-neutral transition-colors text-neutral-content rounded-full w-12 cursor-pointer">
        <UserIcon className="h-6 w-6" />
      </div>
    </div>
  );
};
