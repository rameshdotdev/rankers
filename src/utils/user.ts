import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { User } from "@/types";

export const getUser = () => {
  return useSelector((state: RootState) => state.user.currentUser) as User;
};
