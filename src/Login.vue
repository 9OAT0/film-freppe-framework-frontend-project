<template>
    <div class="app">
      <header class="header">
        <h1>ตรวจสอบอุปกรณ์อาคาร</h1>
      </header>
  
      <main class="card">
        <form @submit.prevent="onSubmit" class="form">
          <input
            v-model.trim="form.username"
            class="input"
            placeholder="ชื่อผู้ใช้"
            autocomplete="username"
          />
  
          <select v-model="form.role" class="input select">
            <option disabled value="">ประเภทผู้ใช้งาน</option>
            <option value="inspector">เจ้าหน้าที่ตรวจสอบ</option>
            <option value="admin">แอดมิน</option>
          </select>
  
          <input
            v-model.trim="form.password"
            :type="showPw ? 'text' : 'password'"
            class="input"
            placeholder="รหัสผ่าน"
            autocomplete="current-password"
          />
  
          <label class="row">
            <input type="checkbox" v-model="showPw" /> แสดงรหัสผ่าน
          </label>
  
          <button type="submit" class="btn" :disabled="loading">
            {{ loading ? 'กำลังเข้าสู่ระบบ…' : 'ล็อกอิน' }}
          </button>
  
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        error: '',
        showPw: false,
        form: { username: '', role: '', password: '' },
      }
    },
    created() {
      // ถ้ามี session แล้วให้เด้งเข้าหน้าหลัก
      const session = localStorage.getItem('session')
      if (session) this.$router.replace({ name: 'home' })
    },
    methods: {
      async onSubmit() {
        this.error = ''
        if (!this.form.username || !this.form.role || !this.form.password) {
          this.error = 'กรุณากรอกข้อมูลให้ครบถ้วน'
          return
        }
        this.loading = true
        try {
          // ตัวอย่าง mock ตรวจสอบ (ในงานจริงเรียก API ที่นี่)
          await new Promise(r => setTimeout(r, 600))
          // เก็บ session อย่างง่าย
          localStorage.setItem('session', JSON.stringify({
            user: this.form.username,
            role: this.form.role,
            time: Date.now()
          }))
          this.$router.replace({ name: 'home' })
        } catch (e) {
          this.error = 'เข้าสู่ระบบไม่สำเร็จ ลองอีกครั้ง'
        } finally {
          this.loading = false
        }
      },
    }
  }
  </script>
  
  <style scoped>
  .app{min-height:100vh;display:grid;grid-template-rows:auto 1fr;place-items:start center;background:#f6f7f8;padding:24px}
  .header h1{margin:0 0 8px 0;text-align:center}
  .card{width:100%;max-width:520px;background:#fff;border-radius:16px;box-shadow:0 1px 2px rgba(0,0,0,.04);padding:24px;margin-top:8px}
  .form{display:grid;gap:12px}
  .input{padding:12px 14px;border:1px solid #e5e7eb;background:#f9fafb;border-radius:12px;outline:none}
  .input:focus{border-color:#93c5fd;background:#fff}
  .select{appearance:auto}
  .row{display:flex;align-items:center;gap:8px;font-size:13px;color:#374151}
  .btn{margin-top:8px;background:#129af3;border:none;color:#fff;padding:12px 16px;border-radius:999px;cursor:pointer}
  .btn[disabled]{opacity:.6;cursor:not-allowed}
  .error{color:#ef4444;font-size:13px;margin:4px 0 0}
  </style>
  