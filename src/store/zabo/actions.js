import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const actions = {
  login({ commit, dispatch, state }, payload) {
    axios({
      url: "/api-token-verify/",
      method: "post",
      data: {
        token: payload
      }
    }).then(res => {
      if (res.status == 200) {
        commit("LOGIN");
      }
    });
  },
  zaboesList({ commit, state }, payload) {
    let method = "";
    if (payload.method == "최신순") {
      method = "?ordering=-created_time";
    } else if (payload.method == "인기있는 자보") {
      method = "popular/";
      axios({
        method: "get",
        url: `api/zaboes/${method}?page=${payload.pageNum}&page_size=${
          payload.pageSize
        }`
      }).then(res => {
        const result = res.data.data;
        commit(types.ZABOES_LIST, {
          result: result,
          pagenum: payload.pageNum,
          method: payload.method,
          pageSize: payload.pageSize
        });
      });
      return;
    } else if (payload.method == "마감임박 자보") {
      method = "soon/";
      axios({
        method: "get",
        url: `api/zaboes/${method}?page=${payload.pageNum}&page_size=${
          payload.pageSize
        }`
      }).then(res => {
        const result = res.data.data;
        commit(types.ZABOES_LIST, {
          result: result,
          pagenum: payload.pageNum,
          method: payload.method,
          pageSize: payload.pageSize
        });
      });
      return;
    } else if (payload.method == "리크루팅") {
      method = "?category=R";
    } else if (payload.method == "공연") {
      method = "?category=P";
    } else if (payload.method == "대회") {
      method = "?category=C";
    } else if (payload.method == "설명회") {
      method = "?category=F";
    } else if (payload.method == "세미나") {
      method = "?category=L";
    } else if (payload.method == "전람회") {
      method = "?category=E";
    }
    axios({
      method: "get",
      url: `api/zaboes/${method}&page=${payload.pageNum}&page_size=${
        payload.pageSize
      }`
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
    axios.post("zaboes/").then(res => {
      const result = res.data.result;
      commit(types.ZABO_SEARCH, { result, searchValue });
    });
  },
  zaboesGetPageCount({ commit }, payload) {
    let method = "";
    if (payload.method == "최신순") {
      method = "&ordering=-created_time";
    } else if (payload.method == "인기있는 자보") {
      method = "popular/";
      return new Promise(resolve => {
        axios
          .get(`api/zaboes/${method}?page_size=${payload.pageSize}`)
          .then(res => {
            let result = res.data.page_count;
            commit(types.ZABOES_PAGECOUNT, {
              result: result,
              method: payload.method
            });
            resolve(result);
          });
      });
    } else if (payload.method == "마감임박 자보") {
      method = "soon/";
      return new Promise(resolve => {
        axios
          .get(`api/zaboes/${method}?page_size=${payload.pageSize}`)
          .then(res => {
            let result = res.data.page_count;
            commit(types.ZABOES_PAGECOUNT, {
              result: result,
              method: payload.method
            });
            resolve(result);
          });
      });
    } else if (payload.method == "리크루팅") {
      method = "&category=R";
    } else if (payload.method == "공연") {
      method = "&category=P";
    } else if (payload.method == "대회") {
      method = "&category=C";
    } else if (payload.method == "설명회") {
      method = "&category=F";
    } else if (payload.method == "세미나") {
      method = "&category=L";
    } else if (payload.method == "전람회") {
      method = "&category=E";
    }
    return new Promise(resolve => {
      axios
        .get(`api/zaboes/?page_size=${payload.pageSize}${method}`)
        .then(res => {
          let result = res.data.page_count;
          commit(types.ZABOES_PAGECOUNT, {
            result: result,
            method: payload.method
          });
          resolve(result);
        });
    });
  },
  setMyInfo({ commit, dispatch, state }, payload) {
    const {
      currentUser: { id }
    } = state;
    let formData = new FormData();
    if (payload.length == 4) {
      formData.append("first_name", payload[0]);
      formData.append("last_name", payload[1]);
      formData.append("nickName", payload[2]);
      formData.append("gender", payload[3]);
    } else if (payload.length == 5) {
      formData.append("first_name", payload[0]);
      formData.append("last_name", payload[1]);
      formData.append("nickName", payload[2]);
      formData.append("gender", payload[3]);
      formData.append("profile_image", payload[4]);
    }
    commit("START_AJAX");
    axios(`api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token")
      },
      data: formData
    }).then(function(response) {
      axios("api/users/myInfo", {
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
  },
  getNotifications({ commit }, payload) {
    axios
      .get("api/notifications/", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        commit(types.SET_NOTIFICATIONS, res.data.data);
      });
  }
};

export default actions;
