import { shallow } from "vue-test-utils";
import ZaboThumbnail from "../src/components/ZaboThumbnail";

describe("ZaboThumbnail.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = shallow(ZaboThumbnail, {
      // Be aware that props is overridden using `propsData`
      propsData: {
        zaboDetail: {
          content: "This is content",
          posters: ["http://poster"]
        }
      }
    });
    cmp.setData({});
  });

  it("Props match!", () => {
    expect(cmp.vm.zaboDetail).toEqual({
      content: "This is content",
      posters: ["http://poster"]
    });
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
