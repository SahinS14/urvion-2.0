/** Standalone reconstruction of nirmit.space's landing interactions.
 * Original asset layers, timings, depth values and chapter motion are retained.
 * No Next.js runtime, backend, analytics, or remote rendering dependency.
 */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobileQuery = matchMedia('(max-width: 768px)');
const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
const original = 'https://www.nirmit.space';
const hero = $('#hero-parallax');
const scene = $('.parallax-scene');
const text = $('.nirmit-text-wrapper');
const about = $('#about');
const desktopLayers = [
  { depth: 0, scale: 1.12 }, { depth: 18, scale: 1.02 },
  { depth: 36, scale: 1.03 }, { depth: 60, scale: 1.02 },
  { depth: 85, scale: 1.3 }, { depth: 110, scale: 1.35 },
];
const mobileLayers = [
  { depth: 0, scale: 1.12 }, { depth: 25, scale: 1.02 },
  { depth: 50, scale: 1.03 }, { depth: 75, scale: 1.25, y: -40 },
  { depth: 100, scale: 1.3 },
];
const mobileArt = ['/assets/pirates/sea.webp', '/assets/pirates/hero-v2/captain.webp', '/assets/pirates/hero-v2/navigator.webp', '/assets/pirates/hero-v2/deck.webp', '/assets/pirates/layer-5.svg'];
mobileLayers.forEach((layer, index) => {
  const el = document.createElement('div');
  el.className = 'parallax-layer mobile-parallax-layer';
  el.style.zIndex = index;
  el.classList.add(`hero-mobile-layer-${index}`);
  el.innerHTML = `<img src="${mobileArt[index]}" alt="" aria-hidden="true" class="${index === 1 ? 'hero-character hero-character-captain' : index === 2 ? 'hero-character hero-character-navigator' : ''}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center" fetchpriority="${index < 3 ? 'high' : 'auto'}">`;
  scene.insertBefore(el, text);
});
const tagline = document.createElement('div');
tagline.className = 'hero-mobile-tagline';
tagline.innerHTML = '<p class="hero-mobile-tagline-text">Eco-Social Club · Silicon University, Bhubaneswar</p>';
$('.parallax-sticky').append(tagline);

// Mobile has the reference's single about card instead of desktop's four chapters.
const mobileAbout = document.createElement('section');
mobileAbout.className = 'about-mobile-single-section';
mobileAbout.id = 'about-mobile';
const escParagraphs = $$('.esc-about-paragraph', about);
mobileAbout.innerHTML = `<div class="esc-mobile-intro">
  <img class="esc-mobile-brand" src="/assets/urvion-logo.svg" alt="URVION Volume 2" width="260" height="80"/>
  <div class="esc-mobile-intro-caption"><span class="esc-mobile-caption-line"></span> A COMMUNITY WITH PURPOSE</div>
</div>
<div class="esc-mobile-editorial">
  <header class="esc-mobile-heading">
    <p class="esc-mobile-kicker">SILICON UNIVERSITY, ODISHA</p>
    <h2 id="esc-mobile-title">ABOUT<br/><span>ECO-SOCIAL CLUB</span></h2>
    <p class="esc-mobile-subtitle">Ecology. Social responsibility. Well-being.</p>
  </header>
  <div class="esc-mobile-facts" aria-label="Our community">
    <div><strong>500<span>+</span></strong><span>Registered members</span></div>
    <div><strong>400<span>+</span></strong><span>URVION participants</span></div>
  </div>
  <div class="esc-mobile-chapters">
    ${escParagraphs.map((paragraph, index) => `<article class="esc-mobile-chapter" aria-labelledby="esc-mobile-chapter-${index}">
      <div class="esc-mobile-chapter-heading"><span class="esc-mobile-chapter-number">0${index + 1}</span><h3 id="esc-mobile-chapter-${index}">${['Who we are', 'Ideas into action', 'Our shared future'][index]}</h3></div>
      ${index === 1 ? '<div class="esc-mobile-domains" aria-label="Three core domains"><span>Ecology</span><span>Social Welfare</span><span>Zeal</span></div>' : ''}
      ${paragraph.outerHTML}
    </article>`).join('')}
  </div>
  <div class="esc-mobile-endmark" aria-hidden="true"><span></span>✦<span></span></div>
</div>`;
about.after(mobileAbout);
// Keep the mobile reading area calm; desktop and hero fireworks retain their behavior.
new IntersectionObserver(entries => {
  document.body.classList.toggle('esc-mobile-about-visible', entries[0].isIntersecting && mobileQuery.matches);
}, { threshold: 0 }).observe(mobileAbout);

