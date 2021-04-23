<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Список дел</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="Что нужно сделать?"
          v-model="description"
          @keyup.enter="addTodo($event)"
        />
        <small class="form-text text-muted" v-show="typing">Нажмите Ввод для сохранения задачи</small>
      </div>
    </form>
  </div>
</template>
<script>

import bus from "./../bus.js";

export default {
  data() {
    return {
      description: "",
      typing: false
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      let todo = {
        description: this.description,
        done: false //false by default
      };
      console.log(todo);
      this.$http
        .post("/item", todo)
        .then(() => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    clearTodo() {
      this.description = "";
    },

    refreshTodo() {
      bus.$emit("refreshTodo");
    }
  }
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>
