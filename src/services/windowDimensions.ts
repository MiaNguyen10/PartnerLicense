/** @format */

import { useEffect } from "react";
import { useRecoilState, atom, SetterOrUpdater } from "recoil";
import { MobileScreenSize } from "../global/config";

interface IUseDrawer {
  width: number;
  height: number;
  isMobile: boolean;
  mobileScreenSize: number;
  drawer: boolean;
  setDrawerState: SetterOrUpdater<IsDrawerOpenInterface>;
  isIphone: boolean;
  bottomTop?: number;
}
export interface ScreenInterface {
  width: number;
  height: number;
  isMobile: boolean;
  mobileScreenSize: number;
  isIphone: boolean;
  bottomTop?: number;
}
const ScreenState = atom<ScreenInterface>({
  key: "screenState",
  default: {
    width: 0,
    height: 0,
    isMobile: false,
    mobileScreenSize: MobileScreenSize,
    isIphone: false,
    bottomTop: 0,
  },
});

export interface IsDrawerOpenInterface {
  open: boolean;
}
export const drawerState = atom<IsDrawerOpenInterface>({
  key: "drawerState",
  default: {
    open: false,
  },
});

function useWindowDimensions(): IUseDrawer {
  const [getScreendimention, setScreendimention] = useRecoilState(ScreenState);
  const [getDrawerState, setDrawerState] = useRecoilState(drawerState);
  const drawer = getDrawerState?.open || false;

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      drawer,
      width,
      height,
      isMobile: width < MobileScreenSize,
      mobileScreenSize: MobileScreenSize,
      isIphone: !!(
        (navigator?.platform && /iPad|iPhone|iPod/.test(navigator.platform)) ||
        (navigator?.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent))
      ),
    };
  }

  useEffect(() => {
    function handleResize() {
      setScreendimention(getWindowDimensions());
    }

    if (getScreendimention?.width === 0 && getScreendimention?.height === 0) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    drawer,
    setDrawerState,
    width: getScreendimention?.width || 0,
    height: getScreendimention?.height || 0,
    isMobile: getScreendimention?.isMobile,
    mobileScreenSize: getScreendimention?.mobileScreenSize || MobileScreenSize,
    isIphone: getScreendimention?.isIphone,
    bottomTop: getScreendimention?.isIphone ? 52 : 0,
  };
}

export default useWindowDimensions;
