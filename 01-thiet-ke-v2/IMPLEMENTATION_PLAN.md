# IMPLEMENTATION PLAN — Lớp Học Thực Lực

> Phiên bản 2.0 · 25/11/2026 · Đi kèm PRD.md, SITEMAP.md, DATABASE.md
> Chưa viết code, chưa mở dịch vụ trả phí. Bắt đầu Giai đoạn 0 khi chủ sản phẩm xác nhận các quyết định ở mục 8.

## 1. Nguyên tắc triển khai

1. **Kiểm chứng trước, xây sau.** Giai đoạn 0 gần như không tốn tiền nhưng loại bỏ rủi ro lớn nhất: định dạng nội dung Toán.
2. **Lát dọc thay vì lớp ngang.** Mỗi giai đoạn hoàn thành một luồng chạy thật từ giao diện đến database, thay vì làm hết giao diện bằng dữ liệu giả rồi nối sau.
3. **Đường doanh thu trước.** Luồng "xem khóa → mua → học" có thể bán được trước khi hệ thống luyện đề xong.
4. **Miễn phí đến khi có người trả tiền.** Phát triển trên gói miễn phí; chỉ nâng gói trả phí ở tuần ra mắt.
5. **Mỗi giai đoạn có tiêu chí kết thúc** mà chủ sản phẩm tự bấm thử được trên link xem trước.

## 2. Tổng quan giai đoạn

Ước lượng công cho **1 lập trình viên full-stack có kinh nghiệm** + thiết kế bán thời gian. Đây là ước lượng của chúng tôi, chưa tính thời gian chờ nội dung và hợp đồng thanh toán.

| GĐ | Tên | Công (tuần) | Kết quả | Dịch vụ trả phí |
|---|---|---|---|---|
| 0 | Kiểm chứng nội dung và quyết định | 1–2 | Bộ 100 câu hỏi thật hiển thị đúng; định dạng soạn thảo chốt; pháp nhân, giá, chính sách | Không |
| 1 | Nền móng | 2 | Design system, trang công khai tĩnh, đăng nhập, phân quyền, schema lõi + RLS + test | Không |
| 2 | Bán và học (MVP-1) | 3 | Mua ngay → VietQR → tự mở khóa → học video + PDF + lý thuyết; admin khóa học, đơn, đối soát | Không (SePay gói miễn phí, Bunny trả theo dùng) |
| 3 | Luyện đề tự động | 3 | Ngân hàng câu hỏi có phiên bản, đề theo phần, phòng làm bài, chấm tự động, lời giải, lịch sử | Không |
| 4 | Tự luận, giáo viên, báo cáo | 2 | Nộp ảnh, chấm theo thang, điểm mạnh / yếu, dashboard admin | Không |
| 5 | Kiểm thử, cứng hóa, ra mắt | 1–2 | Kiểm thử tải 1.000 người, rà soát bảo mật, sao lưu + thử khôi phục, production | **Có**: Vercel Pro, Supabase Pro |
| | **Tổng đến ra mắt đầy đủ** | **12–14** | | |
| 6+ | Sau ra mắt (P2) | theo đợt | VNPay, chú thích trên ảnh, phụ huynh, ĐGNL, sinh đề ma trận, mã kích hoạt | |

Tùy chọn: **ra mắt sớm MVP-1 sau Giai đoạn 2** (khoảng tuần 7–8) để bán khóa học trước, luyện đề ra sau. Cần chủ sản phẩm quyết định (mục 8).

## 3. Chi tiết từng giai đoạn

### Giai đoạn 0 — Kiểm chứng (tuần 1–2)

**Việc cần làm**
- Chủ sản phẩm gửi: 100–200 câu hỏi thật đủ 4 dạng (gồm câu có hình học, đồ thị, bảng biến thiên), 1 đề cương khóa học, 2 video bài giảng mẫu, danh sách khóa + giá ra mắt.
- Thử hiển thị toàn bộ câu hỏi bằng KaTeX; lập danh sách lệnh LaTeX không hỗ trợ.
- Chốt cách nhập liệu theo cách giáo viên đang soạn:

| Giáo viên đang soạn bằng | Phương án nhập |
|---|---|
| LaTeX | Bộ chuyển LaTeX → câu hỏi (khả thi cao, ưu tiên) |
| Word + Equation (OMML) | Chuyển qua Pandoc → LaTeX, kiểm tra tay |
| Word + MathType | Khó chuyển tự động; cần xuất MathType sang LaTeX trước hoặc gõ lại |
| Viết tay / ảnh | Gõ lại; ước lượng công nhập liệu riêng |

