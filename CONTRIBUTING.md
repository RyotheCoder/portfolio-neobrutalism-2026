# Đóng góp

Repo portfolio cá nhân của [RyoTheCoder](https://github.com/RyotheCoder/portfolio-neobrutalism-2026).
Nhận fix lỗi và cải thiện nhỏ, không nhận đổi concept thiết kế.

## Quy trình

1. Mở Issue mô tả lỗi/đề xuất (kèm ảnh chụp nếu là lỗi giao diện).
2. Fork, tạo branch từ `main`:

```bash
git checkout -b fix/mo-ta-ngan
# hoặc: git checkout -b feat/mo-ta-ngan
```

3. Commit rõ ràng, tiếng Việt hoặc tiếng Anh.
4. Mở Pull Request về `main`, ghi rõ đã test trên trình duyệt nào.

## Quy tắc code

| Nên                              | Tránh                           |
| -------------------------------- | ------------------------------- |
| Dùng token `:root` có sẵn        | Màu/border/shadow viết tay      |
| Contrast chữ ≥ 4.5:1             | Chữ trắng trên nền vàng         |
| Animation `transform`/`opacity`  | Animate `width`, `top`, `margin` |
| Hỗ trợ `prefers-reduced-motion`  | Hiệu ứng không tắt được         |
| JS chạy được khi mất CDN         | Phụ thuộc cứng vào GSAP         |
| Giọng copy CV chuyên nghiệp      | Emoji/slang trong trang         |

## Kiểm tra trước khi gửi PR

```bash
node --check app.js
python3 -m http.server 8000
# mở http://localhost:8000
```

- [ ] Desktop Chrome/Edge/Brave không lỗi console
- [ ] Mobile 360px không tràn ngang, không che chữ
- [ ] Tab bàn phím thấy rõ focus, vào được form
- [ ] Bật reduced-motion: trang tĩnh nhưng đủ nội dung
- [ ] Chặn CDN: trang vẫn hiện, không trắng trang
