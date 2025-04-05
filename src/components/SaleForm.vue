<template>
  <div>
    <h2>เพิ่มรายการขาย</h2>
    <p v-if="user">
      พนักงานขาย: {{ user.FirstName }} {{ user.LastName }}
      <img :src="'http://localhost:3000' + user.SPPhoto" width="50" />
    </p>

    <label>วันที่ขาย: <input type="date" v-model="saleDate" /></label>

    <h3>รายการขาย</h3>

    <div class="table-container">
      <table border="1">
        <tr>
          <th>สินค้า</th>
          <th>ขายส่ง</th>
          <th>ขายปลีก</th>
          <th>ขายเครดิต</th>
          <th>ยอดขายรวม</th>
          <th>ราคา</th>
        </tr>
        <tr v-for="(detail, index) in details" :key="index">
          <td>
            <select v-model="detail.product_id">
              <option
                v-for="product in products"
                :value="product.id"
                :key="product.id"
              >
                {{ product.product_code }} - {{ product.product_name }}
              </option>
            </select>
          </td>
          <td>
            <input
              type="number"
              v-model="detail.wholesale_qty"
              min="0"
              @input="calculateTotal(detail)"
            />
          </td>
          <td>
            <input
              type="number"
              v-model="detail.retail_qty"
              min="0"
              @input="calculateTotal(detail)"
            />
          </td>
          <td>
            <input
              type="number"
              v-model="detail.credit_qty"
              min="0"
              @input="calculateTotal(detail)"
            />
          </td>
          <td>{{ detail.total_qty }}</td>
          <td>
            <input type="number" v-model="detail.price" step="0.01" min="0" />
          </td>
        </tr>
      </table>
    </div>

    <button @click="addDetail">+ เพิ่มสินค้า</button>
    <button @click="saveSale">บันทึก</button>
  </div>
</template>

<style>
.table-container {
  overflow-x: auto; /* ทำให้ตารางเลื่อนซ้ายขวาได้ */
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  margin-top: 10px;
}
</style>
