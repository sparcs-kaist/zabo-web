import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    zaboes: {
      최신순: [],
      "인기있는 자보": [],
      "마감임박 자보": [],
      리크루팅: [],
      공연: [],
      대회: [],
      설명회: [],
      세미나: [],
      전람회: []
    },
    searchedZaboes: [],
    zaboesPageCount: {
      전체: "",
      리크루팅: "",
      퍼포먼스: "",
      경쟁: "",
      설명회: "",
      강의: "",
      전람회: ""
    },
    participatedZaboes: {},
    currentUser: {},
    loggedInState: false,
    getResponse: true,
    notifications: []
  },
  actions,
  mutations,
  getters
};
