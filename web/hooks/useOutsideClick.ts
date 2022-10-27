import { useEffect, RefObject } from "react";

export const useOutsideClick = (
  refs: RefObject<HTMLDivElement>[],
  callback: () => void
) => {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (refs.every((ref) => !ref.current?.contains(event.target as Node))) {
        callback();
      }
    }

    document?.addEventListener("click", handleOutsideClick);

    return () => document?.removeEventListener("click", handleOutsideClick);
  }, [refs]);
};
