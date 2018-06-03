import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
    zaboes: { All: [0], R: [0], P: [0], C: [0], F: [0], L: [0], E: [0] },
    zaboesObject: {},
    zaboesPageCount: {},
  },
  actions,
  mutations,
  getters,
};
