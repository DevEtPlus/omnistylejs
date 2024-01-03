import { createElement } from "react";

import { Variables } from "../../types";

const cache = new Map<string, string>();

let styleSheet: CSSStyleSheet | undefined;

export function createOmniSheet() {
  if (
    typeof window !== "undefined" &&
    !document.getElementById("omnistyle-client-css")
  ) {
    styleSheet = (() => {
      const style = document.createElement("style");

      style.id = "omnistyle-client-css";

      style.append(document.createTextNode(""));

      document.head.append(style);

      return style.sheet ?? undefined;
    })();
  }

  function hasCSS(id: string, text: string) {
    return cache.has(id) && cache.get(id)?.includes(text);
  }

  function addCSS(id: string, rule: string) {
    if (!hasCSS(id, rule)) {
      cache.set(id, `${cache.get(id) ?? ""}${rule}`);

      styleSheet?.insertRule(rule, cache.size - 1);
    }
  }

  function addColorVars(colorVars?: Variables, isRoot?: boolean) {
    if (!colorVars) {
      return;
    }

    if (Object.keys(colorVars).length > 0) {
      let rootVars = isRoot
        ? ":root { "
        : "@media (prefers-color-scheme: light) { :root { ";
      let darkVars = isRoot
        ? ".dark { "
        : "@media (prefers-color-scheme: dark) { :root { ";

      for (const key of Object.keys(colorVars)) {
        const varValue = colorVars[key];

        if (typeof varValue === "object") {
          rootVars = `${rootVars} --${key}: ${varValue.light} !important;`;
          darkVars = `${darkVars} --${key}: ${varValue.dark} !important;`;
        } else {
          rootVars = `${rootVars} --${key}: ${varValue} !important;`;
        }
      }

      if (rootVars.length > 8) {
        addCSS("colorVarsRoot", `${rootVars} ${isRoot ? "}" : "} }"}`);
      }

      if (darkVars.length > 8) {
        addCSS("colorVarsDark", `${darkVars} ${isRoot ? "}" : "} }"}`);
      }
    }
  }

  function getStyleElement() {
    return createElement("style", {
      id: "omnistyle-server-css",
      key: "omnistyle-server-css",
      type: "text/css",
      dangerouslySetInnerHTML: {
        __html: Array.from(cache.values()).join("\n"),
      },
    });
  }

  return {
    addCSS,
    addColorVars,
    getStyleElement,
  };
}
