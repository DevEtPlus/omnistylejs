import { WebDimensionValue } from "../../types";

export type Breakpoint = {
  [key: string | number]: WebDimensionValue;
};

export const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  "2xl": "2000px",
  "3xl": "4000px",
} as const satisfies Breakpoint;
