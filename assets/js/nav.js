// mark current page link as .active
document.addEventListener('DOMContentLoaded', () => {
  const cur = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === cur) a.classList.add('active');
  });
});