const birdLayer = document.createElement('div');
birdLayer.className = 'hero-bird-layer'; birdLayer.setAttribute('aria-hidden', 'true');
birdLayer.innerHTML = '<svg class="hero-bird bird-one" viewBox="0 0 42 20"><path d="M1 13c7-10 13-10 20 0 7-10 13-10 20 0"/></svg><svg class="hero-bird bird-two" viewBox="0 0 42 20"><path d="M1 13c7-10 13-10 20 0 7-10 13-10 20 0"/></svg><svg class="hero-bird bird-three" viewBox="0 0 42 20"><path d="M1 13c7-10 13-10 20 0 7-10 13-10 20 0"/></svg>';
$('.parallax-sticky').append(birdLayer);

// Smooth pointer-driven hero depth and scroll-driven horizontal chapter track.
const pointer = { x: 0, y: 0 }, current = { x: 0, y: 0 };
let chapterProgress = 0;
window.addEventListener('pointermove', event => {
  pointer.x = clamp((event.clientX - innerWidth / 2) / (innerWidth / 2), -1, 1);
  pointer.y = clamp((event.clientY - innerHeight / 2) / (innerHeight / 2), -1, 1);
}, { passive: true });
window.addEventListener('touchmove', event => {
  if (!event.touches[0]) return;
  pointer.x = clamp(1.25 * (event.touches[0].clientX / innerWidth * 2 - 1), -1, 1);
  pointer.y = clamp(1.25 * (event.touches[0].clientY / innerHeight * 2 - 1), -1, 1);
}, { passive: true });
const desktopEls = $$('.desktop-parallax-layer');
const mobileEls = $$('.mobile-parallax-layer');
const track = $('.about-parallel-track');
const chapterElements = [
  ['.hero-giant-nirmit-img-wrapper', 200, 0],
  ['.frame-2 .frame-fast-title', -240, .33], ['.frame-2 .frame-editorial-cols', -120, .33],
  ['.frame-3 .frame-fast-title', -260, .66], ['.frame-3 .frame-editorial-cols', -140, .66],
  ['.frame-4 .frame-fast-title', -220, .9], ['.frame-4 .frame-cta-group', -120, .9],
].map(([selector, speed, offset]) => [$(selector), speed, offset]);
function animate() {
  if (!document.hidden) {
    const mobile = mobileQuery.matches;
    const moving = !reducedMotion.matches;
    current.x += ((moving ? pointer.x : 0) - current.x) * .07;
    current.y += ((moving ? pointer.y : 0) - current.y) * .07;
    if (hero.getBoundingClientRect().bottom > 0) {
      scene.style.transform = `rotateX(${-5 * current.y}deg) rotateY(${6 * current.x}deg)`;
      (mobile ? mobileEls : desktopEls).forEach((el, i) => {
        const layer = (mobile ? mobileLayers : desktopLayers)[i];
        const factor = mobile ? .75 : 1;
        el.style.transform = `translate3d(${current.x * layer.depth * factor + (layer.x || 0)}px,${current.y * layer.depth * factor + (layer.y || 0)}px,0) scale(${layer.scale})`;
      });
      const progress = clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight - innerHeight));
      text.style.transform = `translate3d(${15 * current.x}px,${15 * current.y}px,0) scale(${.95 + .25 * progress})`;
      text.style.opacity = mobile ? '.98' : String(.88 + .12 * progress);
      text.style.zIndex = mobile || progress > .12 ? '10' : '5';
    }
    if (!mobile && moving) {
      const rect = about.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        const target = clamp(-rect.top / Math.max(1, about.offsetHeight - innerHeight));
        chapterProgress += (target - chapterProgress) * .15;
        track.style.transform = `translate3d(${-75 * chapterProgress}%,0,0)`;
        chapterElements.forEach(([el, speed, offset]) => {
          if (el) el.style.transform = `translate3d(${(chapterProgress - offset) * speed}px,0,0)`;
        });
      }
    }
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Countdown is set to the festival's announced sail date in India Standard Time.
function countdown() {
  const left = Math.max(0, new Date('2027-01-15T00:00:00+05:30').getTime() - Date.now());
  const values = [Math.floor(left / 86400000), Math.floor(left % 86400000 / 3600000), Math.floor(left % 3600000 / 60000), Math.floor(left % 60000 / 1000)];
  $$('.doomsday-digit-plain').forEach((el, i) => el.textContent = String(values[i]).padStart(2, '0'));
}
countdown(); setInterval(countdown, 1000);

