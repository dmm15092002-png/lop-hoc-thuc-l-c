# PRD — Lớp Học Thực Lực

> Tài liệu yêu cầu sản phẩm · Phiên bản 2.0 (sau phản biện CTO) · 25/11/2026
> Trạng thái: **Chờ chủ sản phẩm xác nhận** các quyết định ở mục 12. Chưa viết code, chưa mở dịch vụ trả phí.

---

## 1. Tóm tắt

Lớp Học Thực Lực là nền tảng học Toán trực tuyến cho học sinh THCS và THPT. Nền tảng bán khóa học video có bài tập, và có một hệ thống luyện đề chấm điểm tự động. Sản phẩm phải vận hành thật: tài khoản thật, thanh toán được xác minh ở máy chủ, điểm chấm đúng, công thức Toán hiển thị đúng.

Triết lý sản phẩm: **Học thật — Hiểu sâu — Làm được.** Mọi con số công khai (thành tích, số học viên, đánh giá) đều lấy từ dữ liệu thật trong hệ thống; khi chưa có dữ liệu thì để trống.

## 2. Thay đổi so với bản đề xuất 1.0

| # | Bản 1.0 | Bản 2.0 | Lý do |
|---|---|---|---|
| 1 | Giỏ hàng nhiều sản phẩm | **Mua ngay 1 sản phẩm / đơn**; combo bán dưới dạng 1 sản phẩm gói | Người mua khóa học hiếm khi mua nhiều món một lúc; bỏ giỏ hàng tiết kiệm khoảng 1 tuần công và giảm lỗi đối soát |
| 2 | Xây toàn bộ giao diện bằng dữ liệu demo rồi mới làm backend | Design system + trang tĩnh trước, sau đó **làm từng lát dọc** (giao diện + backend + database cùng lúc cho từng luồng) | Tránh làm giao diện hai lần khi nối dữ liệu thật |
| 3 | Bảng `courses` vừa là nội dung vừa là hàng bán | Tách `products` (thứ bán) khỏi `courses` / `exam_packs` (thứ học) | Bán combo, gói luyện đề, gia hạn mà không sửa cấu trúc |
| 4 | Câu hỏi sửa trực tiếp | **Phiên bản câu hỏi bất biến**; đề và bài làm trỏ đúng phiên bản | Sửa đáp án sau khi học sinh đã làm không được làm sai điểm cũ |
| 5 | Chưa có quy trình xử lý chuyển khoản sai | Lưu mọi webhook, **hàng đợi đối soát** cho giao dịch sai nội dung / thiếu / thừa tiền | Với VietQR, học sinh gõ sai nội dung là chuyện thường gặp |
| 6 | Giới hạn tần suất theo IP | Giới hạn theo **tài khoản** cho các API đã đăng nhập | Cả lớp học sinh dùng chung một IP ở trường sẽ bị chặn nhầm |
| 7 | Chưa kiểm chứng định dạng nội dung | **Giai đoạn 0**: thử 100 câu hỏi thật, chốt cách soạn công thức, hình vẽ, bảng biến thiên | Nhập nội dung là việc tốn công nhất và quyết định cả trình soạn thảo |
| 8 | Chấm đúng/sai và trả lời ngắn chung chung | Mẫu chấm theo đúng định dạng đề tốt nghiệp THPT từ 2025 | Chấm sai một quy tắc là mất uy tín ngay |
| 9 | Phụ huynh để P3 | Thu email/SĐT phụ huynh và **sự đồng ý của phụ huynh** từ MVP; báo cáo cho phụ huynh ở P2 | Người trả tiền thường là phụ huynh; dữ liệu trẻ vị thành niên cần đồng ý |
| 10 | Trang nội dung sửa qua admin (CMS) | MVP để nội dung trang chủ, FAQ, chính sách trong mã nguồn; CMS làm sau | Nội dung ít thay đổi; tiết kiệm khoảng 1 tuần công |
| 11 | Cổng giáo viên riêng | Nếu ≤ 3 giáo viên: dùng chung khu quản trị, phân quyền theo vai trò | Bớt một khu giao diện |
| 12 | Không giới hạn phiên đăng nhập | **Một phiên đăng nhập / tài khoản** (tùy chọn có sẵn trong Supabase Pro) | Hạn chế chia sẻ tài khoản trả phí |

## 3. Mục tiêu và không phải mục tiêu

