import _ from 'lodash';

export default {
  getCurTag: (state) => state.curTag,
  getNotes: (state) => state.notes,
  getColors: (state) => state.colors,
  getTags: (state) => {
    const originTagList = state.notes.map((item) => item.tag);
    return _.uniq(originTagList);
  },
};
