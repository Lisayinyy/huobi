/* ==========================================================================
   中国钱币史 · 致阿麽的一封信
   交互脚本 — 时光卷轴上的钱币故事
   ========================================================================== */

(function () {
  'use strict';

  const { ERAS, CURRENCIES, REGIONAL_MAP, FUN_FACTS } = window.CURRENCY_DATA;

  /* ------- 状态 ------- */
  const state = {
    activeEraId: null,
    activeMaterial: 'all',
    compareList: [],
    searchQuery: '',
  };
  const COMPARE_CAP = 3;
  const STORAGE_KEY_THEME = 'huobi.theme';
  const STORAGE_KEY_COMPARE = 'huobi.compare';

  /* ------- 工具 ------- */
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'style') node.setAttribute('style', v);
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (k.startsWith('data')) node.setAttribute(k.replace(/([A-Z])/g, '-$1').toLowerCase(), v);
      else node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  };
  const fmtYear = (y) => (y < 0 ? `公元前 ${Math.abs(y)}` : `公元 ${y}`);

  /* ------- 钱币 SVG 生成 ------- */
  function coinSVG(currency, size = 120) {
    const { color = '#b8860b', material = '', shape = '', name = '' } = currency;
    const isPaper = material.includes('纸') || material.includes('数字');
    const isShell = material.includes('贝');
    const isKnife = shape && shape.includes('刀');
    const isSpade = shape && shape.includes('铲');
    const isIngot = shape && (shape.includes('元宝') || shape.includes('银锭'));
    const w = size, h = size;
    const cx = w / 2, cy = h / 2;
    const char = (name || '·').slice(0, 1);

    if (isPaper) {
      return `
        <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="coin-svg">
          <rect x="10" y="22" width="${w - 20}" height="${h - 44}" rx="3"
            fill="${color}" stroke="#1c1c1c" stroke-width="1.4" opacity="0.92"/>
          <rect x="14" y="26" width="${w - 28}" height="${h - 52}" rx="2"
            fill="none" stroke="#1c1c1c" stroke-width="0.6" stroke-dasharray="2 3"/>
          <text x="${cx}" y="${cy + 6}" text-anchor="middle"
            font-family="Ma Shan Zheng, serif" font-size="${size * 0.32}" fill="#1c1c1c">${char}</text>
        </svg>`;
    }
    if (isShell) {
      return `
        <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="coin-svg">
          <ellipse cx="${cx}" cy="${cy}" rx="${w * 0.32}" ry="${h * 0.42}"
            fill="${color}" stroke="#1c1c1c" stroke-width="1.4"/>
          <path d="M ${cx} ${cy - h * 0.32} Q ${cx + 4} ${cy} ${cx} ${cy + h * 0.32}"
            stroke="#1c1c1c" stroke-width="1" fill="none"/>
          ${Array.from({ length: 6 }).map((_, i) => {
            const y = cy - h * 0.22 + i * 9;
            return `<line x1="${cx - 8}" y1="${y}" x2="${cx + 8}" y2="${y}" stroke="#1c1c1c" stroke-width="0.6"/>`;
          }).join('')}
        </svg>`;
    }
    if (isKnife) {
      return `
        <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="coin-svg">
          <path d="M ${w * 0.18} ${h * 0.78} Q ${w * 0.35} ${h * 0.78} ${w * 0.55} ${h * 0.45}
            L ${w * 0.82} ${h * 0.22} L ${w * 0.78} ${h * 0.32} Q ${w * 0.5} ${h * 0.6} ${w * 0.3} ${h * 0.82} Z"
            fill="${color}" stroke="#1c1c1c" stroke-width="1.2"/>
          <circle cx="${w * 0.22}" cy="${h * 0.78}" r="${w * 0.08}"
            fill="none" stroke="#1c1c1c" stroke-width="1.2"/>
          <text x="${cx + 6}" y="${cy + 4}" text-anchor="middle"
            font-family="Ma Shan Zheng, serif" font-size="${size * 0.16}" fill="#1c1c1c">${char}</text>
        </svg>`;
    }
    if (isSpade) {
      return `
        <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="coin-svg">
          <path d="M ${cx - 14} ${h * 0.18} L ${cx + 14} ${h * 0.18} L ${cx + 18} ${h * 0.5}
            L ${cx + 24} ${h * 0.82} L ${cx - 24} ${h * 0.82} L ${cx - 18} ${h * 0.5} Z"
            fill="${color}" stroke="#1c1c1c" stroke-width="1.2"/>
          <line x1="${cx}" y1="${h * 0.18}" x2="${cx}" y2="${h * 0.82}"
            stroke="#1c1c1c" stroke-width="0.8"/>
        </svg>`;
    }
    if (isIngot) {
      return `
        <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="coin-svg">
          <path d="M ${w * 0.18} ${h * 0.58} Q ${w * 0.3} ${h * 0.36} ${w * 0.5} ${h * 0.36}
            Q ${w * 0.7} ${h * 0.36} ${w * 0.82} ${h * 0.58}
            L ${w * 0.76} ${h * 0.7} Q ${w * 0.5} ${h * 0.8} ${w * 0.24} ${h * 0.7} Z"
            fill="${color}" stroke="#1c1c1c" stroke-width="1.2"/>
          <ellipse cx="${cx}" cy="${h * 0.42}" rx="${w * 0.28}" ry="${h * 0.05}"
            fill="${color}" stroke="#1c1c1c" stroke-width="0.8" opacity="0.85"/>
          <text x="${cx}" y="${h * 0.6}" text-anchor="middle"
            font-family="Ma Shan Zheng, serif" font-size="${size * 0.16}" fill="#1c1c1c">${char}</text>
        </svg>`;
    }
    // 默认: 方孔圆钱
    return `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="coin-svg">
        <circle cx="${cx}" cy="${cy}" r="${w * 0.42}"
          fill="${color}" stroke="#1c1c1c" stroke-width="1.4"/>
        <circle cx="${cx}" cy="${cy}" r="${w * 0.38}"
          fill="none" stroke="#1c1c1c" stroke-width="0.6" opacity="0.55"/>
        <rect x="${cx - w * 0.07}" y="${cy - w * 0.07}" width="${w * 0.14}" height="${w * 0.14}"
          fill="#f1e4c8" stroke="#1c1c1c" stroke-width="1.2"/>
        <text x="${cx}" y="${cy - w * 0.14}" text-anchor="middle"
          font-family="Ma Shan Zheng, serif" font-size="${size * 0.13}" fill="#1c1c1c">${char}</text>
      </svg>`;
  }

  /* ------- 章节一:已写在 HTML,无需渲染 ------- */

  /* ------- 章节二:时光长卷 ------- */
  function renderEraRail() {
    const rail = $('#era-rail');
    if (!rail) return;
    rail.innerHTML = '';
    ERAS.forEach((era, i) => {
      const pill = el('button', {
        class: 'era-pill',
        type: 'button',
        'data-era-id': era.id,
        style: `--era-color:${era.color}; animation-delay:${i * 0.04}s`,
        'aria-label': `跳转至${era.name}`,
      }, [
        el('span', { class: 'era-pill-icon' }, era.icon || '·'),
        el('span', { class: 'era-pill-name' }, era.name),
        el('span', { class: 'era-pill-year' }, era.yearLabel),
      ]);
      pill.addEventListener('click', () => {
        state.activeEraId = era.id;
        document.getElementById(`era-${era.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateActiveEraPill();
      });
      rail.appendChild(pill);
    });
  }

  function updateActiveEraPill() {
    $$('.era-pill').forEach(p => {
      p.classList.toggle('is-active', p.getAttribute('data-era-id') === state.activeEraId);
    });
  }

  function renderEraStage() {
    const stage = $('#era-stage');
    if (!stage) return;
    stage.innerHTML = '';

    ERAS.forEach((era) => {
      const coinsInEra = CURRENCIES.filter(c => c.era === era.id);
      const block = el('section', {
        class: 'era-block',
        id: `era-${era.id}`,
        style: `--era-color:${era.color}`,
        'data-era-id': era.id,
      });

      const header = el('header', { class: 'era-block-head' }, [
        el('div', { class: 'era-block-icon', html: `<span>${era.icon || ''}</span>` }),
        el('div', { class: 'era-block-meta' }, [
          el('h3', { class: 'era-block-title' }, [
            era.name,
            el('span', { class: 'era-block-pinyin' }, era.pinyin || ''),
          ]),
          el('div', { class: 'era-block-year' }, era.yearLabel),
          el('p', { class: 'era-block-summary' }, era.summary || ''),
          era.quote ? el('blockquote', { class: 'era-block-quote' }, era.quote) : null,
        ]),
        el('div', { class: 'era-block-count' }, [
          el('span', { class: 'era-count-num' }, String(coinsInEra.length)),
          el('span', { class: 'era-count-label' }, '种钱币'),
        ]),
      ]);
      block.appendChild(header);

      const grid = el('div', { class: 'coin-grid', 'data-era-grid': era.id });
      coinsInEra.forEach((c) => grid.appendChild(coinCard(c, era)));
      block.appendChild(grid);

      stage.appendChild(block);
    });

    applyMaterialFilter();
    updateCoinCount();
  }

  function coinCard(currency, era) {
    const card = el('article', {
      class: 'coin-card',
      'data-currency-id': currency.id,
      'data-material': currency.material || '',
      tabindex: '0',
      'aria-label': `${currency.name} — 点击翻转，双击查看详情`,
    }, [
      el('div', { class: 'coin-card-inner' }, [
        // 正面
        el('div', { class: 'coin-face coin-front', style: `--coin-color:${currency.color || era.color}` }, [
          el('div', { class: 'coin-shape', html: coinSVG(currency, 110) }),
          el('div', { class: 'coin-name' }, currency.name),
          el('div', { class: 'coin-pinyin' }, currency.pinyin || ''),
          el('div', { class: 'coin-era-badge' }, era.name),
        ]),
        // 背面
        el('div', { class: 'coin-face coin-back' }, [
          el('div', { class: 'coin-back-meta' }, [
            el('span', { class: 'coin-back-label' }, '材质'),
            el('span', { class: 'coin-back-val' }, currency.material || '—'),
          ]),
          el('div', { class: 'coin-back-meta' }, [
            el('span', { class: 'coin-back-label' }, '形制'),
            el('span', { class: 'coin-back-val' }, currency.shape || '—'),
          ]),
          el('div', { class: 'coin-back-meta' }, [
            el('span', { class: 'coin-back-label' }, '行用'),
            el('span', { class: 'coin-back-val' }, currency.yearLabel || `${currency.startYear || '—'}~${currency.endYear || '—'}`),
          ]),
          el('p', { class: 'coin-back-desc' }, (currency.description || '').slice(0, 80) + (currency.description && currency.description.length > 80 ? '…' : '')),
          el('button', { class: 'coin-back-more', type: 'button' }, '展卷细看 →'),
        ]),
      ]),
    ]);

    // 单击翻转
    card.addEventListener('click', (ev) => {
      if (ev.target.closest('.coin-back-more')) {
        openModal(currency, era);
        return;
      }
      card.classList.toggle('is-flipped');
    });
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
    card.addEventListener('dblclick', () => openModal(currency, era));
    return card;
  }

  /* ------- 材质过滤 ------- */
  function applyMaterialFilter() {
    const mat = state.activeMaterial;
    $$('.coin-card').forEach((card) => {
      const m = card.getAttribute('data-material') || '';
      const show = mat === 'all' || m.includes(mat);
      card.classList.toggle('is-hidden-mat', !show);
    });
    // 隐藏完全没有匹配的朝代块
    $$('.era-block').forEach((block) => {
      const visible = $$('.coin-card', block).filter(c => !c.classList.contains('is-hidden-mat')).length;
      block.classList.toggle('is-empty-era', visible === 0);
    });
    updateCoinCount();
  }

  function updateCoinCount() {
    const count = $$('.coin-card').filter(c => !c.classList.contains('is-hidden-mat')).length;
    const total = CURRENCIES.length;
    const el$ = $('#coin-count');
    if (el$) el$.textContent = state.activeMaterial === 'all'
      ? `共 ${total} 枚`
      : `${count} / ${total} 枚`;
  }

  function wireFilterChips() {
    $$('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const mat = chip.getAttribute('data-mat') || 'all';
        state.activeMaterial = mat;
        $$('.filter-chip').forEach(c => c.classList.toggle('is-active', c === chip));
        applyMaterialFilter();
      });
    });
  }

  /* ------- 章节三:地域 ------- */
  function renderMapHotspots() {
    const g = $('#map-hotspots');
    if (!g) return;
    g.innerHTML = '';
    Object.entries(REGIONAL_MAP).forEach(([key, region], i) => {
      const { coords = { x: 50, y: 50 }, name } = region;
      const hot = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      hot.setAttribute('class', 'hotspot');
      hot.setAttribute('data-region', key);
      hot.setAttribute('style', `--hi:${i * 0.04}s`);
      hot.innerHTML = `
        <circle class="hot-pulse" cx="${coords.x}" cy="${coords.y}" r="2.2"/>
        <circle class="hot-dot" cx="${coords.x}" cy="${coords.y}" r="1.1"/>
        <text x="${coords.x}" y="${coords.y - 2.6}" text-anchor="middle" class="hot-label">${name || key}</text>
      `;
      hot.addEventListener('click', () => showRegion(key));
      g.appendChild(hot);
    });
  }

  function showRegion(key) {
    const region = REGIONAL_MAP[key];
    if (!region) return;
    $('#map-region-name').textContent = region.name;
    $('#map-region-history').textContent = region.history || '';

    const list = $('#map-region-coins');
    list.innerHTML = '';
    (region.currencies || []).forEach((cId) => {
      const c = CURRENCIES.find(x => x.id === cId || x.name === cId);
      if (!c) return;
      const era = ERAS.find(e => e.id === c.era);
      const item = el('button', {
        class: 'region-coin-chip',
        type: 'button',
        style: `--coin-color:${c.color || (era && era.color) || '#b8860b'}`,
      }, [
        el('span', { class: 'region-coin-mini', html: coinSVG(c, 36) }),
        el('span', { class: 'region-coin-name' }, c.name),
        era ? el('span', { class: 'region-coin-era' }, era.name) : null,
      ]);
      item.addEventListener('click', () => openModal(c, era));
      list.appendChild(item);
    });

    $('#map-panel').classList.add('is-open');
    $$('.hotspot').forEach(h => h.classList.toggle('is-active', h.getAttribute('data-region') === key));
  }

  /* ------- 章节四:稗官野史 ------- */
  function renderStoriesDeck() {
    const deck = $('#stories-deck');
    if (!deck) return;
    deck.innerHTML = '';
    FUN_FACTS.forEach((fact, i) => {
      const card = el('article', {
        class: 'story-card',
        style: `--si:${i * 0.05}s; --tilt:${(i % 2 === 0 ? -1 : 1) * (0.6 + (i % 3) * 0.4)}deg`,
      }, [
        el('div', { class: 'story-stamp' }, String(i + 1).padStart(2, '0')),
        el('h4', { class: 'story-title' }, fact.title),
        el('p', { class: 'story-content' }, fact.content),
        el('div', { class: 'story-corner' }, '稗'),
      ]);
      deck.appendChild(card);
    });
  }

  /* ------- 模态:展卷细看 ------- */
  function openModal(currency, era) {
    const shroud = $('#modal-shroud');
    if (!shroud) return;
    $('#modal-coin-stage').innerHTML = coinSVG(currency, 200);
    $('#modal-era-stamp').textContent = era ? era.name : '';
    $('#modal-material-stamp').textContent = currency.material || '';
    $('#modal-eyebrow').textContent = era ? era.yearLabel : (currency.yearLabel || '');
    $('#modal-name').textContent = currency.name;
    $('#modal-pinyin').textContent = currency.pinyin || '';
    $('#modal-years').textContent = currency.yearLabel || `${fmtYear(currency.startYear)} — ${fmtYear(currency.endYear)}`;
    $('#modal-desc').textContent = currency.description || '';
    $('#modal-sig').textContent = currency.significance || '';

    const facts = $('#modal-facts');
    facts.innerHTML = '';
    (currency.facts || []).forEach(f => facts.appendChild(el('li', {}, f)));

    const meta = $('#modal-meta-grid');
    meta.innerHTML = '';
    const metaPairs = [
      ['材质', currency.material],
      ['形制', currency.shape],
      ['重量', currency.weight],
      ['流通区域', (currency.regions || []).join('、') || '—'],
      ['行用年代', currency.yearLabel || `${currency.startYear || '?'} — ${currency.endYear || '?'}`],
      ['所属朝代', era ? era.name : '—'],
    ];
    metaPairs.forEach(([k, v]) => {
      meta.appendChild(el('div', { class: 'meta-cell' }, [
        el('span', { class: 'meta-cell-key' }, k),
        el('span', { class: 'meta-cell-val' }, v || '—'),
      ]));
    });

    const addBtn = $('#modal-add-compare');
    if (addBtn) {
      addBtn.dataset.currencyId = currency.id;
      const exists = state.compareList.find(x => x.id === currency.id);
      addBtn.textContent = exists ? '已在比对架上 ✓' : '添至比对架 +';
      addBtn.classList.toggle('is-added', !!exists);
    }

    shroud.classList.add('is-open');
    document.body.classList.add('is-locked');
  }

  function closeModal() {
    $('#modal-shroud')?.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  /* ------- 寻 (Search) ------- */
  function wireSearch() {
    const toggle = $('#search-toggle');
    const shroud = $('#search-shroud');
    const close = $('#search-close');
    const input = $('#search-input');
    const results = $('#search-results');
    if (!toggle || !shroud) return;

    toggle.addEventListener('click', () => {
      shroud.classList.add('is-open');
      setTimeout(() => input?.focus(), 80);
    });
    close?.addEventListener('click', () => shroud.classList.remove('is-open'));
    shroud.addEventListener('click', (ev) => {
      if (ev.target === shroud) shroud.classList.remove('is-open');
    });

    input?.addEventListener('input', () => {
      const q = (input.value || '').trim().toLowerCase();
      state.searchQuery = q;
      results.innerHTML = '';
      if (!q) {
        results.appendChild(el('div', { class: 'search-empty' }, '试试搜「五铢」「交子」「银元」…'));
        return;
      }
      const matches = CURRENCIES.filter(c => {
        return (c.name && c.name.toLowerCase().includes(q))
          || (c.pinyin && c.pinyin.toLowerCase().includes(q))
          || (c.material && c.material.toLowerCase().includes(q))
          || (c.description && c.description.toLowerCase().includes(q));
      }).slice(0, 24);
      if (matches.length === 0) {
        results.appendChild(el('div', { class: 'search-empty' }, '此名未载于本卷,可换个写法?'));
        return;
      }
      matches.forEach(c => {
        const era = ERAS.find(e => e.id === c.era);
        const row = el('button', {
          class: 'search-row',
          type: 'button',
          style: `--coin-color:${c.color || (era && era.color) || '#b8860b'}`,
        }, [
          el('span', { class: 'search-row-mini', html: coinSVG(c, 38) }),
          el('span', { class: 'search-row-meta' }, [
            el('span', { class: 'search-row-name' }, c.name),
            el('span', { class: 'search-row-sub' }, `${era ? era.name : ''} · ${c.material || ''}`),
          ]),
          el('span', { class: 'search-row-arrow' }, '→'),
        ]);
        row.addEventListener('click', () => {
          shroud.classList.remove('is-open');
          openModal(c, era);
        });
        results.appendChild(row);
      });
    });
  }

  /* ------- 对 (Compare) ------- */
  function wireCompare() {
    const toggle = $('#compare-toggle');
    const drawer = $('#compare-drawer');
    const close = $('#drawer-close');
    const clear = $('#drawer-clear');
    const addBtn = $('#modal-add-compare');

    toggle?.addEventListener('click', () => drawer?.classList.toggle('is-open'));
    close?.addEventListener('click', () => drawer?.classList.remove('is-open'));
    clear?.addEventListener('click', () => {
      state.compareList = [];
      persistCompare();
      renderCompareDrawer();
    });
    addBtn?.addEventListener('click', () => {
      const cid = addBtn.dataset.currencyId;
      if (!cid) return;
      const c = CURRENCIES.find(x => x.id === cid);
      if (!c) return;
      const idx = state.compareList.findIndex(x => x.id === cid);
      if (idx >= 0) {
        state.compareList.splice(idx, 1);
      } else if (state.compareList.length < COMPARE_CAP) {
        state.compareList.push(c);
      } else {
        addBtn.textContent = `比对架已满 (上限 ${COMPARE_CAP})`;
        setTimeout(() => {
          const ex = state.compareList.find(x => x.id === cid);
          addBtn.textContent = ex ? '已在比对架上 ✓' : '添至比对架 +';
        }, 1400);
        return;
      }
      const exists = state.compareList.find(x => x.id === cid);
      addBtn.textContent = exists ? '已在比对架上 ✓' : '添至比对架 +';
      addBtn.classList.toggle('is-added', !!exists);
      persistCompare();
      renderCompareDrawer();
      drawer?.classList.add('is-open');
    });

    renderCompareDrawer();
  }

  function renderCompareDrawer() {
    const drawer = $('#compare-drawer');
    const body = $('#drawer-body');
    const count = $('#drawer-count');
    if (!drawer || !body || !count) return;
    count.textContent = String(state.compareList.length);

    body.innerHTML = '';
    if (state.compareList.length === 0) {
      body.appendChild(el('div', { class: 'drawer-empty' }, [
        el('span', { class: 'drawer-empty-icon' }, '架'),
        el('p', {}, '尚无钱币上架'),
        el('small', {}, '在展卷弹窗里点「添至比对架」,可同框对照三枚'),
      ]));
      return;
    }
    const grid = el('div', { class: 'compare-grid' });
    state.compareList.forEach((c) => {
      const era = ERAS.find(e => e.id === c.era);
      const col = el('div', { class: 'compare-col', style: `--coin-color:${c.color || (era && era.color) || '#b8860b'}` }, [
        el('button', {
          class: 'compare-remove', type: 'button', 'aria-label': '移除',
        }, '×'),
        el('div', { class: 'compare-coin', html: coinSVG(c, 90) }),
        el('div', { class: 'compare-name' }, c.name),
        el('div', { class: 'compare-row' }, [el('span', {}, '材质'), el('strong', {}, c.material || '—')]),
        el('div', { class: 'compare-row' }, [el('span', {}, '形制'), el('strong', {}, c.shape || '—')]),
        el('div', { class: 'compare-row' }, [el('span', {}, '行用'), el('strong', {}, c.yearLabel || '—')]),
        el('div', { class: 'compare-row' }, [el('span', {}, '朝代'), el('strong', {}, era ? era.name : '—')]),
        el('p', { class: 'compare-desc' }, (c.significance || c.description || '').slice(0, 90) + '…'),
      ]);
      col.querySelector('.compare-remove').addEventListener('click', () => {
        state.compareList = state.compareList.filter(x => x.id !== c.id);
        persistCompare();
        renderCompareDrawer();
      });
      grid.appendChild(col);
    });
    body.appendChild(grid);
  }

  function persistCompare() {
    try {
      localStorage.setItem(STORAGE_KEY_COMPARE, JSON.stringify(state.compareList.map(c => c.id)));
    } catch (e) { /* noop */ }
  }
  function restoreCompare() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_COMPARE);
      if (!raw) return;
      const ids = JSON.parse(raw);
      if (!Array.isArray(ids)) return;
      state.compareList = ids
        .map(id => CURRENCIES.find(c => c.id === id))
        .filter(Boolean)
        .slice(0, COMPARE_CAP);
    } catch (e) { /* noop */ }
  }

  /* ------- 夜 (Theme) ------- */
  function wireTheme() {
    const btn = $('#theme-toggle');
    const apply = (theme) => {
      document.body.setAttribute('data-theme', theme);
      if (btn) btn.textContent = theme === 'day' ? '夜' : '昼';
      try { localStorage.setItem(STORAGE_KEY_THEME, theme); } catch (e) {}
    };
    btn?.addEventListener('click', () => {
      const cur = document.body.getAttribute('data-theme') || 'day';
      apply(cur === 'day' ? 'dark' : 'day');
    });
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) apply(saved);
    } catch (e) {}
  }

  /* ------- 模态 / 抽屉关闭 ------- */
  function wireDismissers() {
    $('#modal-close')?.addEventListener('click', closeModal);
    $('#modal-shroud')?.addEventListener('click', (ev) => {
      if (ev.target.id === 'modal-shroud') closeModal();
    });
    $('#map-panel-close')?.addEventListener('click', () => $('#map-panel')?.classList.remove('is-open'));

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        closeModal();
        $('#search-shroud')?.classList.remove('is-open');
        $('#compare-drawer')?.classList.remove('is-open');
        $('#map-panel')?.classList.remove('is-open');
      }
    });
  }

  /* ------- 平滑滚动锚 ------- */
  function wireNav() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (ev) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          ev.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ------- IntersectionObserver 滚动揭示 + 章节高亮 ------- */
  function wireObservers() {
    const revealEls = $$('.chapter, .paper-card, .paper-card-end, .coin-card, .story-card, .era-block, .map-wrap');
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => revealIO.observe(el));

    const eraBlocks = $$('.era-block');
    if (eraBlocks.length) {
      const eraIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('data-era-id');
            if (id) {
              state.activeEraId = id;
              updateActiveEraPill();
            }
          }
        });
      }, { threshold: 0.32 });
      eraBlocks.forEach(b => eraIO.observe(b));
    }
  }

  /* ------- 卷轴开场 ------- */
  function hideLoader() {
    const loader = $('#scroll-loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('is-hidden'), 2400);
  }

  /* ------- 视差 / 微动 ------- */
  function wireParallax() {
    const heroCoins = $$('.hero-coin');
    if (!heroCoins.length) return;
    let raf = 0;
    document.addEventListener('mousemove', (ev) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const x = (ev.clientX / window.innerWidth - 0.5) * 2;
        const y = (ev.clientY / window.innerHeight - 0.5) * 2;
        heroCoins.forEach((c, i) => {
          const m = 6 + i * 3;
          c.style.transform = `translate(${x * m}px, ${y * m}px) rotate(${x * 2}deg)`;
        });
        raf = 0;
      });
    });
  }

  /* ------- 初始化 ------- */
  function init() {
    hideLoader();
    renderEraRail();
    renderEraStage();
    renderMapHotspots();
    renderStoriesDeck();
    wireFilterChips();
    wireSearch();
    restoreCompare();
    wireCompare();
    wireTheme();
    wireDismissers();
    wireNav();
    wireObservers();
    wireParallax();

    // 首次默认显示第一个地区
    const firstRegion = Object.keys(REGIONAL_MAP)[0];
    if (firstRegion) showRegion(firstRegion);
    // 首屏激活第一个朝代
    if (ERAS.length) {
      state.activeEraId = ERAS[0].id;
      updateActiveEraPill();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
