/* ==========================================================================
   YoLab 官方網站 — 互動腳本
   原生 JavaScript,無相依套件。所有動畫尊重 prefers-reduced-motion。
   ========================================================================== */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var $ = function (sel, root) { return (root || document).querySelector(sel); };
    var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

    /* ---------- 深色 / 淺色模式 ---------- */
    (function theme() {
        var toggle = $("#themeToggle");
        if (!toggle) return;

        function current() {
            var set = document.documentElement.getAttribute("data-theme");
            if (set) return set;
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        toggle.addEventListener("click", function () {
            var next = current() === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            try { localStorage.setItem("yolab-theme", next); } catch (e) {}
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute("content", next === "dark" ? "#080a14" : "#0066cc");
        });
    })();

    /* ---------- 導覽列:捲動樣式、行動版選單、目前區塊 ---------- */
    (function nav() {
        var navbar = $("#navbar");
        var burger = $("#hamburger");
        var links = $("#navLinks");

        if (navbar) {
            var onScroll = function () {
                navbar.classList.toggle("is-scrolled", window.scrollY > 8);
            };
            onScroll();
            window.addEventListener("scroll", onScroll, { passive: true });
        }

        if (burger && links) {
            burger.addEventListener("click", function () {
                var open = links.classList.toggle("is-open");
                burger.classList.toggle("is-open", open);
                burger.setAttribute("aria-expanded", open ? "true" : "false");
                burger.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
            });

            $$("a", links).forEach(function (a) {
                a.addEventListener("click", function () {
                    links.classList.remove("is-open");
                    burger.classList.remove("is-open");
                    burger.setAttribute("aria-expanded", "false");
                });
            });

            document.addEventListener("click", function (e) {
                if (!links.classList.contains("is-open")) return;
                if (links.contains(e.target) || burger.contains(e.target)) return;
                links.classList.remove("is-open");
                burger.classList.remove("is-open");
                burger.setAttribute("aria-expanded", "false");
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape" && links.classList.contains("is-open")) {
                    links.classList.remove("is-open");
                    burger.classList.remove("is-open");
                    burger.setAttribute("aria-expanded", "false");
                    burger.focus();
                }
            });
        }

        /* 捲到哪一區,導覽對應項目就亮起來 */
        var navAnchors = $$('.nav-links > a[href^="#"]:not(.nav-cta)');
        var sections = navAnchors
            .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
            .filter(Boolean);

        if (sections.length && "IntersectionObserver" in window) {
            var spy = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    navAnchors.forEach(function (a) {
                        a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
                    });
                });
            }, { rootMargin: "-45% 0px -50% 0px" });
            sections.forEach(function (s) { spy.observe(s); });
        }
    })();

    /* ---------- 跑馬燈:滑鼠移入暫停 ---------- */
    (function marquee() {
        $$("[data-marquee]").forEach(function (track) {
            var zone = track.parentElement || track;
            zone.addEventListener("mouseenter", function () { track.classList.add("is-paused"); });
            zone.addEventListener("mouseleave", function () { track.classList.remove("is-paused"); });
        });
    })();

    /* ---------- Hero:輪播 + 終端機打字 ---------- */
    (function hero() {
        var slides = $$(".hero-slide");
        var dots = $$(".dot-btn");
        if (!slides.length) return;

        var index = 0;
        var timer = null;
        var INTERVAL = 5400;

        function show(i) {
            index = (i + slides.length) % slides.length;
            slides.forEach(function (s, n) { s.classList.toggle("is-active", n === index); });
            dots.forEach(function (d, n) {
                d.classList.toggle("is-active", n === index);
                d.setAttribute("aria-selected", n === index ? "true" : "false");
            });
            if (index === 0) typeTerminal();
        }

        function start() {
            if (reduceMotion || timer) return;
            timer = setInterval(function () { show(index + 1); }, INTERVAL);
        }
        function stop() { clearInterval(timer); timer = null; }

        dots.forEach(function (d, n) {
            d.addEventListener("click", function () { stop(); show(n); start(); });
        });

        var stage = $(".hero-stage");
        if (stage) {
            stage.addEventListener("mouseenter", stop);
            stage.addEventListener("mouseleave", start);
        }

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) { stop(); } else { start(); }
        });

        /* 終端機逐字輸出 */
        var termLines = $$("#termBody .term-line");
        var sources = termLines.map(function (el) { return el.textContent; });
        var typeTimer = null;

        termLines.forEach(function (el) {
            var c = el.getAttribute("data-color");
            if (c) el.style.color = c;
        });

        function typeTerminal() {
            if (!termLines.length) return;
            clearInterval(typeTimer);

            if (reduceMotion) {
                termLines.forEach(function (el, i) { el.textContent = sources[i]; });
                return;
            }

            var total = sources.reduce(function (n, s) { return n + s.length; }, 0);
            var shown = 0;
            termLines.forEach(function (el) { el.textContent = " "; });

            typeTimer = setInterval(function () {
                shown += 2;
                var rest = shown;
                termLines.forEach(function (el, i) {
                    var part = sources[i].slice(0, Math.max(0, rest));
                    el.textContent = part || " ";
                    rest -= sources[i].length;
                });
                if (shown >= total) clearInterval(typeTimer);
            }, 26);
        }

        /* 首屏進入視野才開始跑,省電也讓動畫被看到 */
        if ("IntersectionObserver" in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) { typeTerminal(); start(); }
                    else { stop(); }
                });
            }, { threshold: 0.25 });
            io.observe(stage || slides[0]);
        } else {
            typeTerminal();
            start();
        }
    })();

    /* ---------- 數據列:數字由 0 跑上去 ---------- */
    (function counters() {
        var nums = $$(".count");
        if (!nums.length) return;

        function run(el) {
            var target = parseInt(el.getAttribute("data-count"), 10) || 0;
            if (reduceMotion) { el.textContent = String(target); return; }

            var duration = 1500;
            var startTime = null;

            function step(now) {
                if (startTime === null) startTime = now;
                var p = Math.min(1, (now - startTime) / duration);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = String(Math.round(target * eased));
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }

        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                run(e.target);
                obs.unobserve(e.target);
            });
        }, { threshold: 0.6 });
        nums.forEach(function (n) { io.observe(n); });
    })();

    /* ---------- 專案案例:分類篩選 ---------- */
    (function cases() {
        var tabs = $$(".case-tabs .tab");
        var cards = $$(".case-grid .case");
        var empty = $("#caseEmpty");
        if (!tabs.length || !cards.length) return;

        tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                var filter = tab.getAttribute("data-filter");

                tabs.forEach(function (t) {
                    var on = t === tab;
                    t.classList.toggle("is-active", on);
                    t.setAttribute("aria-selected", on ? "true" : "false");
                });

                var visible = 0;
                cards.forEach(function (card) {
                    var cats = (card.getAttribute("data-category") || "").split(/\s+/);
                    var show = filter === "all" || cats.indexOf(filter) !== -1;
                    card.classList.toggle("is-hidden", !show);
                    if (show) visible++;
                });

                if (empty) empty.hidden = visible !== 0;
            });
        });
    })();

    /* ---------- 常見問題:手風琴 ---------- */
    (function faq() {
        var items = $$(".faq-item");
        if (!items.length) return;

        items.forEach(function (item) {
            var btn = $(".faq-q", item);
            if (!btn) return;

            btn.addEventListener("click", function () {
                var willOpen = !item.classList.contains("is-open");

                items.forEach(function (other) {
                    other.classList.remove("is-open");
                    var b = $(".faq-q", other);
                    if (b) b.setAttribute("aria-expanded", "false");
                });

                if (willOpen) {
                    item.classList.add("is-open");
                    btn.setAttribute("aria-expanded", "true");
                }
            });
        });
    })();

    /* ---------- 進場動畫 + 流程時間軸點亮 ---------- */
    (function reveal() {
        var targets = $$(".reveal");
        var steps = $$(".timeline .step");

        if (reduceMotion || !("IntersectionObserver" in window)) {
            targets.forEach(function (el) { el.classList.add("is-in"); });
            steps.forEach(function (el) { el.classList.add("is-on"); });
            return;
        }

        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.add("is-in");
                obs.unobserve(e.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        targets.forEach(function (el) { io.observe(el); });

        if (steps.length) {
            var stepIo = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (e) {
                    if (!e.isIntersecting) return;
                    var el = e.target;
                    var order = steps.indexOf(el);
                    setTimeout(function () { el.classList.add("is-on"); }, Math.max(0, order) * 90);
                    obs.unobserve(el);
                });
            }, { threshold: 0.4 });
            steps.forEach(function (el) { stepIo.observe(el); });
        }
    })();

    /* ---------- 回到頂端 ---------- */
    (function toTop() {
        var btn = $("#toTop");
        if (!btn) return;

        var onScroll = function () {
            btn.classList.toggle("is-visible", window.scrollY > 600);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    })();

})();
