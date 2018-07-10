import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const setURL = function(subURL) {
  return subURL === "" ? "" : typeof subURL === "undefined" ? "" : `${subURL}/`;
};

const actions = {
  zaboesList({ commit, state }, payload) {
    let currentCategory = "";
    if (payload.category == "리크루팅") {
      currentCategory = "R";
    } else if (payload.category == "퍼포먼스") {
      currentCategory = "P";
    } else if (payload.category == "경쟁") {
      currentCategory = "C";
    } else if (payload.category == "설명회") {
      currentCategory = "F";
    } else if (payload.category == "강의") {
      currentCategory = "L";
    } else if (payload.category == "전람회") {
      currentCategory = "E";
    }
    axios({
      method: "get",
      url: `/zaboes/?page=${payload.pageNum}&page_size=${
        payload.pageSize
      }&category=${currentCategory}`
    })
      .then(res => {
        const result = res.data.data;
        commit(types.ZABOES_LIST, {
          result: result,
          pagenum: payload.pageNum,
          category: payload.category,
          pageSize: payload.pageSize
        });
      })
      .then(() => {
        console.log("fake response");
      });
    // }
  },
  searchZaboes({ commit }, searchValue) {
    axios.post("/zaboes/").then(res => {
      const result = res.data.result;
      commit(types.ZABO_SEARCH, { result, searchValue });
    });
  },
  zaboesGetPageCount({ commit }, payload) {
    let currentCategory = "";
    if (payload.category == "리크루팅") {
      currentCategory = "R";
    } else if (payload.category == "퍼포먼스") {
      currentCategory = "P";
    } else if (payload.category == "경쟁") {
      currentCategory = "C";
    } else if (payload.category == "설명회") {
      currentCategory = "F";
    } else if (payload.category == "강의") {
      currentCategory = "L";
    } else if (payload.category == "전람회") {
      currentCategory = "E";
    }
    return new Promise(resolve => {
      axios
        .get(
          `/zaboes/${setURL(payload.subURL)}?page_size=${
            payload.pageSize
          }&category=${currentCategory}`
        )
        .then(res => {
          let result = res.data.page_count;
          commit(types.ZABOES_PAGECOUNT, {
            result: result,
            category: payload.category
          });
          resolve(result);
        });
    });
  },
  getMyInfo({ commit, state }) {
    axios
      .get("/users/myInfo", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        if (response.status !== 401) {
          commit(types.SET_CURRENT_USER, response.data);
        } else {
          console.log("response stauts 401!");
        }
      })
      .then(() => {
        commit(types.GOT_RESPONSE);
        return true;
      })
      .catch(err => console.log(err));
  },
  setMyInfo({ commit, dispatch, state }, payload) {
    const {
      currentUser: { id }
    } = state;
    commit("START_AJAX");
    axios(`/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      data: {
        first_name: payload[0],
        last_name: payload[1],
        nickName: payload[2],
        phone: payload[3]
      }
    }).then(function(response) {
      axios("/users/myInfo", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(function(response) {
          commit(types.SET_CURRENT_USER, response.data);
        })
        .then(function() {
          commit(types.GOT_RESPONSE);
        });
    });
  }
};

export default actions;
