# Lớp Học Thực Lực — Bàn giao dự án

25/11/2026 · Nguyễn Đình Dương
Bản trực tuyến (luôn mới nhất): https://claude.ai/artifact/XmJe5yH7JfVK6WFof6esFp

## Tóm tắt

Dự án đang ở **Giai đoạn 0 (kiểm chứng). Chưa viết code website và chưa mở dịch vụ trả phí nào.** Phần thiết kế sản phẩm (PRD, sitemap, database, kế hoạch) đã xong. Cách soạn và hiển thị công thức Toán cũng đã được thử nghiệm. Việc tiếp theo là chốt các quyết định đang chờ, rồi dựng trang Playground.

**Lớp Học Thực Lực** là nền tảng học Toán trực tuyến cho học sinh lớp 9–12, gồm hai phần:
- bán khóa học video có kèm bài tập;
- hệ thống luyện đề chấm tự động: vào 10, chuyên Toán, tốt nghiệp THPT, HSA / TSA / SPT / V-ACT / BCA.

Triết lý: *Học thật — Hiểu sâu — Làm được*. Màu thương hiệu: #48A9E8 / #FFFFFF / #111827.

**Công nghệ đề xuất (chờ duyệt):**
- Next.js + TypeScript, chạy trên Vercel.
- Supabase (PostgreSQL + đăng nhập).
- Bunny Stream cho video, Cloudflare R2 cho file.
- Thanh toán: SePay (VietQR) trước, VNPay sau.
- KaTeX cho công thức, TikZ → SVG cho hình vẽ.

| Đã xong | Kết quả |
|---|---|
| Phân tích website tham khảo QANDA Study | Mở trực tiếp bằng trình duyệt; ghi rõ phần chưa kiểm tra được |
| Hồ sơ bản 1.0 + prototype trang chủ | Sitemap, chức năng, kiến trúc, chi phí, lộ trình |
| Phản biện CTO → bản 2.0 | 4 file PRD.md, SITEMAP.md, DATABASE.md, IMPLEMENTATION_PLAN.md |
| G0.1 — thử công thức Toán | Chạy thật 52 ca KaTeX; tìm và sửa 2 lỗi hiển thị (tiếng Việt, số thập phân); mẫu Overleaf; định dạng JSON; thiết kế Playground |
| Chạy thử với đề thật | 5 câu từ Đề HSA số 01 → trang luyện đề bấm thử được; đáp án do Claude giải, chờ giáo viên duyệt |

## Tài liệu và bản nào là bản đúng

**Bản đúng của thiết kế là 4 file .md bản 2.0** trong gói `lhtl-ban-giao.zip`. Hồ sơ bản 1.0 và prototype trang chủ chỉ giữ để tham khảo. Chỗ nào khác bản 2.0 thì làm theo bản 2.0.

