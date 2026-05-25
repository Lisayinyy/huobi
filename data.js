// 中国货币历史数据库
// Chinese Currency History — A Letter to Grandma 致敬

const ERAS = [
  {
    id: 'shang-zhou',
    name: '商周',
    pinyin: 'Shāng Zhōu',
    startYear: -1600,
    endYear: -256,
    yearLabel: '约公元前1600 — 公元前256',
    color: '#8b6f47',
    icon: '貝',
    summary: '海贝为币，万物初定。先民以南海之贝壳为通货，"貝"字遂入万千与财富相关的汉字。',
    quote: '"贝者，海介虫也。象形。古者货贝而宝龟。"——《说文解字》'
  },
  {
    id: 'spring-autumn',
    name: '春秋战国',
    pinyin: 'Chūn Qiū Zhàn Guó',
    startYear: -770,
    endYear: -221,
    yearLabel: '公元前770 — 公元前221',
    color: '#a67c52',
    icon: '刀',
    summary: '七雄并立，币制纷繁。布、刀、圜、蚁鼻，形态各异，各诸侯铸己之币以彰国威。',
    quote: '"齐之法化，燕之明刀，楚之蚁鼻，秦之半两。"'
  },
  {
    id: 'qin',
    name: '秦',
    pinyin: 'Qín',
    startYear: -221,
    endYear: -207,
    yearLabel: '公元前221 — 公元前207',
    color: '#7a3b2e',
    icon: '半',
    summary: '始皇一统，币制归一。废六国旧币，行"半两钱"，圆形方孔，自此定型两千余年。',
    quote: '"上币黄金，以镒名；下币铜钱，识曰半两。"——《史记·平准书》'
  },
  {
    id: 'han',
    name: '两汉',
    pinyin: 'Liǎng Hàn',
    startYear: -206,
    endYear: 220,
    yearLabel: '公元前206 — 公元220',
    color: '#8b4513',
    icon: '銖',
    summary: '五铢钱行，绵延七百年。汉武元狩五年初铸，至唐武德四年方废，为中国行用最久之钱。',
    quote: '"铸五铢钱，周郭其下，令不可摩取鋊焉。"——《汉书·武帝纪》'
  },
  {
    id: 'three-kingdoms',
    name: '三国两晋',
    pinyin: 'Sān Guó Liǎng Jìn',
    startYear: 220,
    endYear: 420,
    yearLabel: '公元220 — 公元420',
    color: '#6b4423',
    icon: '直',
    summary: '战乱纷飞，币值崩坏。蜀铸"直百五铢"，吴铸"大泉五百"、"大泉当千"，皆为虚值大钱。',
    quote: '"豫章铜山，铸钱八千万。"——《三国志·吴书》'
  },
  {
    id: 'tang',
    name: '唐',
    pinyin: 'Táng',
    startYear: 618,
    endYear: 907,
    yearLabel: '公元618 — 公元907',
    color: '#b8860b',
    icon: '通',
    summary: '开元通宝，再造钱制。废五铢，行年号钱，"通宝"二字始入币文，影响日韩越千年。',
    quote: '"武德四年七月，废五铢钱，行开元通宝钱，径八分，重二铢四絫。"——《旧唐书》'
  },
  {
    id: 'song',
    name: '宋',
    pinyin: 'Sòng',
    startYear: 960,
    endYear: 1279,
    yearLabel: '公元960 — 公元1279',
    color: '#166534',
    icon: '交',
    summary: '世界首张纸币诞生于斯。北宋四川"交子"始行于公元1023年，比欧洲早六百余年。',
    quote: '"蜀人以铁钱重，私为券，谓之交子，以便贸易。"——《宋史·食货志》'
  },
  {
    id: 'yuan',
    name: '元',
    pinyin: 'Yuán',
    startYear: 1271,
    endYear: 1368,
    yearLabel: '公元1271 — 公元1368',
    color: '#2c5530',
    icon: '鈔',
    summary: '中统至元，宝钞独行。元朝以纸币为主币，铜钱降为附属，开纸币本位制之先河。',
    quote: '"中统元年，始造交钞，以丝为本……每银五十两易丝钞一千两。"——《元史·食货志》'
  },
  {
    id: 'ming',
    name: '明',
    pinyin: 'Míng',
    startYear: 1368,
    endYear: 1644,
    yearLabel: '公元1368 — 公元1644',
    color: '#8b4789',
    icon: '銀',
    summary: '白银货币化，一条鞭法。隆庆开关后海外白银涌入，民间交易以银为主，铜钱辅之。',
    quote: '"凡赋役一条鞭法，总括一州县之赋役……皆计亩征银。"——《明史·食货志》'
  },
  {
    id: 'qing',
    name: '清',
    pinyin: 'Qīng',
    startYear: 1644,
    endYear: 1911,
    yearLabel: '公元1644 — 公元1911',
    color: '#7c2d12',
    icon: '銀',
    summary: '银两制盛行，机制币兴起。光绪年间始铸银元、铜元，机器铸币时代来临。',
    quote: '"光绪十三年，张之洞奏请购机铸钱，开机器铸币之先声。"'
  },
  {
    id: 'republic',
    name: '中华民国',
    pinyin: 'Zhōng Huá Mín Guó',
    startYear: 1912,
    endYear: 1949,
    yearLabel: '公元1912 — 公元1949',
    color: '#475569',
    icon: '圓',
    summary: '银元、法币、金圆券。从袁大头到法币改革，再到金圆券崩溃，三十七年币制风云。',
    quote: '"国币条例：以库平纯银六钱四分八厘为价格之单位，定名曰圆。"'
  },
  {
    id: 'liberated',
    name: '革命根据地',
    pinyin: 'Gé Mìng Gēn Jù Dì',
    startYear: 1927,
    endYear: 1948,
    yearLabel: '公元1927 — 公元1948',
    color: '#b91c1c',
    icon: '蘇',
    summary: '红色货币，星火燎原。从中华苏维埃共和国国家银行到各解放区银行，奠定新中国货币基础。',
    quote: '"1932年2月1日，中华苏维埃共和国国家银行在瑞金成立，毛泽民任行长。"'
  },
  {
    id: 'prc-early',
    name: '人民币（早期）',
    pinyin: 'Rén Mín Bì',
    startYear: 1948,
    endYear: 1987,
    yearLabel: '公元1948 — 公元1987',
    color: '#dc2626',
    icon: '圆',
    summary: '人民币诞生与四套币的演进。1948年12月1日，中国人民银行成立，首套人民币发行。',
    quote: '"中国人民银行成立。本日起发行人民币。"——1948年12月1日新华社电'
  },
  {
    id: 'modern',
    name: '当代',
    pinyin: 'Dāng Dài',
    startYear: 1999,
    endYear: 2024,
    yearLabel: '公元1999 — 至今',
    color: '#0891b2',
    icon: '元',
    summary: '第五套人民币与数字时代。1999年第五套发行，2014年数字人民币立项，传统与未来交汇。',
    quote: '"数字人民币是央行发行的数字形式法定货币，由指定运营机构参与运营……"'
  }
];

