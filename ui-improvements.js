// ═══════════════════════════════════════════════════════════
//  STUDY QUEST PRO — UI IMPROVEMENTS
//  Acordeones, Tema, Tutorial, Mini-perfil
// ═══════════════════════════════════════════════════════════

// ── Acordeones colapsables ──────────────────────────────
function toggleCollapse(id) {
    const body = document.getElementById('collapse-' + id);
    const icon = document.getElementById('chevron-' + id);
    if (!body) return;
    const isOpen = !body.classList.contains('collapsed');
    body.classList.toggle('collapsed', isOpen);
    if (icon) icon.textContent = isOpen ? '▶' : '▼';
    // Guardar estado
    const states = JSON.parse(localStorage.getItem('collapseStates') || '{}');
    states[id] = !isOpen;
    localStorage.setItem('collapseStates', JSON.stringify(states));
}

function restoreCollapseStates() {
    const states = JSON.parse(localStorage.getItem('collapseStates') || '{}');
    Object.entries(states).forEach(([id, isOpen]) => {
        const body = document.getElementById('collapse-' + id);
        const icon = document.getElementById('chevron-' + id);
        if (!body) return;
        body.classList.toggle('collapsed', !isOpen);
        if (icon) icon.textContent = isOpen ? '▼' : '▶';
    });
}

// ── Tema claro / oscuro ─────────────────────────────────
function setTheme(light) {
    document.body.classList.toggle('light-theme', light);
    localStorage.setItem('lightTheme', light ? '1' : '0');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = light ? '🌙' : '☀️';
}

function initTheme() {
    const isLight = localStorage.getItem('lightTheme') === '1';
    setTheme(isLight);
}

// ── Mini perfil flotante ────────────────────────────────
function updateMiniProfile() {
    const el = document.getElementById('mini-profile-bar');
    if (!el) return;
    el.innerHTML = `
        <div class="mini-avatar" onclick="goToProfile()">
            <span class="mini-avatar-icon">👤</span>
        </div>
        <div class="mini-info" onclick="goToProfile()">
            <span class="mini-name">${appState.userName || 'Jugador'}</span>
            <span class="mini-level">Nv.${appState.currentLevel} · ${appState.currentRank}</span>
        </div>
        <div class="mini-resources">
            <span>🥇${appState.lingotes||0}</span>
            <span>💎${appState.gemas||0}</span>
            <span>🎰${appState.fichas||0}</span>
        </div>`;
}

function goToProfile() {
    document.querySelector('.nav-item[data-target="perfil"]')?.click();
}

// ── Tutorial inicial ────────────────────────────────────
const TUTORIAL_STEPS = [
    { target: '[data-target="estudio"]',   title: '📚 Estudio',    text: 'Aquí registras tus sesiones de estudio y ganas XP, puntos y recursos.' },
    { target: '[data-target="ejercicios"]', title: '💪 Ejercicios', text: 'Registra tu entrenamiento diario para ganar recompensas extra.' },
    { target: '[data-target="casino"]',    title: '🎲 Casino',     text: 'Usa tus Fichas para apostar en slots, botellas y buscaminas.' },
    { target: '[data-target="ranking"]',   title: '🏆 Ranking',    text: 'Conecta con amigos por ID, crea desafíos y participa en la Semana Infernal.' },
    { target: '[data-target="pase-hv"]',   title: '✨ Pase HV',    text: 'Sube de nivel el Pase con XP para desbloquear recompensas exclusivas.' },
    { target: '[data-target="tienda"]',    title: '🛒 Tienda',     text: 'Compra boosts, cofres y más con tus Lingotes y Gemas.' },
    { target: '[data-target="perfil"]',    title: '👤 Perfil',     text: '¡Eso es todo! Revisa tu progreso, logros y estandartes aquí.' },
];
let tutorialStep = 0;

function initTutorial() {
    if (localStorage.getItem('tutorialDone')) return;
    tutorialStep = 0;
    showTutorialStep();
}

