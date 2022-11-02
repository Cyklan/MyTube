export const checkStatusCode = async (res: Response) => {
  if (res.ok) {
    return res;
  }

  const response = await res.text();
  throw new Error(response);
};