- Chốt cách làm hình: ảnh SVG từ GeoGebra / TikZ ở MVP; trình dựng bảng biến thiên ở P2 nếu số lượng lớn.
- Thử 2 video trên Bunny Stream (gói trả theo dùng): chất lượng 720p trên 4G, link ký số, watermark.
- Tạo tài khoản SePay gói miễn phí, thử webhook với giao dịch giả lập.
- Chủ sản phẩm chốt pháp nhân, chính sách hoàn tiền; luật sư rà soát chính sách bảo mật và đồng ý phụ huynh.
- Cho 5 học sinh / phụ huynh bấm thử prototype, ghi lại chỗ vướng.

**Tiêu chí kết thúc:** 100% câu hỏi mẫu hiển thị đúng (bằng KaTeX hoặc phương án dự phòng đã chọn); định dạng nhập liệu chốt; webhook thử thành công; các quyết định ở mục 8 có câu trả lời.

### Giai đoạn 1 — Nền móng (2 tuần)

- Repo GitHub, Next.js + TypeScript, Tailwind, shadcn/ui, ESLint, kiểm tra kiểu, CI chạy test mỗi pull request.
- Supabase project **dev** (gói miễn phí); migration trong git; seed dữ liệu DEMO có nhãn.
- Design system trong code theo prototype: màu, chữ, nút, thẻ, form, bảng, trạng thái rỗng / lỗi / đang tải.
- Trang công khai tĩnh: trang chủ, giới thiệu, FAQ, chính sách, liên hệ (form thật + Turnstile).
- Xác thực: đăng ký, xác thực email, đăng nhập, Google, quên / đổi mật khẩu, đồng ý xử lý dữ liệu, email đồng ý phụ huynh.
- `user_roles` + hook đưa vai trò vào JWT; middleware chặn `/hoc`, `/giang-day`, `/quan-tri`; 2FA cho admin.
- Schema nhóm người dùng + nội dung học + bán hàng; RLS + test pgTAP.
- SMTP riêng cho email xác thực (email mặc định của Supabase chỉ dùng thử).

**Tiêu chí kết thúc:** tài khoản học sinh không vào được trang / API quản trị (test tự động); Lighthouse trang chủ trên điện thoại ≥ 90 về hiệu năng và truy cập.

### Giai đoạn 2 — Bán và học, MVP-1 (3 tuần)

- Admin: sản phẩm, khóa học, chương, bài; tải video lên Bunny (upload trực tiếp từ trình duyệt bằng link ký số, không qua máy chủ); PDF lên R2.
- Danh mục + chi tiết khóa học đọc từ database, ISR, structured data.
- Mua ngay: tạo đơn chốt giá, mã giảm giá, VietQR, trang trạng thái đơn, hết hạn 24 giờ.
- Webhook SePay → xác minh → `payments` → `entitlements` trong một transaction; `payment_events` + màn hình đối soát.
- Email xác nhận đơn.
- Khu học sinh: dashboard, mục lục khóa, trang bài học (video ký số + watermark động, PDF ký số, lý thuyết KaTeX), tiến độ, tiếp tục xem, thời gian học, thông báo.
- Hết hạn truy cập; thu hồi khi hoàn tiền thủ công.

**Tiêu chí kết thúc:** chủ sản phẩm chuyển khoản thật số tiền nhỏ, khóa học mở trong dưới 1 phút; chuyển sai nội dung → giao dịch xuất hiện ở đối soát; link video copy sang trình duyệt khác không phát được.

### Giai đoạn 3 — Luyện đề tự động (3 tuần)

- Chương / chuyên đề; trình soạn câu hỏi Markdown + LaTeX có xem trước, chèn ảnh; phiên bản bất biến.
- Bộ nhập hàng loạt theo định dạng chốt ở Giai đoạn 0.
- Soạn đề theo phần, mẫu chấm tốt nghiệp THPT, đảo câu / phương án, số lượt làm.
- Đề đã xuất bản được dựng sẵn thành JSON **không kèm đáp án**, cache tại CDN theo phiên bản.
- Phòng làm bài: `deadline_at` máy chủ, tự lưu vào `draft_answers` (15–30 s và khi đổi câu, lưu tạm trên máy khi mất mạng), đánh dấu câu, nhật ký rời tab, nộp, cron tự nộp.
- Chấm trong database; kết quả, lời giải, thống kê theo phần / chuyên đề; lịch sử.
- Bài tập sau mỗi bài học dùng chung bộ máy này.
- Trung tâm luyện đề công khai, gói luyện đề bán qua `products`.

