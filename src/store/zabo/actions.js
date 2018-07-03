import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const setURL = function(subURL) {
  return subURL === "" ? "" : typeof subURL === "undefined" ? "" : `${subURL}/`;
};

const actions = {
  zaboesList({ commit, state }, passedPayload) {
    if (!Object.keys(state.zaboesObject).includes(passedPayload.pageNum)) {
      axios({
        method: "get",
        url: `/zaboes/?page=${passedPayload.pageNum}&page_size=${
          passedPayload.pageSize
        }`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const result = res.data.data;
        const payload = { result, pagenum: passedPayload.pageNum };
        commit(types.ZABOES_LIST, payload);
      });
    }
  },
  searchZaboes({ commit }, searchValue) {
    axios.post("/zaboes/").then(res => {
      const result = res.data.result;
      commit(types.ZABO_SEARCH, { result, searchValue });
    });
  },
  zaboesGetPageCount({ commit }, payload) {
    return new Promise(resolve => {
      axios
        .get(
          `/zaboes/${setURL(payload.subURL)}?page_size=${payload.pageSize}`,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          const result = res.data.page_count;
          commit(types.ZABOES_PAGECOUNT, result);
          resolve(result);
        });
    });
  },
  // getParticipatedZaboes({ commit, state }, payload) {
  //   const {
  //     currentUser: { id }
  //   } = state;
  //   return this.$http
  //     .get(`/users/${id}`)
  //     .then(response => response.json())
  //     .then(json => {
  //       commit(types.GET_PARTICIPATED_ZABOES, json);
  //       return console.log(json);
  //     })
  //     .catch(err => console.log(err));
  // },
  getMyInfo({ commit, state }) {
    axios
      .get("/users/myInfo", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        if (response.status !== 401) {
          commit("SET_CURRENT_USER", response.data);
        } else {
          console.log("response stauts 401!");
        }
      })
      .catch(err => console.log(err));
  },
  setMyInfo({ commit, dispatch, state }, payload) {
    const {
      currentUser: { id }
    } = state;
    commit("START_AJAX");
    fetch(`http://localhost:8000/api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        first_name: payload[0],
        last_name: payload[1],
        nickName: payload[2],
        phone: payload[3]
      })
    })
      .then(function(response) {
        fetch(`http://localhost:8000/api/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            commit("SET_CURRENT_USER", response);
          });
      })
      .then(function() {
        commit("GOT_RESPONSE");
      });
  }
};

export default actions;