const CURRENCIES = [
  // ========== 商周 ==========
  {
    id: 'sea-shell',
    name: '海贝',
    pinyin: 'Hǎi Bèi',
    era: 'shang-zhou',
    startYear: -1600,
    endYear: -256,
    type: '实物货币',
    material: '齿贝/紫贝',
    shape: '天然贝壳',
    regions: ['中原', '南方', '西北'],
    weight: '约1克',
    description: '中国最早的货币之一。商代以海贝为货币，多产于南海。十贝为一朋，"朋"字便由此而来。',
    significance: '汉字中凡与财富相关者，如财、货、贸、贵、贱、赋、贸、贷、贪、贫等，皆从"贝"。',
    facts: [
      '殷墟出土的贝币多为齿贝（Cypraea moneta）',
      '一朋为十贝，是最早的货币单位',
      '当贝币稀缺时，出现了石贝、骨贝、蚌贝等仿制品',
      '到春秋时期，云南地区仍在使用贝币'
    ],
    color: '#f5f5dc'
  },
  {
    id: 'bronze-shell',
    name: '铜贝',
    pinyin: 'Tóng Bèi',
    era: 'shang-zhou',
    startYear: -1100,
    endYear: -300,
    type: '金属货币',
    material: '青铜',
    shape: '仿贝形',
    regions: ['中原', '楚地'],
    weight: '约2-3克',
    description: '商代晚期至西周时期出现的世界上最早的金属铸币，由青铜铸成贝壳形状。',
    significance: '人类货币史上的革命：从天然物货币走向人工铸造金属货币。',
    facts: [
      '河南安阳殷墟妇好墓出土过铜贝',
      '是世界上最早的金属铸币之一',
      '战国时期楚国的"蚁鼻钱"即为铜贝的延续',
      '形制小巧，便于穿系携带'
    ],
    color: '#8b6f47'
  },

  // ========== 春秋战国 ==========
  {
    id: 'spade-coin',
    name: '布币',
    pinyin: 'Bù Bì',
    era: 'spring-autumn',
    startYear: -770,
    endYear: -221,
    type: '青铜铸币',
    material: '青铜',
    shape: '铲形/铙形',
    regions: ['三晋', '周', '燕'],
    weight: '约15-25克',
    description: '由农具"镈"演变而来，形似铲子。流通于韩、赵、魏、周等农耕地区。',
    significance: '反映了"以工具为币"的演化规律——货币的雏形往往脱胎于流通最广的实用器物。',
    facts: [
      '春秋时期为"空首布"（保留铲柄銎口），战国时演变为"平首布"',
      '面文常铸地名，如"安邑"、"梁"、"晋阳"',
      '三晋地区（韩赵魏）以方足布为主',
      '燕国布币多为尖足布'
    ],
    color: '#5d4037'
  },
  {
    id: 'knife-coin',
    name: '刀币',
    pinyin: 'Dāo Bì',
    era: 'spring-autumn',
    startYear: -600,
    endYear: -221,
    type: '青铜铸币',
    material: '青铜',
    shape: '刀形',
    regions: ['齐', '燕', '赵'],
    weight: '约30-50克',
    description: '由渔猎工具"削"演变而来。齐国"齐法化"最为精美，燕国"明刀"流通最广。',
    significance: '齐刀厚重精美，是中国早期铸币艺术的巅峰之作。',
    facts: [
      '齐刀"齐返邦长法化"为齐桓公田单复国后所铸，是著名"齐六字刀"',
      '燕国"明刀"出土于河北、辽东，远及朝鲜半岛',
      '一枚齐刀长约18厘米，相当于现今一把小匕首',
      '刀环可穿绳串系，便于携带'
    ],
    color: '#6b5b73'
  },
  {
    id: 'round-coin',
    name: '圜钱',
    pinyin: 'Huán Qián',
    era: 'spring-autumn',
    startYear: -350,
    endYear: -221,
    type: '青铜铸币',
    material: '青铜',
    shape: '圆形圆孔/圆形方孔',
    regions: ['秦', '魏', '齐'],
    weight: '约6-10克',
    description: '战国晚期出现的圆形铸币。先为圆孔，后改方孔，奠定了后世两千年钱币基本形制。',
    significance: '圆形方孔——天圆地方的宇宙观凝于一钱，秦朝据此定型半两钱。',
    facts: [
      '最早的圜钱出现于战国晚期魏国，如"垣"字钱',
      '秦"半两"是圜钱的最终定型',
      '"孔方兄"一词后世成为铜钱的别称',
      '圆形便于流通，方孔便于穿系成串'
    ],
    color: '#a0826d'
  },
  {
    id: 'ant-nose',
    name: '蚁鼻钱',
    pinyin: 'Yǐ Bí Qián',
    era: 'spring-autumn',
    startYear: -500,
    endYear: -223,
    type: '青铜铸币',
    material: '青铜',
    shape: '椭圆形',
    regions: ['楚'],
    weight: '约2-5克',
    description: '楚国独有的小型铜贝，因币面文字状似蚂蚁与鼻子而得名，又称"鬼脸钱"。',
    significance: '与北方布币、刀币分庭抗礼，反映了战国时期南北货币文化的差异。',
    facts: [
      '面文多为"咒"字，状似一张鬼脸',
      '是青铜贝币的最终演变形态',
      '楚国疆域辽阔，蚁鼻钱出土遍及湖北、湖南、安徽',
      '最小者仅长1.5厘米，俗称"小钱"'
    ],
    color: '#4a4a4a'
  },

  // ========== 秦 ==========
  {
    id: 'ban-liang',
    name: '半两',
    pinyin: 'Bàn Liǎng',
    era: 'qin',
    startYear: -221,
    endYear: -118,
    type: '青铜铸币',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约8-12克（秦半两）',
    description: '秦始皇一统六国后，废除六国旧币，行半两钱于天下，重十二铢，约今8克。',
    significance: '中国货币史上第一次大一统，确立"圆形方孔"为标准形制，影响后世两千余年。',
    facts: [
      '"半两"为面文重量，一两为24铢，半两即12铢',
      '秦半两面背均无内外郭，文字凸起',
      '汉初继承秦制，但减重至"榆荚半两"（约1克），通胀严重',
      '汉文帝时铸"四铢半两"，重量稳定下来'
    ],
    color: '#7a3b2e'
  },

  // ========== 两汉 ==========
  {
    id: 'wu-zhu',
    name: '五铢钱',
    pinyin: 'Wǔ Zhū',
    era: 'han',
    startYear: -118,
    endYear: 621,
    type: '青铜铸币',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约3.5克',
    description: '汉武帝元狩五年（前118）始铸，至唐高祖武德四年（621）方废，行用七百三十九年。',
    significance: '中国货币史上行用最久、影响最深的铜钱，确立了"铢两体系"。',
    facts: [
      '面文"五铢"为篆书，制作精美',
      '汉武帝先铸三铢，旋改五铢，并禁止郡国铸钱',
      '上林三官（钟官、辨铜、均输）专铸，史称"三官五铢"',
      '魏晋南北朝时期五铢被各代修改：东汉剪边五铢、董卓小钱、太平百钱……'
    ],
    color: '#8b4513'
  },
  {
    id: 'huo-quan',
    name: '货泉',
    pinyin: 'Huò Quán',
    era: 'han',
    startYear: 14,
    endYear: 40,
    type: '青铜铸币',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约2.8-3.5克',
    description: '王莽天凤元年（14年）铸，新朝末期主要流通货币。莽币制作工艺精美，书法独绝。',
    significance: '王莽币制改革六次，是中国货币史上的"奇葩时代"，币制混乱但艺术成就极高。',
    facts: [
      '"货泉"二字为悬针篆，笔画末端如悬针，是中国书法艺术之珍品',
      '王莽前后铸"大泉五十"、"契刀五百"、"一刀平五千"等大钱',
      '"一刀平五千"以黄金错入"一刀"二字，是错金币之绝唱',
      '王莽币制改革破坏了五铢钱体系，引发社会动荡'
    ],
    color: '#a06f3f'
  },

  // ========== 三国两晋 ==========
  {
    id: 'zhi-bai-wu-zhu',
    name: '直百五铢',
    pinyin: 'Zhí Bǎi Wǔ Zhū',
    era: 'three-kingdoms',
    startYear: 214,
    endYear: 263,
    type: '虚值大钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['蜀汉'],
    weight: '约8-10克',
    description: '刘备入蜀后铸，一枚抵五铢钱一百枚。"直百"即"值百"。',
    significance: '战乱时期为筹军费而铸的虚值大钱，开启了"以小博大"的恶性通胀模式。',
    facts: [
      '据《三国志》记载，刘备铸此钱以充军实，数月便"府库充实"',
      '初铸版重约9克，后期减重至2-3克',
      '部分背铸"为"字，为益州犍为郡所造',
      '蜀汉灭亡后此钱逐渐退出流通'
    ],
    color: '#6b4423'
  },
  {
    id: 'da-quan-wu-bai',
    name: '大泉五百',
    pinyin: 'Dà Quán Wǔ Bǎi',
    era: 'three-kingdoms',
    startYear: 236,
    endYear: 280,
    type: '虚值大钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['东吴'],
    weight: '约12克',
    description: '东吴孙权赤乌元年（238）铸，一枚当五铢五百枚，是典型的虚值大钱。',
    significance: '东吴接连铸"大泉五百"、"大泉当千"、"大泉二千"、"大泉五千"，币值层层放大。',
    facts: [
      '孙权曾下令收缴民间铜器以铸钱',
      '民间不堪重负，怨声载道',
      '大泉系列因虚值过高，最终被废止',
      '后世收藏价值反而极高'
    ],
    color: '#5d4e37'
  },

  // ========== 唐 ==========
  {
    id: 'kaiyuan-tongbao',
    name: '开元通宝',
    pinyin: 'Kāi Yuán Tōng Bǎo',
    era: 'tang',
    startYear: 621,
    endYear: 907,
    type: '通宝钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约4克',
    description: '唐高祖武德四年（621）始铸，废五铢钱。"开元"非年号，意为"开辟新纪元"。',
    significance: '"通宝"二字首次入币文，开创了"年号钱+通宝"的命名传统，影响日、韩、越、琉球千年。',
    facts: [
      '面文"开元通宝"为大书法家欧阳询所书',
      '"开元通宝"四字之外，背常铸星月纹及州名（如"洛"、"益"、"梁"）',
      '一枚开元通宝重二铢四絫，十枚为一两，奠定"十进位"重量制',
      '后世日本"和同开珎"、越南"太平兴宝"皆仿其制'
    ],
    color: '#b8860b'
  },
  {
    id: 'qianyuan-zhongbao',
    name: '乾元重宝',
    pinyin: 'Qián Yuán Zhòng Bǎo',
    era: 'tang',
    startYear: 759,
    endYear: 762,
    type: '虚值大钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约16克',
    description: '安史之乱后，唐肃宗乾元二年（759）铸，一当开元通宝十枚，后又铸"重轮乾元重宝"当五十。',
    significance: '战乱催生的虚值大钱，导致"虚估之钱通行，物价飞涨"，民生凋敝。',
    facts: [
      '初铸"乾元重宝"一当十，后铸"重轮乾元重宝"一当五十',
      '民间盗铸大盛，每月所死者不下数百人',
      '后改为一当三十、一当三、一当一，最终统一为一钱',
      '此次币制改革被史家视为唐代由盛转衰的标志之一'
    ],
    color: '#a86b1c'
  },

  // ========== 宋 ==========
  {
    id: 'song-yuan-tongbao',
    name: '宋元通宝',
    pinyin: 'Sòng Yuán Tōng Bǎo',
    era: 'song',
    startYear: 960,
    endYear: 976,
    type: '通宝钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约3.5克',
    description: '宋太祖建隆元年（960）铸，宋朝第一种铜钱。形制仿开元通宝。',
    significance: '宋代铸币业极盛，年铸量是唐代的二十倍，是中国古代铸币最辉煌的时代。',
    facts: [
      '宋代铸钱遍布全国，最盛时年铸506万贯',
      '宋钱版式繁多，仅"崇宁通宝"就有数百种版别',
      '宋徽宗御书"崇宁通宝"、"大观通宝"，瘦金体入币文',
      '宋钱大量流入日本、朝鲜、越南、东南亚，成为国际货币'
    ],
    color: '#a0522d'
  },
  {
    id: 'jiaozi',
    name: '交子',
    pinyin: 'Jiāo Zi',
    era: 'song',
    startYear: 1023,
    endYear: 1107,
    type: '纸币',
    material: '楮皮纸',
    shape: '长方形纸券',
    regions: ['四川'],
    weight: '极轻',
    description: '世界上最早的纸币。北宋仁宗天圣元年（1023）正式发行于成都，由益州交子务专司。',
    significance: '人类货币史上的伟大革命：从金属货币到信用货币的飞跃，比欧洲早六百余年。',
    facts: [
      '初由成都十六富商私印，称"交子铺"',
      '宋仁宗收归官办，设"益州交子务"于1023年',
      '交子分界发行，每界三年（后改两年）',
      '面值有一贯、五贯、十贯等，以铁钱为本',
      '后改为"钱引"，再演为"会子"，南宋会子曾通行全国',
      '马可·波罗将纸币惊讶之事记入《东方见闻录》'
    ],
    color: '#d4a017'
  },
  {
    id: 'chongning-tongbao',
    name: '崇宁通宝',
    pinyin: 'Chóng Níng Tōng Bǎo',
    era: 'song',
    startYear: 1102,
    endYear: 1106,
    type: '当十大钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约12克',
    description: '宋徽宗崇宁年间铸，"崇宁通宝"四字为徽宗瘦金体御书，被誉为"宋钱第一"。',
    significance: '中国书法艺术与铸币工艺完美结合的巅峰之作，钱文铁画银钩，独步千古。',
    facts: [
      '"崇宁通宝"四字为宋徽宗赵佶亲笔御书',
      '瘦金体笔画铁画银钩，是中国钱币书法艺术的巅峰',
      '同期还铸有"崇宁重宝"、"大观通宝"、"政和通宝"',
      '徽宗时期所铸钱币，是中国钱币史上的"瑰宝时代"'
    ],
    color: '#2e7d32'
  },

  // ========== 元 ==========
  {
    id: 'zhongtong-jiaochao',
    name: '中统元宝交钞',
    pinyin: 'Zhōng Tǒng Yuán Bǎo Jiāo Chāo',
    era: 'yuan',
    startYear: 1260,
    endYear: 1294,
    type: '纸币',
    material: '桑皮纸',
    shape: '长方形纸券',
    regions: ['全国'],
    weight: '极轻',
    description: '元世祖忽必烈中统元年（1260）发行，是中国第一种行用全国的法定纸币。',
    significance: '元朝是中国历史上唯一以纸币为主币的朝代，铜钱反居其次，奠定现代纸币流通基础。',
    facts: [
      '面值有十文、二十文、三十文……至二贯共十等',
      '以银为本，每银一两易钞两贯',
      '中统钞行用三十余年，币值相对稳定',
      '至元二十四年（1287）发行"至元通行宝钞"取代之',
      '至正十年（1350）发行"至正交钞"，恶性通胀终结元朝财政'
    ],
    color: '#4a5d4f'
  },
  {
    id: 'zhiyuan-tongxing',
    name: '至元通行宝钞',
    pinyin: 'Zhì Yuán Tōng Xíng Bǎo Chāo',
    era: 'yuan',
    startYear: 1287,
    endYear: 1310,
    type: '纸币',
    material: '桑皮纸',
    shape: '长方形纸券',
    regions: ['全国'],
    weight: '极轻',
    description: '元至元二十四年（1287）发行，与中统钞同行，一贯当中统钞五贯。',
    significance: '马可·波罗在游记中详细记述了元朝纸币的发行流程，使欧洲首次知晓"印纸为钱"之奇事。',
    facts: [
      '马可·波罗惊叹："大汗在汗八里之造币局完全可称为完美无比的炼金术。"',
      '设有"宝钞总库"管理印制',
      '伪造者死罪，告发者厚赏',
      '元代纸币是世界上最早的法定不兑现纸币'
    ],
    color: '#3e4e36'
  },

  // ========== 明 ==========
  {
    id: 'daming-baochao',
    name: '大明通行宝钞',
    pinyin: 'Dà Míng Tōng Xíng Bǎo Chāo',
    era: 'ming',
    startYear: 1375,
    endYear: 1573,
    type: '纸币',
    material: '桑皮纸',
    shape: '长方形纸券（最大）',
    regions: ['全国'],
    weight: '极轻',
    description: '明洪武八年（1375）发行，是世界上面积最大的纸币（长34厘米，宽22厘米）。',
    significance: '明朝纸币因不能兑换、滥发严重，迅速贬值，最终促成白银货币化。',
    facts: [
      '面额一贯，相当于铜钱一千文或银一两',
      '钞面有"大明宝钞，天下通行"八字篆书',
      '不立兑换制度，无限制发行',
      '至成化年间一贯钞实际只值四文铜钱',
      '隆庆元年（1567）后退出流通'
    ],
    color: '#6b5b73'
  },
  {
    id: 'yongle-tongbao',
    name: '永乐通宝',
    pinyin: 'Yǒng Lè Tōng Bǎo',
    era: 'ming',
    startYear: 1408,
    endYear: 1424,
    type: '通宝钱',
    material: '青铜',
    shape: '圆形方孔',
    regions: ['全国', '南洋'],
    weight: '约4克',
    description: '明成祖永乐六年（1408）铸，制作精美，多用于对外贸易。',
    significance: '随郑和下西洋远播南洋、东非，成为东南亚地区流通的国际货币。',
    facts: [
      '郑和下西洋赏赐沿途各国，永乐通宝遍及南洋',
      '日本、越南均仿铸过永乐通宝',
      '非洲肯尼亚拉穆群岛曾出土永乐通宝',
      '明代铜钱多直径较大，制作工整'
    ],
    color: '#8b4513'
  },
  {
    id: 'ming-silver-ingot',
    name: '银锭（明）',
    pinyin: 'Yín Dìng',
    era: 'ming',
    startYear: 1567,
    endYear: 1644,
    type: '称量货币',
    material: '白银',
    shape: '马蹄形/船形',
    regions: ['全国（江南最盛）'],
    weight: '约50两（约1860克）',
    description: '明代中后期，白银成为主要流通货币。一条鞭法实行后，赋税悉以白银缴纳。',
    significance: '隆庆开关后，海外白银（主要来自西班牙美洲殖民地）大量流入中国，奠定"银本位"基础。',
    facts: [
      '明代白银流入中国约4亿两',
      '一条鞭法将徭役、田赋、杂税合为一条，皆征白银',
      '银锭按形状分马蹄锭、船形锭、馒头锭等',
      '"足色"银含银95%以上，差者称"低银"',
      '使用时需称重，故称"称量货币"'
    ],
    color: '#c0c0c0'
  },

  // ========== 清 ==========
  {
    id: 'shunzhi-tongbao',
    name: '顺治通宝',
    pinyin: 'Shùn Zhì Tōng Bǎo',
    era: 'qing',
    startYear: 1644,
    endYear: 1661,
    type: '通宝钱',
    material: '黄铜',
    shape: '圆形方孔',
    regions: ['全国'],
    weight: '约4克',
    description: '清世祖顺治元年（1644）始铸，清代第一种铜钱。形制承明制，但开始铸"满汉文"。',
    significance: '"顺治五式"开创清钱基本格局：背文从无字到铸局名（满汉双文），延续清代260余年。',
    facts: [
      '顺治通宝共有五式版别，背文各异',
      '第一式背无字，第二式背一字（局名），第三式背一厘',
      '第四式背满文宝泉、宝源',
      '第五式背满汉双文（如"宝泉"、"宝苏"），成为定式'
    ],
    color: '#cd7f32'
  },
  {
    id: 'kangxi-tongbao',
    name: '康熙通宝',
    pinyin: 'Kāng Xī Tōng Bǎo',
    era: 'qing',
    startYear: 1662,
    endYear: 1722,
    type: '通宝钱',
    material: '黄铜',
    shape: '圆形方孔',
    regions: ['全国（20局）'],
    weight: '约4-5克',
    description: '清圣祖康熙年间所铸，前后六十一年，是清代最具收藏热度的铜钱。',
    significance: '民间将康熙通宝背文二十种铸局编成"康熙通宝二十品"诗，流传至今，是钱币文化的雅趣。',
    facts: [
      '背满汉文铸局：同福临东江、宣原苏蓟昌、南河宁广浙、台桂陕云漳',
      '俗称"罗汉钱"——传说康熙六十大寿时，化罗汉金身入钱，钱质金黄',
      '"罗汉钱"民间视为吉祥物，姑娘出嫁的"压箱钱"',
      '台局（台湾府）所铸"康熙通宝背台"为珍品'
    ],
    color: '#b8860b'
  },
  {
    id: 'qianlong-tongbao',
    name: '乾隆通宝',
    pinyin: 'Qián Lóng Tōng Bǎo',
    era: 'qing',
    startYear: 1736,
    endYear: 1795,
    type: '通宝钱',
    material: '黄铜',
    shape: '圆形方孔',
    regions: ['全国（包括新疆）'],
    weight: '约4-5克',
    description: '清高宗乾隆年间铸，铸量极大，是民间使用最为广泛的清钱之一。',
    significance: '乾隆朝平定新疆后，于阿克苏、叶尔羌等地设局铸"乾隆通宝"，钱币流通遍及西域。',
    facts: [
      '新疆红钱（紫红色铜质）独具特色',
      '背满文左"宝"右铸局名（如"宝伊"为伊犁局）',
      '"乾隆通宝"民间称"乾隆大钱"，吉祥钱',
      '部分"乾隆通宝"为"宫钱"，铸工精美，赏赐用'
    ],
    color: '#daa520'
  },
  {
    id: 'guangxu-yuanbao',
    name: '光绪元宝',
    pinyin: 'Guāng Xù Yuán Bǎo',
    era: 'qing',
    startYear: 1889,
    endYear: 1911,
    type: '机制银元',
    material: '银',
    shape: '圆形（无孔）',
    regions: ['广东', '湖北', '江南'],
    weight: '约26.85克（库平七钱二分）',
    description: '光绪十五年（1889）张之洞于广东首开机器铸银元先河，从此中国进入机制币时代。',
    significance: '中国第一种机制银元，正面满汉文"光绪元宝"，背面蟠龙图案，俗称"龙洋"。',
    facts: [
      '广东"光绪元宝"是中国近代第一种机制银元',
      '张之洞从英国伯明翰订购造币机器',
      '"七钱二分"重为后来"银元一圆"标准',
      '各省纷纷设局自铸：湖北、江南、北洋、四川……版别繁多',
      '"奉天一两"、"广东双龙寿字币"是珍品中珍品'
    ],
    color: '#a8a8a8'
  },
  {
    id: 'qing-copper-yuan',
    name: '光绪铜元',
    pinyin: 'Guāng Xù Tóng Yuán',
    era: 'qing',
    startYear: 1900,
    endYear: 1911,
    type: '机制铜元',
    material: '红铜',
    shape: '圆形（无孔）',
    regions: ['全国（17省）'],
    weight: '约7.5克',
    description: '光绪二十六年（1900）广东始铸机制铜元，无方孔，正面"光绪元宝"，背面飞龙。',
    significance: '取代了流通两千余年的方孔圆钱，"孔方兄"在清末退出历史舞台。',
    facts: [
      '面值有"当十文"、"当二十文"两种',
      '广东、福建、湖北、湖南……各省纷纷设局自铸',
      '版式数百种，是钱币收藏的一大门类',
      '"己酉年大清铜币中心宁字"等版别极为珍稀'
    ],
    color: '#b87333'
  },

  // ========== 民国 ==========
  {
    id: 'yuan-shikai',
    name: '袁大头',
    pinyin: 'Yuán Dà Tóu',
    era: 'republic',
    startYear: 1914,
    endYear: 1928,
    type: '银元',
    material: '银（89%）',
    shape: '圆形',
    regions: ['全国'],
    weight: '26.86克',
    description: '民国三年（1914）"国币条例"颁布后铸造，正面袁世凯侧面像，俗称"袁大头"。',
    significance: '民国时期流通最广、信誉最佳的银元，是近代中国货币史上的代表性硬通货。',
    facts: [
      '主要版本：民国三年、八年、九年、十年',
      '含银89%，重七钱二分（26.86克）',
      '抗战时期甚至成为日伪占领区的"避险货币"',
      '"民国三年壹圆O版签字版"为天价珍品',
      '即便今日，民间仍有"袁大头"作为传家之物'
    ],
    color: '#c0c0c0'
  },
  {
    id: 'sun-yat-sen',
    name: '孙小头',
    pinyin: 'Sūn Xiǎo Tóu',
    era: 'republic',
    startYear: 1912,
    endYear: 1927,
    type: '银元',
    material: '银',
    shape: '圆形',
    regions: ['全国'],
    weight: '26.86克',
    description: '中华民国开国纪念币，正面孙中山侧面像，俗称"孙小头"。',
    significance: '辛亥革命胜利、民国建立的历史见证，是中国第一种以总统肖像入币的银元。',
    facts: [
      '正面"中华民国开国纪念币"，背面"ONE DOLLAR"',
      '1912年首铸于江南造币厂、湖北造币厂',
      '版别繁多：上下五星、上下六星、英文错版……',
      '是近代币藏家入门级品种'
    ],
    color: '#b8b8b8'
  },
  {
    id: 'fabi',
    name: '法币',
    pinyin: 'Fǎ Bì',
    era: 'republic',
    startYear: 1935,
    endYear: 1948,
    type: '纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1935年11月3日国民政府"币制改革"，废除银本位，发行不兑现纸币，定名"法币"。',
    significance: '中国货币史上首次确立纸币的法偿地位，废除银本位，与英镑、美元挂钩。',
    facts: [
      '由中央、中国、交通、农民四大银行发行',
      '初期1法币=1先令2便士半（与英镑挂钩）',
      '1936年7月与美元挂钩，1法币=0.2975美元',
      '抗战爆发后印钞失控，至1948年贬值达4500万倍',
      '一斗米抗战前4法币，到1948年需3600万法币'
    ],
    color: '#5d6b3f'
  },
  {
    id: 'jinyuan-quan',
    name: '金圆券',
    pinyin: 'Jīn Yuán Quàn',
    era: 'republic',
    startYear: 1948,
    endYear: 1949,
    type: '纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1948年8月19日发行，1金圆券=300万法币。十个月即崩盘，成为中国货币史上最惨痛一页。',
    significance: '金圆券改革是国民政府的"最后挣扎"，民间财富在一夜之间化为乌有，加速了政权崩溃。',
    facts: [
      '强制兑换民间黄金、白银、外汇',
      '初定一金圆券含黄金0.22217克',
      '至1949年5月，发行额达68万亿，是初发行额的131万倍',
      '一石米初值20金圆券，崩溃前需4.4亿金圆券',
      '上海曾出现"金圆券面值百万"，民众以麻袋装钱购物'
    ],
    color: '#4b5e44'
  },

  // ========== 革命根据地 ==========
  {
    id: 'soviet-money',
    name: '中华苏维埃共和国国家银行币',
    pinyin: 'Zhōng Huá Sū Wéi Āi',
    era: 'liberated',
    startYear: 1932,
    endYear: 1935,
    type: '革命纸币/银币',
    material: '纸/银',
    shape: '长方形/圆形',
    regions: ['江西', '福建', '湖南'],
    weight: '银元约26克',
    description: '1932年2月1日，中华苏维埃共和国国家银行成立于瑞金，毛泽民任行长。',
    significance: '中国共产党领导下第一个国家银行，发行的纸币与银元，是新中国货币体系的雏形。',
    facts: [
      '行长毛泽民（毛泽东之弟）',
      '纸币正面有列宁像，背面有镰刀斧头',
      '面值有壹分、贰分、伍分、壹角、贰角、伍角、壹圆',
      '银币仿"袁大头"，但有"中华苏维埃共和国"字样',
      '红军长征前夕，纸币大量销毁，今存极少'
    ],
    color: '#b91c1c'
  },
  {
    id: 'border-region-coin',
    name: '陕甘宁边区银行币',
    pinyin: 'Shǎn Gān Níng',
    era: 'liberated',
    startYear: 1941,
    endYear: 1948,
    type: '革命纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['陕甘宁'],
    weight: '极轻',
    description: '陕甘宁边区银行于1941年起发行，是抗战时期边区主要货币。',
    significance: '与各解放区货币一同构成新中国货币体系的"前奏"，1948年统一为人民币。',
    facts: [
      '主要面值：1元、5元、10元、50元、100元',
      '票面常印延安宝塔山、农耕图、工业图',
      '同期还有晋察冀、晋冀鲁豫、北海银行、东北银行等',
      '1948年12月1日，各解放区货币逐步收兑为人民币'
    ],
    color: '#c1440e'
  },

  // ========== 人民币早期 ==========
  {
    id: 'rmb-first',
    name: '第一套人民币',
    pinyin: 'Dì Yī Tào Rén Mín Bì',
    era: 'prc-early',
    startYear: 1948,
    endYear: 1955,
    type: '法定纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1948年12月1日中国人民银行成立，同日发行第一套人民币。共12种面值，62种版别。',
    significance: '新中国的第一套法定货币，标志着统一货币体系的建立。董必武题写"中国人民银行"。',
    facts: [
      '最大面值5万元（牧马图），最小1元',
      '"中国人民银行"行名由董必武题写',
      '票面图案有工厂、农田、矿山、火车、长城等',
      '1955年2月以一万比一兑换第二套人民币',
      '今存量极少，"牧马图"单张拍卖价达数百万元'
    ],
    color: '#dc2626'
  },
  {
    id: 'rmb-second',
    name: '第二套人民币',
    pinyin: 'Dì Èr Tào Rén Mín Bì',
    era: 'prc-early',
    startYear: 1955,
    endYear: 1964,
    type: '法定纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1955年3月1日发行，以1:10000兑换第一套。首次出现"分"币：1分、2分、5分硬币。',
    significance: '部分高面值券（3元、5元、10元）由苏联代印，俗称"苏三币"，是中苏友好的历史见证。',
    facts: [
      '面值有1分、2分、5分、1角、2角、5角、1元、2元、3元、5元、10元',
      '3元、5元、10元委托苏联代印（"苏三币"）',
      '中苏交恶后，1964年4月15日苏三币停止流通',
      '"井冈山三元"（3元）极具收藏价值',
      '"分币"——1分、2分、5分硬币——至今仍可使用'
    ],
    color: '#b91c1c'
  },
  {
    id: 'rmb-third',
    name: '第三套人民币',
    pinyin: 'Dì Sān Tào Rén Mín Bì',
    era: 'prc-early',
    startYear: 1962,
    endYear: 2000,
    type: '法定纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1962年4月20日开始发行，是流通时间最长的人民币（38年），陪伴几代中国人。',
    significance: '"大团结十元"、"炼钢工人五元"、"女拖拉机手一元"，是新中国工业化的视觉档案。',
    facts: [
      '面值有1角、2角、5角、1元、2元、5元、10元',
      '"大团结"10元票面是各民族代表与人大代表',
      '"车工2元"是流通币中最受追捧的品种',
      '"枣红一角"、"背绿一角"为珍品',
      '至2000年7月1日完全退出流通'
    ],
    color: '#7f1d1d'
  },
  {
    id: 'rmb-fourth',
    name: '第四套人民币',
    pinyin: 'Dì Sì Tào Rén Mín Bì',
    era: 'prc-early',
    startYear: 1987,
    endYear: 2018,
    type: '法定纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1987年4月27日陆续发行，首次出现50元、100元大面值券，正面印各民族头像。',
    significance: '改革开放后的代表性货币，100元正面为毛泽东、周恩来、刘少奇、朱德四位领袖侧面浮雕。',
    facts: [
      '面值有1角、2角、5角、1元、2元、5元、10元、50元、100元',
      '正面民族头像：1角高山满、2角布依朝鲜、5角苗族壮族……',
      '100元正面为四位领袖头像（毛、周、刘、朱）',
      '50元正面为工农知识分子像',
      '2018年5月1日停止流通'
    ],
    color: '#991b1b'
  },

  // ========== 当代 ==========
  {
    id: 'rmb-fifth',
    name: '第五套人民币',
    pinyin: 'Dì Wǔ Tào Rén Mín Bì',
    era: 'modern',
    startYear: 1999,
    endYear: 2024,
    type: '法定纸币',
    material: '纸质',
    shape: '长方形',
    regions: ['全国'],
    weight: '极轻',
    description: '1999年10月1日新中国成立五十周年之际发行，统一采用毛泽东主席头像。',
    significance: '票面背景图案选用中国名胜，浓缩了中国地理人文：杭州西湖、桂林山水、长江三峡……',
    facts: [
      '100元背面：人民大会堂',
      '50元背面：拉萨布达拉宫',
      '20元背面：桂林山水',
      '10元背面：长江三峡（夔门）',
      '5元背面：泰山',
      '1元背面：杭州西湖三潭印月',
      '2015年发行2015版100元，2019年发行新版50/20/10/1元'
    ],
    color: '#dc2626'
  },
  {
    id: 'digital-rmb',
    name: '数字人民币',
    pinyin: 'Shù Zì Rén Mín Bì',
    era: 'modern',
    startYear: 2020,
    endYear: 2024,
    type: '数字货币',
    material: '数字（无实体）',
    shape: '电子钱包',
    regions: ['全国（试点扩大中）'],
    weight: '无',
    description: '中国人民银行发行的法定数字货币（DCEP），2020年4月起在深圳、苏州、雄安、成都试点。',
    significance: '世界首个由主要经济体央行发行的法定数字货币，开启货币史新纪元。',
    facts: [
      '2014年中国人民银行开始研究数字货币',
      '2020年4月起，深圳、苏州、雄安、成都四地试点',
      '2022年2月北京冬奥会期间，外国运动员首次使用数字人民币',
      '截至2023年，试点地区已扩展至26个',
      '采用"双层运营体系"：央行—商业银行—公众',
      '支持"双离线支付"——无网络也可支付'
    ],
    color: '#0891b2'
  }
];