**Tiêu chí kết thúc:** 3 đề có đáp án biết trước, mỗi đề làm 10 kiểu (đúng hết, sai hết, đúng 1–3 ý Đúng/Sai, trả lời ngắn có dấu phẩy / chấm) → điểm khớp 100% với bảng tính tay; mất mạng 2 phút không mất câu trả lời.

### Giai đoạn 4 — Tự luận, giáo viên, báo cáo (2 tuần)

- Nộp tự luận bằng ảnh nhiều trang / PDF; nén trên máy; xử lý ảnh HEIC.
- Hàng chờ chấm; chấm theo thang từng ý, nhận xét; thông báo khi có điểm.
- Điểm mạnh / yếu theo chuyên đề (ngưỡng tối thiểu 5 câu).
- Dashboard admin: doanh thu theo ngày / sản phẩm, học sinh mới / hoạt động, điểm trung bình theo đề, đối soát chờ xử lý.
- Nhật ký quản trị bằng trigger; màn hình xem nhật ký.
- Tải về / yêu cầu xóa dữ liệu.

**Tiêu chí kết thúc:** giáo viên chấm 1 bài tự luận 4 trang trên máy tính bảng trong dưới 3 phút; mọi thao tác admin xuất hiện trong nhật ký.

### Giai đoạn 5 — Kiểm thử, cứng hóa, ra mắt (1–2 tuần)

**Kiểm thử**
- Playwright cho 6 luồng chính: đăng ký → mua → học; làm bài → kết quả; chấm tự luận; đối soát; quên mật khẩu; phân quyền.
- k6 trên môi trường **staging** cấu hình giống production:
  - 1.000 người bấm "Bắt đầu" trong 60 s.
  - 1.000 người tự lưu mỗi 15 s trong 30 phút.
  - 1.000 bài nộp trong 30 s.
  - Mục tiêu: p95 < 500 ms cho tự lưu, 0 lỗi 5xx, không mất câu trả lời.
- Rà soát bảo mật theo OWASP ASVS mức 1: thử IDOR trên mọi API có `id`, XSS qua LaTeX / Markdown / tên hiển thị, CSRF, giả webhook, replay webhook, upload SVG có script, rò khóa dịch vụ trong bundle.
- Core Web Vitals trên điện thoại tầm trung.

**Ra mắt**

| Hạng mục | Việc |
|---|---|
| Tên miền | Mua / chuyển, trỏ DNS về Vercel; email gửi đi có SPF, DKIM, DMARC |
| Hosting | Nâng Vercel lên Pro (gói Hobby chỉ dành cho dùng phi thương mại); biến môi trường production tách riêng |
| SSL | Vercel tự cấp và gia hạn |
| Database | Supabase project **production** riêng gói Pro; bật chặn mật khẩu lộ, một phiên / người, MFA admin; chạy migration; không có dữ liệu DEMO |
| Storage | R2 bucket riêng production, private; tên miền phục vụ ảnh tách khỏi tên miền chính |
| Video | Bunny thư viện production, bật token + giới hạn tên miền, chọn mạng Volume |
| Sao lưu | Kích hoạt dump hằng đêm; thử khôi phục 1 lần trước ra mắt |
| Thanh toán | SePay gói miễn phí lúc đầu, nâng gói khi vượt 50 giao dịch / tháng; webhook production + khóa bí mật mới |
| Analytics | GA4 / Meta Pixel sau banner đồng ý cookie |
| Giám sát | Cảnh báo lỗi 5xx, webhook lỗi, đối soát tồn đọng, dung lượng database |
| Vận hành | Tài liệu cho admin: đối soát, hoàn tiền, thêm khóa, xử lý quên mật khẩu |

Ra mắt mềm cho 20–50 học sinh 1 tuần trước khi mở rộng.

### Giai đoạn 6+ — Sau ra mắt (P2, theo đợt 2 tuần)

1. VNPay (khi có hợp đồng).
2. Chú thích trên ảnh bài tự luận.
3. Tài khoản / báo cáo phụ huynh qua email.
4. Đề HSA / TSA / SPT / V-ACT / BCA (xác minh cấu trúc từng kỳ thi trước), sinh đề theo ma trận.
5. Mã kích hoạt, hoàn tiền trong hệ thống, combo trên giao diện.
6. Trình dựng bảng biến thiên / biên dịch TikZ → SVG.
7. CMS nội dung trang chủ.

