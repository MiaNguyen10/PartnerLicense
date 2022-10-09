/* eslint-disable camelcase */
/** @format */

import {
  DateField,
  pageStatusProject,
  PaginateProps
} from "../global/Interface";

export interface IPartnerSearch {
  id?: string;
  page?:number;
  limit?:number;
}

export interface IPartner extends DateField {
  id?: string;
  project?: string;
  isActive: pageStatusProject;
}

export interface IPartnerAdd {
  partnerId?: string;
  partnerSecret?:string;
}

export interface IPartners {
  data: Array<IPartner | null>;
}

export interface Partner {
  dataP: IPartnerAdd | null |undefined;
}
