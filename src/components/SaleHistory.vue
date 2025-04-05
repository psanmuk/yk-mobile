<script setup>
import { ref } from "vue";
import axios from "axios";

const saleDate = ref("");
const sales = ref([]);
const loading = ref(false);

const fetchHistory = async () => {
  if (!saleDate.value) return;
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:3000/sales/history?sale_date=${saleDate.value}`
    );
    sales.value = response.data;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h2>ประวัติการขาย</h2>
    <label>เลือกวันที่ขาย: <input type="date" v-model="saleDate" /></label>
    <button @click="fetchHistory">ค้นหา</button>

    <div v-if="loading">กำลังโหลดข้อมูล...</div>

    <div class="table-container">
      <table border="1" v-if="sales.length">
        <tr>
          <th>วันที่ขาย</th>
          <th>พนักงานขาย</th>
          <th>รายละเอียด</th>
        </tr>
        <tr v-for="sale in sales" :key="sale.id">
          <td>{{ sale.sale_date }}</td>
          <td>
            <img
              :src="'http://localhost:3000' + sale.salesperson.profile_image"
              width="50"
            />
            {{ sale.salesperson.first_name }} {{ sale.salesperson.last_name }}
          </td>
          <td>
            <ul>
              <li v-for="detail in sale.details" :key="detail.id">
                {{ detail.product_name }} - ขายส่ง: {{ detail.wholesale_qty }} |
                ขายปลีก: {{ detail.retail_qty }} | ขายเครดิต:
                {{ detail.credit_qty }} | **ยอดขายรวม: {{ detail.total_qty }}**
                | ราคา: ฿{{ detail.price }}
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>

    <!-- <p v-else>ไม่มีข้อมูลการขายสำหรับวันที่เลือก</p> -->
  </div>
</template>

<style>
.table-container {
  overflow-x: auto; /* ให้ตารางเลื่อนได้บนมือถือ */
}

button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
}
</style>
