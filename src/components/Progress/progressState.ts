/** @format */

import { atom } from "recoil";

interface IProgress {
  open: boolean;
}

const progressState = atom<IProgress>({
  key: "loading",
  default: {
    open: false,
  },
});

export default progressState;
