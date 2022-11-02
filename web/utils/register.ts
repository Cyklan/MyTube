import { checkStatusCode } from "./checkStatusCode";

export const register = (payload: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/register`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  })
    .then(checkStatusCode)
    .then((res) => res.json()) as Promise<{ token: string }>;
};
