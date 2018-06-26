import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const setURL = function(subURL) {
  return subURL === "" ? "" : typeof subURL === "undefined" ? "" : `${subURL}/`;
};

const actions = {
  zaboesList({ commit, state }, passedPayload) {
    if (!Object.keys(state.zaboesObject).includes(passedPayload.pageNum)) {
      axios
        .get(
          `/zaboes/?page=${passedPayload.pageNum}&page_size=${
            passedPayload.pageSize
          }`
        )
        .then(res => {
          const result = res.data.data;
          const payload = { result, pagenum: passedPayload.pageNum };
          commit(types.ZABOES_LIST, payload);
        });
    }
  },
  // zaboCreate({ commit }, zabo) {
  //   axios.post('/zaboes/', zabo)
  //     .then((res) => {
  //       const result = res.data.result;
  //       commit(types.ZABO_CREATE, result);
  //     });
  // },
  zaboesGetPageCount({ commit }, payload) {
    return new Promise(resolve => {
      axios
        .get(`/zaboes/${setURL(payload.subURL)}?page_size=${payload.pageSize}`)
        .then(res => {
          const result = res.data.page_count;
          commit(types.ZABOES_PAGECOUNT, result);
          resolve(result);
        });
    });
  },
  getParticipatedZaboes({ commit, state }) {
    const {
      currentUser: { id }
    } = state;
    axios({
      method: "get",
      url: `http://localhost:8000/api/users/${id}`,
      auth: {
        username: "sbagi@sparcs.org",
        password: "kjh5270!@#@!"
        // 임시로 넣어놓은거!
      }
    })
      .then(response => response.json())
      .then(json => {
        commit(types.GET_PARTICIPATED_ZABOES, json);
        console.log(json);
      })
      .catch(err => console.log(err));
  }
  // zaboUpdate({ commit }, zabo) {
  //   axios.patch(`/zaboes/${zabo.pk}/`, zabo)
  //     .then((res) => {
  //       const result = res.data.result;
  //       commit(types.ZABO_UPDATE, result);
  //     });
  // },
  // zaboDelete({ commit }, zabo) {
  //   axios.delete(`/zaboes/${zabo.pk}/`)
  //     .then(() => {
  //       commit(types.ZABO_DELETE);
  //     });
  // },
};

export default actions;
