<template>
  <div v-bind:show="todos.length>0" class="col align-self-center">
    <div class="form-row align-items-center" v-bind:key="todo" v-for="todo in todos">
      <div class="col-auto my-1">
        <div class="input-group mb-3 todo__row">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <input
                type="checkbox"
                v-model="todo.done"
                :checked="todo.done"
                :value="todo.done"
                v-on:change="updateTodo(todo)"
                title="Задача выполнена?"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            :class="todo.done?'todo__done':''"
            v-model="todo.description"

            @keyup.enter="updateTodo(todo)"
            title="После редактирования нажмите Ввод для обновления"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Удалить задачу?"
                v-on:click="deleteTodo(todo.id)"
              >
                <font-awesome-icon icon="trash" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="alert alert-primary todo__row"
      v-show="todos.length==0 && doneLoading"
    >Задач больше нет</div>
  </div>
</template>

<script>

import bus from "./../bus.js";

export default {
  data() {
    return {
      todos: [],
      doneLoading: true
    };
  },
  created: function() {
    this.fetchTodo();
    this.listenToEvents();
  },
  watch: {
    $route: function() {
      let self = this;
      self.doneLoading = false;
      self.fetchData().then(function() {
        self.doneLoading = true;
      });
    }
  },
  methods: {
    fetchTodo() {
      this.$http.get("/items").then(response => {
        this.todos = response.data;
      });
    },

    updateTodo(todo) {
      let id = todo.id;
      this.$http
        .put(`/item/${id}`, todo)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteTodo(id) {
      this.$http.delete(`/item/${id}`).then(() => {
        this.fetchTodo();
      });
    },

    listenToEvents() {
      bus.$on("refreshTodo", () => {
        this.fetchTodo(); //update todo
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo__done {
  text-decoration: line-through !important;
}

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
</style>
