<template>
  <div class="profile-container">
    <h2>เข้าสู่ระบบ</h2>
    <input type="text" v-model="SPID" placeholder="เลขประจำตัว(SPID)" />
    <input type="password" v-model="SPPassword" placeholder="รหัสผ่าน" />
    <button @click="handleLogin">เข้าสู่ระบบ</button>
    <p v-if="error" style="color: red">{{ error }}</p>

    <div v-if="user">
      <h3>ยินดีต้อนรับ, {{ user.FirstName }} {{ user.LastName }}</h3>
      <img
        :src="'http://localhost:3000' + user.SPPhoto"
        alt="Profile"
        width="200"
      />
      <button @click="logout">ออกจากระบบ</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
//import { login } from "../auth";

export default {
  name: "AppLogin",
  setup() {
    const SPID = ref("");
    const SPPassword = ref("");
    //const error = ref("");
    const user = ref(null);
    const token = ref("");
    const previewImage = ref(null);
    //const selectedFile = ref(null);
    //const id = ref(null);

    const handleLogin = async () => {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          SPID: SPID.value,
          SPPassword: SPPassword.value,
        });
        token.value = res.data.token;
        localStorage.setItem("token", token.value);
        getUserInfo();
      } catch (error) {
        alert("Login failed");
      }
    };
    const getUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tbsp", {
          headers: { Authorization: `Bearer ${token.value}` },
        });
        user.value = res.data;
        if (user.value.image) {
          previewImage.value = "http://localhost:3000" + user.value.image;
        }

        //previewImage.value = res.data.image);
        console.log("res.user=", res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      user.value = null;
    };
    return {
      SPID,
      SPPassword,
      user,
      previewImage,
      handleLogin,
      logout,
    };
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

/* สำหรับมือถือ: ปรับตารางให้เลื่อนได้ */
@media (max-width: 600px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}

/* ปรับขนาดปุ่มสำหรับมือถือ */
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

/* ปรับขนาดอินพุต */
input,
select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}
</style>
