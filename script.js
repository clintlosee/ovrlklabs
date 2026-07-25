// OVRLK Labs — landing page
// Footer year + cycling GPS coord scramble. No build step required.

document.getElementById('year').textContent = new Date().getFullYear();

const PLACES = [
  { lat: '40.1652° N', lon: '111.6108° W', name: 'Springville, UT' },
  { lat: '40.3905° N', lon: '111.6460° W', name: 'Mount Timpanogos' },
  { lat: '37.2982° N', lon: '113.0263° W', name: 'Zion National Park' },
  { lat: '38.5733° N', lon: '109.5498° W', name: 'Moab, UT' },
  { lat: '41.1700° N', lon: '112.5800° W', name: 'Great Salt Lake' },
  { lat: '38.162844° N', lon: '111.4381° W', name: 'Boulder Mountain' },
  { lat: '38.7331° N', lon: '109.5925° W', name: 'Arches National Park' },
  { lat: '37.5930° N', lon: '112.1871° W', name: 'Bryce Canyon' },
  { lat: '38.5753° N', lon: '109.4650° W', name: 'Castle Valley' },
  { lat: '40.6010° N', lon: '111.6380° W', name: 'Lone Peak' },
  { lat: '37.8667° N', lon: '110.4000° W', name: 'Lake Powell' },
  { lat: '40.7639° N', lon: '113.8303° W', name: 'Bonneville Salt Flats' },
  { lat: '38.2913° N', lon: '111.2615° W', name: 'Capitol Reef' },
  { lat: '38.5711° N', lon: '110.7135° W', name: 'Goblin Valley' },
  { lat: '40.9125° N', lon: '109.4210° W', name: 'Flaming Gorge' },
];

const SCRAMBLE_CHARS = '0123456789.°NSEWABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const HOLD_MS = 3800;
const TICK_MS = 28;

function formatPlace(place) {
  return `${place.lat}, ${place.lon} — ${place.name}`;
}

function randomChar() {
  return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitUntilVisible() {
  if (!document.hidden) return Promise.resolve();
  return new Promise((resolve) => {
    const onChange = () => {
      if (!document.hidden) {
        document.removeEventListener('visibilitychange', onChange);
        resolve();
      }
    };
    document.addEventListener('visibilitychange', onChange);
  });
}

/**
 * Decode/scramble into `target`: unresolved chars flicker through noise,
 * then lock left-to-right into the real coordinate string.
 */
async function scrambleTo(el, target) {
  const len = target.length;
  let revealed = 0;

  while (revealed <= len) {
    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = target[i];
      // Keep structural punctuation stable so the line stays readable mid-scramble.
      if (i < revealed || ch === ' ' || ch === ',' || ch === '—') {
        out += ch;
      } else {
        out += randomChar();
      }
    }
    el.textContent = out;

    if (revealed === len) break;
    revealed += 1;
    await sleep(TICK_MS);
  }
}

async function runCoordsCycle(el) {
  // Size to the longest label so the topbar doesn't jump between places.
  const longest = PLACES.map(formatPlace).reduce((a, b) => (a.length >= b.length ? a : b));
  el.style.minWidth = `${longest.length}ch`;

  let index = 0;
  el.textContent = formatPlace(PLACES[index]);

  while (true) {
    await sleep(HOLD_MS);
    await waitUntilVisible();
    index = (index + 1) % PLACES.length;
    await scrambleTo(el, formatPlace(PLACES[index]));
  }
}

const coordsEl = document.getElementById('coords');
if (coordsEl) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    coordsEl.textContent = formatPlace(PLACES[0]);
  } else {
    runCoordsCycle(coordsEl);
  }
}
