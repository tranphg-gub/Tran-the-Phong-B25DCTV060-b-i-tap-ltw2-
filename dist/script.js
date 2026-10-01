const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem('sepp-theme');
const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('sepp-theme', theme);
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  themeMeta.setAttribute('content', theme === 'dark' ? '#071426' : '#ffffff');
}
setTheme(savedTheme || (preferredDark ? 'dark' : 'light'));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const menuButton = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navList.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const searchInput = document.querySelector('#project-search');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectItems = [...document.querySelectorAll('.project-item')];
const emptyState = document.querySelector('#empty-state');
let activeFilter = 'all';

function filterProjects() {
  const term = searchInput.value.trim().toLocaleLowerCase('vi');
  let visible = 0;
  projectItems.forEach(item => {
    const categoryMatch = activeFilter === 'all' || item.dataset.category.includes(activeFilter);
    const textMatch = !term || `${item.dataset.search} ${item.textContent}`.toLocaleLowerCase('vi').includes(term);
    const show = categoryMatch && textMatch;
    item.classList.toggle('is-hidden', !show);
    if (show) visible += 1;
  });
  emptyState.hidden = visible !== 0;
}
searchInput.addEventListener('input', filterProjects);
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  filterProjects();
}));

const form = document.querySelector('#contact-form');
const message = document.querySelector('#message');
const counter = document.querySelector('#char-count');
const status = document.querySelector('#form-status');
message.addEventListener('input', () => { counter.textContent = `${message.value.length}/500`; });

function setError(field, text) {
  const wrapper = field.closest('.field');
  wrapper.classList.toggle('invalid', Boolean(text));
  wrapper.querySelector('.error').textContent = text;
  field.setAttribute('aria-invalid', String(Boolean(text)));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = '';
  status.className = 'form-status';
  const name = form.elements.name;
  const email = form.elements.email;
  const topic = form.elements.topic;
  const consent = form.elements.consent;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  setError(name, name.value.trim().length < 2 ? 'Vui lòng nhập ít nhất 2 ký tự.' : '');
  setError(email, !emailPattern.test(email.value.trim()) ? 'Email chưa đúng định dạng.' : '');
  setError(topic, !topic.value ? 'Vui lòng chọn một chủ đề.' : '');
  setError(message, message.value.trim().length < 20 ? 'Nội dung cần ít nhất 20 ký tự.' : '');
  document.querySelector('.consent-error').textContent = consent.checked ? '' : 'Vui lòng xác nhận điều kiện của biểu mẫu demo.';
  const invalid = form.querySelector('[aria-invalid="true"]') || !consent.checked;
  if (invalid) {
    status.textContent = 'Vui lòng kiểm tra lại các trường được đánh dấu.';
    if (invalid instanceof HTMLElement) invalid.focus();
    return;
  }
  status.classList.add('success');
  status.textContent = 'Nội dung hợp lệ. Đây là bản demo nên thông tin chưa được gửi đi.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
