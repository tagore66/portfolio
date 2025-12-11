document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navLinks.style.display = open ? 'none' : 'flex';
    });
    // init mobile hidden
    if (window.innerWidth <= 880) navLinks.style.display = 'none';
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
  document.querySelectorAll('a[href$="MYRESUME.pdf"], a[href*="MYRESUME.pdf"]').forEach(link => {
    link.addEventListener('click', () => {
      const original = link.innerText;
      link.innerText = 'Preparing download...';
      setTimeout(()=> link.innerText = original, 900);
      console.log('Resume clicked:', link.href);
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
