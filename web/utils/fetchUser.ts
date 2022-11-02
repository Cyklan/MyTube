import { User } from "../model/User";
import { checkStatusCode } from "./checkStatusCode";

export const fetchUser = ({ userId }: { userId: string}) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/user?userId=${userId}`;
  return fetch(url)
    .then(checkStatusCode)
    .then((res) => res.json()) as Promise<User>;
};
