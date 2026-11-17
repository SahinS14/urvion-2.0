const list = document.querySelector('#events-list');
const progress = document.querySelector('#event-progress');
const events = await fetch('/events.json').then(response => response.json());

list.innerHTML = events.map((event, index) => `
  <section id="event-${event.id}" class="event-chapter" style="--event-color:${event.color};--event-ink:${event.bgColor};--event-bg:url('${event.bgImage}')" aria-labelledby="${event.id}-title">
    <div class="event-backdrop" aria-hidden="true"></div>
    <div class="event-frame">
      <div class="event-poster-wrap"><img class="event-poster" src="${event.poster}" alt="${event.name} event poster" loading="${index === 0 ? 'eager' : 'lazy'}"/></div>
      <div class="event-copy">
        <p class="event-ordinal">LOG 0${index + 1} // ${event.domain}</p>
        <h2 id="${event.id}-title">${event.name}</h2>
        <p class="event-category">${event.category}</p>
        <p class="event-description">${event.description}</p>
        <p class="event-focus"><strong>MISSION FOCUS</strong>${event.focus}</p>
        <div class="event-actions"><a href="#event-${event.id}">EVENT BRIEF</a>${event.registrationUrl ? `<a class="event-register" href="${event.registrationUrl}" target="_blank" rel="noopener noreferrer">REGISTER NOW</a>` : '<span class="event-register event-register-pending">REGISTRATION SOON</span>'}</div>
      </div>
    </div>
  </section>${index < events.length - 1 ? '<div class="event-transition" aria-hidden="true"></div>' : ''}`).join('');

progress.innerHTML = events.map((event, index) => `<a class="event-progress-dot${index === 0 ? ' active' : ''}" href="#event-${event.id}" aria-label="View ${event.name}"></a>`).join('');

const chapters = [...document.querySelectorAll('.event-chapter')];
const dots = [...document.querySelectorAll('.event-progress-dot')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const activeIndex = chapters.indexOf(entry.target);
  chapters.forEach((chapter, index) => chapter.classList.toggle('active', index === activeIndex));
  dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
}), { threshold: .58 });
chapters.forEach(chapter => observer.observe(chapter));
