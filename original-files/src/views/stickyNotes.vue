<template>
  <div class="background">
      <div class="tag-field">
          <div
              :class="{tag: true, 'curTag': getCurTag === ''}"
              @click="changeCurTag('')"
              @keydown="changeCurTag('')"
          >
          All
          </div>
          <div
              v-for="tag in getTags"
              :key="tag.id"
              :class="{'tag': true, tag: true, 'curTag': tag === getCurTag}"
              @click="changeCurTag(tag)"
              @keydown="changeCurTag(tag)"
          >
          {{ tag }}
          </div>
      </div>
      <button
          class="add-note-btn"
          @click="AddNote()"
      >
      +
      </button>
      <div class="clearfix">
          <note-list
              v-show="getCurTag === note.tag || getCurTag === ''"
              v-for="(note, order) in getNotes"
              :key="note.id"
              :class="note.color"
              :note="note"
              :order="order"
          />
      </div>
  </div>
</template>

<script>
import noteList from '@/components/noteItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'stickyNotes',
  components: {
    noteList,
  },
  computed: {
    ...mapGetters([
      'getTags',
      'getCurTag',
      'getNotes',
    ]),
  },
  methods: {
    ...mapActions([
      'addNote',
      'changeCurTag',
    ]),
    AddNote() {
      this.addNote();
      const newNoteOrder = this.$children.length;
      this.$nextTick(() => this.$children[newNoteOrder].$refs.inputTitle.focus());
    },
  },
};
</script>

<style scoped lang="scss">

.clearfix:after {
    display: block;
    content: '';
    clear: both;
}

.background {
  position: relative;
  margin: 0 auto;
  padding-top: 2rem;
  width: 50rem;
}

.tag-field {
  margin-bottom: 3rem;
  width: 100%;
  height: 4rem;
}

.tag {
  float: left;
  margin-right: 1rem;
  padding: 0 1rem;
  height: 3rem;
  border: 3px solid #FFF;
  border-radius: 1rem;
  text-align: center;
  line-height: 3rem;
  font-size: 1.3rem;
  box-shadow: 2px 2px 1px #BBB;
  color: #888;
  border-color: #888;
}

.curTag {
  background-color: #7A4419;
  color: #FFF;
  border-color: #7A4419;
}

.tag:hover {
  cursor: pointer;
}

.add-note-btn {
  position: absolute;
  top: 10rem;
  left: -2rem;
  color: #999;
  font-size: 1.5rem;
  background-color: #FFFFFF00;
  border: none;
}

.note {
  float: left;
  margin: 0 2rem 2rem 0;
  width: 23rem;
  height: 23rem;
  border-radius: 1rem;
  color: #FFF;

  &.All {
    background-color: #888888;
  }
}
</style>
