import React from "react";
import { View } from "react-native";

import renderer from "react-test-renderer";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

describe("@omnistylejs/components", () => {
  it("Basic View render", () => {
    const component = renderer.create(<View />);

    const tree = toJson(component);

    expect(tree).toMatchSnapshot();
  });
});