function showTutorialStep() {
    const overlay = document.getElementById('tutorial-overlay');
    if (!overlay) return;
    if (tutorialStep >= TUTORIAL_STEPS.length) {
        overlay.style.display = 'none';
        const arrowEl = document.getElementById('tutorial-arrow');
        if (arrowEl) arrowEl.remove();
        localStorage.setItem('tutorialDone', '1');
        return;
    }
    const step = TUTORIAL_STEPS[tutorialStep];
    const target = document.querySelector(step.target);
    overlay.style.display = 'block'; // block en vez de flex para posicionamiento libre

    const box = document.getElementById('tutorial-box');
    document.getElementById('tutorial-title').textContent = step.title;
    document.getElementById('tutorial-text').textContent  = step.text;
    document.getElementById('tutorial-step-count').textContent = `${tutorialStep+1} / ${TUTORIAL_STEPS.length}`;

    // Highlight target
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('tutorial-highlight'));
    if (target) target.classList.add('tutorial-highlight');

    // Position tooltip — siempre centrada horizontalmente, encima de la nav
    if (box) {
        const BOX_W = 320;
        const BOX_MARGIN = 10;
        const navBar = document.querySelector('.mobile-nav');
        const navTop = navBar ? navBar.getBoundingClientRect().top : window.innerHeight - 70;
        
        // Centrar en pantalla horizontalmente
        const leftPos = Math.max(BOX_MARGIN, (window.innerWidth - BOX_W) / 2);
        
        // Calcular bottom desde el nav bar + pequeña flecha apuntando al target
        const bottomPos = window.innerHeight - navTop + 12;
        
        box.style.position = 'fixed';
        box.style.left = leftPos + 'px';
        box.style.right = 'auto';
        box.style.bottom = bottomPos + 'px';
        box.style.top = 'auto';
        box.style.width = BOX_W + 'px';
        box.style.maxWidth = `calc(100vw - ${BOX_MARGIN*2}px)`;
        
        // Añadir una flecha/indicador apuntando al item de nav resaltado
        let arrowEl = document.getElementById('tutorial-arrow');
        if (!arrowEl) {
            arrowEl = document.createElement('div');
            arrowEl.id = 'tutorial-arrow';
            arrowEl.style.cssText = 'position:fixed;z-index:99999;font-size:1.5em;transition:all 0.3s;pointer-events:none;';
            document.body.appendChild(arrowEl);
        }
        
        if (target) {
            const tRect = target.getBoundingClientRect();
            const arrowLeft = tRect.left + tRect.width/2 - 12;
            arrowEl.style.left = Math.max(8, Math.min(arrowLeft, window.innerWidth - 30)) + 'px';
            arrowEl.style.bottom = (window.innerHeight - navTop + 4) + 'px';
            arrowEl.style.top = 'auto';
            arrowEl.textContent = '⬇️';
            arrowEl.style.display = 'block';
        } else {
            arrowEl.style.display = 'none';
        }
    }
}

function nextTutorialStep() {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('tutorial-highlight'));
    tutorialStep++;
    if (tutorialStep >= TUTORIAL_STEPS.length) {
        // Tutorial terminado — limpiar todo
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) overlay.style.display = 'none';
        const arrowEl = document.getElementById('tutorial-arrow');
        if (arrowEl) arrowEl.remove();
        localStorage.setItem('tutorialDone', '1');
        return;
    }
    showTutorialStep();
}

function skipTutorial() {
    document.getElementById('tutorial-overlay').style.display = 'none';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('tutorial-highlight'));
    const arrowEl = document.getElementById('tutorial-arrow');
    if (arrowEl) arrowEl.remove();
    localStorage.setItem('tutorialDone', '1');
}

// ── Ocultar nav cuando teclado abre en modales ──────────
(function initKeyboardNavHide() {
    // Selectores de inputs dentro de modales que usan la nav
    const MODAL_INPUT_SELECTOR = '.mp-modal input, .mp-modal textarea, .hell-week-modal-wrapper input, .hell-week-modal-wrapper textarea, .hell-week-modal-wrapper select';

    function isModalInput(el) {
        return el && el.matches && el.matches(MODAL_INPUT_SELECTOR);
    }

    // Método 1: visualViewport API (más fiable en iOS/Android modernos)
    if (window.visualViewport) {
        let initialHeight = window.visualViewport.height;
        window.visualViewport.addEventListener('resize', () => {
            const currentHeight = window.visualViewport.height;
            const diff = initialHeight - currentHeight;
            // Si el viewport se redujo más de 150px → teclado abierto
            if (diff > 150) {
                document.body.classList.add('keyboard-open');
            } else {
                document.body.classList.remove('keyboard-open');
                initialHeight = currentHeight; // actualizar cuando se cierra
            }
        });
        // Actualizar referencia cuando cambia orientación
        window.addEventListener('resize', () => {
            if (!document.body.classList.contains('keyboard-open')) {
                initialHeight = window.visualViewport.height;
            }
        });
    }

    // Método 2: fallback con focus/blur en inputs de modales
    document.addEventListener('focusin', (e) => {
        if (isModalInput(e.target)) {
            document.body.classList.add('keyboard-open');
        }
    });
    document.addEventListener('focusout', (e) => {
        if (isModalInput(e.target)) {
            // Pequeño delay para evitar flash al cambiar de un input a otro
            setTimeout(() => {
                const focused = document.activeElement;
                if (!isModalInput(focused)) {
                    document.body.classList.remove('keyboard-open');
                }
            }, 150);
        }
    });
})();

// ── Init ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initTheme();
        restoreCollapseStates();
        updateMiniProfile();
        initTutorial();
    }, 600);
});
