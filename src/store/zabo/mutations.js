import * as types from "@/store/mutation-types";
import { baseURL } from "@/variables.js";

const mutations = {
  [types.ZABOES_LIST](state, payload) {
    let filteredZaboes = payload.result.filter(zabo => {
      return zabo.posters.length >= 1;
    });
    const localMethod = payload.method;
    let finalZaboes = { ...state.zaboes };
    console.log(payload.result);
    if (payload.result.length === 0 && finalZaboes[localMethod].length < 1) {
      finalZaboes[localMethod] = [];
      for (let k = 0; k < 4; k++) {
        finalZaboes[localMethod].push({
          id: k + 1,
          author: {
            url: null,
            nickName: "None",
            profile_image: null
          },
          posters: [
            {
              zabo: k + 1,
              image: null,
              image_thumbnail: null
            }
          ],
          created_time: "0000-00-00 00:00",
          updated_time: "0000-00-00 00:00",
          like_count: 0,
          title: "None",
          content: "None",
          location: "None"
        });
      }
      state.zaboes = finalZaboes;
    } else {
      if (
        Math.ceil(finalZaboes[localMethod].length / payload.pageSize) <
        state.zaboesPageCount[localMethod]
      ) {
        for (let i = 0; i < filteredZaboes.length; i++) {
          finalZaboes[localMethod].push(filteredZaboes[i]);
        }
      }
      const currentFinal = finalZaboes[localMethod];
      currentFinal.sort(function(zaboA, zaboB) {
        return zaboA.id - zaboB.id;
      });
      finalZaboes[localMethod] = currentFinal;
      state.zaboes = finalZaboes;
    }
  },
  [types.ZABOES_RESET](state, payload) {
    state.zaboes = {
      전체: [],
      리크루팅: [],
      퍼포먼스: [],
      경쟁: [],
      설명회: [],
      강의: [],
      전람회: []
    };
  },
  [types.CATEGORY_ZABOES_RESET](state, payload) {
    state.zaboes[payload] = [];
  },
  [types.SET_NOTIFICATIONS](state, payload) {
    state.notifications = payload;
  },
  [types.ZABOES_PAGECOUNT](state, payload) {
    state.zaboesPageCount[payload.method] = payload.result;
  },
  [types.GET_PARTICIPATED_ZABOES](state, payload) {
    state.participatedZaboes[payload.method] = payload.result;
  },
  [types.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  },
  [types.GOT_RESPONSE](state) {
    state.getResponse = true;
  },
  [types.START_AJAX](state) {
    state.getResponse = false;
  },
  [types.LOGIN](state, payload) {
    state.loggedInState = true;
  },
  [types.LOGOUT](state, payload) {
    const {
      currentUser: { email }
    } = state;
    state.loggedInState = false;
    state.currentUser = {};
    sessionStorage.removeItem("token");
    window.location = baseURL + `/api/logout/?email=${email}`;
  }
};

export default mutations;
