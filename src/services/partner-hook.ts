/** @format */

import React, { useCallback, useEffect, useState } from "react";
import useError from "./error-hook";
import { IPartner, IPartnerAdd, IPartners, Partner } from "./partner.types";
import useLoader from "./loader-hook";
import useAlert from "./alert-hook";
import { Identity } from "@mui/base";

interface IUsePartner {
  data: IPartners | null;
  detail: Partner | null;
  get: (tID: string) => Promise<void>;
  post: (dataPost: IPartnerAdd) => Promise<void>;
  deletePartner: (partnerID: string) => Promise<void>;
}
const baseURL =
  "http://internal-aa0d19b2-commercialfaceapi-da16-799199428.ap-southeast-1.elb.amazonaws.com/partner-license/bo/api/v1/partner";
const url =
  "http://internal-aa0d19b2-commercialfaceapi-da16-799199428.ap-southeast-1.elb.amazonaws.com/partner-license/bo/api/v1/license/inquire";
function usePartner(isAutoLoaded = true): IUsePartner {
  const { setAlertState } = useAlert();
  const { openLoader, closeLoader } = useLoader();
  const { errorDefault, setError } = useError();
  const [partnerData, setPartnerData] = useState([]);
  const [partnerDetail, setPartnerDetail] = useState();
  const [id, setId] = useState<string | undefined | null>();

  useEffect(() => {
    async function fetchPartnerList() {
      try {
        const response = await fetch(`${baseURL}/all`, {
          method: "POST",
          body: JSON.stringify({
            kbankHeader: {
              funcNm: "PAL0009I01",
              rqUID: "rqUID",
              rqAppId: "rqAppId",
              rqDt: "2006-01-02T15:04:05.000+07:00",
              corrID: "corrID",
            },
          }),
        });
        const responseJSON = await response.json();
        let { partners } = responseJSON;
        setPartnerData(partners);
      } catch (error) {
        console.log("Failed to fetch partner list:", error);
      }
    }
    fetchPartnerList();
  }, []);

  const get = useCallback(async (tID: string): Promise<void> => {
    try {
      if (tID) setId(tID);
    } catch (e: any) {
      errorDefault(e);
    }
  }, []);

  // useEffect(() => {
  //   async function fetchPartner() {
  //     try {
  //       const response = await fetch(`${url}/partner`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           kbankHeader: {
  //             funcNm: "PAL0008I01",
  //             rqUID: "rqUID",
  //             rqAppId: "rqAppId",
  //             rqDt: "2006-01-02T15:04:05.000+07:00",
  //             corrID: "corrID",
  //           },
  //           partnerId: id,
  //         }),
  //       });
  //       const responseJSON = await response.json();
  //       const { partnerInfo } = responseJSON;
  //       setPartnerDetail(partnerInfo);
  //     } catch (error) {
  //       console.log("Failed to fetch partner list:", error);
  //     }
  //   }
  //   fetchPartner();
  // }, []);

  const post = useCallback(
    async (dataPost: IPartnerAdd): Promise<void> => {
      try {
        openLoader();
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kbankHeader: {
              funcNm: "PAL0006I01",
              rqUID: "rqUID",
              rqAppId: "rqAppId",
              rqDt: "2006-01-02T15:04:05.000+07:00",
              corrID: "corrID",
            },
            partnerId: dataPost.partnerId,
            partnerSecret: dataPost.partnerSecret,
          }), // body data type must match "Content-Type" header
        });

        setAlertState({
          message: `Success-Add`,
          isUseTranslation: true,
          type: "success",
          autohide: true,
        });

        closeLoader();
      } catch (e: any) {
        errorDefault(e);
      }
    },
    [closeLoader, errorDefault, openLoader, setAlertState]
  );

  const deletePartner = useCallback(
    async (partnerID: string): Promise<void> => {
      try {
        openLoader();
        const res = await fetch(`${baseURL}/terminate`, {
          method: "POST",
          body: JSON.stringify({
            kbankHeader: {
              funcNm: "PAL0007I01",
              rqUID: "rqUID",
              rqAppId: "rqAppId",
              rqDt: "2006-01-02T15:04:05.000+07:00",
              corrID: "corrID",
            },
            partnerId: partnerID,
          }),
        });
        setAlertState({
          message: `Success-delete`,
          isUseTranslation: true,
          type: "success",
          autohide: true,
        });

        closeLoader();
      } catch (e: any) {
        errorDefault(e);

      }
    },
    [closeLoader, errorDefault, openLoader, setAlertState]
  );

  return {
    data: { data: partnerData },
    detail: { dataP: partnerDetail },
    get,
    post,
    deletePartner,
  };
}

export default usePartner;
