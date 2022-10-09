/** @format */

import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import progressState from "../components/Progress/progressState";

interface IUseLoader {
  openLoader: () => void;
  closeLoader: () => void;
}

function useLoader(): IUseLoader {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerAutoHide = useRef<number | any>(0);
  const setLoaderState = useSetRecoilState(progressState);

  const openLoader = () => {
    clearTimeout(timerAutoHide.current);
    setLoaderState({ open: true });
  };
  const closeLoader = () => {
    timerAutoHide.current = setTimeout(
      () => setLoaderState({ open: false }),
      1000
    );
    return () => {
      clearTimeout(timerAutoHide.current);
    };
  };

  return {
    openLoader,
    closeLoader,
  };
}

export default useLoader;
