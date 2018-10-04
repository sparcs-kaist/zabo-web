import { shallow } from "vue-test-utils";
import ZaboSearch from "../src/components/ZaboSearch";

describe("ZaboSearch.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = shallow(ZaboSearch, {
      // Be aware that props is overridden using `propsData`
      propsData: {
        searchValue: "s"
      }
    });
    cmp.setData({
      zaboList: [],
      userList: [],
      zaboIsLoading: true,
      userIsLoading: true,
      modalZaboId: 10,
      modalState: false,
      following: {},
      modalZaboData: {},
      reRender: false,
      selectedTab: 1
    });
  });

  it("Props match!", () => {
    expect(cmp.vm.zaboList).toEqual([]);
  });

  it("Props match!", () => {
    expect(cmp.vm.userList).toEqual([]);
  });

  it("Props match!", () => {
    expect(cmp.vm.following).toEqual({});
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
