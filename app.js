// Mobile menu, filters, reveal, parallax JS fallback, form, misc.
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Work filter ---
  var filterBtns = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("#workGrid .work-card");
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      filterBtns.forEach(function (x) { x.classList.remove("is-active"); });
      b.classList.add("is-active");
      var f = b.getAttribute("data-filter");
      cards.forEach(function (c) {
        var show = f === "all" || c.getAttribute("data-cat") === f;
        c.classList.toggle("is-hidden", !show);
      });
    });
  });

  // --- Motion layer: GSAP nếu tải được CDN, ngược lại dùng IO/CSS thuần ---
  var hasGsap = !prefersReduced && window.gsap && window.ScrollTrigger;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  // Intro khi load trang (chạy sau loader qua startIntro)
  function startIntro() {
    if (!hasGsap) return;
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-copy .tag", { y: 24, opacity: 0, duration: 0.5 })
      .from(".hero-copy .term", { y: 16, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(".hero-copy h1", { y: 44, opacity: 0, duration: 0.7 }, "-=0.3")
      .from(".hero-copy .lede", { y: 24, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(".hero-cta .btn", { y: 18, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.3")
      .from(".hero-stats .stat", { y: 22, opacity: 0, stagger: 0.08, duration: 0.45 }, "-=0.25")
      .from(".profile-card", { y: 44, opacity: 0, duration: 0.7 }, "-=0.6")
      .from(".hero-card-wrap .sticker", { scale: 0, opacity: 0, stagger: 0.12, duration: 0.45, ease: "back.out(2)" }, "-=0.4")
      .set(".hero-copy .tag, .hero-copy .term, .hero-copy h1, .hero-copy .lede, .hero-cta .btn, .hero-stats .stat, .profile-card, .hero-card-wrap .sticker", { clearProps: "all" });
  }

  // --- Scroll reveal (transform/opacity only) ---
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else if (hasGsap) {
    revealEls.forEach(function (el) {
      gsap.fromTo(el, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65, ease: "power2.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // --- Parallax: use CSS scroll-driven when available, else JS fallback ---
  var viewport = document.getElementById("parallaxViewport");
  var supportsScrollTimeline = false;
  try {
    supportsScrollTimeline =
      window.CSS && CSS.supports && (CSS.supports("animation-timeline: view()") || CSS.supports("animation-timeline: scroll()"));
  } catch (e) { supportsScrollTimeline = false; }

  if (viewport && !supportsScrollTimeline && !prefersReduced) {
    var back = viewport.querySelector(".layer-back");
    var mid = viewport.querySelector(".layer-mid");
    var word = viewport.querySelector(".giant-word");
    var cardA = viewport.querySelector(".card-a");
    var cardB = viewport.querySelector(".card-b");
    var cardC = viewport.querySelector(".card-c");
    var ticking = false;
    var set = function (el, y) {
      if (el) el.style.transform = "translateY(" + y.toFixed(1) + "px)";
    };
    var update = function () {
      ticking = false;
      var r = viewport.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      // progress: 0 (entering) -> 1 (leaving)
      var total = r.height + vh;
      var p = (vh - r.top) / total;
      p = Math.max(0, Math.min(1, p));
      var centered = p - 0.5; // -0.5..0.5
      set(back, centered * 280);   // slow (background)
      set(mid, centered * 520);    // faster (mid)
      if (word) {
        // horizontal drift: across 42vw of travel
        var x = (0.04 - p * 0.42) * window.innerWidth;
        word.style.transform = "translateX(" + x.toFixed(1) + "px)";
      }
      var fade = 0.4 + 0.6 * (1 - Math.abs(centered) * 2);
      if (cardA) {
        cardA.style.transform = "translateY(" + (centered * -260).toFixed(1) + "px) rotate(-2deg)";
        cardA.style.opacity = fade.toFixed(2);
      }
      if (cardB) {
        cardB.style.transform = "translateY(" + (centered * -400).toFixed(1) + "px) rotate(1.5deg)";
        cardB.style.opacity = fade.toFixed(2);
      }
      if (cardC) {
        cardC.style.transform = "translateY(" + (centered * -300).toFixed(1) + "px) rotate(-1deg)";
        cardC.style.opacity = fade.toFixed(2);
      }
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  // --- Chống đóng băng animation khi split/resize cửa sổ ---
  var resizeTimer = null;
  function resyncMotion() {
    if (hasGsap && window.ScrollTrigger) {
      try { ScrollTrigger.refresh(); } catch (e) {}
    }
    if (typeof onScroll === "function") {
      try { onScroll(); } catch (e) {}
    }
    var root = document.documentElement;
    root.classList.add("anim-reset");
    void root.offsetWidth; // ép reflow để animation bám lại timeline
    requestAnimationFrame(function () {
      root.classList.remove("anim-reset");
    });
  }
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resyncMotion, 250);
  });
  window.addEventListener("orientationchange", function () {
    setTimeout(resyncMotion, 350);
  });
  window.addEventListener("pageshow", function () {
    setTimeout(resyncMotion, 200);
  });
  if (window.matchMedia) {
    ["(max-width: 940px)", "(max-width: 560px)"].forEach(function (q) {
      try {
        window.matchMedia(q).addEventListener("change", function () {
          setTimeout(resyncMotion, 300);
        });
      } catch (e) {}
    });
  }
  console.log("[ryo] motion ok — gsap:", !!hasGsap, "scroll-timeline:", supportsScrollTimeline);

  // --- Parallax toàn trang (GSAP scrub, mạnh như Parallax Lab) ---
  // Chỉ chạm các element KHÔNG có CSS animation/hover transform để không xung đột.
  if (hasGsap) {
    gsap.to(".hero-copy", {
      y: -90, opacity: 0.3, ease: "none", force3D: false,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.to(".hero-card-wrap", {
      y: 80, ease: "none", force3D: false,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.utils.toArray(".section-head").forEach(function (head) {
      gsap.fromTo(head, { y: 46 }, {
        y: -46, ease: "none", force3D: false,
        scrollTrigger: { trigger: head, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
    var divider = document.querySelector(".divider-track");
    if (divider) {
      gsap.fromTo(divider, { xPercent: -6 }, {
        xPercent: -30, ease: "none", force3D: false,
        scrollTrigger: { trigger: ".divider-strip", start: "top bottom", end: "bottom top", scrub: true }
      });
    }
    // NOTE: không scrub parallax trên form liên hệ — khung contact-box có
    // overflow:hidden nên chữ/nút sẽ bị cắt, và input đang dùng mà trôi thì khó bấm.
  }

  // --- Text scramble (decode): ký tự chạy glyph ngẫu nhiên rồi khóa trái→phải ---
  var GLYPHS = "!<>-_\\/[]{}=+*^?#@%&";
  function scramble(el) {
    var final = el.getAttribute("data-text") || el.textContent;
    if (prefersReduced) { el.textContent = final; return; }
    var t0 = performance.now();
    var step = 26, settleBase = 480;
    (function frame(now) {
      var out = "", done = true;
      for (var i = 0; i < final.length; i++) {
        var ch = final[i];
        if (ch === " " || now >= t0 + settleBase + i * step) out += ch;
        else { done = false; out += GLYPHS[(Math.random() * GLYPHS.length) | 0]; }
      }
      el.textContent = out;
      if (!done) requestAnimationFrame(frame);
    })(t0);
  }
  function startScramble() {
    document.querySelectorAll(".scramble[data-text]").forEach(function (el) {
      setTimeout(function () { scramble(el); }, 250);
      var host = el.closest(".term") || el;
      host.addEventListener("click", function () { scramble(el); });
    });
  }

  // --- Loader TUI: thanh % chạy ~1.1s rồi mở trang + chạy intro/scramble ---
  var loader = document.getElementById("loader");
  var loadFill = document.getElementById("loadFill");
  var loadPct = document.getElementById("loadPct");
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    startIntro();
    startScramble();
    if (loader) {
      loader.classList.add("done");
      setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 600);
    }
  }
  if (prefersReduced || !loader) {
    boot();
  } else {
    var lt0 = performance.now(), LDUR = 1100;
    (function lframe(now) {
      var p = Math.min(1, (now - lt0) / LDUR);
      if (loadFill) loadFill.style.width = (p * 100).toFixed(0) + "%";
      if (loadPct) loadPct.textContent = (p * 100).toFixed(0);
      if (p < 1) requestAnimationFrame(lframe);
      else setTimeout(boot, 150);
    })(lt0);
    setTimeout(boot, 3500); // lưới an toàn
  }

  // --- Form progress: đếm số mục đã điền ---
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");
  var fpBar = document.getElementById("fpBar");
  var fpText = document.getElementById("fpText");
  var fpFields = form ? form.querySelectorAll("input[name], select[name], textarea[name]") : [];
  function fpUpdate() {
    if (!fpBar) return;
    var n = 0;
    fpFields.forEach(function (f) { if (f.value && f.value.trim()) n++; });
    fpBar.value = n;
    fpBar.setAttribute("aria-valuetext", n + " trên " + fpFields.length + " mục đã điền");
    if (fpText) fpText.textContent = n + "/" + fpFields.length;
  }
  fpFields.forEach(function (f) {
    f.addEventListener("input", fpUpdate);
    f.addEventListener("change", fpUpdate);
  });
  // --- Fake form submit (spinner indeterminate khi chờ) ---
  if (form) {
    var submitBtn = form.querySelector('[type="submit"]');
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = (form.elements.name && form.elements.name.value || "bạn").trim();
      var orig = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.innerHTML = '<span class="spinner" role="status" aria-label="Đang gửi biểu mẫu"></span> ĐANG GỬI…';
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.innerHTML = orig;
        if (formNote) formNote.textContent = "✔ Cảm ơn " + name + "! Tôi sẽ phản hồi trong 24 giờ. (Form demo — dữ liệu chưa được gửi đi)";
        form.reset();
        fpUpdate();
      }, prefersReduced ? 0 : 1200);
    });
  }

  // --- Dock: aria-current theo section đang xem, không animation chuyển màn ---
  var tabLinks = document.querySelectorAll(".dock a[data-tab]");
  if (tabLinks.length && "IntersectionObserver" in window) {
    var tabMap = { home: 0, about: 1, spotlight: 2, work: 3, journey: 4, contact: 5 };
    var setTab = function (i) {
      tabLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
      tabLinks[i].setAttribute("aria-current", "page");
    };
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && tabMap[e.target.id] != null) setTab(tabMap[e.target.id]);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["home", "about", "spotlight", "work", "journey", "contact"].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) secIO.observe(s);
    });
    window.addEventListener("scroll", function () {
      if (window.scrollY < 200) setTab(0);
    }, { passive: true });
  }

  // --- Year + to top ---
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
  var toTop = document.getElementById("toTop");
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });
})();