| # | Tài liệu | Loại | Nội dung | Trạng thái |
|---|---|---|---|---|
| 1 | `PRD.md`, `SITEMAP.md`, `DATABASE.md`, `IMPLEMENTATION_PLAN.md` | File (trong gói zip) | Yêu cầu sản phẩm, sơ đồ website, thiết kế database, kế hoạch theo giai đoạn | **Bản 2.0 — bản đúng**, chờ duyệt |
| 2 | [G0.1 — Kiểm thử biên soạn và hiển thị công thức Toán](https://claude.ai/artifact/72cr51YkEVr2262QeXdUNd) | Tài liệu | Quy trình Word / Overleaf → website, 52 ca KaTeX, tiêu chí, rủi ro, 4 đề xuất bổ sung database | Xong; còn 3 câu hỏi chờ trả lời |
| 3 | [Playground công thức Toán](https://claude.ai/artifact/BH3WttKiTVs7gauv3m4gVR) | Thiết kế (canvas) | 2 màn hình: Soạn thử một câu; Bộ 52 ca kiểm thử | Thiết kế, chưa lập trình |
| 4 | [Luyện đề HSA — 5 câu Toán (bản thử)](https://claude.ai/artifact/TWDcZCGobvZddgaGDRz35h) | Trang chạy thử | 5 câu từ Đề HSA số 01, có đồng hồ, chấm điểm, lời giải | Đáp án chờ giáo viên duyệt; chỉ dùng nội bộ |
| 5 | [Hồ sơ phân tích & kiến trúc (Giai đoạn 1)](https://claude.ai/artifact/ATBKwen3Y6ZXgruzyW6LAo) | Tài liệu | Phân tích QANDA Study, sitemap, chức năng, kiến trúc, chi phí bản 1.0 | Bản 1.0 — tham khảo |
| 6 | [Prototype trang chủ](https://claude.ai/artifact/1KhhaTizSf3CqdeZrzYnrA) | Thiết kế (canvas) | Trang chủ cho máy tính và điện thoại | Bản 1.0; còn chờ chốt màu nút |

### Trong gói `lhtl-ban-giao.zip`

| Thư mục | Nội dung |
|---|---|
| `00-yeu-cau-goc/` | File yêu cầu ban đầu (Word) |
| `01-thiet-ke-v2/` | 4 file .md bản 2.0 |
| `02-g01-cong-thuc-toan/` | Bộ 52 ca kiểm thử và kết quả, mẫu Overleaf `lhtl-cauhoi.sty`, 4 JSON mẫu, SVG mẫu, bộ chuẩn hóa tham khảo, bản Word của tài liệu G0.1 |
| `03-hsa-de01-5-cau/` | *Không có trong repo công khai* (đề HSA có bản quyền); xem trong gói `lhtl-ban-giao.zip` |
| `04-tham-khao-v1/` | Bản Word của hồ sơ phân tích bản 1.0 |
| `BAN-GIAO.md` | Bản Markdown của tài liệu này, để đọc khi không có mạng |

## Cách chia sẻ cho người cùng làm

Claude không tự cấp quyền được. Chủ dự án tự làm 3 việc sau, mất khoảng 5 phút.

- [ ] **Gửi gói file** `lhtl-ban-giao.zip` qua Zalo, email hoặc Google Drive. Gói này đủ để đọc và làm tiếp, kể cả khi chưa mở được các link.
- [ ] **Chia sẻ từng link** ở bảng trên, bắt đầu từ tài liệu này:
  1. Mở link.
  2. Bấm **Share** ở trên cùng.
  3. Thêm người cùng làm, chọn quyền xem, bình luận hoặc sửa.

  Mỗi trang phải chia sẻ riêng: chia sẻ trang này không tự mở quyền cho các trang khác.
- [ ] **Nếu hai người không cùng tổ chức Claude** và mục Share không cho thêm người ngoài:
  - Với tài liệu: bấm vào tên tài liệu → **Export** → chọn Word / PDF / Markdown / Google Docs, rồi gửi file.
  - Với canvas thiết kế và trang luyện đề: chụp màn hình, hoặc ngồi xem cùng nhau.

**Không chia sẻ:**
- mật khẩu tài khoản Claude;
- sau này: mật khẩu và khóa API của Vercel, Supabase, Bunny, SePay.

Khi mở các dịch vụ đó, hãy mời người cùng làm vào bằng tài khoản riêng của họ (theo IMPLEMENTATION_PLAN mục 8, quyết định 11).

## Quyết định đã chốt và đang chờ

Chủ dự án chưa duyệt chính thức quyết định kỹ thuật nào. Ba dòng đầu đang chặn việc lập trình.

| # | Quyết định | Đề xuất hiện tại | Trạng thái | Ghi ở đâu |
|---|---|---|---|---|
| 1 | Kiến trúc công nghệ | Next.js + Supabase + Bunny + R2 + SePay / VNPay | Chờ duyệt | PRD mục 12, IMPLEMENTATION_PLAN mục 8 |
| 2 | Phạm vi bản đầu (MVP) | Các mục P1 trong PRD; bỏ giỏ hàng, dùng "Mua ngay" | Chờ duyệt | PRD mục 2, 6 |
| 3 | Ra mắt sớm phần bán khóa học (tuần 7–8) hay chờ đủ luyện đề | Ra mắt sớm | Chờ | IMPLEMENTATION_PLAN mục 8 |
| 4 | Pháp nhân bán hàng | Hộ kinh doanh hoặc công ty | Chờ | Ảnh hưởng tới VNPay, hóa đơn, footer |
| 5 | Giáo viên đang soạn đề bằng gì | Overleaf + Word/MathType (đã biết); cần biết có dùng mẫu `ex_test` không | Một phần | G0.1, bình luận trong tài liệu |
| 6 | Về lâu dài, sửa câu hỏi ở đâu (file gốc hay trên web) | — | Chờ | G0.1, rủi ro #9 |
| 7 | Khi nhập từ Word, có tự đổi ≥ sang ⩾ và C/A sang chữ đứng không | Đổi theo quy ước Việt Nam | Chờ | G0.1 bước 2 |
| 8 | 4 bổ sung database / sitemap từ G0.1 | `question_assets`, cột nguồn + bộ hiển thị, `import_batches`, trang Playground | Chờ duyệt | G0.1 mục cuối |
| 9 | Màu nút chính | Nền xanh #48A9E8 + chữ đen (chữ trắng không đạt độ tương phản) | Chờ | Hồ sơ 1.0 mục 6 |
| 10 | Giá, thời hạn truy cập, điều kiện hoàn tiền | — | Chờ chủ dự án cung cấp | PRD mục 12 |
| 11 | Ngưỡng tuổi cần phụ huynh đồng ý | — | Chờ luật sư | PRD ACC-05 |
| 12 | Ai lập trình, ai bảo trì | — | Chờ | IMPLEMENTATION_PLAN mục 8 |

Những điều đã thống nhất ở các bước trước (không cần bàn lại, trừ khi có lý do mới):
- LaTeX là định dạng chuẩn cho công thức.
- KaTeX là bộ hiển thị chính, có bộ chuẩn hóa chạy trước.
- Hình vẽ và bảng biến thiên làm bằng TikZ → SVG.
- Mọi câu hỏi phải qua Playground trước khi vào ngân hàng câu hỏi.

## Việc tiếp theo

Xếp theo thứ tự ưu tiên. Cột "Phụ trách" chỉ là gợi ý; hai người sửa lại theo cách chia việc thực tế.

| # | Việc | Phụ trách | Đầu ra | Cần xong trước |
|---|---|---|---|---|
| 1 | Đọc bản 2.0 + G0.1, trả lời 12 quyết định ở mục trên | Chủ dự án + người cùng làm | Bảng quyết định điền đủ | — |
| 2 | Duyệt đáp án và lời giải 5 câu HSA | Giáo viên | Xác nhận hoặc sửa | — |
| 3 | Gửi 1 file Word có công thức MathType thật, thử Convert Equations | Chủ dự án (có MathType) | File .docx đã chuyển sang LaTeX | — |
| 4 | Gom 100–200 câu hỏi thật, đủ 4 dạng (có hình, có bảng biến thiên) | Giáo viên | File Overleaf / Word | Việc 1 (chốt mẫu soạn) |
| 5 | Dựng Playground chạy trên máy (bước 1–3 phần vibe coding trong G0.1) | Người lập trình | Trang `/playground` + bộ 52 ca chạy được | Việc 1 |
| 6 | Bộ nhập Overleaf + TikZ → SVG (bước 4–5) | Người lập trình | JSON + SVG từ file thật | Việc 4, 5 |
| 7 | Bộ nhập Word (bước 6) | Người lập trình | JSON từ file Word | Việc 3, 5 |
| 8 | Chạy 100–200 câu thật, ghi tỷ lệ đạt (bước 7) | Cả hai | Quyết định có cần MathJax không; kết thúc Giai đoạn 0 | Việc 6, 7 |
| 9 | Sang Giai đoạn 1 (nền móng) theo IMPLEMENTATION_PLAN | Người lập trình | Repo, đăng nhập, phân quyền, trang công khai | Việc 1, 8 |

## Quy ước làm việc chung

- **Mỗi thứ chỉ để một nơi:**
  - Thiết kế: 4 file .md bản 2.0, đưa vào repo GitHub khi tạo repo.
  - Câu hỏi: file gốc Overleaf / Word, cho đến khi chốt quyết định 6.
  - Việc cần làm: bảng "Việc tiếp theo" trong tài liệu này.
- **Sửa thiết kế:**
  - Tăng số phiên bản ở đầu file (2.0 → 2.1) và ghi một dòng "thay đổi gì".
  - Thay đổi kiến trúc phải nêu lý do và được chủ dự án duyệt trước.
- **Trao đổi bằng bình luận ngay trên tài liệu**, để câu hỏi nằm cạnh đoạn liên quan.
- **Code:**
  - Một repo GitHub do chủ dự án sở hữu; người cùng làm được mời vào.
  - Mỗi việc làm trên một nhánh riêng, xem thử rồi mới gộp.
- **Tài khoản dịch vụ** (Vercel, Supabase, Bunny, Cloudflare, SePay, tên miền):
  - Đứng tên chủ dự án; người cùng làm được mời bằng tài khoản riêng.
  - Không gửi mật khẩu hay khóa bí mật qua tin nhắn.
- **Dữ liệu học sinh thật:** không dán vào Claude, không để trong repo.
- **Bản quyền đề:**
  - Đề lấy từ nguồn khác (ví dụ Đề HSA số 01 của HSA Education) chỉ dùng để thử nghiệm nội bộ.
  - Không đưa lên website bán khi chưa có quyền.

## Bắt đầu làm tiếp với Claude

Claude không nhớ các cuộc trò chuyện của người khác. Mỗi lần người cùng làm mở cuộc trò chuyện mới:
1. Đính kèm `BAN-GIAO.md` và các file liên quan trong gói zip.
2. Dán câu lệnh mở đầu dưới đây.

Nếu dùng Projects của Claude, có thể tải các file này vào kiến thức dự án một lần, khỏi phải đính kèm lại.

```text
Bạn là CTO của dự án Lớp Học Thực Lực (nền tảng học Toán lớp 9–12).
Đọc các file đính kèm: BAN-GIAO.md, PRD.md, SITEMAP.md, DATABASE.md,
IMPLEMENTATION_PLAN.md (bản 2.0 là bản đúng) và tài liệu G0.1.

Quy tắc:
- Không tự thay đổi kiến trúc trong PRD / DATABASE / SITEMAP;
  cần đổi thì nêu lý do và đề xuất trước.
- Chưa mở dịch vụ trả phí nào.
- Giải thích từng bước cho người mới học lập trình.

Việc hôm nay: [ghi số việc trong bảng "Việc tiếp theo", ví dụ Việc 5 — dựng Playground].
Trước khi làm, tóm tắt lại trong 5 dòng bạn hiểu dự án đang ở đâu.
```

Bắt Claude tóm tắt trước khi làm sẽ giúp phát hiện sớm nếu nó đọc thiếu file.
