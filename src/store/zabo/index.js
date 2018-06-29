import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    zaboes: [],
    zaboesObject: {},
    zaboesPageCount: "",
    participatedZaboes: {},
    currentUser: {},
    loggedInState: false,
    mainZaboSeen: false
  },
  actions,
  mutations,
  getters
};