### Mục tiêu (12 tháng đầu)
- Bán và giảng dạy các khóa Toán lớp 9–12, luyện thi vào 10, tốt nghiệp THPT, chuyên Toán, đánh giá năng lực.
- Học sinh tự mua, tự kích hoạt, tự học, không cần nhân viên can thiệp trong trường hợp bình thường.
- Luyện đề với chấm tự động chính xác và lời giải chi tiết.
- Phục vụ 5.000 tài khoản, 500–1.000 người dùng đồng thời trong đợt thi thử.

### Không phải mục tiêu (giai đoạn này)
- Ứng dụng di động gốc (iOS/Android). Website responsive là đủ.
- Lớp học trực tiếp (livestream) tự xây. Nếu cần, chỉ gắn lịch + link Zoom/Google Meet.
- Môn học khác ngoài Toán. Database có sẵn cột `subject` để mở rộng sau.
- Bán sách / hàng vật lý cần giao hàng.
- Chấm tự luận bằng AI.

## 4. Người dùng

| Vai trò | Mô tả | Nhu cầu chính |
|---|---|---|
| Học sinh | 14–18 tuổi, phần lớn học trên điện thoại | Biết mình yếu gì, học đúng lộ trình, luyện đề sát thi thật |
| Phụ huynh | Người trả tiền, ít thời gian | Biết khóa học có đáng tiền, con có học thật, kết quả ra sao |
| Giáo viên | Soạn bài, ra đề, chấm tự luận | Nhập nội dung nhanh, công thức đúng, chấm bài gọn |
| Quản trị viên | Vận hành kinh doanh | Đơn hàng, đối soát, học sinh, báo cáo doanh thu |

## 5. Chỉ số thành công

| Chỉ số | Cách đo | Mục tiêu |
|---|---|---|
| Tỷ lệ đơn tự kích hoạt | Đơn `paid` được mở khóa tự động / tổng đơn `paid` | Chủ sản phẩm đặt sau tháng đầu |
| Thời gian từ chuyển khoản đến mở khóa | `enrollment.created_at − payment.received_at` | Đo thực tế, mục tiêu dưới 1 phút |
| Tỷ lệ hoàn thành bài học | Bài hoàn thành / bài đã mở | Đo thực tế |
| Sai lệch chấm điểm | Số khiếu nại chấm sai được xác nhận | 0 |
| Hiệu năng trang | Core Web Vitals trên điện thoại | LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1 |
| Độ sẵn sàng trong đợt thi thử | Lỗi 5xx / tổng request | Dưới 0,1% |

Không đặt mục tiêu doanh thu hay số học viên trong tài liệu này vì chưa có dữ liệu.

## 6. Phạm vi theo mức ưu tiên

- **P0 — Giai đoạn 0 (kiểm chứng):** nội dung mẫu, định dạng soạn thảo, pháp nhân, giá.
- **P1 — MVP:** bán khóa học, học, luyện đề chấm tự động, quản trị tối thiểu.
- **P2 — sau ra mắt 1–2 tháng:** chấm tự luận có chú thích trên ảnh, báo cáo phụ huynh, VNPay, đề ĐGNL, sinh đề theo ma trận, mã kích hoạt, hoàn tiền trong hệ thống.
- **P3 — khi ổn định:** Zalo, xếp hạng thi thử, blog, CMS, môn khác.

## 7. Yêu cầu chức năng

Mỗi yêu cầu có mã để truy vết trong kế hoạch triển khai.

### 7.1 Website công khai

| Mã | Yêu cầu | Ưu tiên | Tiêu chí nghiệm thu |
|---|---|---|---|
| PUB-01 | Trang chủ 10 khối theo prototype: header, hero, phương pháp, danh mục khóa học, giáo viên, thành tích, đánh giá, quy trình, FAQ, footer | P1 | Hiển thị đúng ở 360px, 768px, 1280px; không có số liệu bịa |
| PUB-02 | Khối thành tích và đánh giá chỉ hiện khi có dữ liệu thật đã duyệt | P1 | Database trống thì khối bị ẩn hoặc hiện trạng thái rỗng |
| PUB-03 | Trang giới thiệu, hồ sơ giáo viên, FAQ, liên hệ (form lưu database + chống spam) | P1 | Form có kiểm tra dữ liệu, có CAPTCHA, admin xem được |
| PUB-04 | 4 trang chính sách: bảo mật, điều khoản, thanh toán, hoàn tiền | P1 | Nội dung do chủ sản phẩm cung cấp và luật sư rà soát |
| PUB-05 | Banner đồng ý cookie; GA4 / Meta Pixel chỉ tải sau khi người dùng đồng ý | P1 | Từ chối thì không có request nào tới Google/Meta |
| PUB-06 | Blog / bài viết SEO | P3 | — |

