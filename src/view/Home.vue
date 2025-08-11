<template>
  <div class="app">
    <header class="page-header">
      <h1>ตรวจสอบอุปกรณ์อาคาร</h1>
    </header>

    <section class="card">
      <h2 class="card-title">แนวโน้ม</h2>
      <div class="chart-wrapper">
        <svg
          :viewBox="`0 0 ${width} ${height}`"
          preserveAspectRatio="none"
          class="chart"
        >
          <rect
            x="0"
            y="0"
            :width="width"
            :height="height"
            rx="14"
            ry="14"
            class="chart-bg"
          />
          <path :d="linePath" class="line" fill="none" />
          <g class="x-labels">
            <template v-for="(label, i) in xLabels" :key="label">
              <text :x="scaleX(i)" :y="height - 10" text-anchor="middle">
                {{ label }}
              </text>
            </template>
          </g>
        </svg>
      </div>
    </section>

    <section class="stack">
      <router-link :to="{ name: 'device-check' }" class="list-item">
        <span class="icon">＋</span>
        <span class="text">ตรวจอุปกรณ์</span>
      </router-link>

      <button class="list-item" @click="onAlert">
        <span class="icon">🔔</span>
        <span class="text">แจ้งเตือน</span>
      </button>

      <router-link :to="{ name: 'history' }" class="list-item">
        <span class="icon">🗂️</span>
        <span class="text">ตรวจสอบย้อนหลัง</span>
      </router-link>
    </section>

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
  name: "BuildingInspectionDashboard",
  data() {
    return {
      width: 980,
      height: 280,
      activeTab: "home",
      // ตัวอย่างข้อมูลรายเดือน (0-100)
      series: [
        60, 52, 30, 70, 35, 20, 85, 40, 25, 15, 75, 28, 45, 58, 90, 22, 12, 65,
        18, 40, 55,
      ],
      months: [
        "month 1",
        "month 2",
        "month 3",
        "month 4",
        "month 5",
        "month 6",
        "month 7",
      ],
    };
  },
  computed: {
    xLabels() {
      return this.months;
    },
    linePath() {
      const pts = this.sampleForLabels(this.series, this.months.length);
      const path = this.smoothPath(pts);
      return path;
    },
  },
  methods: {
    // สุ่ม/เลือกจุดให้มีจำนวนเท่ากับ label
    sampleForLabels(arr, n) {
      if (arr.length === n) return arr;
      const idxs = Array.from({ length: n }, (_, i) =>
        Math.round((i * (arr.length - 1)) / (n - 1))
      );
      return idxs.map((i) => arr[i]);
    },
    scaleX(i) {
      const pad = 24;
      const innerW = this.width - pad * 2;
      if (this.months.length === 1) return pad;
      return pad + (innerW * i) / (this.months.length - 1);
    },
    scaleY(v) {
      const pad = 24;
      const innerH = this.height - pad * 2;
      const min = 0,
        max = 100;
      const t = (v - min) / (max - min);
      return pad + (1 - t) * innerH;
    },
    smoothPath(values) {
      const points = values.map((v, i) => ({
        x: this.scaleX(i),
        y: this.scaleY(v),
      }));
      if (points.length < 2) return "";
      // สร้าง path แบบสปไลน์ Cubic Bezier
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }
      return d;
    },
    onAlert() {
      alert("ศูนย์การแจ้งเตือน");
    },
    onHistory() {
      alert("ดูประวัติย้อนหลัง");
    },
  },
};
</script>
  
  <style scoped>
:root {
  color-scheme: light;
}
* {
  box-sizing: border-box;
}
body,
.app {
  background: #f6f7f8;
}
.app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 16px;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px;
}
.page-header {
  text-align: center;
  padding-top: 8px;
}
.page-header h1 {
  font-size: 20px;
  margin: 0;
  font-weight: 700;
  color: #1f2937;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.card-title {
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #111827;
}

.chart-wrapper {
  width: 100%;
  overflow: hidden;
}
.chart {
  width: 100%;
  height: auto;
  display: block;
}
.chart-bg {
  fill: #e9eaec;
}
.line {
  stroke: #3b5b4f;
  stroke-width: 3;
}
.x-labels text {
  font-size: 10px;
  fill: #6b7280;
}

.stack {
  display: grid;
  gap: 12px;
}
.list-item {
  background: white;
  border: none;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.list-item .icon {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  font-size: 18px;
  background: #f3f4f6;
  border-radius: 8px;
}
.list-item .text {
  font-size: 14px;
  color: #111827;
}
.list-item:active {
  transform: translateY(1px);
}

.tabbar {
  position: sticky;
  bottom: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  border-radius: 14px 14px 0 0;
  padding: 8px 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.tab {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
}
.tab.active {
  background: #f3f4f6;
}
.tab-icon {
  font-size: 18px;
}
.tab-text {
  font-size: 12px;
  color: #374151;
}

@media (min-width: 600px) {
  .app {
    max-width: 640px;
  }
}
</style>
  