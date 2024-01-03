import { WebDimensionValue } from "../../types";

export type LineHeight = {
  [key: string | number]: WebDimensionValue;
};

export const lineHeight = {
  none: "1px",
  tight: "1.25px",
  snug: "1.375px",
  normal: "1.5px",
  relaxed: "1.625px",
  loose: "2px",
  3: ".75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
} as const satisfies LineHeight;