// Section reveal, event total and Indian-formatted prize-pool count-up.
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
}), { threshold: .05 });
$$('.reveal').forEach(el => revealObserver.observe(el));
function countOnView(el, total, duration, format = String) {
  if (!el) return;
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    const start = performance.now();
    function tick(now) {
      const progress = reducedMotion.matches ? 1 : clamp((now - start) / duration);
      el.textContent = format(Math.floor((1 - (1 - progress) ** 3) * total));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: .2 });
  observer.observe(el);
}
const eventCount = $('.fest-stats-grid > div > div');
if (eventCount) {
  eventCount.innerHTML = '<span class="event-count">0</span>+';
  countOnView($('.event-count'), 4, 1200);
}
countOnView($('.prizepool-number'), 50000, 1800, value => new Intl.NumberFormat('en-IN').format(value));

// FAQ has a single open item, with mouse and keyboard support.
$$('.faq-question').forEach((question, index) => {
  const answer = $('.faq-answer', question.parentElement);
  answer.id = `faq-answer-${index}`;
  question.setAttribute('aria-controls', answer.id);
  function toggle() {
    const open = question.getAttribute('aria-expanded') !== 'true';
    $$('.faq-question').forEach(item => {
      const selected = item === question && open;
      item.setAttribute('aria-expanded', String(selected));
      item.parentElement.classList.toggle('open', selected);
      $('.faq-toggle', item).textContent = selected ? '−' : '+';
    });
  }
  question.addEventListener('click', toggle);
  question.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); }
  });
});

// The original crossed announcement ribbons, festival-stat block and pill navigation
// are deliberately removed. Navigation now lives behind one nautical control.
$('.marquee-crossed-wrapper')?.remove();
$('.fest-stats-metallic-section')?.remove();
$('#bottom-nav')?.remove();

