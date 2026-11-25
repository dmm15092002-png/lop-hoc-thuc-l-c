# Bộ file G0.1 — Kiểm thử công thức Toán (Lớp Học Thực Lực)

Tạo ngày 25/11/2026. Dùng kèm tài liệu "G0.1 — Kiểm thử biên soạn và hiển thị công thức Toán".

| Thư mục / file | Nội dung |
|---|---|
| `tests/cases.json` | 52 ca kiểm thử công thức (đầu vào cho Playground) |
| `tests/results.json` | Kết quả chạy KaTeX 0.16.47 (PASS / WARN / FAIL, thời gian, HTML) |
| `tests/word-roundtrip.json` | 25 công thức đi qua Word (Equation/OMML) rồi Pandoc về LaTeX |
| `report/*.html` | Trang báo cáo xem trực tiếp trong trình duyệt (mở `index.html`) |
| `screenshots/` | Ảnh chụp kết quả: toàn bộ 52 ca, lỗi chữ tiếng Việt và cách sửa, so sánh Word, 4 hình SVG, file mẫu Overleaf |
| `overleaf/lhtl-cauhoi.sty`, `mau-cau-hoi.tex`, `.pdf` | Mẫu soạn câu hỏi cho Overleaf (chọn XeLaTeX) |
| `json/*.json` | 4 câu hỏi mẫu định dạng `lhtl.question/1` |
| `svg-samples/` | Mã TikZ và SVG đã biên dịch: bảng biến thiên, hình học, đồ thị, hình có chữ Việt |
| `macros-vn-1.json` | Bộ macro chung cho KaTeX |
| `normalize.test.js` | Bộ chuẩn hóa tham khảo + 4 test (chạy: `node normalize.test.js`, cần cài `katex`) |

Lưu ý: `normalize.test.js` đang trỏ tới KaTeX trong môi trường thử; khi dùng trong dự án hãy đổi thành `require('katex')`.
