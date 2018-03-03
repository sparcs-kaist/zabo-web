import axios from '@/axios-auth';
import * as types from '@/store/mutation-types';

const actions = {
  zaboesList({ commit }, pagenum = 1) {
    axios.get(`/zaboes/?page=${pagenum}`)
      .then((res) => {
        const result = res.data.result;
        commit(types.ZABOES_LIST, result.data);
      });
  },
  zaboCreate({ commit }, zabo) {
    axios.post('/zaboes/', zabo)
      .then((res) => {
        const result = res.data.result;
        commit(types.ZABO_CREATE, result);
      });
  },
  zaboesGetPageCount({ commit }, payload) {
    axios.get(`/zaboes/${payload}`)
      .then((res) => {
        const result = res.data.result.page_count;
        commit(types.ZABOES_PAGECOUNT, result);
      });
  },
  zaboUpdate({ commit }, zabo) {
    axios.patch(`/zaboes/${zabo.pk}/`, zabo)
      .then((res) => {
        const result = res.data.result;
        commit(types.ZABO_UPDATE, result);
      });
  },
  zaboDelete({ commit }, zabo) {
    axios.delete(`/zaboes/${zabo.pk}/`)
      .then(() => {
        commit(types.ZABO_DELETE);
      });
  },
};

export default actions;
