import { User } from "@/types";
import { useAppSelector } from "@/hooks/hooks";

export const getUser = () => {
  return useAppSelector((store) => store.user.currentUser) as User;
};
