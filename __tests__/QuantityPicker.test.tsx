import "react-native";
import React from "react";

import renderer from "react-test-renderer";
import { QuantityPicker } from "../src/components";

describe("Quality picker component", () => {
  test("renders correctly", () => {
    renderer.create(<QuantityPicker quantity={1} setQuantity={() => {}} />);
  });
});
