<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const previewImage = ref(
  user.value.SPPhoto ? "http://localhost:3000" + user.value.SPPhoto : ""
);
const selectedFile = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file); // แสดงรูปตัวอย่างก่อนอัปโหลด
  }
};

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert("กรุณาเลือกไฟล์ก่อนอัปโหลด");
    return;
  }

  const formData = new FormData();
  formData.append("SPPhoto", selectedFile.value);
  formData.append("SPID", user.value.SPID);

  try {
    const response = await axios.post(
      "http://localhost:3000/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    previewImage.value = "http://localhost:3000" + response.data.imageUrl; // อัปเดตรูปใหม่
    user.value.SPPhoto = response.data.imageUrl;
    localStorage.setItem("user", JSON.stringify(user.value)); // บันทึกลง LocalStorage
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการอัปโหลด");
  }
};

onMounted(() => {
  if (user.value.SPPhoto) {
    previewImage.value = "http://localhost:3000" + user.value.SPPhoto;
  }
});
</script>

<template>
  <div class="profile-container">
    <h2>โปรไฟล์ (SP)</h2>
    <div v-if="user">
      <img :src="previewImage" class="profile-img" alt="Profile Image" />
      <p>{{ user.SPID }}:{{ user.FirstName }} {{ user.LastName }}</p>
    </div>

    <input type="file" @change="onFileChange" />
    <button @click="uploadImage">อัปโหลดรูป</button>
  </div>
</template>

<style scoped>
.profile-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
}

input[type="file"] {
  display: block;
  margin: 10px auto;
}
</style>
