# Hướng dẫn Setup & Deploy ứng dụng TOEIC (Full-stack BE + FE)

Tệp tài liệu này hướng dẫn bạn cách khởi chạy dự án tại máy cá nhân (Local) và cách thiết lập triển khai đồng thời cả Giao diện (Frontend) và API Server (Backend) lên **Vercel** đi kèm Cơ sở dữ liệu đám mây.

---

## 1. Khởi chạy cục bộ (Local Development)

Dự án sử dụng cơ chế tự động nhận diện: Khi chạy cục bộ, hệ thống sẽ sử dụng database **SQLite** gọn nhẹ (tự tạo tệp `database.db` ở thư mục dự án) để bạn không cần cấu hình database phức tạp.

1.  **Cài đặt thư viện Node.js**:
    ```bash
    npm install
    ```
2.  **Chạy máy chủ cục bộ**:
    *   Chạy bình thường:
        ```bash
        npm start
        ```
    *   Chạy chế độ lập trình (tự động reload khi sửa file):
        ```bash
        npm run dev
        ```
3.  **Trải nghiệm**:
    *   Mở trình duyệt truy cập: `http://localhost:3000`

---

## 2. Hướng dẫn Deploy lên Vercel (Production)

Vì máy chủ Vercel là Serverless (bộ nhớ tạm thời, ổ đĩa chỉ đọc), chúng ta **không thể sử dụng SQLite** trên Vercel. Ta cần kết nối dự án với một cơ sở dữ liệu **PostgreSQL** chạy trên đám mây (Cloud Database).

### Bước 1: Đẩy mã nguồn lên GitHub
Đảm bảo bạn đã commit và push toàn bộ code mới nhất lên repository GitHub của bạn:
```bash
git add .
git commit -m "feat: upgrade to full-stack and prepare vercel deploy"
git push origin main
```

### Bước 2: Nhập dự án vào Vercel
1.  Truy cập vào trang quản trị [Vercel Dashboard](https://vercel.com).
2.  Nhấp vào **Add New...** $\rightarrow$ Chọn **Project**.
3.  Kết nối tài khoản GitHub và nhấp **Import** bên cạnh repository `hoc-toeic-web`.
4.  Giữ nguyên cấu hình dự án mặc định (Vercel sẽ đọc file `vercel.json` để tự động điều phối Frontend tĩnh và `/api` Serverless Backend).

### Bước 3: Tạo và liên kết Database PostgreSQL trên Vercel
Vercel hỗ trợ liên kết nhanh với các nhà cung cấp Postgres Serverless chất lượng:
1.  Tại trang quản trị dự án trên Vercel, nhấp vào tab **Storage**.
2.  Tại phần **Marketplace Database Providers**, tìm dòng **Neon (Serverless Postgres)** và nhấp vào nút **Create**.
3.  Chọn khu vực máy chủ database gần bạn nhất (ví dụ: Singapore - `ap-southeast-1`) và nhấn **Create** để khởi tạo database.
4.  Sau khi khởi tạo, nhấn nút **Connect** để liên kết cơ sở dữ liệu này với dự án TOEIC của bạn. Vercel và Neon sẽ tự động tạo và cấu hình các biến môi trường kết nối database vào dự án của bạn (thông số mặc định thường là `DATABASE_URL`).

### Bước 4: Thiết lập Biến môi trường (Environment Variables)
1.  Vào mục **Settings** $\rightarrow$ Chọn **Environment Variables** trên Vercel dự án của bạn.
2.  Kiểm tra xem biến **`DATABASE_URL`** đã tự động xuất hiện chưa (do Neon tạo ở Bước 3). Nếu chưa, bạn chỉ cần sao chép giá trị kết nối của biến `POSTGRES_URL` hoặc liên kết trực tiếp của Neon và tạo mới một biến đặt tên là **`DATABASE_URL`**.
3.  Thêm biến môi trường bổ sung:
    *   **`JWT_SECRET`**: Nhập một chuỗi ký tự ngẫu nhiên bất kỳ để mã hóa phiên đăng nhập (ví dụ: `toeic_secret_key_2026_prod`).
4.  Nhấp **Save**.

### Bước 5: Tiến hành Deploy
1.  Vào tab **Deployments** trên Vercel.
2.  Nhấp vào dấu 3 chấm bên cạnh bản build hiện tại $\rightarrow$ Chọn **Redeploy** (để Vercel nạp các biến môi trường database vừa tạo).
3.  Sau khi build hoàn tất, Vercel sẽ cung cấp cho bạn một đường link URL công khai (ví dụ: `https://hoc-toeic-web.vercel.app`).
4.  Truy cập đường link và trải nghiệm hệ thống luyện thi TOEIC chuyên nghiệp của riêng bạn!
