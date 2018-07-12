import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const setURL = function(subURL) {
  return subURL === "" ? "" : typeof subURL === "undefined" ? "" : `${subURL}/`;
};

const actions = {
  zaboesList({ commit, state }, payload) {
    let method = "";
    if (payload.method == "최신순") {
      method = "&ordering=created_time";
    } else if (payload.method == "인기있는 자보") {
      method = "&ordering=likes";
    } else if (payload.method == "리크루팅") {
      method = "&category=R";
    } else if (payload.method == "퍼포먼스") {
      method = "&category=P";
    } else if (payload.method == "경쟁") {
      method = "&category=C";
    } else if (payload.method == "설명회") {
      method = "&category=F";
    } else if (payload.method == "강의") {
      method = "&category=L";
    } else if (payload.method == "전람회") {
      method = "&category=E";
    }
    axios({
      method: "get",
      url: `/zaboes/?page=${payload.pageNum}&page_size=${
        payload.pageSize
      }${method}`
    }).then(res => {
      const result = res.data.data;
      commit(types.ZABOES_LIST, {
        result: result,
        pagenum: payload.pageNum,
        method: payload.method,
        pageSize: payload.pageSize
      });
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
    let method = "";
    if (payload.method == "최신순") {
      method = "&ordering=created_time";
    } else if (payload.method == "인기있는 자보") {
      method = "&ordering=likes";
    } else if (payload.method == "리크루팅") {
      method = "&category=R";
    } else if (payload.method == "퍼포먼스") {
      method = "&category=P";
    } else if (payload.method == "경쟁") {
      method = "&category=C";
    } else if (payload.method == "설명회") {
      method = "&category=F";
    } else if (payload.method == "강의") {
      method = "&category=L";
    } else if (payload.method == "전람회") {
      method = "&category=E";
    }
    return new Promise(resolve => {
      axios.get(`/zaboes/?page_size=${payload.pageSize}${method}`).then(res => {
        let result = res.data.page_count;
        commit(types.ZABOES_PAGECOUNT, {
          result: result,
          method: payload.method
        });
        resolve(result);
      });
    });
  },
  getMyInfo({ commit, state }) {
    axios
      .get("/users/myInfo", {
        headers: {
          Authorization: localStorage.getItem("token")
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
