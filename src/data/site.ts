/**
 * 全站共用資料。
 *
 * 頁面只負責排版,文案與清單一律放這裡 —— 案例詳頁、首頁卡片、結構化資料
 * 都吃同一份來源,才不會改了一邊忘了另一邊(Google 要求 FAQ 結構化資料
 * 必須與畫面上顯示的一致)。
 */

/**
 * 組出帶 base 的路徑。
 *
 * ⚠ 一定要用這個,不要自己用字串接。Astro 的 import.meta.env.BASE_URL 在
 *   base='/YoLab' 時回傳的是 '/YoLab'(**沒有尾端斜線**),直接接檔名會變成
 *   '/YoLablogo.png' 而全部 404 —— 這個坑實際踩過。
 *
 *   withBase()                 → '/YoLab/'   或  '/'
 *   withBase('logo-y.png')     → '/YoLab/logo-y.png'
 *   withBase('#services')      → '/YoLab/#services'
 *   withBase('cases/abc/')     → '/YoLab/cases/abc/'
 */
const rawBase = import.meta.env.BASE_URL || '/';
export const BASE = rawBase.endsWith('/') ? rawBase : rawBase + '/';
export const withBase = (p: string = '') => BASE + String(p).replace(/^\//, '');

export const LINE_URL = 'https://line.me/ti/p/@442fjdqq';
export const LINE_ID = '@442fjdqq';
export const GITHUB_URL = 'https://github.com/Yakitori197';
export const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScYU3SUb4xVANasS9cO1t3t267NSpO1oTtqXOTuNGhVoNNZpA/viewform';

export const nav = [
  { href: '#services', label: '服務項目' },
  { href: '#opensource', label: '開源實驗室' },
  { href: '#projects', label: '專案案例' },
  { href: '#process', label: '合作流程' },
  { href: '#faq', label: '常見問題' },
];

/** 頂部公告條跑馬燈 */
export const tickerItems = [
  '客製化內部系統',
  '流程自動化',
  '爬蟲與資料整合',
  '企業報表儀表板',
  'LINE / Discord Bot',
  '系統維護與交接',
];

/** Hero 下方的技術棧跑馬燈 */
export const stack = [
  'Python', 'FastAPI', 'SQLite', 'PostgreSQL', 'Pandas', 'Playwright',
  'Go', 'TypeScript', 'Astro', 'YOLOv8', 'OpenCV',
  'LINE Bot', 'Discord Bot', 'Docker', 'Caddy', 'GitHub Actions',
];

export const stats = {
  repos: 21,
  tests: 888,
  industries: 7,
};

export interface Service {
  title: string;
  pain: string;
  tech: string;
}

export const services: Service[] = [
  {
    title: '客製化內部系統',
    pain: '表單、審核、庫存不必再開五個 Excel 互相對數字，同一套系統裡就查得到。',
    tech: 'FastAPI · PostgreSQL · TypeScript',
  },
  {
    title: '流程自動化',
    pain: '每天固定要做的抄寫、轉檔、寄報表，改成排程在你上班前跑完。',
    tech: 'Python · GitHub Actions · Docker',
  },
  {
    title: '爬蟲與資料整合',
    pain: '供應商網站、公開資料、內部資料庫散在各處，整成一張真的能用的表。',
    tech: 'Playwright · Pandas · SQLite',
  },
  {
    title: '企業報表儀表板',
    pain: '老闆想看的數字打開網頁就有，不用等月底有人手動彙整。',
    tech: 'FastAPI · Astro · Chart',
  },
  {
    title: 'LINE / Discord Bot',
    pain: '異常、進度、日報主動推到群組，不必有人記得每天去查一次。',
    tech: 'LINE Bot SDK · Discord.py',
  },
  {
    title: '系統維護與交接',
    pain: '交付附原始碼與文件，上線後仍能回報問題；要換人接手也交得出去。',
    tech: 'Docs · Caddy · 監控',
  },
];

export interface Repo {
  name: string;
  desc: string;
  lang: string;
  /** GitHub repo 名稱,與 name 不同時才需要填 */
  slug?: string;
}

export const repos: Repo[] = [
  { name: 'yolab-quote', desc: '股市行情統一套件，一行取得多來源報價', lang: 'Python' },
  { name: 'yolab-excel-auditor', desc: 'Excel/CSV 資料品質健檢，純前端開箱即用', lang: 'JavaScript' },
  { name: 'yolab-data-contract-guard', desc: '資料結構一有異動就在 CI 擋下來', lang: 'CLI / Action' },
  { name: 'yolab-agent-skill-guard', desc: 'AI Agent 技能檔靜態檢查工具', lang: 'Go' },
  { name: 'yolab-paper-trading-lab', desc: '加密貨幣模擬交易平台', lang: 'Python' },
  { name: 'build-your-own-data-stack', desc: '資料工程學習地圖，從零到可上線', lang: 'Docs' },
  { name: 'CCD_System', desc: 'CCD 視覺檢測與不良品自動剔除', lang: 'Python / OpenCV' },
  { name: 'Stock_LineBot', desc: '股市行情 LINE 推播機器人', lang: 'Python', slug: 'Stock_LineBot_Public' },
  { name: 'Discord_StockBot', desc: '股市行情 Discord 推播機器人', lang: 'Python' },
  { name: '115-PCIC', desc: '品管證照題庫練習網站', lang: 'JavaScript' },
  { name: 'Holdem', desc: '德州撲克勝率計算器', lang: 'Python' },
  { name: 'Yolov8_TrainSystem', desc: 'YOLOv8 模型訓練與標註流程工具', lang: 'Python' },
];

export const repoUrl = (r: Repo) => `${GITHUB_URL}/${r.slug ?? r.name}`;

/** 案例分類。key 用於首頁篩選,label 顯示在頁籤上 */
export const caseCategories = [
  { key: 'all', label: '全部' },
  { key: 'automation', label: '自動化' },
  { key: 'crawler', label: '爬蟲' },
  { key: 'dashboard', label: '儀表板' },
  { key: 'integration', label: '系統整合' },
];

export interface SheetCell {
  t: string;
  warn?: boolean;
}

export interface CaseStudy {
  /** 網址用的識別字,對應 /cases/<slug>/ */
  slug: string;
  industry: string;
  category: 'automation' | 'crawler' | 'dashboard' | 'integration';
  categoryLabel: string;
  status: string;
  live?: boolean;
  title: string;
  /** 首頁卡片與詳頁共用的一句話摘要 */
  summary: string;
  beforeFile: string;
  afterFile: string;
  before: string;
  after: string;
  /** Excel 示意表格:表頭 + 3 列資料 */
  sheet: { head: string[]; rows: SheetCell[][] };
  /** After 迷你圖表的兩個 KPI */
  kpis: [string, string];
  /** 迷你長條圖高度(%),第 3n 根會用強調色 */
  bars: number[];
  results: string[];
  /** 詳頁專用:更完整的敘述 */
  detail: {
    context: string;
    approach: string[];
    outcome: string;
    stack: string[];
    duration: string;
  };
}

export const cases: CaseStudy[] = [
  {
    slug: 'multi-farm-production',
    industry: '養豬畜牧',
    category: 'integration',
    categoryLabel: '系統整合',
    status: '● 運轉中',
    live: true,
    title: '多場區生產管理系統',
    summary: '12 個場區各自一份 Excel 日報，改成現場手機填報即時入庫，月底不必再人工彙整。',
    beforeFile: '各場區日報_v7.xlsx',
    afterFile: 'farm-dashboard',
    before: '12 個場區各自一份 Excel 日報，月底由行政人工彙整，欄位常對不起來。',
    after: '現場手機填報即時入庫，場區看板與月報自動產出。',
    sheet: {
      head: ['場區', '日期', '頭數', '備註'],
      rows: [
        [{ t: 'A1' }, { t: '08/12' }, { t: '312' }, { t: '手抄', warn: true }],
        [{ t: 'B1' }, { t: '08/13' }, { t: '—', warn: true }, { t: '待補', warn: true }],
      ],
    },
    kpis: ['3,480 頭', '12 場全同步'],
    bars: [40, 62, 34, 78, 56, 90, 48, 70, 60],
    results: ['每日彙整 3 小時 → 8 分鐘', '對帳錯誤 每月 12 件 → 0', '上線 14 個月持續運轉'],
    detail: {
      context:
        '客戶在多個縣市經營十餘個養豬場區，每個場區的日報各自維護一份 Excel，每天由現場人員手寫再輸入，月底行政人員把十幾份檔案合併成月報。欄位名稱不一致、日期格式各寫各的、有人漏填就整份對不起來，月結時常要回頭一場一場問。',
      approach: [
        '先到場看現場實際怎麼填報，確認欄位定義與各場區的差異，寫成規格文件後才動工。',
        '把填報介面做成手機優先：現場人員在豬舍就能填，不必回辦公室輸入。',
        '既有的歷史 Excel 全部匯入，欄位對照與資料清理由系統處理，不要求客戶重打。',
        '角色權限分離：場長只能看寫自己的場、獸醫全場唯讀、總場長可修改並保留異動紀錄。',
        '報表與看板自動產出，資料庫每天自動備份。',
      ],
      outcome:
        '上線後每日彙整時間從 3 小時降到 8 分鐘，跨場對帳錯誤歸零。系統目前仍在運轉，是客戶日常作業的一部分。',
      stack: ['Python', 'FastAPI', 'SQLite', 'Caddy', 'systemd'],
      duration: '約 3 個月（含資料匯入與現場教學）',
    },
  },
  {
    slug: 'quote-automation',
    industry: '金屬加工',
    category: 'automation',
    categoryLabel: '自動化',
    status: '已交付',
    title: '報價與工單自動產出',
    summary: '報價單不再靠複製上一份改數字，選料號自動帶當期單價，工單與 PDF 一鍵產生。',
    beforeFile: '報價單-複製用.xlsx',
    afterFile: 'quote-tool',
    before: '報價單複製上一份改數字，料號單價常漏改，事後才發現報錯。',
    after: '選料號自動帶當期單價，工單與 PDF 一鍵產生。',
    sheet: {
      head: ['料號', '單價', '數量', '小計'],
      rows: [
        [{ t: 'SS-04' }, { t: '舊價', warn: true }, { t: '120' }, { t: '?', warn: true }],
        [{ t: 'SS-11' }, { t: '88' }, { t: '60' }, { t: '5,280' }],
      ],
    },
    kpis: ['42 筆報價', '單價 0 誤差'],
    bars: [52, 70, 44, 82, 60, 74, 50, 88, 64],
    results: ['單筆報價 40 分 → 5 分', '報錯單價 歸零'],
    detail: {
      context:
        '業務報價的做法是把上一份報價單另存新檔再改數字。料號一多就容易漏改單價，等到出貨對帳才發現報錯，只能自行吸收差額。',
      approach: [
        '把料號與當期單價建成主檔，單價調整有生效日期，報價時自動帶當下正確的價格。',
        '報價單、工單、出貨單共用同一份資料，不需要重複輸入。',
        '產出的 PDF 套用客戶原本的表單格式，收件方看到的樣子沒有改變。',
      ],
      outcome: '單筆報價從 40 分鐘縮短到 5 分鐘，因為漏改單價而報錯的情況歸零。',
      stack: ['Python', 'SQLite', 'PDF 產出'],
      duration: '約 5 週',
    },
  },
  {
    slug: 'ccd-inspection',
    industry: '製造業品管',
    category: 'integration',
    categoryLabel: '系統整合',
    status: '已交付',
    title: 'CCD 視覺檢測與自動剔除',
    summary: '目視全檢改成相機即時判定，不良品自動剔除，檢測紀錄可回溯。',
    beforeFile: '目視全檢紀錄.xlsx',
    afterFile: 'ccd-monitor',
    before: '目視全檢，兩人一班輪，疲勞時漏檢，紀錄事後補登。',
    after: '相機即時判定、不良品自動剔除，異常推 LINE 通知。',
    sheet: {
      head: ['批號', '檢數', '不良', '登記'],
      rows: [
        [{ t: 'L-208' }, { t: '1,200' }, { t: '?', warn: true }, { t: '事後補', warn: true }],
        [{ t: 'L-209' }, { t: '980' }, { t: '14' }, { t: '手寫', warn: true }],
      ],
    },
    kpis: ['8,600 件', '誤判 < 1%'],
    bars: [88, 92, 84, 90, 86, 94, 88, 91, 87],
    results: ['全檢人力 2 人 → 0', '誤判率 < 1%', '檢測紀錄可回溯'],
    detail: {
      context:
        '產線末端靠人工目視全檢，兩人一班輪替。人疲勞時就會漏檢，而且檢測結果是事後補登到 Excel，出問題要追溯批號幾乎不可能。',
      approach: [
        '在產線架設工業相機，先蒐集足夠的良品與不良品影像建立判定模型。',
        '判定結果即時觸發剔除機構，不良品不再流到下一站。',
        '每一件的判定結果與影像都留檔，可以依批號回溯。',
        '異常率突然升高時主動推 LINE 通知，不必有人盯著螢幕。',
      ],
      outcome: '全檢人力從 2 人降到 0，誤判率低於 1%，且每一批都有可回溯的檢測紀錄。',
      stack: ['Python', 'OpenCV', 'YOLOv8', 'LINE Notify'],
      duration: '約 2 個月（含現場光源與治具調整）',
    },
  },
  {
    slug: 'quote-aggregation',
    industry: '金融 / 股市資訊',
    category: 'crawler',
    categoryLabel: '爬蟲',
    status: '已交付',
    title: '多來源行情整合與盤前推播',
    summary: '每天早上開六個網站抄價格，改成排程自動抓取入庫，統一成一個 API。',
    beforeFile: '每日行情抄錄.xlsx',
    afterFile: 'quote-api',
    before: '每天早上開六個網站抄價格貼進 Excel，來源格式各不相同。',
    after: '排程抓取入庫，統一成一個 API，盤前自動推播。',
    sheet: {
      head: ['代號', '來源', '價格', '時間'],
      rows: [
        [{ t: '2330' }, { t: '網站A', warn: true }, { t: '1,085' }, { t: '手抄', warn: true }],
        [{ t: '2317' }, { t: '網站C', warn: true }, { t: '—', warn: true }, { t: '漏抄', warn: true }],
      ],
    },
    kpis: ['6 來源', '08:30 已推送'],
    bars: [46, 64, 52, 80, 58, 72, 66, 84, 56],
    results: ['人工抄寫 60 分 → 0', '6 個來源 → 1 個 API'],
    detail: {
      context:
        '每天開盤前要從六個不同網站抄取行情貼進 Excel，各家欄位名稱與格式都不一樣，抄完還要人工核對，經常漏抄或抄錯。',
      approach: [
        '六個來源各寫一支擷取器，統一輸出成同一種資料格式，來源改版時只要修那一支。',
        '加上重試與失敗告警：某個來源掛掉不會讓整批資料開天窗。',
        '資料入庫後對外只暴露一個 API，之後要接任何工具都不必再管來源差異。',
        '盤前排程自動推播到通訊軟體。',
      ],
      outcome: '人工抄寫時間從每天 60 分鐘降到 0，六個來源收斂成一個 API。',
      stack: ['Python', 'Playwright', 'Pandas', 'SQLite'],
      duration: '約 4 週',
    },
  },
  {
    slug: 'batch-extract',
    industry: '文件批次處理',
    category: 'automation',
    categoryLabel: '自動化',
    status: '已交付',
    title: '批次轉檔與欄位萃取',
    summary: '上千份 PDF 由人工逐份打字，改成批次萃取欄位、低信心值標記，只需抽樣校對。',
    beforeFile: 'PDF人工輸入.xlsx',
    afterFile: 'batch-extract',
    before: '上千份 PDF 由人工逐份打字進系統，打錯要重新核對整批。',
    after: '批次萃取欄位、低信心值標記，只需抽樣校對。',
    sheet: {
      head: ['檔名', '欄位', '輸入者', '狀態'],
      rows: [
        [{ t: '0812-1' }, { t: '12' }, { t: '人工' }, { t: '重打', warn: true }],
        [{ t: '0812-2' }, { t: '?', warn: true }, { t: '人工' }, { t: '待核', warn: true }],
      ],
    },
    kpis: ['1,200 份', '校對 3%'],
    bars: [90, 86, 92, 88, 94, 90, 87, 93, 89],
    results: ['1,200 份 5 天 → 40 分', '人工校對 只剩 3%'],
    detail: {
      context:
        '每個月有上千份格式相近的 PDF 需要把欄位打進系統，由工讀生逐份輸入。輸入錯誤要等到後段流程才會發現，屆時得整批重新核對。',
      approach: [
        '依版面規則萃取欄位，不是整份 OCR — 準確率高很多也快很多。',
        '每個欄位給一個信心值，低於門檻的自動標記出來讓人優先看。',
        '產出結果與原始 PDF 並排呈現，校對時不必兩邊切換。',
      ],
      outcome: '1,200 份的處理時間從 5 天降到 40 分鐘，需要人工校對的比例只剩 3%。',
      stack: ['Python', 'PDF 解析', 'Pandas'],
      duration: '約 3 週',
    },
  },
  {
    slug: 'quiz-analytics',
    industry: '教育訓練',
    category: 'dashboard',
    categoryLabel: '儀表板',
    status: '已交付',
    title: '題庫練習與錯題統計',
    summary: '紙本題庫改成線上練習即時判卷，錯題依章節統計成儀表板。',
    beforeFile: '紙本題庫成績.xlsx',
    afterFile: 'pcic-web',
    before: '紙本題庫發下去，學員不知道自己弱在哪，講師也看不到分佈。',
    after: '線上練習即時判卷，錯題依章節統計成儀表板。',
    sheet: {
      head: ['學員', '分數', '章節', '弱項'],
      rows: [
        [{ t: 'A 君' }, { t: '72' }, { t: '—', warn: true }, { t: '不明', warn: true }],
        [{ t: 'B 君' }, { t: '64' }, { t: '—', warn: true }, { t: '不明', warn: true }],
      ],
    },
    kpis: ['2,000 題', '錯題已分類'],
    bars: [38, 74, 50, 66, 82, 44, 70, 58, 76],
    results: ['2,000 題上線', '弱項章節 一眼可見'],
    detail: {
      context:
        '證照考前訓練用紙本題庫，學員做完只知道分數，不知道自己哪個章節特別弱；講師也看不到全班的弱項分佈，只能憑印象加強。',
      approach: [
        '題庫全部數位化並標記章節與難度。',
        '線上練習即時判卷，做完立刻看到錯在哪、對應課本哪一節。',
        '講師端儀表板呈現全班的章節正確率，上課前就知道要加強什麼。',
        '純前端實作，不需要後端與帳號，學員打開網頁就能用。',
      ],
      outcome: '2,000 題上線，學員與講師都能一眼看出弱項章節。',
      stack: ['JavaScript', '純靜態部署'],
      duration: '約 3 週',
    },
  },
];

export const steps = [
  {
    no: 'STEP 01',
    title: '需求訪談',
    desc: '先看你現在怎麼做這件事，不急著談技術。多半 40 分鐘就夠。',
    meta: '免費 · 線上或到廠',
  },
  {
    no: 'STEP 02',
    title: '範圍與報價',
    desc: '寫成一份文件：做什麼、不做什麼、幾週、多少錢。你同意才開始。',
    meta: '書面確認',
  },
  {
    no: 'STEP 03',
    title: '開發與週回報',
    desc: '每週給一次可以點的版本與進度，隨時能提早喊停或調整。',
    meta: '每週 1 次',
  },
  {
    no: 'STEP 04',
    title: '驗收上線',
    desc: '用你的真實資料跑一輪，含教學與操作文件。',
    meta: '含教學',
  },
  {
    no: 'STEP 05',
    title: '交付後維護',
    desc: '原始碼與資料庫都在你手上，30 天內免費修 bug，之後依工時計費。要換工程師接手也交得出去。',
    meta: '30 天保固 · 可轉手',
    green: true,
  },
];

export const aboutPoints = [
  { title: '直接對接', desc: '談需求的人就是寫程式的人，不必轉述兩次。' },
  { title: '不轉包', desc: '不外派、不轉手給第三方，程式由我自己寫。' },
  { title: '公開程式碼', desc: '21 個 repo 公開在 GitHub，寫得好不好你自己判斷。' },
  { title: '會說做不到', desc: '吃不下的時程與範圍會當面講，不先接再拖。' },
];

export const skills = [
  { name: '後端與資料', years: '5 年+', items: 'Python · FastAPI · PostgreSQL · SQLite · Pandas' },
  { name: '自動化與爬蟲', years: '5 年+', items: 'Playwright · GitHub Actions · 排程與重試機制' },
  { name: '前端與儀表板', years: '4 年+', items: 'TypeScript · Astro · 原生 JS · 響應式版面' },
  { name: '影像與檢測', years: '3 年+', items: 'YOLOv8 · OpenCV · CCD 產線整合' },
  { name: '部署與維運', years: '4 年+', items: 'Docker · Caddy · 監控與備份' },
];

export const faqs = [
  {
    q: '做完就跑怎麼辦？我最怕這個。',
    a: '交付時原始碼、資料庫與部署文件都給你，放在你自己的帳號與主機上，不綁在我這裡。上線後 30 天內的 bug 免費修，之後的調整依工時計費。真的要換人接手，文件與程式碼都能直接交給下一位工程師。',
  },
  {
    q: '我不懂技術，會不會被亂報價？',
    a: '報價前會先寫一份範圍文件：做哪些功能、不做哪些、幾週、多少錢，用你聽得懂的話寫。你看完同意才開始，中途要加東西也是先估工時再決定。',
  },
  {
    q: '一個人做，會不會做太慢或做不完？',
    a: '所以我會先確認時程吃不吃得下，吃不下會直接說。單一系統的常見規模是 3 到 8 週，開發期間每週給你一次可以點的版本，進度看得到。',
  },
  {
    q: '我們現在都用 Excel，資料要重新輸入嗎？',
    a: '不用。既有 Excel 可以直接匯入，欄位對照與資料清理是我的工作。過渡期也可以先讓兩邊並行，確認數字一致再全面切換。',
  },
  {
    q: '為什麼要把程式碼公開？這樣安全嗎？',
    a: '公開的是通用工具與練習專案，客戶的系統與資料不會公開。公開的目的是讓你在付錢之前，能先看到我實際寫出來的東西。',
  },
];
