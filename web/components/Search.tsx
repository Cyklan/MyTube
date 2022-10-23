import { FC } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export const Search: FC = () => {
  return (
    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center">
      <input className="input w-96 !pl-8" placeholder="Search"></input>
      <MagnifyingGlassIcon className="h-5 w-5 absolute left-2" />
    </div>
  );
};
