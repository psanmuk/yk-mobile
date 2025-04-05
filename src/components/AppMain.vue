<template>
  <div>
    <input v-model="firstName" placeholder="First Name" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <div v-if="user">
      <p>{{ user.firstName }} {{ user.lastName }} - {{ user.dep_name }}</p>
      <img
        v-if="user.image"
        :src="'data:image/png;base64,' + user.image"
        alt="Profile"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: 0,
      firstName: "",
      password: "",
      user: null,
    };
  },
  methods: {
    async login() {
      const res = await axios.post("http://localhost:3000/login", {
        id: this.id,
        password: this.password,
      });
      this.user = res.data;
    },
  },
};
</script>
