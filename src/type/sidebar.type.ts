import { ReactElement } from "react";

export type SIDEBAR = {
  label: string;
  key: string;
  href: string;
  enable?: boolean;
  icon: ReactElement;
  children?: SIDEBAR[];
};
