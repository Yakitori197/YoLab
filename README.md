# YoLab 軟體開發工作室官方網站

[![Website](https://img.shields.io/badge/Website-YoLab-0066cc)](https://yakitori197.github.io/YoLab/)

這是 YoLab 軟體開發工作室官方網站的正式原始碼 repository，用於介紹客製化系統、自動化、資料整合與企業工具服務。

- 正式網站：<https://yakitori197.github.io/YoLab/>
- 部署方式：GitHub Pages
- 技術架構：HTML、CSS、原生 JavaScript
- 建置工具：無

## 網站內容

- 響應式導覽列與行動版選單
- 首頁輪播與服務定位
- 服務項目與匿名化專案案例
- 合作流程與技術專長
- 常見問題手風琴
- 諮詢入口與表單引導
- 回到頂端與平滑捲動
- Open Graph、favicon 與搜尋引擎驗證資源

## 專案結構

```text
YoLab/
├── index.html              # 網站內容與 SEO metadata
├── style.css               # RWD、版面與視覺樣式
├── main.js                 # 導覽、輪播、篩選、FAQ 等互動
├── logo-nav.png            # 導覽列品牌圖
├── og-image.jpg            # 社群分享圖片
├── favicon.ico             # 瀏覽器圖示
├── favicon-32x32.png
├── favicon-64x64.png
└── apple-touch-icon.png
```

## 本機預覽

此網站不需要安裝套件。從 repository 根目錄啟動靜態伺服器：

```powershell
python -m http.server 8000
```

瀏覽器開啟：<http://127.0.0.1:8000>

不要直接以檔案協定判斷網站是否正常；使用本機 HTTP 伺服器可更接近 GitHub Pages 行為。

## 內容維護

| 需求 | 修改位置 |
|---|---|
| 文案、服務、案例、FAQ | `index.html` |
| 配色、RWD、動畫樣式 | `style.css` |
| 導覽、輪播、篩選與表單互動 | `main.js` |
| 社群分享預覽 | `og-image.jpg` 與 HTML metadata |
| 網站圖示 | favicon 與 touch icon 檔案 |

專案案例應維持匿名化，不放入未授權的客戶名稱、畫面、營運資料或聯絡資訊。

## 部署

GitHub Pages 應使用：

- Branch：`main`
- Folder：repository 根目錄
- 自訂建置步驟：不需要

推送前請確認所有資源使用相對路徑，避免只在本機根網址可用、部署到 `/YoLab/` 後失效。

## 發布前檢查

- [ ] 桌面版與手機版導覽正常
- [ ] 輪播可自動與手動切換
- [ ] 專案分類與 FAQ 可操作
- [ ] 所有內部連結與圖片可載入
- [ ] 表單引導不會提交測試資料
- [ ] 頁面標題、描述與分享圖片正確
- [ ] 瀏覽器主控台沒有錯誤
- [ ] 不含憑證、私人聯絡方式或可識別客戶的資料

## Repository 邊界

此 repository 是 YoLab 正式網站的唯一公開來源。設計草稿、客戶交付站與其他網站版本應維持在個別 repository，不要回填到此處。

## 授權

© 2026 YoLab 軟體開發工作室. All Rights Reserved.
