import { FC } from "react";
import Link from "next/link";

export const Logo: FC = () => {
  return (
    <Link href="/">
      <a className="w-36 flex justify-center items-center text-3xl font-medium select-none">
        <span className="text-primary">My</span>
        <span className="text-base-content">Tube</span>
      </a>
    </Link>
  );
};
