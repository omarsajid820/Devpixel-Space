async function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');

  for (const el of includes) {
    const file = el.getAttribute('data-include');
    const res = await fetch(file);
    el.innerHTML = await res.text();
  }

  initNavigation();
}

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    });


  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle('active-section', sec.id === id);
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${id}`
      );
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href').substring(1);

        showSection(id);

        // close mobile menu after click
        navMenu.classList.remove('show');

        history.pushState(null, '', `#${id}`);
    });
    });


  // default section
  const initial = location.hash.replace('#', '') || 'home';
  showSection(initial);
}

loadIncludes();