## 4. Chi phí

### 4.1 Hạ tầng theo giai đoạn

| Thời điểm | Dịch vụ | Chi phí |
|---|---|---|
| GĐ 0–4 (phát triển) | Vercel Hobby, Supabase Free (dev), Cloudflare R2 (10 GB miễn phí), SePay FREE (50 giao dịch), Bunny trả theo dùng | Gần 0đ; Bunny tối thiểu 1 USD/tháng |
| Từ ra mắt | Vercel Pro 20 USD + Supabase Pro 25 USD | ≈ 1,2 triệu đồng/tháng cố định |
| Từ ra mắt | Bunny (lưu trữ + phát video), R2, SePay, email | Theo dùng: ≈ 1,2–5,7 triệu đồng/tháng ở 5.000 học sinh |

Đơn giá đã tra trong hồ sơ Giai đoạn 1 (25/11/2026). Chi phí phát video là khoản biến động lớn nhất; dùng mạng Volume của Bunny và giới hạn 720p cho bài giảng viết bảng để giữ ở mức thấp.

### 4.2 Các phương án tiết kiệm đã cân nhắc

| Phương án | Tiết kiệm | Đánh đổi | Kết luận |
|---|---|---|---|
| Bỏ giỏ hàng, chỉ Mua ngay | ~1 tuần công | Không mua nhiều món một đơn | **Áp dụng** |
| Nội dung trang trong mã nguồn thay CMS | ~1 tuần công | Sửa nội dung cần lập trình viên | **Áp dụng** cho MVP |
| Gộp khu giáo viên vào admin | ~0,5–1 tuần công | Giao diện ít chuyên biệt | **Áp dụng** nếu ≤ 3 giáo viên |
| Chỉ VietQR lúc đầu | Không phí % thẻ, không chờ hợp đồng | Không nhận thẻ quốc tế / ví | **Áp dụng**, VNPay ở P2 |
| Phát triển trên gói miễn phí | ~3–4 tháng phí Vercel + Supabase | Không dùng cho người dùng thật | **Áp dụng** |
| Video trên YouTube không công khai | Miễn phí | Link chia sẻ được ngay, không watermark | **Không** cho khóa trả phí; chỉ dùng cho video giới thiệu |
| Tự chạy VPS (Next.js + Postgres) | Rẻ hơn tiền mặt | Tự lo sao lưu, bảo mật, cập nhật; rủi ro mất dữ liệu | **Không** ở giai đoạn này |
| DRM của Bunny | — | Tính phí theo license | Chưa bật; watermark động + link ký số đủ ở MVP |

### 4.3 Chi phí xây dựng

Chi phí lớn nhất là **công lập trình** (12–14 tuần công ước lượng ở mục 2), không phải hạ tầng. Chưa đưa ra số tiền vì phụ thuộc ai làm (nhân viên, freelancer, đối tác). Các khoản một lần khác: tên miền, logo / nhận diện, luật sư rà soát chính sách, đăng ký kinh doanh nếu chưa có.

## 5. Rủi ro và cách giảm

| Rủi ro | Khả năng | Ảnh hưởng | Giảm thiểu |
|---|---|---|---|
| Nội dung Toán không hiển thị được bằng KaTeX / nhập liệu quá chậm | Cao | Cao | Giai đoạn 0 thử bằng câu hỏi thật trước khi viết trình soạn |
| Chậm nội dung thật (khóa, câu hỏi, video) | Cao | Cao | Lịch nộp nội dung gắn với từng giai đoạn; GĐ 2 cần ≥ 1 khóa thật |
| Học sinh chuyển khoản sai nội dung | Cao | Trung bình | Mã đơn ngắn, QR điền sẵn, đối soát thủ công có quy trình |
| Chia sẻ tài khoản / video | Cao | Trung bình | Một phiên / tài khoản, watermark động, link hết hạn |
| Quá tải khi thi thử đồng loạt | Trung bình | Cao | Đề cache tại CDN, tự lưu một dòng, kiểm thử tải, nâng compute Supabase tạm thời theo giờ |
| Chấm sai điểm | Thấp | Rất cao | Mẫu chấm cấu hình + bộ test đề có đáp án biết trước |
| Sai quy định dữ liệu trẻ vị thành niên | Trung bình | Cao | Luật sư rà soát ở GĐ 0; bản ghi đồng ý |
| Hợp đồng VNPay kéo dài | Cao | Thấp | Ra mắt với VietQR |
| Chỉ 1 lập trình viên (bus factor) | Trung bình | Cao | Tài liệu, migration và hạ tầng trong git; tài khoản dịch vụ đứng tên chủ sản phẩm |

