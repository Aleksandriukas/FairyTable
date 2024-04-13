import renderer from "react-test-renderer";
import { QuantityPicker } from "../src/components/QuantityPicker/QuantityPicker";

describe("Quality picker component", () => {
  test("renders correctly", () => {
    renderer.create(<QuantityPicker quantity={0} setQuantity={() => {}} />);
  });
});
