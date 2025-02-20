import { auth } from "./auth";

export const MySession = async () => {
  const session = await auth();
  return session;
};
