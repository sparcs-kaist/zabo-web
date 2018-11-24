import { shallow } from "vue-test-utils";
import ZaboSearch from "../src/components/ZaboSearch";
import axios from "@/axios-auth";

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

  it("Selected Tab match!", () => {
    cmp.vm.selectTab(1);
    expect(cmp.vm.selectedTab).toEqual(1);
    cmp.vm.selectTab(2);
    expect(cmp.vm.selectedTab).toEqual(2);
  });

  it("search working!", async () => {
    // search문 떄림
    await cmp.vm.searchZaboes();

    // compare할 result 받기
    const zaboResult = await axios({
      methods: "get",
      url: `/api/zaboes/?search=${cmp.vm.searchValue}`
    }).then(response => response.data.data);
    // zaboList 테스트
    expect(cmp.vm.zaboList.length).toEqual(zaboResult.length);
    expect(cmp.vm.zaboIsLoading).toEqual(false);

    // compare할 result 받기
    const userResult = await axios({
      methods: "get",
      url: `/api/users/?search=${cmp.vm.searchValue}`,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => response.data.data);
    // zaboList 테스트
    expect(cmp.vm.userList.length).toEqual(userResult.length);
    expect(cmp.vm.userIsLoading).toEqual(false);
  });

  it("closeModal Function working!", () => {
    cmp.vm.closeModal();
    expect(cmp.vm.modalState).toEqual(false);
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});
