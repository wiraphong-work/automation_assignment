# 🚀 Automation Assignment: Complete Test Suite

โปรเจกต์นี้เป็นการรวบรวมชุดทดสอบ Automation ครบวงจร ตั้งแต่ระดับ Logic, Web UI, API ไปจนถึง Mobile และระบบ CI/CD Pipeline

---

## 📂 1. Folder Structure (โครงสร้างโปรเจกต์)

โปรเจกต์ถูกจัดกลุ่มตามประเภทของการทดสอบเพื่อความระเบียบและง่ายต่อการบำรุงรักษา:

- **`tests/`**: โฟลเดอร์หลักที่เก็บสคริปต์ทดสอบ
    - `01-logic-list/`: สคริปต์ JavaScript (`duplicate_check.js`) สำหรับทดสอบอัลกอริทึมจัดการข้อมูล
    - `02-web-login/`: สคริปต์ Playwright (`login.spec.js`) สำหรับทดสอบหน้า Web UI Login
    - `03-api-testing/`: ชุดทดสอบ API (`api.spec.js`) พร้อมข้อมูลทดสอบภายนอก (`test-data.csv`)
    - `04-mobile-automation/`: ชุดทดสอบ Android (`mobile_tests.robot`) พร้อมไฟล์แอปตัวอย่าง (`app-release.apk`) และ Video
    - `05-jenkins-pipeline/`: ไฟล์ `Jenkinsfile` สำหรับกำหนดขั้นตอนการรัน CI/CD
    - `06-logic-cipher/`: สคริปต์ Python (`simple_cipher.py`) ทดสอบ Logic การเข้ารหัสข้อมูล
- **Root Directory**: ไฟล์ตั้งค่าหลัก (`package.json`, `playwright.config.ts`, `.gitignore`) และไฟล์รายงานผลการทดสอบ (`report.html`, `log.html`)

---

## 🛠 2. Installation & Setup (การติดตั้งเพื่อใช้งาน)

เพื่อให้สามารถรันการทดสอบได้ครบทุกส่วน กรุณาติดตั้งเครื่องมือตามหมวดหมู่ดังนี้:

### **A. สำหรับ Web, API และ Logic (JavaScript/TypeScript)**
1. ติดตั้ง [Node.js](https://nodejs.org/)
2. ติดตั้ง Dependencies และ Browser:
   ```bash
   npm install
   npx playwright install

🚀 How to Run
   ข้อ 1
   ```bash
   node tests/01-logic-list/duplicate_check.js

   ```bash
   ข้อ 2 
   ```bash
   playwright test tests/02-web-login/login.spec.js

   ข้อ 3
   ```bash
   playwright test tests/03-api-testing/api.spec.js

   ข้อ 6
   ```bash
   python tests/06-logic-cipher/simple_cipher.py

### **สำหรับ Mobile Automation (Robot Framework & Appium)
1. ติดตั้ง Python และลง Library ที่จำเป็น: pip install robotframework-appiumlibrary
2. ติดตั้ง Appium Server ผ่าน Node.js และติดตั้ง Driver:
   ```bash
   npm install -g appium
   appium driver install uiautomator2
3. Android Setup: ติดตั้ง Android Studio และตั้งค่า Environment Variables:
   ANDROID_HOME: ตำแหน่งที่ติดตั้ง SDK (เช่น C:\Users\...\AppData\Local\Android\Sdk)
   JAVA_HOME: ตำแหน่งที่ติดตั้ง JDK

🚀 How to Run
1. เปิด Appium Server ใน Terminal:
    ```bash
    appium
2. เปิด Terminal ใหม่ แล้วสั่งรัน Robot:
    ```bash
    robot tests/04-mobile-automation/mobile_tests.robot


*Project นี้ตั้งใจเอาไฟล์ .env ขึ้น Git นะครับ*

---