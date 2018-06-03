import axios from '@/axios-auth';
import * as types from '@/store/mutation-types';

const category = function(payload) {
  if (typeof payload.category === 'undefined') {
    return '';
  }
  if (payload.category === 'All') {
    return '';
  }
  return `&category=${payload.category}`;
};

const actions = {
  zaboesList({ commit, state }, passedPayload) {
    if (!Object.keys(state.zaboesObject).includes(passedPayload.pageNum)) {
      axios.get(`/zaboes/?page=${passedPayload.pageNum}
      &page_size=${passedPayload.pageSize}${category(passedPayload)}`)
        .then((res) => {
          const result = res.data.data;
          const payload = { result: result, pagenum: passedPayload.pageNum, category: passedPayload.category };
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
  zaboesGetPageCount({ commit }, passedPayload) {
    return new Promise((resolve) => {
      axios.get(`/zaboes/?page_size=${passedPayload.pageSize}${category(passedPayload)}`)
        .then((res) => {
          const result = res.data.page_count;
          const payload = { pageCount: result, category: passedPayload.category };
          commit(types.ZABOES_PAGECOUNT, payload);
          resolve(result);
        });
    });
  },
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