// A single helm-menu works at every viewport, with the music control inside its panel.
const music = new Audio('/music/pirate-sea.wav');
music.loop = true; music.volume = .35;
let musicPlaying = false;
const themeMenu = document.createElement('div');
themeMenu.className = 'theme-menu';
themeMenu.innerHTML = `<button class="theme-menu-trigger" aria-label="Open site menu" aria-expanded="false" aria-controls="theme-menu-panel">
  <span class="theme-menu-helm" aria-hidden="true"><svg viewBox="0 0 100 100" role="presentation"><defs><linearGradient id="brass" x1="0" x2="1"><stop stop-color="#79501e"/><stop offset=".45" stop-color="#f5d27b"/><stop offset=".7" stop-color="#a06c28"/><stop offset="1" stop-color="#edca72"/></linearGradient><radialGradient id="teal"><stop stop-color="#19535b"/><stop offset="1" stop-color="#061c25"/></radialGradient></defs><g fill="url(#brass)" stroke="#2b1a09" stroke-width="2"><circle cx="50" cy="50" r="39"/><circle cx="50" cy="50" r="31" fill="url(#teal)"/><path d="M46 12h8l3 18h-14zM46 70h8l3 18h-14zM12 46h18v8l-18 3zM70 46h18v8l-18 3zM21 21l6-6 15 12-10 10zM73 21l6 6-12 15-10-10zM21 79l6 6 15-12-10-10zM73 79l6-6-12-15-10 10z"/></g><circle cx="50" cy="50" r="17" fill="#0d3c46" stroke="url(#brass)" stroke-width="3"/><path d="M50 31l6 19-6 19-6-19zM31 50l19-6 19 6-19 6z" fill="url(#brass)"/><circle cx="50" cy="50" r="5" fill="#f9df91"/></svg></span><span class="theme-menu-trigger-label">MENU</span></button>
  <div class="theme-menu-scrim" hidden></div>
  <aside id="theme-menu-panel" class="theme-menu-panel" aria-label="Site menu" aria-hidden="true" hidden>
    <div class="theme-menu-panel-top"><span>URVION // DECK MAP</span><button class="theme-menu-close" type="button" aria-label="Close site menu">×</button></div>
    <nav class="theme-menu-links" aria-label="Primary navigation"><a class="active" href="/">Home <span>01</span></a><a href="#esc-about">About <span>02</span></a><a href="#events">Events <span>03</span></a><a href="#past-sponsors">Partners <span>04</span></a><a href="#crew">Teams <span>05</span></a><a href="#" aria-disabled="true">Gallery <span>06</span></a><a href="#" aria-disabled="true">Contact <span>07</span></a></nav>
    <button class="theme-menu-sound" type="button" aria-label="Play background music" aria-pressed="false"><span class="theme-menu-sound-icon">♬</span><span>Sound off</span></button>
  </aside>`;
document.body.append(themeMenu);
const menuButton = $('.theme-menu-trigger', themeMenu);
const themePanel = $('.theme-menu-panel', themeMenu);
const themeScrim = $('.theme-menu-scrim', themeMenu);
const menuClose = $('.theme-menu-close', themeMenu);
function setMenu(open) {
  themePanel.hidden = !open; themeScrim.hidden = !open;
  requestAnimationFrame(() => themeMenu.classList.toggle('is-open', open));
  themePanel.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close site menu' : 'Open site menu');
  if (open) menuClose.focus(); else menuButton.focus();
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menuClose.addEventListener('click', () => setMenu(false));
themeScrim.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false); });
$$('.theme-menu-links a', themeMenu).forEach(link => link.addEventListener('click', () => setMenu(false)));
function updateMusic() {
  const button = $('.theme-menu-sound', themeMenu);
  button.classList.toggle('playing', musicPlaying);
    button.setAttribute('aria-label', musicPlaying ? 'Mute background music' : 'Play background music');
    button.setAttribute('aria-pressed', String(musicPlaying));
    button.title = musicPlaying ? 'Mute Pirate Ambience' : 'Play Pirate Ambience';
  button.lastElementChild.textContent = musicPlaying ? 'Sound on' : 'Sound off';
}
async function toggleMusic() {
  if (musicPlaying) { music.pause(); musicPlaying = false; }
  else { try { await music.play(); musicPlaying = true; } catch { musicPlaying = false; } }
  updateMusic();
}
$('.theme-menu-sound', themeMenu).addEventListener('click', toggleMusic);
updateMusic();

// Sponsor archive flows in opposite directions; pointer events make each track swipeable.
$$('.sponsor-marquee').forEach(marquee => {
  const track = $('.sponsor-marquee-track', marquee);
  let startX = 0, startOffset = 0, dragging = false, pointerId;
  const matrixOffset = () => {
    const transform = getComputedStyle(track).transform;
    return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41;
  };
  marquee.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging = true; pointerId = event.pointerId; startX = event.clientX; startOffset = matrixOffset();
    marquee.classList.add('is-dragging'); marquee.setPointerCapture(pointerId);
    track.style.transform = `translateX(${startOffset}px)`;
  });
  marquee.addEventListener('pointermove', event => {
    if (!dragging || event.pointerId !== pointerId) return;
    track.style.transform = `translateX(${startOffset + event.clientX - startX}px)`;
  });
  const release = event => {
    if (!dragging || event.pointerId !== pointerId) return;
    dragging = false; marquee.classList.remove('is-dragging');
    if (marquee.hasPointerCapture(pointerId)) marquee.releasePointerCapture(pointerId);
    track.style.transform = '';
  };
  marquee.addEventListener('pointerup', release);
  marquee.addEventListener('pointercancel', release);
});

