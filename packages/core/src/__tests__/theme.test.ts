import { createOmniTheme, DEFAULT_THEME } from "../theme";

describe("@omnistylejs/core", () => {
  it("createOmniTheme should return empty colorVars object and DEFAULT_THEME", () => {
    const theme = createOmniTheme({});

    expect(theme).toStrictEqual({
      colorVars: {},
      theme: DEFAULT_THEME,
    });
  });

  it("createOmniTheme should return empty colorVars object and DEFAULT_THEME", () => {
    const theme = createOmniTheme({
      colors: {
        primary: {
          light: "#FFF",
          dark: "#000",
        },
      },
    });

    expect(theme).toStrictEqual({
      colorVars: {
        primary: {
          light: "#FFF",
          dark: "#000",
        },
      },
      theme: {
        ...DEFAULT_THEME,
        colors: {
          ...DEFAULT_THEME.colors,
          primary: "var(--primary)",
        },
      },
    });
  });
});
