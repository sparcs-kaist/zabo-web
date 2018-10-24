const getters = {
  zaboes(state) {
    return state.zaboes;
  },
  zaboesPageCount(state) {
    return state.zaboesPageCount;
  },
  participatedZaboes(state) {
    return state.getParticipatedZaboes;
  },
  currentUser(state) {
    return state.currentUser;
  },
  getMyID(state) {
    return state.currentUser.id;
  },
  getNotifications(state) {
    return state.notifications;
  },
  getCreatedZaboes(state) {
    return state.createdZaboes;
  },
  getNickName(state) {
    return state.currentUser.nickName;
  },
  getEmail(state) {
    return state.currentUser.email;
  },
  getJoinedDate(state) {
    return state.currentUser.joined_date;
  },
  getFirstName(state) {
    return state.currentUser.first_name;
  },
  getLastName(state) {
    return state.currentUser.last_name;
  },
  getGender(state) {
    return state.currentUser.gender;
  },
  getProfileImagesource(state) {
    return state.currentUser.profile_image;
  },
  loggedInState(state) {
    return state.loggedInState;
  },
  isAjaxfinished(state) {
    return state.getResponse;
  }
};

export default getters;
