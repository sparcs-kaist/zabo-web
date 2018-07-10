import * as types from "@/store/mutation-types";

const mutations = {
  [types.ZABOES_LIST](state, payload) {
    let filteredZaboes = payload.result.filter(zabo => {
      return zabo.posters.length >= 1;
    });
    const localCategory = payload.category;
    let finalZaboes = { ...state.zaboes };
    if (
      Math.ceil(finalZaboes[localCategory].length / payload.pageSize) <
      state.zaboesPageCount[localCategory]
    ) {
      for (let i = 0; i < filteredZaboes.length; i++) {
        finalZaboes[localCategory].push(filteredZaboes[i]);
      }
      if (filteredZaboes.length < payload.pageSize) {
        for (let j = 0; j < payload.pageSize - filteredZaboes.length; j++) {
          finalZaboes[localCategory].push({
            id: 10000 + Math.floor(Math.random() * 10000),
            founder: {
              url: null,
              nickName: "None",
              profile_image:
                "https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552&format=original"
            },
            posters: [
              {
                zabo: 10000 + Math.floor(Math.random() * 10000),
                image:
                  "https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552&format=original",
                image_thumbnail:
                  "https://vignette.wikia.nocookie.net/project-pokemon/images/4/47/Placeholder.png/revision/latest?cb=20170330235552&format=original"
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
      }
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
  // [types.ZABO_UPDATE](state, zabo) {
  //   function func(x) {
  //     return x.pk.toString() === zabo.pk.toString();
  //   }
  //   state.zaboes.splice(state.zaboes.indexOf(state.zaboes.find(func)), 1, zabo);
  // },
  // [types.ZABO_DELETE](state) {
  //   function func(x) {
  //     return x.pk.toString() === zabo.pk.toString();
  //   }
  //   state.zaboes.splice(state.zaboes.indexOf(state.zaboes.find(func)), 1);
  // },
  [types.ZABOES_PAGECOUNT](state, payload) {
    state.zaboesPageCount[payload.category] = payload.result;
  },
  [types.GET_PARTICIPATED_ZABOES](state, payload) {
    state.participatedZaboes[payload.category] = payload.result;
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
    if (localStorage.getItem("token")) {
      state.loggedInState = true;
    }
    state.currentUser = payload;
  },
  [types.LOGOUT](state, payload) {
    state.loggedInState = false;
    state.currentUser = {};
    localStorage.removeItem("token");
  }
};

export default mutations;
