import { PROJECTSTATUS } from "./config";

export type TranslationType = any;
export type OnClickType = any;
export type HistoryType = any;
export type CatchErrorType = any;

export interface ThemeProps {
  isMobile?: boolean;
  headerHeight?: number;
  bottomTop?: number;
}

export type pageStatusProject =
  | PROJECTSTATUS.ACTIVE
  | PROJECTSTATUS.NOTACTIVE;

export interface PageUrlProps {
  url?: string;
  isAdd?: boolean;
  isEdit?: boolean;
  isView?: boolean;
  id?: string | undefined | null;
  gid?: string | undefined | null;
}

export interface PaginateProps {
  total?: number;
  page: number;
  limit: number;
}

export interface DateField {
  lastUpdateDate?: string | undefined | null;
}
