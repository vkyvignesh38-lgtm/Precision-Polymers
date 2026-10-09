'use strict';
document.documentElement.classList.add('js', 'is-loaded');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-wrap')) setMenu(false);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
window.matchMedia('(min-width: 1025px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

const filters = document.querySelector('#catalog-filters');
if (filters) {
  const grid = document.querySelector('#catalog-grid');
  const cards = [...grid.querySelectorAll('[data-product]')];
  const fields = ['q', 'category', 'material', 'sort'];
  const readQuery = () => {
    const query = new URLSearchParams(location.search);
    fields.forEach(name => {
      const field = filters.elements.namedItem(name);
      const value = query.get(name) || (name === 'sort' ? 'name' : '');
      field.value = field.tagName === 'SELECT' && ![...field.options].some(option => option.value === value) ? (name === 'sort' ? 'name' : '') : value;
    });
  };
  function update(syncUrl = true) {
    const values = Object.fromEntries(fields.map(name => [name, filters.elements.namedItem(name).value]));
    const query = values.q.trim().toLowerCase();
    let visible = 0;
    cards.sort((a, b) => {
      const family = values.sort === 'material' ? a.dataset.material.localeCompare(b.dataset.material) : 0;
      return family || a.dataset.name.localeCompare(b.dataset.name);
    }).forEach(card => {
      card.hidden = !(card.dataset.search.includes(query) && (!values.material || card.dataset.material === values.material) && (!values.category || card.dataset.category === values.category));
      if (!card.hidden) visible += 1;
      grid.append(card);
    });
    document.querySelector('#result-count').textContent = `${visible} of ${cards.length} sample materials`;
    document.querySelector('#empty-state').hidden = visible !== 0;
    if (syncUrl) {
      const params = new URLSearchParams();
      fields.forEach(name => { if (values[name] && !(name === 'sort' && values[name] === 'name')) params.set(name, values[name]); });
      const url = location.pathname + (params.size ? '?' + params.toString() : '') + location.hash;
      // Browsers may restrict History APIs when files are opened directly.
      try { history.replaceState(null, '', url); } catch { /* Filtering still works locally. */ }
    }
  }
  filters.hidden = false;
  readQuery();
  update(false);
  filters.addEventListener('input', () => update());
  filters.addEventListener('change', () => update());
  filters.addEventListener('submit', event => { event.preventDefault(); update(); });
  filters.addEventListener('reset', () => setTimeout(() => update(), 0));
  document.querySelector('#empty-reset').addEventListener('click', () => { filters.reset(); filters.elements.namedItem('q').focus(); });
  window.addEventListener('popstate', () => { readQuery(); update(false); });
}
