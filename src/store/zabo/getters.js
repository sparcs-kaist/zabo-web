const getters = {
  zaboes(state) {
    return state.zaboes;
    // console.log(state);
    // return [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 },
    //   { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 10 },
    //   { num: 11 }, { num: 12 }, { num: 13 }, { num: 14 }, { num: 15 },
    //   { num: 16 }, { num: 17 }, { num: 18 }, { num: 19 }, { num: 20 }].splice(0, 9);
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
  getEmail(state) {
    return state.currentUser.email;
  },
  getJoinedDate(state) {
    return state.currentUser.joined_date;
  },
  getPhonenumber(state) {
    return state.currentUser.phone;
  },
  getFirstName(state) {
    return state.currentUser.first_name;
  },
  getLastName(state) {
    return state.currentUser.last_name;
  },
  loggedInState(state) {
    return state.loggedInState;
  }
};

export default getters;
