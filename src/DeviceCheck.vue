<template>
  <div class="app">
    <header class="page-header">
      <button class="back-btn" @click="$emit('back')">←</button>
      <h1>กรอกแบบฟอร์มการตรวจสอบ</h1>
    </header>

    <table class="inspection-table">
      <thead>
        <tr>
          <th>ลำดับ</th>
          <th>ประเภท</th>
          <th>อุปกรณ์ที่ต้องตรวจสอบ</th>
          <th>เวลา</th>
          <th>ผลลัพธ์</th>
          <th>ผู้ตรวจสอบ</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in rows" :key="row.no || row.header">
          <tr v-if="row.header" class="section-header">
            <td colspan="6">{{ row.header }}</td>
          </tr>
          <tr v-else>
            <td>{{ row.no }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.device }}</td>
            <td>
                <input type="time" v-model="row.time" @focus="setNow(row)" />
            </td>
            <td>
              <input type="number" v-model.number="row.result" />
            </td>
            <td>{{ row.inspector }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <button class="submit-btn" @click="submitForm">บันทึกการตรวจสอบ</button>

    <nav class="tabbar">
      <button
        class="tab"
        :class="{ active: activeTab === 'home' }"
        @click="activeTab = 'home'"
      >
        <span class="tab-icon">🏠</span>
        <span class="tab-text">หน้าหลัก</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        <span class="tab-icon">⚙️</span>
        <span class="tab-text">ตั้งค่า</span>
      </button>
    </nav>
  </div>
</template>
  
  <script>
export default {
  name: "InspectionForm",
  data() {
    return {
      activeTab: "home",
      rows: [
        { header: "หมวด: ไฟฟ้า" },
        {
          no: 1,
          type: "ระบบไฟฟ้าหลัก",
          device: "MDB",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 2,
          type: "ระบบไฟฟ้าหลัก",
          device: "DB",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 3,
          type: "ระบบสายดิน",
          device: "สายทองแดง, เครื่องทดสอบ",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 4,
          type: "ระบบแสงสว่าง",
          device: "โคมไฟ, สวิตช์, เบรกเกอร์",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 5,
          type: "ระบบพลังงานแสงอาทิตย์",
          device: "แผงโซลาร์เซลล์, Inverter",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 6,
          type: "อุปกรณ์ป้องกันไฟฟ้า",
          device: "เบรกเกอร์ ELCB, RCCB",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 7,
          type: "เครื่องวัดไฟฟ้า",
          device: "มิเตอร์ kWh, เครื่องวัดแรงดัน",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 8,
          type: "ระบบสายไฟฟ้า",
          device: "สายเคเบิล, กล่องพักสาย",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        { header: "หมวด: เครื่องจักร" },
        {
          no: 9,
          type: "เครื่องจักรหลัก",
          device: "มอเตอร์, ปั๊ม",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 10,
          type: "เครื่องจักรรอง",
          device: "เครื่องมือวัด, เครื่องตัด",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 11,
          type: "ระบบทำความเย็น",
          device: "ปั๊มน้ำเย็น, ชิลเลอร์",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 12,
          type: "ระบบควบคุมความร้อน",
          device: "ฮีตเตอร์, พัดลม, เซ็นเซอร์",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 13,
          type: "ระบบควบคุม",
          device: "PLC, ระบบสั่งงานอัตโนมัติ",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 14,
          type: "เครื่องมือวัด",
          device: "เครื่องวัดอุณหภูมิ, เครื่องวัดความดัน",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 15,
          type: "ระบบไฟฟ้า",
          device: "หม้อแปลง, ระบบจ่ายไฟ",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 16,
          type: "ระบบท่อ",
          device: "ระบบส่งน้ำ, ระบบส่งลม",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 17,
          type: "ระบบลม",
          device: "ปั๊มลม, ระบบควบคุมความดัน",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
        {
          no: 18,
          type: "ระบบส่งพลังงาน",
          device: "สายพาน, ลูกปืน",
          time: "",
          result: "",
          inspector: "สุรศักดิ์ สุขสวัสดิ์",
        },
      ],
    };
  },
  created() {
    // ใส่ค่าเวลาเริ่มต้นเป็นเวลาปัจจุบัน (HH:MM) ให้ทุกแถวที่ไม่ใช่ header
    const now = this.nowHHMM();
    this.rows = this.rows.map(r => r.header ? r : { ...r, time: r.time || now });

    // ถ้าส่งเวลามาจากหน้าแรกทาง query ?time=HH:MM ก็ใช้ค่านั้นแทน
    const qTime = this.$route?.query?.time;
    if (qTime) {
      this.rows = this.rows.map(r => r.header ? r : { ...r, time: qTime });
    }
  },

  methods: {
    // เวลาปัจจุบันรูปแบบ HH:MM
    nowHHMM() {
      const d = new Date();
      const pad = n => String(n).padStart(2, "0");
      return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    },
    // เรียกเมื่อโฟกัสช่องเวลา เพื่ออัปเดตเป็นเวลาตอนนี้
    setNow(row) {
      row.time = this.nowHHMM();
    },

    submitForm() {
      console.log("Form submitted", this.rows);
      alert("บันทึกสำเร็จ");
    },
  },
};
</script>
  
  <style scoped>
.app {
  padding: 16px;
  max-width: 560px;
  margin: auto;
  background: #f9fafb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.page-header h1 {
  flex: 1;
  text-align: center;
  font-size: 18px;
  margin: 0;
}
.back-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.inspection-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
.inspection-table th,
.inspection-table td {
  padding: 6px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.section-header td {
  background: #dbeafe;
  font-weight: bold;
}
input[type="time"],
input[type="number"] {
  width: 100%;
  padding: 4px;
  font-size: 12px;
}
.submit-btn {
  background: #10b981;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.tabbar {
  margin-top: auto;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.tab {
  padding: 8px;
  text-align: center;
  border: none;
  background: transparent;
}
.tab.active {
  background: #f3f4f6;
}
</style>
  