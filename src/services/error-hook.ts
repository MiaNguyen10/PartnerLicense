/** @format */

import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { CatchErrorType } from "../global/Interface.d";
import useAlert from "./alert-hook";
import RefreshState from "./auth-state";
import useLoader from "./loader-hook";

interface IUseError {
  errorDefault: (e: CatchErrorType) => void;
  setError: (e: CatchErrorType, url?: string | undefined) => void;
}

export const ERROR_LIST = [
  "VERSION_DUPLICATE",
  "KEY_DUPLICATE",
  "EMAIL_NOT_EXIST",
  "MERCHANT_EXIST",
  "ADMIN_EXIST",
  "ACCOUNT_LOCK",
  "INPUT_ERROR",
  "LOGIN_ERROR",
  "INVALID_STATUS",
];

function useError(): IUseError {
  const [, setIsRefresh] = useRecoilState(RefreshState);
  const { setAlertState } = useAlert();
  const { openLoader, closeLoader } = useLoader();

  const errorDefault = useCallback(
    (e: CatchErrorType): void => {
      closeLoader();
      if (e?.status === 500) {
        window.location.href = `/login`;
      } else if (
        e?.status === 401 &&
        e?.config?.url === "/login" &&
        e?.data?.error_code === "UNAUTHORIZED"
      ) {
        setAlertState({
          message: `Error-INPUT_ERROR`,
          isUseTranslation: true,
          type: "warning",
          showClose: true,
          autohide: true,
        });
      } else if (
        (e?.status === 400 || e?.status === 401) &&
        ERROR_LIST.includes(e?.data?.error_code)
      ) {
        setAlertState({
          message: `Error-${e?.data?.error_code}`,
          isUseTranslation: true,
          type: "warning",
          showClose: true,
          autohide: true,
        });
      } else if (e?.status === 401) {
        setIsRefresh(true);
      } else {
        setAlertState({
          message: `Error-DEFAULT`,
          isUseTranslation: true,
          type: "error",
          showClose: true,
          autohide: true,
        });
      }
    },
    [closeLoader, setAlertState, setIsRefresh]
  );

  const setError = (error: CatchErrorType, url: string | undefined) => {
    if (error?.status === 401 || error?.status === 500) {
      errorDefault(error);
    } else if (error?.data?.error_code) {
      openLoader();
      if (error?.data?.error_code === "SERVER_ERROR") {
        setInterval(() => {
          closeLoader();
          if (url) window.location.href = `${url}`;
        }, 2000);
      } else {
        closeLoader();
      }

      setAlertState({
        message: `Error-${error?.data?.error_code}`,
        type: "error",
        showClose: true,
        autohide: true,
      });
    }
  };

  return {
    errorDefault,
    setError,
  };
}

export default useError;
