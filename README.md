# SCIENCE VARIABLE LAB 3D

เว็บแอป React + TypeScript + React Three Fiber สำหรับเคมี ม.6 บทเคมีกับการแก้ปัญหา มีฉาก 3D, แบบจำลองผลทั้ง 15 สถานการณ์, ตาราง, กราฟ, เปรียบเทียบตัวแปร A/B, ตรวจตัวแปร และส่งออก CSV เพื่อใช้คู่กับใบงานเดิม

## ใช้งาน

```bash
npm install
npm run dev
npm run test
npm run build
```

## ติดตั้ง GitHub Pages

1. สร้าง repository ชื่อ `SCIENCE_VARIABLE_LAB_3D` และ push ซอร์สขึ้น branch `main`
2. GitHub → Settings → Pages → Source: GitHub Actions
3. Workflow `.github/workflows/deploy.yml` จะติดตั้ง dependencies, ทดสอบ และ deploy
4. URL เป้าหมาย: `https://supaksiri.github.io/SCIENCE_VARIABLE_LAB_3D/`

## สิ่งที่ควรรู้

- ข้อมูลเป็นผลลัพธ์ **จำลองเพื่อการเรียนรู้** ไม่ใช่ผลวิจัยหรือการวัดจริง
- แต่ละแล็บมีฉาก 3D ตามหมวดการทดลอง แต่ยังไม่ใช่อุปกรณ์ระดับ photorealistic และไม่ได้จำลองการจับอุปกรณ์ด้วยมือ
- บันทึกใน LocalStorage ของอุปกรณ์นั้น ๆ ครูต้องรวบรวมไฟล์ CSV จากผู้เรียนเอง
- จำเป็นต้องติดตั้ง dependency ผ่าน npm; หากเครื่องไม่มีอินเทอร์เน็ตจะติดตั้งไม่ได้

อ่าน `docs/LIMITATIONS.md` ก่อนใช้เพื่อประเมินผลการสอน

## Version 0.2 update

See [docs/RELEASE_0_2.md](docs/RELEASE_0_2.md) for details. Three representative experiments (02, 03, 11) now have dedicated procedural 3D setups with readouts and animated progress. Other experiments currently use reusable generic 3D equipment. The graphics and models are for classroom conceptual investigation, not scientifically validated lab measurements.