// Pause the chapter backdrop when it is outside the viewport.
const video = $('video');
new IntersectionObserver(entries => entries.forEach(entry => {
  if (!video) return;
  if (entry.isIntersecting && !reducedMotion.matches && !mobileQuery.matches) video.play().catch(() => {});
  else video.pause();
})).observe(about);

// Event carousel: exact original copy, 280ms transition, 5s rotation, dots and swipe.
async function setupEvents() {
  const response = await fetch('/events.json');
  if (!response.ok) throw new Error('Event content could not be loaded');
  const events = await response.json();
  const section = $('#events');
  let selected = 0, transitioning = false, paused = false, touchStart;
  const bg = $('.events-bg-container > div:first-child');
  Object.assign(bg.style, { position: 'absolute', inset: '0', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' });
  function render() {
    const event = events[selected];
    bg.style.backgroundImage = `url("${event.bgImage}")`;
    bg.style.backgroundPosition = event.bgPosition || 'center center';
    $('.events-bg-container').style.backgroundColor = event.bgColor;
    const title = $('.events-big-title');
    title.textContent = event.name;
    title.style.fontSize = event.name.length > 20 ? 'clamp(2rem,7.5vw,8.5rem)' : event.name.length > 15 ? 'clamp(2.4rem,9.2vw,10rem)' : event.name.length > 12 ? 'clamp(2.8rem,11vw,11.5rem)' : 'clamp(3.5rem,13.5vw,13.5rem)';
    title.style.letterSpacing = event.name.length > 18 ? '.04em' : '.08em';
    $('.circle-category-title').textContent = event.category;
    $('.circle-category-title').style.color = event.color;
    $('.circle-description-text').textContent = event.description;
    $('.circle-action-link').href = `#rules-${event.id}`;
    $('.circle-action-link').textContent = 'VIEW RULES →';
    const button = $('.circle-action-btn');
    button.href = event.registrationUrl || '#';
    button.target = event.registrationUrl ? '_blank' : '';
    button.rel = event.registrationUrl ? 'noopener noreferrer' : '';
    button.setAttribute('aria-disabled', String(!event.registrationUrl));
    button.textContent = event.registrationUrl ? 'REGISTER →' : 'REGISTRATION SOON';
    button.style.background = event.color;
    button.style.color = '#000';
    button.style.cursor = 'pointer';
    $('.events-dial').className = 'events-dial';
    $$('.event-character', section).forEach(el => el.remove());
    const prefix = { ultron:'ultron', 'civil-wars':'captain', groove:'groove', quantumania:'quantumania', multiverse:'multiverse', 'ad-mad':'thunderbolts' };
    ['left', 'right'].forEach(side => {
      if (!event[`${side}Char`]) return;
      const el = document.createElement('div');
      let character = prefix[event.id];
      if (event.id === 'civil-wars' && side === 'right') character = 'ironman';
      el.className = `event-character events-char-${side} ${character ? `${character}-char-${side}` : ''} anim-in`;
      el.innerHTML = `<img src="${event[`${side}Char`]}" alt="" width="${side === 'left' ? 680 : 740}" height="${side === 'left' ? 680 : 740}" style="object-fit:contain">`;
      section.append(el);
    });
    if (event.topOverlay) {
      const overlay = document.createElement('div');
      overlay.className = 'event-character events-top-overlay anim-in';
      Object.assign(overlay.style, { position: 'absolute', inset: '0', zIndex: '15', pointerEvents: 'none' });
      overlay.innerHTML = `<img src="${event.topOverlay}" alt="" style="width:100%;height:100%;object-fit:cover">`;
      section.append(overlay);
    }
    $$('.events-indicator').forEach((dot, index) => {
      dot.classList.toggle('active', index === selected);
      dot.setAttribute('aria-current', index === selected ? 'true' : 'false');
      dot.style.width = index === selected ? '36px' : '';
      dot.style.background = index === selected ? event.color : '';
    });
  }
  function select(index) {
    const next = (index + events.length) % events.length;
    if (next === selected || transitioning) return;
    transitioning = true;
    const animating = $$('.events-big-title,.events-circle-content,.event-character');
    animating.forEach(el => { el.classList.remove('anim-in'); el.classList.add('anim-out'); });
    setTimeout(() => {
      selected = next; render();
      setTimeout(() => {
        $$('.events-big-title,.events-circle-content,.event-character').forEach(el => { el.classList.remove('anim-out'); el.classList.add('anim-in'); });
        transitioning = false;
      }, reducedMotion.matches ? 0 : 50);
    }, reducedMotion.matches ? 0 : 280);
  }
  $('.events-nav-prev').addEventListener('click', () => select(selected - 1));
  $('.events-nav-next').addEventListener('click', () => select(selected + 1));
  $$('.events-indicator').forEach((dot, index) => dot.addEventListener('click', () => select(index)));
  section.addEventListener('pointerenter', () => { paused = true; });
  section.addEventListener('pointerleave', () => { paused = false; });
  section.addEventListener('focusin', () => { paused = true; });
  section.addEventListener('focusout', () => { paused = false; });
  section.addEventListener('touchstart', event => { touchStart = { x:event.touches[0].clientX, y:event.touches[0].clientY }; }, { passive:true });
  section.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) select(selected + (dx < 0 ? 1 : -1));
    touchStart = undefined;
  }, { passive:true });
  setInterval(() => { if (!paused && !document.hidden && !reducedMotion.matches) select(selected + 1); }, 5000);
  render();
}
setupEvents().catch(console.error);