### 7.2 Danh mục và chi tiết khóa học

| Mã | Yêu cầu | Ưu tiên | Tiêu chí nghiệm thu |
|---|---|---|---|
| CRS-01 | Danh mục khóa học, lọc theo lớp · mục tiêu · hình thức, sắp xếp, phân trang | P1 | Bộ lọc nằm trong URL, chia sẻ link giữ nguyên bộ lọc |
| CRS-02 | Thẻ khóa học: tên, lớp, giáo viên, ảnh, giá, giá ưu đãi, số bài, số bài kiểm tra | P1 | Giá ưu đãi hết hạn thì tự về giá gốc |
| CRS-03 | Trang chi tiết: banner, tên, giá, giáo viên, video giới thiệu, mô tả, mục tiêu đầu ra, đối tượng, chương trình, lộ trình, thời hạn truy cập, đánh giá, FAQ, nút Mua ngay | P1 | Đủ 15 trường của yêu cầu gốc; dữ liệu cấu trúc Course hợp lệ |
| CRS-04 | Bài học thử (`is_preview`) xem được không cần mua | P1 | Không lộ link video của bài không phải học thử |
| CRS-05 | Sản phẩm gói (combo nhiều khóa, gói luyện đề, gia hạn) | P1 (mô hình dữ liệu), P2 (giao diện bán combo) | — |

### 7.3 Tài khoản và phân quyền

| Mã | Yêu cầu | Ưu tiên | Tiêu chí nghiệm thu |
|---|---|---|---|
| ACC-01 | Đăng ký email + mật khẩu, xác thực email bắt buộc trước khi mua | P1 | Chưa xác thực thì không tạo được đơn |
| ACC-02 | Đăng nhập Google | P1 | Liên kết vào tài khoản đã có cùng email |
| ACC-03 | Quên mật khẩu, đổi mật khẩu (đổi mật khẩu cần đăng nhập gần đây) | P1 | Link đặt lại hết hạn; dùng một lần |
| ACC-04 | Hồ sơ: họ tên, lớp, trường, tỉnh, SĐT, **email/SĐT phụ huynh** | P1 | — |
| ACC-05 | **Đồng ý xử lý dữ liệu**: học sinh tự xác nhận; dưới 16 tuổi cần phụ huynh xác nhận qua email | P1 | Lưu bản ghi đồng ý có thời điểm và phiên bản chính sách; luật sư xác nhận ngưỡng tuổi |
| ACC-06 | Vai trò học sinh / giáo viên / quản trị; một người có thể nhiều vai trò | P1 | Học sinh truy cập URL quản trị nhận 404; API quản trị trả 403 |
| ACC-07 | Một phiên đăng nhập / tài khoản; đăng nhập máy mới thì máy cũ bị đăng xuất | P1 | Có thông báo rõ cho học sinh |
| ACC-08 | Quản trị viên bắt buộc xác thực 2 lớp (TOTP) | P1 | Không vào được khu quản trị nếu chưa bật |
| ACC-09 | Tải về / yêu cầu xóa dữ liệu của tôi | P1 | Yêu cầu xóa vào hàng đợi admin; dữ liệu kế toán giữ theo luật |
| ACC-10 | Tài khoản phụ huynh xem tiến độ con | P2 | — |
| ACC-11 | Đăng nhập Zalo | P3 | — |

### 7.4 Học trực tuyến

| Mã | Yêu cầu | Ưu tiên | Tiêu chí nghiệm thu |
|---|---|---|---|
| LRN-01 | Dashboard: khóa của tôi, tiến độ %, bài đang dở, lịch sử học, điểm gần đây, thời gian học tuần này, thông báo, tài liệu | P1 | Tải dưới 2 s trên 4G |
| LRN-02 | Trang bài học: video, PDF, lý thuyết Markdown + công thức, bài tập sau bài, nút hoàn thành, bài trước / sau | P1 | Video tiếp tục từ vị trí đã xem |
| LRN-03 | Bảo vệ video: link ký số hết hạn, chỉ phát trên tên miền của mình, watermark động tên + email học sinh | P1 | Copy link sang trình duyệt khác / tên miền khác không phát được |
| LRN-04 | PDF tải qua link ký số hết hạn; có watermark tên học sinh trên PDF | P1 (link), P2 (watermark PDF) | — |
| LRN-05 | Thời hạn truy cập: hết hạn thì khóa bài, giữ lịch sử, gợi ý gia hạn | P1 | — |
| LRN-06 | Thông báo trong ứng dụng; gửi chung cho cả khóa không tạo 5.000 bản ghi | P1 | — |

