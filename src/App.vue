<template>
  <nav>
    <router-link to="/">เข้าสู่ระบบ</router-link> |
    <router-link to="/sales" v-if="user">บันทึกการขาย</router-link> |
    <router-link to="/history" v-if="user">ประวัติการขาย</router-link> |
    <router-link to="/upload" v-if="user">อัพโหลด</router-link> |
    <!-- <router-link to="/logout" v-if="user">ออกจากระบบ</router-link> -->
    <!--     <router-link to="/logout" @click="logout" v-if="user"
      >ออกจากระบบ</router-link
    >
 -->
    <button v-if="user" @click="logout">| ออกจากระบบ</button>
  </nav>

  <router-view />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(
  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
);

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null;
  router.push("/");
};
</script>
