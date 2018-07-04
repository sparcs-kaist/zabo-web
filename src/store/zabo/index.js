import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    // zaboes: {
    //   R: [],
    //   P: [],
    //   C: [],
    //   F: [],
    //   L: [],
    //   E: []
    // },
    zaboes: [],
    searchedZaboes: [],
    // zaboesObject: [],
    zaboesPageCount: "",
    participatedZaboes: {},
    currentUser: {},
    loggedInState: false,
    mainZaboSeen: false,
    getResponse: true
  },
  actions,
  mutations,
  getters
};
