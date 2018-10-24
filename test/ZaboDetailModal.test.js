import { shallow } from "vue-test-utils";
import ZaboDetailModal from "../src/components/ZaboDetailModal";
import axios from "@/axios-auth";

describe("ZaboDetailModal.test.js", () => {
  let cmp;

  beforeEach(() => {
    cmp = shallow(ZaboDetailModal, {
      // Be aware that props is overridden using `propsData`
      propsData: {
        zaboId: 2,
        modalZaboData: []
      }
    });
    cmp.setData({
      content: "Content",
      title: "Title",
      location: "Location",
      comments: [],
      newComment: "",
      // 0 displays Info, 1 displays Review
      toDisplay: 0,
      zabo_id: 2,
      updated_time: "",
      isLiked: false,
      likeCount: -1,
      timeslots: [],
      category: "",
      payment: "",
      authorId: null,
      author: undefined,
      deadline: "",
      link_url: "",
      posters: [],
      currentPosterNumber: 0,
      posterModalState: false
    });
  });

  it("has the expected html structure", () => {
    expect(cmp).toMatchSnapshot();
  });

  it("zabodetailId inserted!", () => {
    expect(cmp.zabodetailId).toBe(2);
  });
});