// Post-countdown fireworks, matching the original's color palette and particle physics.
function fireworks() {
  if (reducedMotion.matches || Date.now() < new Date('2027-01-15T00:00:00+05:30').getTime()) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'fireworks'; canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }
  let width, height, lastLaunch = 0;
  function resize() { width = canvas.width = innerWidth; height = canvas.height = innerHeight; }
  resize(); window.addEventListener('resize', resize, { passive:true });
  const colors = ['#e8bd68','#f6dfaa','#b88a42','#77b9b3','#b8d9d0','#fff1ca'];
  const rockets = [], particles = [];
  function launch() {
    if (rockets.length < 3) rockets.push({ x:Math.random() * (width - 160) + 80, y:height, targetY:Math.random() * height * .4 + height * .1, vy:-(Math.random() * 3.5 + 10.5), color:colors[Math.floor(Math.random() * colors.length)] });
  }
  function frame(now) {
    if (!document.hidden && !reducedMotion.matches) {
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(4,5,7,.22)'; ctx.fillRect(0,0,width,height);
      ctx.globalCompositeOperation = 'lighter';
      if (now - lastLaunch > 500) { launch(); lastLaunch = now; }
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i]; rocket.y += rocket.vy;
        ctx.fillStyle = rocket.color; ctx.fillRect(rocket.x - 1.5,rocket.y,3,9);
        if (rocket.y <= rocket.targetY) {
          for (let n = 0; n < 36 && particles.length < 140; n++) {
            const angle = Math.random() * Math.PI * 2, speed = Math.random() * 6 + 1.5;
            particles.push({ x:rocket.x, y:rocket.y, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, alpha:1, color:rocket.color, size:Math.random()*2+1.2, decay:Math.random()*.018+.012 });
          }
          rockets.splice(i,1);
        }
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]; p.vx *= .96; p.vy = p.vy * .96 + .11; p.x += p.vx; p.y += p.vy; p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(i,1); continue; }
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  launch(); launch(); launch(); requestAnimationFrame(frame);
}
// Firework overlays are intentionally omitted so the page stays quiet between sections.
