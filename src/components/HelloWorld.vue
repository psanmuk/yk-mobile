<template>
  <div v-if="!isLoggedIn" class="login-container">
    <h2>Login</h2>
    <input type="text" v-model="userid" placeholder="User ID" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>

  <div
    v-else
    class="dashboard-container"
    @mousemove="resetTimer"
    @keydown="resetTimer"
  >
    <h2>{{ username }}</h2>
    <p>Current Time: {{ currentTime }}</p>
    <button @click="logout">Logout</button>
    <button @click="showSalesForm">ข้อมูลขาย</button>
    <button @click="showSalesHistory">ประวัติขาย</button>

    <div v-if="salesFormVisible" class="sales-form">
      <h3>ป้อนข้อมูลยอดขาย</h3>
      <label>ยอดขายประเภท 1:</label>
      <input
        type="number"
        v-model="sales.type1"
        placeholder="0"
        class="number-input"
      />

      <label>ยอดขายประเภท 2:</label>
      <input
        type="number"
        v-model="sales.type2"
        placeholder="0"
        class="number-input"
      />

      <label>ยอดขายประเภท 3:</label>
      <input
        type="number"
        v-model="sales.type3"
        placeholder="0"
        class="number-input"
      />

      <button @click="submitSales">บันทึกข้อมูล</button>
    </div>

    <div v-if="salesHistoryVisible" class="sales-history">
      <h3>ประวัติการขาย</h3>
      <ul>
        <li v-for="(sale, index) in salesHistory" :key="index">
          วันที่ {{ sale.date }} - ประเภท 1: {{ sale.type1 }}, ประเภท 2:
          {{ sale.type2 }}, ประเภท 3: {{ sale.type3 }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userid: 0,
      password: "",
      username: "",
      isLoggedIn: false,
      error: "",
      currentTime: new Date().toLocaleString(),
      salesFormVisible: false,
      salesHistoryVisible: false,
      inactivityTimer: null,
      sales: {
        type1: 0,
        type2: 0,
        type3: 0,
      },
      salesHistory: [],
    };
  },
  methods: {
    async login() {
      try {
        console.log("id:", this.userid);
        console.log("password:", this.password);
        const response = await axios.post("http://localhost:3000/login", {
          id: this.userid,
          password: this.password,
        });

        console.log(`response= ${response}`);
        for (const key in response) {
          console.log(`${key}:`, response[key]);
        }
        //console.log(`Current Date: ${date}`);

        if (response.data) {
          this.username =
            response.data.firstName + " " + response.data.lastName;
          this.isLoggedIn = true;
          this.error = "";
          this.updateTime();
          this.startInactivityTimer();
          this.fetchSalesHistory();
        } else {
          this.error = "E01.Invalid UserID or Password.";
        }
      } catch (err) {
        console.error("Error:", err);
        console.log(err);
        this.error = "E02.Login failed. Please try again.";
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.userid = "";
      this.password = "";
      this.username = "";
      this.salesFormVisible = false;
      this.salesHistoryVisible = false;
      clearTimeout(this.inactivityTimer);
    },
    showSalesForm() {
      this.salesFormVisible = true;
      this.salesHistoryVisible = false;
    },
    showSalesHistory() {
      this.salesHistoryVisible = true;
      this.salesFormVisible = false;
    },
    async submitSales() {
      try {
        await axios.post("https://api.example.com/sales", this.sales);
        alert("ยอดขายบันทึกแล้ว!");
        this.fetchSalesHistory();
      } catch (err) {
        alert("บันทึกข้อมูลล้มเหลว");
      }
    },
    async fetchSalesHistory() {
      try {
        const response = await axios.get(
          "https://api.example.com/sales-history"
        );
        this.salesHistory = response.data;
      } catch (err) {
        alert("ไม่สามารถโหลดข้อมูลประวัติการขายได้");
      }
    },
    updateTime() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleString();
      }, 1000);
    },
    startInactivityTimer() {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        alert("คุณไม่ได้ใช้งานมานานเกิน 1 นาที ระบบจะทำการ Logout อัตโนมัติ");
        this.logout();
      }, 600000);
    },
    resetTimer() {
      this.startInactivityTimer();
    },
  },
};
</script>

<style>
.login-container,
.dashboard-container {
  text-align: center;
  max-width: 90%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

input {
  display: block;
  width: calc(100% - 20px);
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.number-input {
  text-align: right;
}

button {
  padding: 12px;
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}

.sales-form,
.sales-history {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

label {
  display: block;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #eef;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .login-container,
  .dashboard-container {
    padding: 15px;
  }
  input,
  button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
