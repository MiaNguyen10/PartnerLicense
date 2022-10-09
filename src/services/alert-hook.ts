/** @format */

import { useSetRecoilState } from "recoil";
import alertState, { IAlert } from "../components/Alert/alertState";

interface IUseAlert {
  setAlertState: (data: IAlert) => void;
}

function useAlert(): IUseAlert {
  const setReAlertState = useSetRecoilState(alertState);

  const setAlertState = (data: IAlert) => {
    setReAlertState(data);
  };

  return {
    setAlertState,
  };
}

export default useAlert;
