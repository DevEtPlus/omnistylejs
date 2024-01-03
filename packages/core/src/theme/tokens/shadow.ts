import { WebDimensionValue } from "../../types";
import { Color, colors } from "./colors";

export type Shadow = {
  [key: string | number]: {
    shadowColor: Color[number];
    shadowOffset: {
      width: WebDimensionValue;
      height: WebDimensionValue;
    };
    shadowOpacity: "0" | "1" | `0.${number}`;
    shadowRadius: WebDimensionValue;
    elevation: `${number}`;
  };
};

export const shadow = {
  none: {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "0px",
    },
    shadowOpacity: "0",
    shadowRadius: "0px",
    elevation: "0",
  },
  "0": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "1px",
    },
    shadowOpacity: "0.18",
    shadowRadius: "1.0px",
    elevation: "1",
  },
  "1": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "1px",
    },
    shadowOpacity: "0.2",
    shadowRadius: "1.41px",
    elevation: "2",
  },
  "2": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "1px",
    },
    shadowOpacity: "0.22",
    shadowRadius: "2.22px",
    elevation: "3",
  },
  "3": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "2px",
    },
    shadowOpacity: "0.23",
    shadowRadius: "2.62px",
    elevation: "4",
  },
  "4": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "2px",
    },
    shadowOpacity: "0.25",
    shadowRadius: "3.84px",
    elevation: "5",
  },
  "5": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "3px",
    },
    shadowOpacity: "0.27",
    shadowRadius: "4.65px",
    elevation: "6",
  },
  "6": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "3px",
    },
    shadowOpacity: "0.29",
    shadowRadius: "4.65px",
    elevation: "7",
  },
  "7": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "4px",
    },
    shadowOpacity: "0.3",
    shadowRadius: "4.65px",
    elevation: "8",
  },
  "8": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "4px",
    },
    shadowOpacity: "0.32",
    shadowRadius: "5.46px",
    elevation: "9",
  },
  "9": {
    shadowColor: colors.trueGray800,
    shadowOffset: {
      width: "0px",
      height: "5px",
    },
    shadowOpacity: "0.34",
    shadowRadius: "6.27px",
    elevation: "10",
  },
} as const satisfies Shadow;
