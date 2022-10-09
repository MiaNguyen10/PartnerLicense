import { atom } from "recoil";
import { IUser } from "./user.types";

const RefreshState = atom<boolean>({
  key: "isRefresh",
  default: false,
});

export default RefreshState;
