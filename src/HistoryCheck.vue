<template>
  <div class="app">
    <header class="header">
      <button class="back" @click="$router.back()">←</button>
      <h1>ตรวจสอบย้อนหลัง</h1>
    </header>

    <section class="section">
      <h2>เลือกช่วงวันที่</h2>
      <div class="row">
        <select v-model="preset" class="input">
          <option value="1d">1 วัน</option>
          <option value="1w">1 สัปดาห์</option>
          <option value="1m">1 เดือน</option>
          <option value="custom">กำหนดเอง</option>
        </select>
      </div>
      <div class="chips">
        <button
          class="chip"
          :class="{ active: preset === '1d' }"
          @click="setPreset('1d')"
        >
          1 วัน
        </button>
        <button
          class="chip"
          :class="{ active: preset === '1w' }"
          @click="setPreset('1w')"
        >
          1 สัปดาห์
        </button>
        <button
          class="chip"
          :class="{ active: preset === '1m' }"
          @click="setPreset('1m')"
        >
          1 เดือน
        </button>
        <button
          class="chip"
          :class="{ active: preset === 'custom' }"
          @click="setPreset('custom')"
        >
          กำหนดเอง
        </button>
      </div>
      <div v-if="preset === 'custom'" class="row g2">
        <input type="date" v-model="from" class="input" />
        <input type="date" v-model="to" class="input" />
      </div>
    </section>

    <section class="section">
      <h2>รายละเอียดการตรวจสอบ</h2>
      <div class="row">
        <select v-model="category" class="input">
          <option disabled value="">ประเภทการตรวจสอบ</option>
          <option value="electric">ประเภทของไฟฟ้า</option>
          <option value="machine">ประเภทของเครื่องจักร</option>
        </select>
      </div>

      <ul class="list" v-if="filteredResults.length">
        <li class="item" v-for="r in filteredResults" :key="r.id">
          <div class="left">
            <div class="avatar"></div>
            <div class="meta">
              <div class="name">{{ r.inspector }}</div>
              <div class="type">{{ r.typeLabel }}</div>
              <div class="time">{{ prettyTime(r.ts) }}</div>
            </div>
          </div>
          <button class="detail" @click="viewDetail(r)">ดูรายละเอียด</button>
        </li>
      </ul>
      <div v-else class="empty">ไม่พบข้อมูลในช่วงที่เลือก</div>
    </section>

    <nav class="tabbar">
      <router-link to="/" class="tab">หน้าหลัก</router-link>
      <router-link to="/device-check" class="tab">ตั้งค่า</router-link>
    </nav>
  </div>
</template>
  
  <script>