// ============ 地区货币地理分布 ============
const REGIONAL_MAP = {
  '中原': {
    name: '中原（关中/河洛）',
    history: '历代王朝铸钱中心。秦半两、汉五铢、唐开元、宋崇宁等核心铸币均出于此。',
    currencies: ['ban-liang', 'wu-zhu', 'kaiyuan-tongbao', 'chongning-tongbao'],
    coords: { x: 50, y: 45 }
  },
  '齐': {
    name: '齐地（山东半岛）',
    history: '春秋战国之齐国，铸"齐法化"刀币，工艺精美厚重。',
    currencies: ['knife-coin'],
    coords: { x: 65, y: 38 }
  },
  '燕': {
    name: '燕地（华北辽东）',
    history: '燕国"明刀"流通最广，远至朝鲜半岛。',
    currencies: ['knife-coin'],
    coords: { x: 60, y: 25 }
  },
  '三晋': {
    name: '三晋（山西河南）',
    history: '韩、赵、魏铸布币，形态从空首布到平首布演变。',
    currencies: ['spade-coin'],
    coords: { x: 50, y: 35 }
  },
  '楚': {
    name: '楚地（江汉两湖）',
    history: '楚国"蚁鼻钱"独树一帜，铸"郢爰"金版，是中国最早的黄金货币。',
    currencies: ['ant-nose'],
    coords: { x: 55, y: 58 }
  },
  '蜀汉': {
    name: '巴蜀（四川盆地）',
    history: '蜀汉铸"直百五铢"虚值大钱。北宋"交子"在此诞生，为世界首张纸币。',
    currencies: ['zhi-bai-wu-zhu', 'jiaozi'],
    coords: { x: 40, y: 55 }
  },
  '东吴': {
    name: '江南（长江下游）',
    history: '东吴铸"大泉五百"，明清两代银锭、银元铸造重镇。',
    currencies: ['da-quan-wu-bai', 'ming-silver-ingot'],
    coords: { x: 65, y: 55 }
  },
  '岭南': {
    name: '岭南（两广）',
    history: '清末张之洞在广东首铸机制银元，开中国机制币时代。',
    currencies: ['guangxu-yuanbao', 'qing-copper-yuan'],
    coords: { x: 55, y: 78 }
  },
  '西域': {
    name: '西域（新疆）',
    history: '清乾隆平定新疆后，于阿克苏、叶尔羌等地铸"红钱"，铜质赤红。',
    currencies: ['qianlong-tongbao'],
    coords: { x: 20, y: 30 }
  },
  '云南': {
    name: '云南（西南夷）',
    history: '海贝在云南行用至元代，是中国境内贝币流通最久的地区。',
    currencies: ['sea-shell'],
    coords: { x: 38, y: 72 }
  },
  '南洋': {
    name: '南洋（东南亚）',
    history: '永乐通宝随郑和下西洋远播南洋，宋元钱币在日越韩长期流通。',
    currencies: ['yongle-tongbao', 'song-yuan-tongbao'],
    coords: { x: 75, y: 85 }
  },
  '陕甘宁': {
    name: '陕甘宁边区',
    history: '抗战时期边区银行发行边币，是新中国货币的前奏。',
    currencies: ['border-region-coin', 'soviet-money'],
    coords: { x: 42, y: 38 }
  },
  '全国': {
    name: '全国通行',
    history: '统一王朝时期的法定货币，行用范围遍及全国。',
    currencies: [],
    coords: { x: 50, y: 50 }
  }
};

