<template>
    <div class="note">

        <div class="top-area">
            <label for="color" class="select-label">
                Change color
                <select
                    class="color-btn"
                    @change="changeColor([$event.target.value, note.id])"
                >
                    <option
                      v-for="(code, colorName) in getColors"
                      :key="code"
                      :selected="colorName === note.color"
                      :disabled="colorName === note.color"
                    >
                    {{ colorName }}
                    </option>

                </select>
            </label>

            <button
                @click="deleteNote(note.id)"
                class="delete-btn"
            >X
            </button>

            <div class="note-order">
                <img
                    alt="move-up"
                    src="../assets/up-arrow.png"
                    class="move-btn up-btn"
                    @click="MoveUp([note, order])"
                    @keydown="MoveUp([note, order])"
                    />
                <img
                    alt="move-down"
                    src="../assets/down-arrow.png"
                    class="move-btn down-btn"
                    @click="MoveDown([note, order])"
                    @keydown="MoveDown([note, order])"
                />
                <div class="order-num">
                    {{ order + 1 }}
                </div>
            </div>
            <div class="title-field">
                <input
                    v-show="titleIsEditing"
                    type="text"
                    class="title-edit-input"
                    ref="inputTitle"
                    :placeholder="note.title"
                    v-model="titleValue"
                    @keydown.enter="$event.target.blur()"
                    @blur="ChangeTitleEditStatus()"
                />
                <div
                    v-show="!titleIsEditing"
                    class="title-text"
                    @click="ChangeTitleEditStatus()"
                    @keydown="ChangeTitleEditStatus()"
                >
                {{ note.title }}
                </div>
            </div>
        </div>

        <div class="content">
            <label for="content">
                <input
                    v-show="contentIsEditing"
                    type="text"
                    class="content-input"
                    ref="inputContent"
                    :placeholder="note.content"
                    v-model="contentValue"
                    @keydown.enter="$event.target.blur()"
                    @blur="ChangeContentEditStatus()"
                />
            </label>
            <div
                v-show="!contentIsEditing"
                class="content-text"
                @click="ChangeContentEditStatus()"
                @keydown="ChangeContentEditStatus()"
            >
            {{ note.content }}
            </div>
        </div>

        <div class="note-tag">
            <input
                v-show="tagIsEditing"
                class="tag-input"
                ref="inputTag"
                :placeholder="'#' + note.tag"
                v-model="tagValue"
                @keydown.enter="$event.target.blur()"
                @blur="ChangeTagEditStatus()"
            />
            <div
                v-show="!tagIsEditing"
                @click="ChangeTagEditStatus()"
                @keydown="ChangeTagEditStatus()"
            >
                {{ '#' + note.tag }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'noteItem',
  data() {
    return {
      titleIsEditing: false,
      contentIsEditing: false,
      tagIsEditing: false,
    };
  },
  props: [
    'note',
    'order',
  ],
  computed: {
    ...mapGetters([
      'getNotes',
      'getColors',
      'getTags',
    ]),
    titleValue: {
      get() {
        return this.note.title;
      },
      set(value) {
        this.ChangeTitle(value);
      },
    },
    contentValue: {
      get() {
        return this.note.content;
      },
      set(value) {
        this.ChangeContent(value);
      },
    },
    tagValue: {
      get() {
        return this.note.tag;
      },
      set(value) {
        this.ChangeTag(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'moveUp',
      'moveDown',
      'deleteNote',
      'changeColor',
      'changeTitle',
      'changeContent',
      'changeTag',
    ]),
    MoveUp([note, order]) {
      if (order !== 0) {
        this.moveUp([note, order]);
      }
    },
    MoveDown([note, order]) {
      if (order !== this.getNotes.length) {
        this.moveDown([note, order]);
      }
    },
    ChangeTitleEditStatus() {
      this.titleIsEditing = !this.titleIsEditing;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    ChangeTitle(newTitle) {
      this.changeTitle([newTitle, this.note.id]);
    },
    ChangeContentEditStatus() {
      this.contentIsEditing = !this.contentIsEditing;
      this.$nextTick(() => this.$refs.inputContent.focus());
    },
    ChangeContent(newContent) {
      this.changeContent([newContent, this.note.id]);
    },
    ChangeTagEditStatus() {
      this.tagIsEditing = !this.tagIsEditing;
      this.$nextTick(() => this.$refs.inputTag.focus());
    },
    ChangeTag(newTag) {
      this.changeTag([newTag, this.note.id]);
    },
  },
};
</script>

<style scoped lang="scss">

.note {
  float: left;
  margin: 0 2rem 2rem 0;
  width: 23rem;
  height: 23rem;
  border-radius: 1rem;
  color: #FFF;
  background-color: #CCC;

  &.skyBlue {
    background-color: #669BBC;
  }

  &.rose {
    background-color: #D1495B;
  }

  &.orange {
    background-color: #C57B5C;
  }
}

.top-area {
  position: relative;
  width: 100%;
  height: 3rem;
}

.select-label {
  position: absolute;
  top: -1.5rem;
  right: 0;
  height: 1.5rem;
  color: #666;
}

.color-btn {
  width: 1rem;
  height: 1rem;
  color: #666;
  background-color: #FFFFFF00;
  border: none;
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1rem;
  height: 1rem;
  font-size: 0.7rem;
  background-color: #FFFFFF00;
  border-color: #FFFFFF00;
  opacity: 0.5;
}

.delete-btn:hover {
  cursor: pointer;
}

.note-order {
  position: relative;
  float: left;
  margin: 1rem;
  width: 2rem;
}

.move-btn {
  position: absolute;
  width: 0.8rem;
  color: #FFF;
  font-size: 12px;
  background-color: #FFFFFF00;
  border: none;
}

.move-btn:hover {
  cursor: pointer;
}

.up-btn::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '⬆';
}

.down-btn {
  top: 1rem;
}

.down-btn::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '⬇';
}

.order-num {
  margin-left: 1.5rem;
  color: #FFF;
  font-size: 1.5rem;
  line-height: 2rem;
}

.title-field {
  float: left;
  margin: 1.1rem 0 1rem 0;

  > input::placeholder {
    color: #FFF;
    opacity: 0.5;
  }
}

.title-text {
  float: left;
  width: 15rem;
  height: 1.5rem;
  font-size: 1.5rem;
}

.title-edit-input {
  float: left;
  color: #FFF;
  font-size: 1.5rem;
  background-color: #FFFFFF00;
  outline: none;
  border: none;
}

.content {
  margin: 0.5rem auto;
  width: 20rem;
  height: 17rem;

  > label > input::placeholder {
    color: #FFF;
    opacity: 0.5;
  }
}

.content-text {
  float: left;
  width: 20rem;
  height: 16rem;
}

.content-input {
  width: 20rem;
  height: 15rem;
  margin-bottom: 0.5rem;
  color: #FFF;
  background-color: #FFFFFF00;
  outline: none;
  border: none;
}

.note-tag {
  float: right;
  margin-right: 1rem;
  color: #FFF;
  opacity: 0.6;

  > input::placeholder {
    color: #FFF;
    opacity: 0.5;
  }
}

.tag-input {
  width: 5rem;
  height: 1.2rem;
  color: #FFF;
  background-color: #FFFFFF00;
  outline: none;
  border: none;
}
</style>
