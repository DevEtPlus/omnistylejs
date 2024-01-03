import { useCallback, useMemo } from "react";

import { useDimensionsWithEnable } from "../hooks/use-dimensions-with-enabled";

type Units = {
  "%"?: number;
  vw?: number;
  vh?: number;
  vmin?: number;
  vmax?: number;
  em: number;
  rem: number;
  px: number;
  pt: number;
  pc: number;
  in: number;
  cm: number;
  mm: number;
  width?: number;
  height?: number;
};

type Group = {
  type: "group";
  right?: Element;
  parent?: Node;
};

type Operator = {
  type: "additive" | "multiplicative";
  parent: Node;
  priority: 1 | 2;
  operation: "*" | "/" | "+" | "-";
  left: Element;
  right?: Element;
};

type Value = {
  type: "number";
  value: string;
};

type Node = Group | Operator;
type Element = Node | Value;

/** Take a value like 12em and return [12, 'em'] */
function parseValue(value: string): [number, string | undefined] {
  // Match a single unit
  const unit = value.match(/([+-]?\b\d+(\.\d+)?)([a-z]+\b|%)?/i);

  return [parseFloat(unit![1]), unit![3] as string | undefined];
}

export function useUnits(mounted?: boolean) {
  const { width, height, fontScale } = useDimensionsWithEnable(mounted);

  const units: Units = useMemo(() => {
    return {
      px: 1,
      pt: 72 / 96,
      in: 96,
      pc: 9,
      cm: 96 / 2.54,
      mm: 96 / 25.4,
      rem: 16 * fontScale,
      em: 16 * fontScale,
      vw: width / 100,
      vh: height / 100,
      vmin: Math.min(width, height) / 100,
      vmax: Math.max(width, height) / 100,
      width,
      height,
    };
  }, [fontScale, height, width]);

  return useCallback(
    (value: any) => {
      if (!mounted) {
        return value;
      }

      if (!value || typeof value !== "string" || value.startsWith("#")) {
        return value;
      }

      // We don't convert % units
      if (value.includes("%")) {
        return value;
      }

      // We replace all units within the value
      const convertedValue = value.replace(
        /(\b\d+(\.\d+)?)([a-z]+\b|%)/gi,
        (subString) => {
          const [val, unit] = parseValue(subString);

          // We don't want to convert deg, rad, turn, second units
          if (["deg", "rad", "turn", "s"].includes(unit!)) {
            return subString;
          }

          return val * units[(unit as keyof Units) || "px"]! + "";
        },
      );

      if (convertedValue.startsWith("calc(")) {
        // remove calc. We can keep the parenthesis
        const subString = convertedValue.substring(4);

        return calculate(subString);
      }

      if (convertedValue.startsWith("max(")) {
        // Remove max()
        const subString = convertedValue.substring(
          4,
          convertedValue.length - 1,
        );

        const values = subString
          .split(",")
          .map((val) => parseFloat(val.trim()));

        return Math.max(...values);
      }

      if (convertedValue.startsWith("min(")) {
        // remove min()
        const subString = convertedValue.substring(
          4,
          convertedValue.length - 1,
        );

        const values = subString
          .split(",")
          .map((val) => parseFloat(val.trim()));

        return Math.min(...values);
      }

      if (parseFloat(convertedValue) + "" === convertedValue) {
        return parseFloat(convertedValue);
      }

      return convertedValue;
    },
    [units, mounted],
  );
}

/** Evaluate the string operation without relying on eval */
function calculate(string: string) {
  const rootNode: Group = { type: "group" };

  let currentNode: Node = rootNode;

  function applyOperator(
    left: number,
    op: Operator["operation"],
    right: number,
  ): number {
    if (op === "+") {
      return left + right;
    } else if (op === "-") {
      return left - right;
    } else if (op === "*") {
      return left * right;
    } else if (op === "/") {
      return left / right;
    } else {
      return right || left;
    }
  }

  function evaluate(root: Element): number {
    switch (root.type) {
      case "group":
        return evaluate(root.right!);
      case "additive":
      case "multiplicative":
        return applyOperator(
          evaluate(root.left),
          root.operation,
          evaluate(root.right!),
        );
      case "number":
        return parseFloat(root.value);
    }
  }

  function openGroup() {
    const newGroup: Group = { type: "group", parent: currentNode };

    currentNode.right = newGroup;
    currentNode = newGroup;
  }

  function closeGroup() {
    while (currentNode.type !== "group") {
      currentNode = currentNode.parent!;
    }

    currentNode = currentNode.parent!;
  }

  function addNumber(char: string) {
    const currentNumber = currentNode.right as Value | undefined;

    if (currentNumber === undefined) {
      currentNode.right = { type: "number", value: char };
    } else {
      currentNumber.value += char;
    }
  }

  function addOperator(char: Operator["operation"]) {
    const additive = "+-".includes(char);

    const priority = additive ? 1 : 2;

    // If it is a sign and not an operation, we add it to the comming number
    if (additive && !currentNode.right) {
      return addNumber(char);
    }

    while (
      (currentNode as Operator).priority &&
      (currentNode as Operator).priority >= priority
    ) {
      currentNode = currentNode.parent!;
    }

    const operator: Operator = {
      type: additive ? "additive" : "multiplicative",
      priority,
      parent: currentNode,
      operation: char,
      left: currentNode.right!,
    };

    currentNode.right = operator;
    currentNode = operator;
  }

  string.split("").forEach((char) => {
    if (char === "(") {
      openGroup();
    } else if (char === ")") {
      closeGroup();
    } else if ("0123456789.".includes(char)) {
      addNumber(char);
    } else if ("+*-/".includes(char)) {
      addOperator(char as Operator["operation"]);
    }
  });

  return evaluate(rootNode);
}