// ============ 趣味知识点 ============
const FUN_FACTS = [
  {
    title: '"钱"字的由来',
    content: '"钱"本是农具——一种类似铲子的工具。春秋战国时，三晋之地以铲形铸币行世，遂以"钱"指代货币。"钱"字从金从戔，本义为"小铜片"。'
  },
  {
    title: '"贯"是怎么穿的',
    content: '一千枚铜钱称一贯。古人用麻绳从方孔中穿过，每一千枚串成一贯。"腰缠万贯"，意指身缠百万铜钱——按汉代标准约重70公斤，实非易事。'
  },
  {
    title: '"两"与"钱"的换算',
    content: '一斤十六两，一两十钱，一钱十分。"半斤八两"由此而来——古制"一斤"为十六两，半斤恰好八两，旗鼓相当。'
  },
  {
    title: '"压岁钱"的源头',
    content: '汉代有"压胜钱"，铸"长命富贵"、"福寿康宁"等吉语，非流通币，专为辟邪赐福。后世春节给孩童的"压岁钱"由此演化而来。'
  },
  {
    title: '"分"币传奇',
    content: '1955年发行的1分、2分、5分硬币，至今仍是法定货币。2007年所铸的1分硬币只发行少量，市场价格已超千倍。'
  },
  {
    title: '宋钱海外漂流',
    content: '宋代"宋元通宝"、"崇宁通宝"等钱币大量流入日本、朝鲜、越南、东南亚，成为当地主要货币。日本"和同开珎"即仿宋钱形制。'
  },
  {
    title: '马可·波罗的惊叹',
    content: '元朝时，意大利人马可·波罗游历东方，对元朝以桑皮纸为钱大为惊叹，称"大汗手中拥有人类历史上前所未有之财富奥秘"。'
  },
  {
    title: '"小铜板"与童年',
    content: '清末民初的"光绪铜元"、"民国铜元"，被孩童称为"小铜板"，用作弹珠游戏。一枚小铜元，承载多少孩童的童年记忆。'
  }
];

// 暴露给script.js
if (typeof window !== 'undefined') {
  window.CURRENCY_DATA = { ERAS, CURRENCIES, REGIONAL_MAP, FUN_FACTS };
}
