import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

const setURL = function(subURL) {
  return subURL === "" ? "" : typeof subURL === "undefined" ? "" : `${subURL}/`;
};

const actions = {
  zaboesList({ commit, state }, passedPayload) {
    // if (!Object.keys(state.zaboesObject).includes(passedPayload.pageNum)) {
    axios({
      method: "get",
      url: `/zaboes/?page=${passedPayload.pageNum}&page_size=${
        passedPayload.pageSize
      }`
    }).then(res => {
      const result = res.data.data;
      const payload = { result, pagenum: passedPayload.pageNum };
      commit(types.ZABOES_LIST, payload);
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
    let formData = new FormData();
    if (payload.length == 5) {
      formData.append("first_name", payload[0]);
      formData.append("last_name", payload[1]);
      formData.append("nickName", payload[2]);
      formData.append("phone", payload[3]);
      formData.append("gender", payload[4]);
    } else if (payload.length == 6) {
      formData.append("first_name", payload[0]);
      formData.append("last_name", payload[1]);
      formData.append("nickName", payload[2]);
      formData.append("phone", payload[3]);
      formData.append("gender", payload[4]);
      formData.append("profile_image", payload[5]);
    }
    commit("START_AJAX");
    axios(`/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token")
      },
      data: formData
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
