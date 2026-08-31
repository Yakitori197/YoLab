# YoLab 軟體開發工作室官方網站

[![Website](https://img.shields.io/badge/Website-YoLab-0066cc)](https://yakitori197.github.io/YoLab/)

這是 YoLab 軟體開發工作室官方網站的正式原始碼 repository，用於介紹客製化系統、自動化、資料整合與企業工具服務。

- 正式網站：<https://yakitori197.github.io/YoLab/>
- 部署方式：GitHub Pages（GitHub Actions 自動建置）
- 技術架構：Astro + 原生 CSS／JavaScript（不使用前端框架）
- 建置工具：Astro（輸出純靜態，無執行期相依）

## 網站內容

- 響應式導覽列與行動版選單、深色／淺色模式切換(記住使用者選擇)
- 首屏三段輪播:終端機輸出打字動畫、儀表板示意、公開專案卡
- 三處跑馬燈:頂部公告條、技術棧、開源實驗室(滑鼠移入暫停)
- 可查證數據列(公開專案數、自動化測試數,可點擊前往 GitHub)
- 服務項目、開源實驗室(真實 repo 卡)
- 專案案例:Before → After 對照 + 分類篩選,客戶匿名化
- 合作流程時間軸(捲動逐段點亮)、關於與技術專長
- 常見問題手風琴
- 諮詢入口與表單引導
- 回到頂端與平滑捲動
- Open Graph、favicon 與搜尋引擎驗證資源

## 專案結構

```text
YoLab/
├── src/
│   ├── data/site.ts        # ★ 全站文案與清單的唯一來源(服務、案例、FAQ、repo…)
│   ├── layouts/
│   │   └── BaseLayout.astro  # head/SEO、公告條、導覽列、頁尾、浮動元件
│   ├── pages/
│   │   ├── index.astro       # 首頁
│   │   └── cases/[slug].astro # 案例詳頁(依 site.ts 的 cases 自動產生)
│   ├── styles/global.css   # 設計變數、RWD、深色模式與所有版面樣式
│   └── scripts/main.js     # 導覽、輪播、打字、計數、篩選、FAQ 等互動
├── public/                 # 原樣輸出的靜態資源
│   ├── logo-y.png          # 品牌商標(淺色底用,自向量原稿產生 256px)
│   ├── logo-y-white.png    # 品牌商標(深色底用)
│   ├── og-image.jpg / favicon* / apple-touch-icon.png
│   ├── robots.txt
│   └── google*.html        # 搜尋引擎驗證檔
├── astro.config.mjs
└── dist/                   # 建置產出(已 gitignore)
```

`sitemap-index.xml` 由 `@astrojs/sitemap` 在建置時自動產生，新增頁面不必手動維護。

**改文案幾乎都是改 `src/data/site.ts`**：首頁卡片、案例詳頁、結構化資料吃的是同一份資料，
不會出現「改了首頁忘了改詳頁」的情況（Google 也要求 FAQ 結構化資料必須與畫面一致）。

## 本機開發

```bash
npm install
npm run dev
```

瀏覽器開啟終端機顯示的網址（預設 <http://localhost:4321/YoLab>）。改檔案會即時更新。

檢查建置產出：

```bash
npm run build
npm run preview
```

## 內容維護

| 需求 | 修改位置 |
|---|---|
| 文案、服務、FAQ、開源專案清單 | `src/data/site.ts` |
| 新增／修改案例（含詳頁內容） | `src/data/site.ts` 的 `cases` 陣列 |
| 配色、RWD、動畫樣式 | `src/styles/global.css` |
| 導覽、輪播、篩選等互動 | `src/scripts/main.js` |
| head、SEO、結構化資料、導覽列與頁尾 | `src/layouts/BaseLayout.astro` |
| 社群分享預覽 | `public/og-image.jpg` |
| 網站圖示與商標 | `public/` 底下的 favicon、`logo-y*.png` |

新增一個案例只要在 `cases` 陣列加一筆（填 `slug`、卡片欄位與 `detail`），
首頁卡片、`/cases/<slug>/` 詳頁、sitemap 都會自動生出來，不必新增檔案。

專案案例應維持匿名化，不放入未授權的客戶名稱、畫面、營運資料或聯絡資訊。

## 部署

**兩個站的 base path 不同，產出不能互換：**

| 目標 | 指令 | 網址 |
|---|---|---|
| GitHub Pages（正式站） | `npm run build:pages` | `https://yakitori197.github.io/YoLab/` |
| VPS（預覽站） | `npm run build:vps` | 根路徑 |

GitHub Pages 由 `.github/workflows/deploy.yml` 在推上 `main` 後自動建置與部署，
**Pages 的來源必須設成「GitHub Actions」**（Settings → Pages → Source）。

VPS 用 repo 外的部署腳本（含主機位址，不放進這個 repo）。

### 路徑寫法的鐵則

頁面裡的連結與資源一律用 `withBase()`（定義在 `src/data/site.ts`）組出來：

```astro
<img src={withBase('logo-y.png')} />
<a href={withBase('#services')}>服務項目</a>
```

**不要自己用字串接 `import.meta.env.BASE_URL`** —— 它在 `base='/YoLab'` 時
回傳的是 `/YoLab`（沒有尾端斜線），直接接檔名會變成 `/YoLablogo.png` 而全部 404。

## 發布前檢查

- [ ] 桌面版與手機版導覽正常(含漢堡選單開合)
- [ ] 深色與淺色模式都確認過,商標在兩種底色都清楚
- [ ] 輪播可自動與手動切換,跑馬燈滑鼠移入會暫停
- [ ] 專案分類與 FAQ 可操作
- [ ] `npm run build` 沒有警告
- [ ] 案例詳頁的連結都能開（首頁卡片右下角「看完整案例」）
- [ ] 所有內部連結與圖片可載入
- [ ] 表單引導不會提交測試資料
- [ ] 頁面標題、描述與分享圖片正確
- [ ] 瀏覽器主控台沒有錯誤
- [ ] 不含憑證、私人聯絡方式或可識別客戶的資料

## Repository 邊界

此 repository 是 YoLab 正式網站的唯一公開來源。設計草稿、客戶交付站與其他網站版本應維持在個別 repository，不要回填到此處。

## 授權

© 2026 YoLab 軟體開發工作室. All Rights Reserved.
