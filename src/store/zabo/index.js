import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    zaboes: [],
    zaboesObject: {},
    zaboesPageCount: "",
    participatedZaboes: {},
    currentUser: {
      id: 1,
      email: "jara@example.com",
      first_name: "Moonyeong",
      last_name: "Lee",
      is_active: true,
      is_staff: true,
      joined_date: "2018-06-26",
      profile_image:
        "http://localhost:8000/media/users/profile/20140721152929977_LDNRK0FS.jpg",
      phone: "",
      groups: [],
      user_permissions: []
    },
    loggedInState: false
  },
  actions,
  mutations,
  getters
};
