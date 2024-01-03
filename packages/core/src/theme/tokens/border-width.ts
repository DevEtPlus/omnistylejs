import { WebDimensionValue } from "../../types";

export type BorderWidth = {
  [key: string | number]: WebDimensionValue;
};

export const borderWidth = {
  DEFAULT: "1px",
  0: "0px",
  2: "2px",
  4: "4px",
  8: "8px",
} as const satisfies BorderWidth;
