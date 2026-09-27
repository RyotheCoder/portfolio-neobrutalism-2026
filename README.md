# RYO.THE.DEV — Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

Trang portfolio một trang, phong cách Neobrutalism. Tác giả:
[RyoTheCoder](https://github.com/RyotheCoder/portfolio-neobrutalism-2026).

## Chạy

```bash
# Clone về máy
git clone https://github.com/RyotheCoder/portfolio-neobrutalism-2026.git
cd portfolio-neobrutalism-2026

# Chạy local
python3 -m http.server 8000
# mở http://localhost:8000
```

| Cách chạy           | Thao tác                             |
| ------------------- | ------------------------------------ |
| Python server       | `python3 -m http.server 8000`        |
| VS Code Live Server | Extension "Live Server" → Go Live    |
| Mở trực tiếp        | Double-click `index.html` (có thể lỗi font/CDN) |

## Tính năng

| Module              | Mô tả                                             |
| ------------------- | ------------------------------------------------- |
| Hero                | Tiêu đề, thẻ hồ sơ, thống kê, scramble terminal   |
| Bento dịch vụ       | Grid 4 cột, tile `span 2` / `span 4`              |
| Showcase parallax   | CSS scroll-driven + fallback JS                   |
| Lưới dự án          | Lọc Tất cả / Web App / Motion / Brand             |
| Timeline dọc        | Dot đặc (xong), dot xoay (đang diễn ra)           |
| Progress            | Vòng % lịch kín, `<progress>` form, spinner submit |
| Dock điều hướng     | Badge số vị trí, `aria-current` theo section      |
| Loader terminal     | Thanh % khi mới vào trang                         |
| Form liên hệ        | Demo, đếm tiến độ điền, không gửi đi thật         |

## Công nghệ

| Công nghệ                       | Dùng cho                                  |
| ------------------------------- | ----------------------------------------- |
| HTML5 semantic                  | Cấu trúc trang                            |
| CSS custom properties           | Token màu, border, shadow (`:root`)       |
| CSS Grid + Flexbox              | Bento, lưới dự án, timeline, form         |
| Scroll-driven animations        | Parallax (`scroll()` / `view()`)          |
| IntersectionObserver            | Reveal, `aria-current`, fallback          |
| requestAnimationFrame           | Scramble, loader, fallback parallax       |
| GSAP 3 + ScrollTrigger (CDN)    | Intro, reveal, scrub (có fallback khi mất mạng) |
| Google Fonts                    | Archivo Black, Space Grotesk, Space Mono  |

## Cấu trúc

```text
portfolio/
├── index.html       # nội dung
├── styles.css       # style + animation
├── app.js           # tương tác
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Tùy biến

```css
/* styles.css — đổi palette */
:root {
  --yellow: #ffdc00;
  --pink: #ff90e8;
  --lime: #b6ff2e;
  --border: 3px solid #000;
  --shadow: 5px 5px 0 #000;
}
```

```js
// app.js — đổi lực trôi hero
gsap.to(".hero-copy", { y: -90, opacity: 0.3 /* ... */ });
```

## Trình duyệt

| Trình duyệt      | Ghi chú                                        |
| ---------------- | ---------------------------------------------- |
| Chrome / Edge / Brave | Đầy đủ                                      |
| Firefox 114+     | Đầy đủ                                         |
| Safari cũ        | Parallax dùng fallback JS, decor đứng yên      |
| Mất mạng         | Bỏ qua GSAP, CSS + IO vẫn chạy                 |

## Accessibility

- Focus riêng biệt khỏi border trang trí, contrast ≥ 4.5:1
- `prefers-reduced-motion`: tắt animation/parallax/loader
- `aria-label` / `aria-valuenow` cho scramble và progress

## Liên hệ

- GitHub: [Ryo The Coder](https://github.com/RyotheCoder)
- Discord: [Discord User - Ryo](https://discord.com/users/1532300142663827567)

Nội dung dự án/kinh nghiệm trong trang là minh họa demo.

## Giấy phép

MIT — xem [LICENSE](LICENSE).

## Ghi chú

Dự án được xây dựng với sự hỗ trợ của AI (mã nguồn, nội dung minh họa,
tài liệu). Nội dung trong trang là dữ liệu minh họa, không phản ánh hồ sơ
thực tế của tác giả.