export default {
  name: "HistoryCheck",
  data() {
    return {
      preset: "1d",
      from: "",
      to: "",
      category: "electric",
      // ตัวอย่างข้อมูลจำลอง
      logs: [
        // วันนี้
        {
          id: 1,
          category: "electric",
          inspector: "สุรศักดิ์ สุริยะวงศ์",
          typeLabel: "ประเภทไฟฟ้า",
          ts: nowWithTime("09:30"),
        },
        {
          id: 2,
          category: "electric",
          inspector: "สุรศักดิ์ สุริยะวงศ์",
          typeLabel: "ประเภทไฟฟ้า",
          ts: nowWithTime("12:30"),
        },
        {
          id: 3,
          category: "electric",
          inspector: "สุรศักดิ์ สุริยะวงศ์",
          typeLabel: "ประเภทไฟฟ้า",
          ts: nowWithTime("18:30"),
        },
        {
          id: 4,
          category: "electric",
          inspector: "สุรศักดิ์ สุริยะวงศ์",
          typeLabel: "ประเภทไฟฟ้า",
          ts: nowWithTime("21:30"),
        },
        {
          id: 5,
          category: "electric",
          inspector: "สุรศักดิ์ สุริยะวงศ์",
          typeLabel: "ประเภทไฟฟ้า",
          ts: nowWithTime("23:30"),
        },
        // เมื่อวาน
        {
          id: 6,
          category: "machine",
          inspector: "วิทยา พัฒนศิลป์",
          typeLabel: "ประเภทเครื่องจักร",
          ts: daysAgo(1, "10:15"),
        },
        {
          id: 7,
          category: "machine",
          inspector: "วิทยา พัฒนศิลป์",
          typeLabel: "ประเภทเครื่องจักร",
          ts: daysAgo(1, "15:00"),
        },
        // อาทิตย์ก่อน
        {
          id: 8,
          category: "electric",
          inspector: "อารีย์ แสงทอง",
          typeLabel: "ประเภทไฟฟ้า",
          ts: daysAgo(6, "14:10"),
        },
        // เดือนก่อน
        {
          id: 9,
          category: "machine",
          inspector: "พงษ์สันต์ จิตสกุล",
          typeLabel: "ประเภทเครื่องจักร",
          ts: daysAgo(27, "09:00"),
        },
      ],
    };
  },
  computed: {
    filteredResults() {
      const [start, end] = this.range();
      return this.logs
        .filter((r) => !this.category || r.category === this.category)
        .filter((r) => r.ts >= start && r.ts <= end)
        .sort((a, b) => a.ts - b.ts);
    },
  },
  methods: {
    setPreset(p) {
      this.preset = p;
      if (p !== "custom") {
        this.from = "";
        this.to = "";
      }
    },
    range() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let start = new Date(today);
      let end = new Date();
      if (this.preset === "1d") {
        start = new Date(today);
        end = new Date(); // ถึงตอนนี้
      } else if (this.preset === "1w") {
        start = new Date(today);
        start.setDate(start.getDate() - 6);
      } else if (this.preset === "1m") {
        start = new Date(today);
        start.setMonth(start.getMonth() - 1);
      } else if (this.preset === "custom") {
        if (this.from) start = new Date(this.from + "T00:00:00");
        if (this.to) end = new Date(this.to + "T23:59:59");
      }
      return [start, end];
    },
    prettyTime(d) {
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    },
    viewDetail(row) {
      // ตรงนี้จะพาไปหน้า detail หรือ modal ก็ได้
      alert(
        `ผู้ตรวจสอบ: ${row.inspector}\nประเภท: ${
          row.typeLabel
        }\nเวลา: ${this.prettyTime(row.ts)}`
      );
    },
  },
};

// ===== helpers =====
function nowWithTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}
function daysAgo(n, hhmm = "09:00") {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
  return d;
}
</script>
  
  <style scoped>
.app {
  max-width: 560px;
  margin: 0 auto;
  padding: 16px;
  min-height: 100vh;
  background: #f6f7f8;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.header {
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
}
.header h1 {
  margin: 0;
  text-align: center;
  font-size: 18px;
}
.back {
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  height: 36px;
  cursor: pointer;
}
.section {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  display: grid;
  gap: 12px;
}
.section h2 {
  margin: 0 0 4px 0;
  font-size: 14px;
}
.row {
  display: grid;
}
.g2 {
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.input {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
}
.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chip {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  cursor: pointer;
}
.chip.active {
  background: #111827;
  color: #fff;
  border-color: #111827;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid #eef2f7;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px solid #f1f5f9;
}
.left {
  display: flex;
  gap: 12px;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(180deg, #e5e7eb, #cbd5e1);
}
.meta {
  display: grid;
  gap: 2px;
}
.name {
  font-weight: 600;
}
.type {
  font-size: 12px;
  color: #6b7280;
}
.time {
  font-size: 12px;
  color: #6b7280;
}
.detail {
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
}
.empty {
  padding: 12px;
  color: #6b7280;
}
.tabbar {
  margin-top: auto;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  border-radius: 14px 14px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.tab {
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #111827;
}
</style>  