## 6. Kiến trúc chịu tải — kết luận kiểm tra

| Tình huống | Tải ước tính | Cách xử lý | Đạt? |
|---|---|---|---|
| 5.000 tài khoản | Database vài GB | Supabase Pro 8 GB disk | Đạt |
| 1.000 người xem trang công khai | Chủ yếu đọc | ISR + CDN Vercel, gần như không chạm database | Đạt |
| 1.000 người xem video | ~1,5 Gbps | Bunny CDN, không qua máy chủ ứng dụng | Đạt |
| 1.000 người bấm "Bắt đầu" trong 1 phút | ~17 lượt tạo attempt/s | Đề JSON cache CDN; tạo attempt là 1 dòng | Đạt |
| 1.000 người tự lưu mỗi 15 s | ~67 ghi/s | 1 dòng `attempts` / lần; pooler kiểu transaction | Đạt, cần kiểm thử tải |
| 1.000 bài nộp trong 30 s | ~33 bài/s × 22 câu | Chấm trong 1 hàm database; cron dọn bài sót | Đạt, cần kiểm thử tải |
| Cả lớp chung 1 IP ở trường | — | Giới hạn tần suất theo tài khoản, không theo IP | Đạt sau chỉnh sửa |
| Xác thực mỗi request | 1.000 người | Xác minh JWT tại máy chủ ứng dụng, không gọi máy chủ Auth mỗi request | Đạt |

Máy Micro của Supabase đủ cho vận hành thường ngày. Trước các đợt thi thử lớn, nâng cỡ máy tạm thời (tính theo giờ) và hạ lại sau.

## 7. Định nghĩa hoàn thành (áp dụng mọi hạng mục)

- Chạy trên link xem trước; chủ sản phẩm bấm thử được.
- Có kiểm tra quyền ở máy chủ + RLS; có test cho phân quyền.
- Form có kiểm tra dữ liệu cả trình duyệt lẫn máy chủ; thông báo lỗi tiếng Việt rõ ràng.
- Hiển thị đúng ở 360px, 768px, 1280px.
- Không có dữ liệu DEMO trên production.
- Dịch vụ ngoài chưa cấu hình hiện "chưa kết nối".

## 8. Quyết định cần xác nhận trước khi bắt đầu

| # | Quyết định | Phương án đề xuất | Ảnh hưởng nếu chậm |
|---|---|---|---|
| 1 | Pháp nhân bán hàng | Hộ kinh doanh hoặc công ty để ký VNPay, xuất hóa đơn | Chặn VNPay, footer, chính sách |
| 2 | Giáo viên đang soạn đề bằng gì | Gửi 100 câu thật để thử | Chặn Giai đoạn 3 |
| 3 | Ra mắt sớm MVP-1 (bán + học) ở tuần 7–8 hay chờ đủ luyện đề | Ra mắt sớm | Doanh thu và phản hồi sớm hơn 5–6 tuần |
| 4 | Danh sách khóa, giá, thời hạn truy cập, chính sách hoàn tiền | Chủ sản phẩm cung cấp | Chặn Giai đoạn 2 |
| 5 | Số giáo viên; có chia doanh thu không | ≤ 3, chưa chia doanh thu trong hệ thống | Quyết định có cần khu giảng dạy riêng và bảng đối soát giáo viên |
| 6 | Một phiên đăng nhập / tài khoản | Áp dụng | — |
| 7 | Nút CTA xanh + chữ đen | Áp dụng | — |
| 8 | Ngưỡng tuổi cần phụ huynh đồng ý | Luật sư xác định | Chặn ra mắt |
| 9 | Có lớp livestream không | Chưa; nếu có chỉ gắn link Zoom / Meet | — |
| 10 | Hóa đơn điện tử | Theo pháp nhân; xin báo giá nhà cung cấp | — |
| 11 | Tài khoản dịch vụ đứng tên ai | Pháp nhân của chủ sản phẩm, lập trình viên được mời với quyền quản trị | Rủi ro mất quyền kiểm soát |
| 12 | Ai lập trình và bảo trì sau ra mắt | — | Quyết định tiến độ thực tế |
