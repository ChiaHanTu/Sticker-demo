export default {
  changeCurTag(state, tag) {
    state.curTag = tag;
  },
  addNote(state) {
    const newNote = {
      id: state.curId += 1,
      tag: 'Life',
      title: 'Add a title',
      color: 'skyBlue',
      content: '',
    };
    state.notes = [newNote, ...state.notes];
  },
  deleteNote(state, id) {
    state.notes = state.notes.filter((item) => item.id !== id);
  },
  changeColor(state, [newColor, id]) {
    state.notes = state.notes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          color: newColor,
        };
      }
      return item;
    });
  },
  moveUp(state, [note, order]) {
    state.notes.splice(order, 1);
    state.notes.splice(order - 1, 0, note);
  },
  moveDown(state, [note, order]) {
    state.notes.splice(order, 1);
    state.notes.splice(order + 1, 0, note);
  },
  changeTitle(state, [newTitle, id]) {
    state.notes = state.notes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: newTitle,
        };
      }
      return item;
    });
  },
  changeContent(state, [newContent, id]) {
    state.notes = state.notes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          content: newContent,
        };
      }
      return item;
    });
  },
  changeTag(state, [newTag, id]) {
    state.notes = state.notes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          tag: newTag,
        };
      }
      return item;
    });
  },
};
