// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * YoLab 官方網站
 *
 * 這裡的 site / base 是「GitHub Pages 正式站」的設定,因為它是目前對外的網址。
 * VPS 預覽站掛在根路徑,build 時用 CLI 參數覆寫(見 package.json):
 *
 *   npm run build:pages   →  https://yakitori197.github.io/YoLab/   (子路徑)
 *   npm run build:vps     →  https://yolab.36-50-249-108.sslip.io/  (根路徑)
 *
 * 之後買了自有網域、VPS 變成正式站,就把下面的 site 換掉、base 改成 '/',
 * 兩種 build 也可以合併回一種。
 *
 * ⚠ 頁面內的連結一律用 import.meta.env.BASE_URL 組出來,不要寫死 '/xxx',
 *   否則在 GitHub Pages 的子路徑下會全部連錯。
 */
export default defineConfig({
  site: 'https://yakitori197.github.io',
  base: '/YoLab',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      // 部落格與案例詳頁之後會自動被收進來,不需要手動維護 sitemap
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
