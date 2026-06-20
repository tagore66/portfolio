document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('active');
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('active');
      navToggle.innerHTML = isOpen ? '☰' : '✕';
    });
    // close menu when link clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // smooth internal link scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    });
  });

  // resume link feedback
  // resume link feedback (matching RESUME.pdf)
  document.querySelectorAll('a[href$="RESUME.pdf"], a[href*="RESUME.pdf"]').forEach(link => {
    link.addEventListener('click', () => {
      const original = link.innerText;
      link.innerText = 'Preparing download...';
      setTimeout(()=> link.innerText = original, 1500);
    });
  });

  // copy-email helper if button exists
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email || 'tagoreatreyapurapu@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const old = copyBtn.innerText;
        copyBtn.innerText = 'Copied ✓';
        setTimeout(()=> copyBtn.innerText = old, 1200);
      } catch {
        window.prompt('Copy email:', email);
      }
    });
  }

  // lightbox for images with class 'proj-img'
  const projImgs = document.querySelectorAll('img.proj-img');
  if (projImgs.length) {
    const overlay = document.createElement('div');
    overlay.id = 'img-lightbox-overlay';
    overlay.style.display = 'none';
    const img = document.createElement('img');
    img.style.maxWidth = '95%';
    img.style.maxHeight = '95%';
    img.style.borderRadius = '8px';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    projImgs.forEach(i => i.style.cursor = 'zoom-in');
    projImgs.forEach(i => i.addEventListener('click', () => {
      img.src = i.src;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }));
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.style.display = 'none'; });
  }
});
