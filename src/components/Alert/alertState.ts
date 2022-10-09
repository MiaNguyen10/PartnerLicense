/** @format */

import { atom } from "recoil";

export interface IAlert {
  message: string;
  type?: "info" | "success" | "warning" | "error" | undefined;
  isUseTranslation?: boolean;
  showClose?: boolean;
  autohide?: boolean;
  autohideTime?: number;
  autohideFunction?: any;
}

const alertState = atom<IAlert>({
  key: "alert",
  default: {
    message: "",
  },
});

export default alertState;
