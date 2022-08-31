export default {
  changeCurTag({ commit }, tag) {
    commit('changeCurTag', tag);
  },
  addNote({ commit }) {
    commit('addNote');
  },
  deleteNote({ commit }, id) {
    commit('deleteNote', id);
  },
  moveUp({ commit }, [note, order]) {
    commit('moveUp', [note, order]);
  },
  moveDown({ commit }, [note, order]) {
    commit('moveDown', [note, order]);
  },
  changeColor({ commit }, [color, id]) {
    commit('changeColor', [color, id]);
  },
  changeTitle({ commit }, [newTitle, id]) {
    commit('changeTitle', [newTitle, id]);
  },
  changeContent({ commit }, [newContent, id]) {
    commit('changeContent', [newContent, id]);
  },
  changeTag({ commit }, [newTag, id]) {
    commit('changeTag', [newTag, id]);
  },
};