### 7.5 Luyện đề

| Mã | Yêu cầu | Ưu tiên | Tiêu chí nghiệm thu |
|---|---|---|---|
| EXM-01 | Ngân hàng câu hỏi 4 dạng: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn, tự luận | P1 | — |
| EXM-02 | Gắn câu hỏi với lớp · chương · chuyên đề (nhiều chuyên đề) · mức độ (nhận biết, thông hiểu, vận dụng, vận dụng cao) | P1 | — |
| EXM-03 | Phiên bản câu hỏi bất biến; sửa câu hỏi tạo phiên bản mới | P1 | Bài làm cũ chấm theo phiên bản cũ |
| EXM-04 | Đề gồm nhiều phần, mỗi phần có cách chấm riêng; mẫu sẵn cho đề tốt nghiệp THPT | P1 | Xem bảng 7.5a |
| EXM-05 | Phòng làm bài: đồng hồ theo hạn nộp trên máy chủ, tự lưu 15–30 s và khi đổi câu, đánh dấu câu, danh sách câu đã làm, nộp bài, tự nộp khi hết giờ | P1 | Mất mạng 2 phút rồi có lại: không mất câu trả lời |
| EXM-06 | Chấm tự động, xem điểm, lời giải chi tiết, thống kê đúng/sai theo phần và chuyên đề, lịch sử làm bài | P1 | Đáp án không bao giờ được gửi xuống trình duyệt trước khi nộp |
| EXM-07 | Đảo thứ tự câu / phương án (tùy chọn theo đề); ghi nhật ký rời tab | P1 | — |
| EXM-08 | Nộp tự luận bằng ảnh chụp (nhiều trang) hoặc PDF; nén ảnh trên máy, xử lý ảnh HEIC từ iPhone | P1 | Ảnh 12 MP tải lên dưới 1 MB |
| EXM-09 | Giáo viên chấm tự luận: điểm từng ý theo thang chấm, nhận xét | P1 | — |
| EXM-10 | Chú thích / vẽ trực tiếp lên ảnh bài làm | P2 | — |
| EXM-11 | Phân tích điểm mạnh / yếu theo chuyên đề (tỷ lệ đúng có trọng số mức độ, cần đủ số câu tối thiểu mới kết luận) | P1 (bản đơn giản) | Chuyên đề dưới 5 câu đã làm thì ghi "chưa đủ dữ liệu" |
| EXM-12 | Đề theo cấu trúc HSA, TSA, SPT, V-ACT, BCA; sinh đề theo ma trận | P2 | Cấu trúc từng kỳ thi được xác minh với tài liệu chính thức trước khi làm |
| EXM-13 | Nhập câu hỏi hàng loạt từ LaTeX / Word | P1 hoặc P2 (theo kết quả Giai đoạn 0) | — |

**Bảng 7.5a — Mẫu chấm đề tốt nghiệp THPT môn Toán (định dạng từ 2025)**

| Phần | Dạng | Số câu | Cách chấm |
|---|---|---|---|
| I | Nhiều lựa chọn, 4 phương án | 12 | 0,25 điểm / câu đúng |
| II | Đúng/Sai, mỗi câu 4 ý | 4 | Đúng 1 ý: 0,1 · 2 ý: 0,25 · 3 ý: 0,5 · 4 ý: 1 điểm |
| III | Trả lời ngắn | 6 | 0,5 điểm / câu đúng |
| | Tổng | 22 câu, 90 phút | 10 điểm |

Nguồn: [Thư viện Pháp luật — cách tính điểm Toán theo Quyết định 764/QĐ-BGDĐT](https://thuvienphapluat.vn/hoi-dap-phap-luat/cach-tinh-diem-toan-thi-tot-nghiep-thpt-2026-138086416.html), [Tuyển sinh 247](https://diemthi.tuyensinh247.com/cac-ky-thi/thpt.html). Thang chấm lưu dạng cấu hình, không viết cứng, để sửa khi Bộ thay đổi.

**Quy tắc so khớp câu trả lời ngắn:** chuẩn hóa dấu thập phân (`0,5` = `0.5`), bỏ khoảng trắng, chấp nhận nhiều đáp án tương đương do giáo viên nhập (ví dụ `-0,5` và `-1/2` nếu đề cho phép). Không tự suy luận tương đương ngoài danh sách giáo viên nhập.

### 7.6 Thanh toán

| Mã | Yêu cầu | Ưu tiên | Tiêu chí nghiệm thu |
|---|---|---|---|
| PAY-01 | Mua ngay: chọn sản phẩm → áp mã giảm giá → xác nhận thông tin → chọn phương thức → thanh toán → trang trạng thái đơn | P1 | — |
| PAY-02 | VietQR qua SePay: mã QR chứa số tiền + mã đơn; webhook xác nhận; tự mở khóa | P1 | Chỉ webhook hợp lệ mới mở khóa; vào trang "thành công" không mở khóa |
| PAY-03 | Đơn hết hạn sau 24 giờ nếu chưa thanh toán; giá chốt tại lúc tạo đơn | P1 | — |
| PAY-04 | Hàng đợi đối soát: tiền vào không khớp mã đơn / thiếu / thừa / trùng → admin xử lý thủ công, có nhật ký | P1 | Không có giao dịch nào bị "rơi" |
| PAY-05 | Email xác nhận thanh toán + biên nhận | P1 | — |
| PAY-06 | VNPay (thẻ ATM, thẻ quốc tế, ví) với IPN có kiểm tra chữ ký | P2 (khi có hợp đồng) | — |
| PAY-07 | Hoàn tiền: admin ghi nhận, thu hồi quyền truy cập, nhật ký | P1 (thủ công), P2 (trong hệ thống) | — |
| PAY-08 | Hóa đơn điện tử | Theo quyết định pháp nhân | — |

### 7.7 Quản trị

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| ADM-01 | Học sinh: tìm, xem hồ sơ, ghi danh thủ công, khóa tài khoản | P1 |
| ADM-02 | Giáo viên: mời, phân công khóa / đề | P1 |
| ADM-03 | Khóa học, chương, bài học, tải video lên Bunny, tải PDF lên R2 | P1 |
| ADM-04 | Ngân hàng câu hỏi, đề thi, bài làm, kết quả | P1 |
| ADM-05 | Sản phẩm, giá, mã giảm giá | P1 |
| ADM-06 | Đơn hàng, giao dịch, hàng đợi đối soát | P1 |
| ADM-07 | Dashboard: doanh thu theo ngày / sản phẩm, học sinh mới, học sinh hoạt động, điểm trung bình theo đề | P1 (cơ bản), P2 (nâng cao + xuất Excel) |
| ADM-08 | Nhật ký quản trị chỉ ghi thêm, không sửa / xóa được | P1 |
| ADM-09 | Trang cấu hình dịch vụ ngoài: hiện trạng thái "chưa kết nối" thay vì giả lập | P1 |
| ADM-10 | Sửa nội dung trang web (banner, FAQ, đánh giá, thành tích) | P2 |

## 8. Yêu cầu hiển thị Toán, hình vẽ, tự luận

| Mã | Yêu cầu | Ưu tiên |
|---|---|---|
| MTH-01 | Công thức viết bằng LaTeX, render bằng KaTeX phía máy chủ, xuất kèm MathML cho trình đọc màn hình | P1 |
| MTH-02 | KaTeX chạy với `trust: false`, giới hạn macro, chặn lệnh tạo link / HTML | P1 |
| MTH-03 | Bộ thử 100–200 câu hỏi thật phải hiển thị đúng 100% trước khi chốt KaTeX; câu nào không hiển thị được thì chuyển sang MathJax hoặc ảnh SVG | P0 |
| MTH-04 | Hình vẽ (hình học, đồ thị): tải ảnh SVG/PNG; SVG được làm sạch (bỏ script) và phục vụ từ tên miền riêng | P1 |
| MTH-05 | Bảng biến thiên, bảng xét dấu: ảnh SVG ở MVP; trình dựng bảng biến thiên hoặc biên dịch TikZ → SVG ở P2 | P1 / P2 |
| MTH-06 | Trình soạn câu hỏi: Markdown + LaTeX với xem trước song song, chèn ảnh kéo-thả | P1 |
| MTH-07 | Ô nhập công thức cho học sinh (MathLive) cho câu tự luận gõ máy | P3 |

## 9. Yêu cầu phi chức năng

| Nhóm | Yêu cầu |
|---|---|
| Quy mô | 5.000 tài khoản; 1.000 người làm bài đồng thời; 1.000 người bấm "Bắt đầu" trong cùng 1 phút; 1.000 bài nộp trong 30 giây cuối |
| Hiệu năng | Trang công khai render sẵn và cache tại CDN; dashboard < 2 s trên 4G; tự lưu < 500 ms |
| Sẵn sàng | Không bảo trì trong khung 19:00–23:00 và trong đợt thi thử đã công bố |
| Sao lưu | Hằng ngày (Supabase, 7 ngày) + bản dump mã hóa hằng đêm sang R2 (30 ngày); thử khôi phục hằng tháng |
| Bảo mật | Xem mục 10 |
| Truy cập | WCAG 2.1 AA cho luồng chính; vùng bấm ≥ 44 px; tương phản chữ ≥ 4,5:1 |
| Trình duyệt | Chrome, Safari iOS, Samsung Internet, Edge — 2 phiên bản gần nhất |
| Ngôn ngữ | Tiếng Việt; dữ liệu lưu UTF-8; tìm kiếm không dấu |

## 10. Bảo mật và dữ liệu cá nhân

- Kiểm tra quyền **hai lớp**: máy chủ ứng dụng + Row Level Security trong database. Policy RLS có bộ test tự động.
- Khóa dịch vụ (service role) chỉ nằm trong mã chạy trên máy chủ; kiểm tra tự động để chặn lọt vào bundle trình duyệt.
- Truy vấn tham số hóa; React tự escape; Markdown được làm sạch; Content Security Policy chặt.
- Cookie phiên `HttpOnly`, `Secure`, `SameSite=Lax`; Server Actions kiểm tra Origin.
- Chặn mật khẩu đã bị lộ (Supabase Pro), giới hạn tần suất đăng nhập / quên mật khẩu, CAPTCHA Turnstile ở form công khai.
- Webhook thanh toán: xác thực khóa bí mật, kiểm tra số tiền + mã đơn + trạng thái, chống ghi nhận trùng bằng mã giao dịch duy nhất, lưu toàn bộ payload gốc.
- Dữ liệu học sinh tuân thủ [Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Luat-Bao-ve-du-lieu-ca-nhan-2025-91-2025-QH15-625628.aspx) (hiệu lực 01/01/2026): thu tối thiểu, ghi nhận đồng ý, cho xem / sửa / xóa, không ghi dữ liệu cá nhân vào log. Các mức phạt theo [Nghị định 330/2026/NĐ-CP](https://luatvietnam.vn/bai-viet-lien-quan/luat-91-2025-qh15-405135.html). Cần luật sư rà soát trước ra mắt.

## 11. Ràng buộc

- Chỉ dạy Toán; không sao chép mã nguồn, logo, hình ảnh, nội dung của QANDA Study.
- Không dùng dữ liệu giả trong production; dữ liệu mẫu trong môi trường thử phải gắn nhãn DEMO.
- Dịch vụ ngoài chưa cấu hình phải hiện trạng thái "chưa kết nối", không giả lập thành công.
- Màu thương hiệu #48A9E8 / #FFFFFF / #111827. Nút xanh dùng chữ đen để đạt tương phản (chờ xác nhận).

## 12. Quyết định cần chủ sản phẩm xác nhận

1. **Pháp nhân bán hàng** (cá nhân / hộ kinh doanh / công ty): quyết định VNPay, hóa đơn điện tử, thông tin footer.
2. **Cách giáo viên đang soạn đề**: Word + MathType, LaTeX, hay viết tay → quyết định công cụ nhập liệu.
3. **Số giáo viên** lúc ra mắt và có **chia doanh thu** cho giáo viên không.
4. **Mỏ neo MVP**: ra mắt bản bán khóa học trước (khoảng tuần 8) rồi thêm luyện đề, hay chờ đủ cả hai.
5. **Giá, thời hạn truy cập, chính sách hoàn tiền** của các khóa ra mắt.
6. **Một phiên đăng nhập / tài khoản**: đồng ý áp dụng?
7. **Màu nút CTA**: xanh #48A9E8 + chữ đen?
8. **Ngưỡng tuổi cần phụ huynh đồng ý**: chờ luật sư.
9. **Có lớp livestream không**: nếu có, chỉ gắn lịch + link họp.
10. **Ai giữ tài khoản các dịch vụ** (Vercel, Supabase, Bunny, Cloudflare, SePay, tên miền): khuyến nghị đứng tên pháp nhân của chủ sản phẩm.
