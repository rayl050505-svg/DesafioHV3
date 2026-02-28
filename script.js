const appState = {
    // --- RECURSOS Y PROGRESO ---
    lingotes: 0,
    gemas: 0,
    fichas: 10, 
    hvTickets: 0,
    totalXP: 0,
    totalPuntos: 0,
    totalHoras: 0, // Horas totales en minutos
    currentLevel: 1,
    currentRank: 'Novato', 
    xpToNextLevel: 120, 
    puntosToNextRank: 1000, 
    maxRankEver: 'Novato', // Nuevo para el reinicio mensual
    lastRankResetDate: getTodayDateString(), // Para el reinicio mensual
    
    // --- HISTORIAL DE ESTUDIO ---
    studyHistory: [], 
    
    // --- NUEVO: SISTEMA DE EJERCICIOS ---
    exercises: {
        sentadillas: 0,
        flexiones: 0,
        pullups: 0,
        burpees: 0,
        plancha: 0,
        saltos: 0
    },
    
    // --- HISTORIAL DE EJERCICIOS ---
    exerciseHistory: [],

    // --- INVENTARIO, BOOSTS Y ESTANDARTES ---
    epicChests: 0,
    legendaryChests: 0,
    activeBoosts: {
        xp: 1, 
        points: 1, 
    },
    // NUEVO: Estandartes
    banners: ['Estudiante'], // Siempre tiene el estandarte base
    equippedBanner: 'Estudiante',
    
    // --- PASE HV ---
    passLevel: 1,
    passXP: 0,
    passXPToNextLevel: 500,
    passPlusActive: false,
    passRewardsClaimed: {}, 
    
    // --- MISIONES ---
    dailyMissions: [],

    // --- LOGROS RECLAMADOS ---
    achievementsClaimed: {}, 
    
    // --- ESTADÍSTICAS ADICIONALES ---
    minesweeperWins: 0,
    slotsWins: 0, 
    shellWins: 0, // NUEVO: Victorias en el juego de botellas
    userName: 'Estudiante Desafío',
    
    // --- AMIGOS ---
    friends: [],

    // --- RACHAS ---
    streak: 0,
    lastStudyDate: '',
    streakShieldDays: 0,
    streakRecoveries: 0,
    streakHistory: [],

    // --- RETOS DIARIOS DIFÍCILES ---
    dailyChallenges: [],

    // --- TEMPORAL ESTUDIO ---
    selectedDuration: 0,
    materiaEstudio: 'General',
    
    // --- NUEVO: JUEGO DE BOTELLAS ---
    shellGame: {
        isActive: false,
        selectedBet: 0,
        correctBottle: 0,
        gameStarted: false
    }
};

// --- CONFIGURACIÓN DEL JUEGO ---

// --- CONFIGURACIÓN DE ESTANDARTES ---
const BANNER_CONFIG = {
    'Estudiante': { name: 'Estudiante', icon: '🎓', color: '#3f51b5' },
    'Maestro': { name: 'Maestro', icon: '🧠', color: '#4CAF50' },
    'Élite HV': { name: 'Élite HV', icon: '🚀', color: '#00BCD4' },
    'Legendario': { name: 'Legendario', icon: '👑', color: '#FFD700' },
    'Apostador': { name: 'Apostador', icon: '🎲', color: '#FF9800' },
    'Cofres': { name: 'Cofres', icon: '🎁', color: '#E91E63' },
    'Programador': { name: 'Programador', icon: '💻', color: '#9E9E9E' },
    'Buscaminas': { name: 'Buscaminas', icon: '💣', color: '#F44336' },
    'Botellero': { name: 'Botellero', icon: '🍾', color: '#9C27B0' },
    // NUEVO: Banners de ejercicios
    'Guerrero': { name: 'Guerrero', icon: '⚔️', color: '#8B4513' },
    'Atleta': { name: 'Atleta', icon: '🏃‍♂️', color: '#FF6B35' },
    'Fuerza': { name: 'Fuerza', icon: '💪', color: '#DC143C' },
    'Resistencia': { name: 'Resistencia', icon: '🔥', color: '#FF4500' },
    'Equilibrio': { name: 'Equilibrio', icon: '⚖️', color: '#4169E1' },
    'Velocidad': { name: 'Velocidad', icon: '⚡', color: '#FFD700' },
    'Titan': { name: 'Titán', icon: '🏆', color: '#B8860B' }
};

// --- NUEVO: CONFIGURACIÓN DE EJERCICIOS ---
const EXERCISE_CONFIG = {
    sentadillas: { name: 'Sentadillas', icon: '🦵', xp: 2, points: 5 },
    flexiones: { name: 'Flexiones', icon: '💪', xp: 3, points: 7 },
    pullups: { name: 'Pull-ups', icon: '🏋️‍♂️', xp: 5, points: 10 },
    burpees: { name: 'Burpees', icon: '🔥', xp: 4, points: 8 },
    plancha: { name: 'Plancha (seg)', icon: '⚖️', xp: 1, points: 3 },
    saltos: { name: 'Saltos', icon: '⚡', xp: 2, points: 4 }
};

// --- NUEVO: CONFIGURACIÓN DE JUGADORES FALSOS ---
const FAKE_PLAYERS = [
    // Top 10 - Los más difíciles de superar
    { name: "DragonSlayer2024", points: 45000, rank: "Leyenda" },
    { name: "StudyMaster_Pro", points: 42500, rank: "Leyenda" },
    { name: "NightOwlScholar", points: 40000, rank: "Leyenda" },
    { name: "BookwormElite", points: 38750, rank: "Leyenda" },
    { name: "KnowledgeHunter", points: 37200, rank: "Leyenda" },
    { name: "BrainStorm_X", points: 35800, rank: "Leyenda" },
    { name: "StudyNinja_99", points: 34500, rank: "Leyenda" },
    { name: "WisdomSeeker", points: 33100, rank: "Leyenda" },
    { name: "AcademicTitan", points: 31900, rank: "Leyenda" },
    { name: "ScholarSupreme", points: 30500, rank: "Leyenda" },
    
    // Élites (11-30)
    { name: "CoffeeAndBooks", points: 29200, rank: "Élite" },
    { name: "MidnightStudier", points: 28000, rank: "Élite" },
    { name: "FlashcardKing", points: 26800, rank: "Élite" },
    { name: "NoteTaker_Pro", points: 25600, rank: "Élite" },
    { name: "ExamCrusher", points: 24400, rank: "Élite" },
    { name: "StudyBeast_2024", points: 23200, rank: "Élite" },
    { name: "BrainPower_Max", points: 22000, rank: "Élite" },
    { name: "KnowledgeAddict", points: 20800, rank: "Élite" },
    { name: "StudyWarrior_X", points: 19600, rank: "Élite" },
    { name: "AcademicNinja", points: 18400, rank: "Élite" },
    { name: "BookLover_2024", points: 17200, rank: "Élite" },
    { name: "StudyMachine_99", points: 16000, rank: "Élite" },
    { name: "WisdomCollector", points: 14800, rank: "Élite" },
    { name: "BrainTrainer_Pro", points: 13600, rank: "Élite" },
    { name: "StudyChampion", points: 12400, rank: "Élite" },
    { name: "KnowledgeSeeker", points: 11200, rank: "Élite" },
    { name: "AcademicHero", points: 10000, rank: "Élite" },
    { name: "StudyLegend_X", points: 9500, rank: "Élite" },
    { name: "BrainMaster_2024", points: 9000, rank: "Élite" },
    { name: "WisdomHunter", points: 8500, rank: "Élite" },
    
    // Competentes (31-60)
    { name: "StudyBuddy_99", points: 8000, rank: "Competente" },
    { name: "NoteMaster_Pro", points: 7600, rank: "Competente" },
    { name: "BookExplorer", points: 7200, rank: "Competente" },
    { name: "StudyFan_2024", points: 6800, rank: "Competente" },
    { name: "KnowledgeFan", points: 6400, rank: "Competente" },
    { name: "AcademicStar", points: 6000, rank: "Competente" },
    { name: "StudyEnthusiast", points: 5700, rank: "Competente" },
    { name: "BrainBuilder", points: 5400, rank: "Competente" },
    { name: "WisdomStudent", points: 5100, rank: "Competente" },
    { name: "StudyRookie_X", points: 4800, rank: "Competente" },
    { name: "BookReader_99", points: 4500, rank: "Competente" },
    { name: "StudyHelper", points: 4200, rank: "Competente" },
    { name: "KnowledgeStudent", points: 3900, rank: "Competente" },
    { name: "AcademicRookie", points: 3600, rank: "Competente" },
    { name: "StudyPal_2024", points: 3300, rank: "Competente" },
    { name: "BrainStudent", points: 3000, rank: "Competente" },
    { name: "WisdomRookie", points: 2800, rank: "Competente" },
    { name: "StudyBeginner", points: 2600, rank: "Competente" },
    { name: "BookStudent_99", points: 2400, rank: "Competente" },
    { name: "StudyFriend_X", points: 2200, rank: "Competente" },
    { name: "KnowledgeRookie", points: 2100, rank: "Competente" },
    { name: "AcademicFriend", points: 2000, rank: "Competente" },
    { name: "StudyMate_2024", points: 1950, rank: "Competente" },
    { name: "BrainFriend", points: 1900, rank: "Competente" },
    { name: "WisdomFriend", points: 1850, rank: "Competente" },
    { name: "StudyCompanion", points: 1800, rank: "Competente" },
    { name: "BookFriend_99", points: 1750, rank: "Competente" },
    { name: "StudyPartner", points: 1700, rank: "Competente" },
    { name: "KnowledgeFriend", points: 1650, rank: "Competente" },
    { name: "AcademicBuddy", points: 1600, rank: "Competente" },
    
    // Aspirantes (61-85)
    { name: "StudyNewbie_X", points: 1550, rank: "Aspirante" },
    { name: "BrainNewbie", points: 1500, rank: "Aspirante" },
    { name: "WisdomNewbie", points: 1450, rank: "Aspirante" },
    { name: "StudyStarter", points: 1400, rank: "Aspirante" },
    { name: "BookNewbie_99", points: 1350, rank: "Aspirante" },
    { name: "StudyLearner", points: 1300, rank: "Aspirante" },
    { name: "KnowledgeNewbie", points: 1250, rank: "Aspirante" },
    { name: "AcademicNewbie", points: 1200, rank: "Aspirante" },
    { name: "StudyExplorer", points: 1150, rank: "Aspirante" },
    { name: "BrainExplorer", points: 1100, rank: "Aspirante" },
    { name: "WisdomExplorer", points: 1050, rank: "Aspirante" },
    { name: "StudySeeker_X", points: 1000, rank: "Aspirante" },
    { name: "BookSeeker_99", points: 980, rank: "Novato" },
    { name: "StudyHunter", points: 960, rank: "Novato" },
    { name: "KnowledgeSeeker", points: 940, rank: "Novato" },
    { name: "AcademicSeeker", points: 920, rank: "Novato" },
    { name: "StudyFinder", points: 900, rank: "Novato" },
    { name: "BrainFinder", points: 880, rank: "Novato" },
    { name: "WisdomFinder", points: 860, rank: "Novato" },
    { name: "StudyTracker", points: 840, rank: "Novato" },
    { name: "BookTracker_99", points: 820, rank: "Novato" },
    { name: "StudyWatcher", points: 800, rank: "Novato" },
    { name: "KnowledgeTracker", points: 780, rank: "Novato" },
    { name: "AcademicTracker", points: 760, rank: "Novato" },
    { name: "StudyObserver", points: 740, rank: "Novato" },
    
    // Novatos (86-100)
    { name: "BrainObserver", points: 720, rank: "Novato" },
    { name: "WisdomObserver", points: 700, rank: "Novato" },
    { name: "StudyWanderer", points: 680, rank: "Novato" },
    { name: "BookWanderer_99", points: 660, rank: "Novato" },
    { name: "StudyDreamer", points: 640, rank: "Novato" },
    { name: "KnowledgeWanderer", points: 620, rank: "Novato" },
    { name: "AcademicWanderer", points: 600, rank: "Novato" },
    { name: "StudyVisitor", points: 580, rank: "Novato" },
    { name: "BrainVisitor", points: 560, rank: "Novato" },
    { name: "WisdomVisitor", points: 540, rank: "Novato" },
    { name: "StudyGuest_X", points: 520, rank: "Novato" },
    { name: "BookGuest_99", points: 500, rank: "Novato" },
    { name: "StudyTourist", points: 480, rank: "Novato" },
    { name: "KnowledgeGuest", points: 460, rank: "Novato" },
    { name: "AcademicGuest", points: 440, rank: "Novato" }
];

const LEVEL_CONFIG = [
    // ... (Se mantiene la configuración) ...
    { level: 1, xp: 0 },
    { level: 2, xp: 120 },
    { level: 3, xp: 300 },
    { level: 4, xp: 550 },
    { level: 5, xp: 900 },
    { level: 6, xp: 1400 },
];

const RANK_CONFIG = [
    { rank: 'Novato',          points: 0,     icon: 'school',             color: '#607D8B' },
    { rank: 'Aspirante',       points: 1000,  icon: 'trending_up',        color: '#4CAF50' },
    { rank: 'Competente',      points: 2000,  icon: 'star',               color: '#FFEB3B' },
    { rank: 'Élite',           points: 3000,  icon: 'workspace_premium',  color: '#00BCD4' },
    { rank: 'Leyenda',         points: 8000,  icon: 'rocket_launch',      color: '#F44336' },
    { rank: 'Maestro',         points: 9000,  icon: 'military_tech',      color: '#9C27B0' },
    { rank: 'Maestro ⭐',      points: 10200, icon: 'military_tech',      color: '#8E24AA' },
    { rank: 'Maestro ⭐⭐',    points: 11400, icon: 'military_tech',      color: '#7B1FA2' },
    { rank: 'Maestro ⭐⭐⭐',  points: 12600, icon: 'military_tech',      color: '#6A0CAD' },
    { rank: 'Maestro ⭐⭐⭐⭐', points: 13800, icon: 'military_tech',     color: '#FDD835' },
    { rank: 'Maestro ⭐⭐⭐⭐⭐', points: 15000, icon: 'auto_awesome',   color: '#FFD700' },
];

const PASS_REWARDS = {
    // ... (Se mantiene la configuración) ...
    1: { free: { lingotes: 5 }, plus: { passXP: 500 } },
    2: { free: { fichas: 5 }, plus: { lingotes: 10 } },
    3: { free: { epicChests: 1 }, plus: { gemas: 1 } },
    4: { free: { lingotes: 10 }, plus: { fichas: 10 } },
    5: { free: { lingotes: 20 }, plus: { gemas: 1, lingotes: 20 } },
    6: { free: { fichas: 10 }, plus: { passXP: 300 } },
    7: { free: { passXP: 500 }, plus: { epicChests: 1 } },
    8: { free: { lingotes: 15 }, plus: { fichas: 15 } },
    9: { free: { epicChests: 1 }, plus: { gemas: 1 } },
    10: { free: { xpBoost: 1 }, plus: { legendaryChests: 1 } },
    11: { free: { fichas: 10 }, plus: { lingotes: 30 } },
    12: { free: { lingotes: 20 }, plus: { epicChests: 2 } },
    13: { free: { passXP: 500 }, plus: { gemas: 2 } },
    14: { free: { fichas: 15 }, plus: { fichas: 20 } },
    15: { free: { gemas: 1 }, plus: { lingotes: 50 } },
    16: { free: { epicChests: 1 }, plus: { xpBoost: 1 } },
    17: { free: { lingotes: 30 }, plus: { legendaryChests: 1 } },
    18: { free: { fichas: 20 }, plus: { gemas: 2 } },
    19: { free: { passXP: 700 }, plus: { fichas: 25 } },
    20: { free: { epicChests: 2, lingotes: 30 }, plus: { gemas: 3 } },
    21: { free: { fichas: 25 }, plus: { lingotes: 60 } },
    22: { free: { lingotes: 40 }, plus: { epicChests: 3 } },
    23: { free: { gemas: 1 }, plus: { legendaryChests: 1 } },
    24: { free: { epicChests: 2 }, plus: { gemas: 4 } },
    25: { free: { legendaryChests: 1 }, plus: { xpBoost: 1 } },
    26: { free: { lingotes: 50 }, plus: { fichas: 30 } },
    27: { free: { gemas: 2 }, plus: { lingotes: 100 } },
    28: { free: { legendaryChests: 1 }, plus: { epicChests: 5 } },
    29: { free: { fichas: 30 }, plus: { gemas: 5 } },
    30: { free: { gemas: 5, lingotes: 100 }, plus: { passPlus: 1 } },
};

const MISSION_TEMPLATES = [
    // ... (Se mantiene la configuración) ...
    { text: "Registra un estudio de 30 minutos.", type: "register_time", goal: 30, reward: { passXP: 100, lingotes: 5 } },
    { text: "Registra un estudio de 60 minutos.", type: "register_time", goal: 60, reward: { passXP: 200, lingotes: 10 } },
    { text: "Gana 1 partida de Buscaminas.", type: "minesweeper_win", goal: 1, reward: { passXP: 150, fichas: 5 } },
    { text: "Gira la Tragaperras 5 veces.", type: "slots_spin", goal: 5, reward: { passXP: 100, fichas: 5 } },
    { text: "Gira la Tragaperras 10 veces.", type: "slots_spin", goal: 10, reward: { passXP: 250, fichas: 15 } },
    { text: "Gana 3 partidas del Juego de Botellas.", type: "shell_win", goal: 3, reward: { passXP: 200, lingotes: 15 } },
    // NUEVO: Misiones de ejercicio
    { text: "Haz 50 sentadillas.", type: "exercise_sentadillas", goal: 50, reward: { passXP: 150, lingotes: 8 } },
    { text: "Haz 30 flexiones.", type: "exercise_flexiones", goal: 30, reward: { passXP: 200, lingotes: 12 } },
    { text: "Haz 10 pull-ups.", type: "exercise_pullups", goal: 10, reward: { passXP: 300, gemas: 1 } },
    { text: "Haz 20 burpees.", type: "exercise_burpees", goal: 20, reward: { passXP: 250, fichas: 10 } },
];

const ACHIEVEMENTS_CONFIG = [
    // Logros existentes
    { id: 1, name: "Primer Vuelo 🐦", description: "Registra tu primer estudio.", check: (state) => state.totalHoras > 0, reward: { lingotes: 5, xp: 50 }, claimed: false, icon: 'flight_takeoff' },
    { id: 2, name: "Estudiante Constante 📚", description: "Registra un total de 5 horas (300 min) de estudio.", check: (state) => state.totalHoras >= 300, reward: { lingotes: 20, gemas: 1, banner: 'Maestro' }, claimed: false, icon: 'schedule' },
    { id: 3, name: "Cazador de Bombas 💣", description: "Gana 5 partidas de Buscaminas.", check: (state) => state.minesweeperWins >= 5, reward: { lingotes: 30, fichas: 15, banner: 'Buscaminas' }, claimed: false, icon: 'military_tech' },
    { id: 4, name: "Gran Apostador 🍀", description: "Gana 5 premios en la Tragaperras.", check: (state) => state.slotsWins >= 5, reward: { lingotes: 30, gemas: 1, banner: 'Apostador' }, claimed: false, icon: 'emoji_events' },
    { id: 5, name: "El Coleccionista ⭐", description: "Alcanza el rango Competente o superior.", check: (state) => RANK_CONFIG.findIndex(r => r.rank === appState.currentRank) >= 2, reward: { lingotes: 50, gemas: 2, banner: 'Élite HV' }, claimed: false, icon: 'star' },
    { id: 6, name: "El Maratón de 30 🏃‍♂️", description: "Registra un total de 30 horas (1800 min) de estudio.", check: (state) => state.totalHoras >= 1800, reward: { lingotes: 100, gemas: 5, legendaryChests: 1 }, claimed: false, icon: 'fitness_center' },
    { id: 7, name: "El Siglo de Horas 💯", description: "Registra un total de 100 horas (6000 min) de estudio.", check: (state) => state.totalHoras >= 6000, reward: { lingotes: 300, gemas: 10, legendaryChests: 2, passPlus: 1, banner: 'Legendario' }, claimed: false, icon: 'verified' },
    { id: 8, name: "Maestro del Saber 🎓", description: "Registra un total de 300 horas (18000 min) de estudio.", check: (state) => state.totalHoras >= 18000, reward: { lingotes: 500, gemas: 20, epicChests: 5, legendaryChests: 5, xpBoost: 1, banner: 'Programador' }, claimed: false, icon: 'auto_stories' },
    { id: 9, name: "Maestro de Botellas 🍾", description: "Gana 10 partidas del Juego de Botellas.", check: (state) => state.shellWins >= 10, reward: { lingotes: 50, gemas: 3, fichas: 25, banner: 'Botellero' }, claimed: false, icon: 'wine_bar' },
    
    // NUEVO: Logros de ejercicios
    { id: 10, name: "Primer Entrenamiento 💪", description: "Registra tu primer ejercicio.", check: (state) => Object.values(state.exercises).some(count => count > 0), reward: { lingotes: 10, xp: 30, banner: 'Guerrero' }, claimed: false, icon: 'fitness_center' },
    { id: 11, name: "Sentadillas de Acero 🦵", description: "Haz 500 sentadillas en total.", check: (state) => state.exercises.sentadillas >= 500, reward: { lingotes: 40, gemas: 2, banner: 'Fuerza' }, claimed: false, icon: 'accessibility_new' },
    { id: 12, name: "Flexiones de Hierro 💪", description: "Haz 300 flexiones en total.", check: (state) => state.exercises.flexiones >= 300, reward: { lingotes: 50, gemas: 2, banner: 'Atleta' }, claimed: false, icon: 'fitness_center' },
    { id: 13, name: "Maestro de Pull-ups 🏋️‍♂️", description: "Haz 100 pull-ups en total.", check: (state) => state.exercises.pullups >= 100, reward: { lingotes: 80, gemas: 3, banner: 'Resistencia' }, claimed: false, icon: 'sports_gymnastics' },
    { id: 14, name: "Burpee Beast 🔥", description: "Haz 200 burpees en total.", check: (state) => state.exercises.burpees >= 200, reward: { lingotes: 70, gemas: 3, banner: 'Velocidad' }, claimed: false, icon: 'local_fire_department' },
    { id: 15, name: "Equilibrio Perfecto ⚖️", description: "Mantén plancha por 1800 segundos (30 min) en total.", check: (state) => state.exercises.plancha >= 1800, reward: { lingotes: 60, gemas: 2, banner: 'Equilibrio' }, claimed: false, icon: 'balance' },
    { id: 16, name: "Saltador Olímpico ⚡", description: "Haz 1000 saltos en total.", check: (state) => state.exercises.saltos >= 1000, reward: { lingotes: 90, gemas: 4, legendaryChests: 1, banner: 'Titan' }, claimed: false, icon: 'sports' }
];

// --- CONFIGURACIÓN DE RECOMPENSAS DE CASINO Y COFRES (Añadido Estandarte) ---
const SLOTS_JACKPOT = '10 Gemas + 50 Lingotes + 20 Fichas + Pase HV Plus 🚀'; 
const MINESWEEPER_JACKPOT = 'Pase HV Plus + Cofre Legendario + 5 Gemas';
const SHELL_JACKPOT = '25 Gemas + 100 Lingotes + 50 Fichas + Pase HV Plus 🍾'; // NUEVO

const ALL_BANNERS_EXCEPT_DEFAULT = Object.keys(BANNER_CONFIG).filter(b => b !== 'Estudiante');

// Recompensas para Cofres

// ══════════════════════════════════════════════════════
//   SISTEMA DE SONIDOS — Web Audio API (sin archivos)
// ══════════════════════════════════════════════════════

const SoundSystem = {
    ctx: null,
    enabled: true,

    getCtx() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return this.ctx;
    },

    // Tono simple con fade out
    tone(freq, duration, volume = 0.25, type = 'sine', delay = 0) {
        if (!this.enabled) return;
        try {
            const ctx = this.getCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
            gain.gain.setValueAtTime(0, ctx.currentTime + delay);
            gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + duration + 0.05);
        } catch(e) {}
    },

    // Ruido (para explosión)
    noise(duration, volume = 0.15, delay = 0) {
        if (!this.enabled) return;
        try {
            const ctx = this.getCtx();
            const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            src.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
            src.start(ctx.currentTime + delay);
            src.stop(ctx.currentTime + delay + duration + 0.05);
        } catch(e) {}
    },

    // ── Sonidos específicos ──────────────────────────────

    // Clic de botón suave
    click() {
        this.tone(600, 0.06, 0.12, 'sine');
    },

    // Seleccionar duración de estudio
    select() {
        this.tone(880, 0.08, 0.1, 'sine');
        this.tone(1100, 0.08, 0.08, 'sine', 0.07);
    },

    // Registrar estudio / ejercicio
    register() {
        this.tone(523, 0.1, 0.15, 'triangle');
        this.tone(659, 0.1, 0.15, 'triangle', 0.1);
        this.tone(784, 0.18, 0.15, 'triangle', 0.2);
    },

    // Subir de nivel / rango
    levelUp() {
        [523,659,784,1047].forEach((f,i) => this.tone(f, 0.18, 0.2, 'triangle', i*0.1));
    },

    // Victoria normal
    win() {
        this.tone(523, 0.12, 0.2, 'triangle');
        this.tone(659, 0.12, 0.2, 'triangle', 0.12);
        this.tone(784, 0.12, 0.2, 'triangle', 0.24);
        this.tone(1047,0.25, 0.2, 'triangle', 0.36);
    },

    // JACKPOT / Pase HV Plus — épico
    jackpot() {
        const notes = [261,329,392,523,659,784,1047,1319];
        notes.forEach((f,i) => {
            this.tone(f, 0.15, 0.22, 'triangle', i*0.07);
            this.tone(f*2, 0.1, 0.08, 'sine', i*0.07+0.04);
        });
        // Brillo final
        setTimeout(() => {
            [2093,2637,3136].forEach((f,i) => this.tone(f, 0.2, 0.15, 'sine', i*0.06));
        }, 650);
    },

    // Giro de tragaperras — sonido mecánico
    spin() {
        for (let i = 0; i < 12; i++) {
            const freq = 80 + Math.random() * 60;
            this.tone(freq, 0.06, 0.08, 'sawtooth', i * 0.07);
        }
    },

    // Carrete parando — clic mecánico
    reelStop(index) {
        this.tone(200 + index*80, 0.05, 0.18, 'square', 0);
        this.tone(150 + index*60, 0.08, 0.12, 'sawtooth', 0.04);
    },

    // Mezcla de botellas
    shuffle() {
        this.tone(300, 0.04, 0.1, 'square');
        this.tone(350, 0.04, 0.1, 'square', 0.08);
        this.tone(280, 0.04, 0.1, 'square', 0.16);
    },

    // Revelar celda del buscaminas
    reveal() {
        this.tone(440, 0.04, 0.08, 'sine');
    },

    // BOMBA — explosión
    bomb() {
        this.noise(0.6, 0.3);
        this.tone(80,  0.5, 0.2, 'sawtooth');
        this.tone(60,  0.4, 0.15, 'square', 0.05);
        this.tone(120, 0.3, 0.1, 'sawtooth', 0.1);
    },

    // Abrir cofre
    chest() {
        this.tone(330, 0.1, 0.15, 'triangle');
        this.tone(440, 0.1, 0.15, 'triangle', 0.1);
        this.tone(550, 0.1, 0.15, 'triangle', 0.2);
        this.tone(660, 0.2, 0.2, 'sine', 0.3);
    },

    // Misión completada
    mission() {
        this.tone(784, 0.1, 0.18, 'triangle');
        this.tone(988, 0.1, 0.18, 'triangle', 0.1);
        this.tone(1175,0.22, 0.18, 'triangle', 0.2);
    },

    // Error / límite
    error() {
        this.tone(200, 0.08, 0.15, 'sawtooth');
        this.tone(160, 0.12, 0.15, 'sawtooth', 0.1);
    },

    // Agregar amigo
    addFriend() {
        this.tone(659, 0.08, 0.12, 'sine');
        this.tone(880, 0.12, 0.12, 'sine', 0.09);
    },

    // Toggle sonido on/off
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) { this.select(); }
        return this.enabled;
    }
};

const CHEST_REWARDS = {
    epic: {
        lingotes: [1, 3],      // anti-trampas: max 3, solo 35% de chance
        lingotesChance: 0.35,
        gemas: [0, 1], 
        fichas: [3, 7], 
        passPlus: 0.04, 
        banner: 0.08,
    },
    legendary: {
        lingotes: [1, 3],      // anti-trampas: max 3, solo 45% de chance
        lingotesChance: 0.45,
        gemas: [1, 3],
        fichas: [8, 18],
        xpBoost: 0.08, 
        passPlus: 0.12, 
        banner: 0.22,
    }
};



// ══════════════════════════════════════════════════════
//   EPIC WIN CELEBRATION SYSTEM
// ══════════════════════════════════════════════════════

function showWinCelebration(type, rewards) {
    if (type === 'passPlus') SoundSystem.jackpot();
    else SoundSystem.win();
    // Remove any existing overlay
    const existing = document.getElementById('win-celebration-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'win-celebration-overlay';
    overlay.className = 'win-overlay';

    let icon, title, subtitle, rewardLines, glowClass;

    if (type === 'passPlus') {
        icon = '🚀';
        title = '¡PASE HV PLUS!';
        subtitle = 'Has desbloqueado el PASE HV PLUS';
        glowClass = 'glow-purple';
        rewardLines = ['<span class="wr-special">Todas las recompensas PLUS desbloqueadas ✨</span>'];
    } else if (type === 'jackpot') {
        icon = '💰';
        title = '¡¡JACKPOT!!';
        subtitle = '¡El mayor premio!';
        glowClass = 'glow-gold';
        rewardLines = rewards.map(r => `<span class="wr-item">${r}</span>`);
    } else if (type === 'chest') {
        icon = rewards.isLegendary ? '👑' : '🎁';
        title = rewards.isLegendary ? '¡COFRE LEGENDARIO!' : '¡COFRE ÉPICO!';
        subtitle = '¡Has obtenido:';
        glowClass = rewards.isLegendary ? 'glow-gold' : 'glow-violet';
        rewardLines = rewards.items.map(r => `<span class="wr-item">${r}</span>`);
    } else if (type === 'win') {
        icon = '🏆';
        title = '¡GANASTE!';
        subtitle = rewards.subtitle || '¡Excelente!';
        glowClass = 'glow-green';
        rewardLines = rewards.items ? rewards.items.map(r => `<span class="wr-item">${r}</span>`) : [];
    } else {
        icon = '⭐';
        title = '¡PREMIO!';
        subtitle = '';
        glowClass = 'glow-violet';
        rewardLines = [];
    }

    overlay.innerHTML = `
        <div class="win-box ${glowClass}">
            <div class="win-particles" id="win-particles"></div>
            <div class="win-icon-wrap">
                <span class="win-main-icon">${icon}</span>
                <div class="win-rings"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div></div>
            </div>
            <h1 class="win-title">${title}</h1>
            <p class="win-subtitle">${subtitle}</p>
            <div class="win-rewards">
                ${rewardLines.join('')}
            </div>
            <button class="win-close-btn" onclick="document.getElementById('win-celebration-overlay').remove()">
                ¡Genial! ✨
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    
    // Spawn particles
    spawnParticles(document.getElementById('win-particles'), type);

    // Auto close after 5s
    setTimeout(() => {
        const el = document.getElementById('win-celebration-overlay');
        if (el) { el.classList.add('fade-out'); setTimeout(() => el.remove(), 400); }
    }, 5000);
}

function spawnParticles(container, type) {
    if (!container) return;
    const colors = type === 'passPlus' ? ['#a855f7','#c084fc','#e879f9','#fbbf24'] :
                   type === 'jackpot'  ? ['#fbbf24','#f59e0b','#fde68a','#fff'] :
                                         ['#6366f1','#34d9a0','#fbbf24','#f2697a','#5bc4f5'];
    for (let i = 0; i < 36; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const x = Math.random() * 100;
        const y = 30 + Math.random() * 60;
        const size = 4 + Math.random() * 7;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 0.7;
        const dur = 0.9 + Math.random() * 1.1;
        p.style.cssText = `
            left:${x}%;top:${y}%;
            background:${color};
            width:${size}px;height:${size}px;
            border-radius:${Math.random()>.4?'50%':'3px'};
            animation:particleFly ${dur}s ${delay}s ease-out forwards;
        `;
        container.appendChild(p);
    }
}

// --- FUNCIONES DE UTILERÍA Y FECHA (Ajustado getTodayDateString para reinicio) ---
function showCustomAlert(message, type = 'success') {
    const container = document.getElementById('custom-alert-container');
    
    // NUEVO: Limpiar notificaciones anteriores para evitar acumulación
    while (container.children.length >= 1) {
        container.removeChild(container.firstChild);
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    
    // NUEVO: Crear estructura más estética
    const icon = document.createElement('div');
    icon.className = 'alert-icon';
    
    const content = document.createElement('div');
    content.className = 'alert-content';
    content.textContent = message;
    
    // Iconos según el tipo
    switch(type) {
        case 'success':
            icon.innerHTML = '<i class="material-icons">check_circle</i>';
            break;
        case 'error':
            icon.innerHTML = '<i class="material-icons">error</i>';
            break;
        case 'warning':
            icon.innerHTML = '<i class="material-icons">warning</i>';
            break;
        case 'info':
            icon.innerHTML = '<i class="material-icons">info</i>';
            break;
        case 'special':
            icon.innerHTML = '<i class="material-icons">star</i>';
            break;
        default:
            icon.innerHTML = '<i class="material-icons">notifications</i>';
    }
    
    alert.appendChild(icon);
    alert.appendChild(content);
    
    container.appendChild(alert);
    
    void alert.offsetWidth; 
    alert.classList.add('show');

    setTimeout(() => {
        alert.classList.remove('show');
        alert.addEventListener('transitionend', () => {
            if (alert.parentNode) {
                alert.remove();
            }
        });
    }, 4000);
}

function showRankUpAnimation(newRank) {
    // ... (Se mantiene la función) ...
    const overlay = document.getElementById('rank-up-overlay');
    const rankUpName = document.getElementById('rank-up-new-rank');
    const rankUpIcon = document.getElementById('rank-up-icon');

    const rankConfig = RANK_CONFIG.find(c => c.rank === newRank);

    rankUpName.textContent = rankConfig ? `¡Bienvenido al Rango ${newRank}!` : `¡ASCENSO A ${newRank.toUpperCase()}!`;
    rankUpIcon.textContent = rankConfig ? rankConfig.icon : 'star';
    rankUpIcon.style.color = rankConfig ? rankConfig.color : '#FFD700';

    overlay.classList.add('show');

    setTimeout(() => {
        overlay.classList.remove('show');
    }, 4000); 
}

function formatMinutes(totalMinutes) {
    // ... (Se mantiene la función) ...
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

function getTodayDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// --- GESTIÓN DE ESTADO Y REINICIO DE RANGO MENSUAL (ACTUALIZADO) ---

function saveState() {
    localStorage.setItem('studyQuestState', JSON.stringify(appState));
    if (typeof MP !== 'undefined' && MP.db) MP.onSave();
    if (typeof updateMiniProfile === 'function') updateMiniProfile();
}

function loadState() {
    const savedState = localStorage.getItem('studyQuestState');
    if (savedState) {
        const loadedState = JSON.parse(savedState);
        Object.keys(appState).forEach(key => {
            if (loadedState.hasOwnProperty(key)) {
                if (typeof appState[key] === 'number') {
                    appState[key] = Number(loadedState[key]) || 0;
                } else if (typeof appState[key] === 'object' && !Array.isArray(appState[key]) && loadedState[key] !== null) {
                    Object.assign(appState[key], loadedState[key]);
                } else {
                    appState[key] = loadedState[key];
                }
            }
        });
        
        // Asegurar que banners sea un array y tenga el default si no existe
        if (!Array.isArray(appState.banners)) {
            appState.banners = ['Estudiante'];
            appState.equippedBanner = 'Estudiante';
        }
        if (!appState.banners.includes('Estudiante')) {
             appState.banners.push('Estudiante');
        }
        if (!appState.equippedBanner || !appState.banners.includes(appState.equippedBanner)) {
            appState.equippedBanner = 'Estudiante';
        }
        
        // Asegurar la inicialización de maxRankEver
        if (!appState.maxRankEver) {
            appState.maxRankEver = appState.currentRank;
        }

        if (typeof appState.achievementsClaimed !== 'object' || appState.achievementsClaimed === null) {
            appState.achievementsClaimed = {};
        }

        if (!Array.isArray(appState.studyHistory)) {
            appState.studyHistory = [];
        } else {
            appState.studyHistory = appState.studyHistory.map(item => ({
                date: item.date,
                minutes: Number(item.minutes) || 0
            }));
        }

        // NUEVO: Asegurar shellWins existe
        if (typeof appState.shellWins !== 'number') {
            appState.shellWins = 0;
        }

        // NUEVO: Asegurar shellGame existe
        if (!appState.shellGame) {
            appState.shellGame = {
                isActive: false,
                selectedBet: 0,
                correctBottle: 0,
                gameStarted: false
            };
        }
        
        // NUEVO: Asegurar exercises existe
        if (!appState.exercises) {
            appState.exercises = {
                sentadillas: 0,
                flexiones: 0,
                pullups: 0,
                burpees: 0,
                plancha: 0,
                saltos: 0
            };
        }

        // Asegurar exerciseHistory existe
        if (!Array.isArray(appState.exerciseHistory)) {
            appState.exerciseHistory = [];
        }

        // Asegurar friends existe
        if (!Array.isArray(appState.friends)) {
            appState.friends = [];
        }

        // Asegurar datos de racha existen
        if (typeof appState.streak !== 'number') appState.streak = 0;
        if (typeof appState.streakShieldDays !== 'number') appState.streakShieldDays = 0;
        if (typeof appState.streakRecoveries !== 'number') appState.streakRecoveries = 0;
        if (!Array.isArray(appState.streakHistory)) appState.streakHistory = [];
        if (typeof appState.lastStudyDate !== 'string') appState.lastStudyDate = '';
        
        // Asegurar dailyChallenges existe
        if (!Array.isArray(appState.dailyChallenges)) appState.dailyChallenges = [];

        appState.totalHoras = Number(appState.totalHoras) || 0; 
        
        checkRankReset(); // NUEVO: Chequea si debe reiniciar el rango
        
        checkLevelUp(false);
        checkRankUp(false);
        
    } else {
        generateDailyMissions();
    }
}

function checkRankReset() {
    const today = new Date(getTodayDateString());
    const lastReset = new Date(appState.lastRankResetDate || getTodayDateString());
    
    // Compara el año y el mes
    const isNewMonth = today.getMonth() !== lastReset.getMonth() || today.getFullYear() !== lastReset.getFullYear();
    const isFirstDay = today.getDate() === 1;

    if (isNewMonth && isFirstDay) {
        
        // 1. Guardar el rango máximo alcanzado
        const currentRankIndex = RANK_CONFIG.findIndex(r => r.rank === appState.currentRank);
        const maxRankIndex = RANK_CONFIG.findIndex(r => r.rank === appState.maxRankEver);
        
        if (currentRankIndex > maxRankIndex) {
            appState.maxRankEver = appState.currentRank;
        }

        // 2. Dar recompensas de fin de temporada
        appState.lingotes += 100;
        appState.gemas += 100;
        appState.fichas += 100;
        
        // 3. Reiniciar el progreso del rango
        appState.totalPuntos = 0;
        appState.currentRank = 'Novato';
        appState.puntosToNextRank = RANK_CONFIG[1].points; // 1000

        // 4. Actualizar fecha de reinicio
        appState.lastRankResetDate = getTodayDateString();

        setTimeout(() => {
            showWinCelebration('win', { 
                subtitle: '¡Nueva Temporada! Rango reiniciado a Novato',
                items: ['+100 🥇 Lingotes', '+100 💎 Gemas', '+100 🎰 Fichas']
            });
        }, 1000);
        showCustomAlert('🎉 ¡Reinicio de Temporada! Recibes +100🥇 +100💎 +100🎰', 'special');
    }
}

// --- LÓGICA DE PROGRESIÓN (Se mantiene) ---
function checkLevelUp(showAlert = true) {
    // ... (Se mantiene la función) ...
    let leveledUp = false;
    while (appState.totalXP >= appState.xpToNextLevel) {
        const currentConfigIndex = LEVEL_CONFIG.findIndex(c => c.level === appState.currentLevel);
        
        if (currentConfigIndex < LEVEL_CONFIG.length - 1) {
            appState.currentLevel++;
            appState.xpToNextLevel = LEVEL_CONFIG[currentConfigIndex + 1].xp;
            if (showAlert) showCustomAlert(`¡Has subido al Nivel ${appState.currentLevel}!`, 'info');
            SoundSystem.levelUp();
            leveledUp = true;
        } else {
            appState.xpToNextLevel = appState.totalXP + 1; 
            break;
        }
    }
    const currentConfigIndex = LEVEL_CONFIG.findIndex(c => c.level === appState.currentLevel);
    if (currentConfigIndex < LEVEL_CONFIG.length - 1) {
        appState.xpToNextLevel = LEVEL_CONFIG[currentConfigIndex + 1].xp;
    }
    
    return leveledUp;
}

function checkRankUp(showAlert = true) {
    // ... (Se mantiene la función) ...
    const currentRankIndex = RANK_CONFIG.findIndex(c => c.rank === appState.currentRank);
    let rankedUp = false;

    if (currentRankIndex < RANK_CONFIG.length - 1) {
        const nextRankPoints = RANK_CONFIG[currentRankIndex + 1].points;
        if (appState.totalPuntos >= nextRankPoints) {
            
            appState.currentRank = RANK_CONFIG[currentRankIndex + 1].rank;
            rankedUp = true;
            
            if (showAlert) {
                 showRankUpAnimation(appState.currentRank);
            }
            
            // Actualizar maxRankEver si el nuevo rango es superior
            const maxRankIndex = RANK_CONFIG.findIndex(r => r.rank === appState.maxRankEver);
            if (currentRankIndex + 1 > maxRankIndex) {
                 appState.maxRankEver = appState.currentRank;
            }
        }
        
        appState.puntosToNextRank = nextRankPoints;

    } else {
        appState.puntosToNextRank = appState.totalPuntos + 1;
    }
    
    return rankedUp;
}

// --- LÓGICA DE PASE HV (Se mantiene) ---
function updatePassProgression(xpGained) {
    // ... (Se mantiene la función) ...
    appState.passXP += xpGained;
    
    let leveledUp = false;
    while (appState.passXP >= appState.passXPToNextLevel && appState.passLevel < 30) {
        appState.passXP -= appState.passXPToNextLevel;
        appState.passLevel++;
        appState.passXPToNextLevel = calculatePassXP(appState.passLevel);
        leveledUp = true;
    }
    
    if (appState.passLevel >= 30) {
        appState.passLevel = 30;
        appState.passXP = calculatePassXP(30) - 1; 
    }
    
    if (leveledUp) {
        showCustomAlert(`¡Nivel ${appState.passLevel} del Pase HV alcanzado!`, 'info');
    }
}

function calculatePassXP(level) {
    // ... (Se mantiene la función) ...
    return 500 + Math.round((level - 1) * 50 * 1.1); 
}

function claimPassReward(level, type) {
    // ... (Se mantiene la función) ...
    const rewardKey = `${level}_${type}`;
    if (appState.passRewardsClaimed[rewardKey]) return;

    const rewardsAtLevel = PASS_REWARDS[level];
    const rewardData = rewardsAtLevel ? rewardsAtLevel[type] : null;

    if (!rewardData) {
        showCustomAlert('No hay recompensa disponible en este nivel/tipo.', 'warning');
        return;
    }
    
    if (level > appState.passLevel) {
        showCustomAlert('No has alcanzado este nivel aún.', 'warning');
        return;
    }
    
    if (type === 'plus' && !appState.passPlusActive) {
        showCustomAlert('Necesitas el Pase HV Plus para reclamar esta recompensa.', 'warning');
        return;
    }

    let message = `Recompensa Nivel ${level} (${type.toUpperCase()}) reclamada: `;
    Object.keys(rewardData).forEach(key => {
        const amount = rewardData[key];
        if (key === 'xpBoost') {
            appState.activeBoosts.xp = 3;
            message += `Boost XP (x3) activado. `;
        } else if (key === 'passPlus') {
            appState.passPlusActive = true;
            message += `Pase HV Plus adquirido. `;
        } else if (appState.hasOwnProperty(key)) {
            appState[key] = (appState[key] || 0) + amount;
            message += `+${amount} ${key}. `;
        }
    });

    appState.passRewardsClaimed[rewardKey] = true;
    showCustomAlert(message, 'success');
    renderApp();
    saveState();
}

// --- LÓGICA DE LOGROS (ACTUALIZADO para Estandartes) ---
function claimAchievement(achievementId) {
    const achievement = ACHIEVEMENTS_CONFIG.find(a => a.id === achievementId);
    
    if (!achievement) return;
    
    if (!achievement.check(appState)) {
        showCustomAlert('Este logro aún no está desbloqueado.', 'error');
        return;
    }
    
    if (appState.achievementsClaimed[achievementId]) {
        showCustomAlert('Ya reclamaste la recompensa de este logro.', 'warning');
        return;
    }

    let message = `¡Logro ${achievement.name} reclamado! Recibes: `;
    Object.keys(achievement.reward).forEach(key => {
        const amount = achievement.reward[key];
        
        if (key === 'xpBoost') {
            appState.activeBoosts.xp = 3;
            message += `Boost XP (x3). `;
        } else if (key === 'passPlus') {
            appState.passPlusActive = true;
            message += `Pase HV Plus. `;
        } else if (key === 'banner') {
            if (!appState.banners.includes(amount)) {
                appState.banners.push(amount);
                message += `Nuevo Estandarte: ${amount} 🚩. `;
            } else {
                 message += `Estandarte ${amount} (ya lo tenías). `;
            }
        } else if (appState.hasOwnProperty(key)) {
            appState[key] = (appState[key] || 0) + amount;
            message += `+${amount} ${key}. `;
        }
    });

    appState.achievementsClaimed[achievementId] = true;
    showCustomAlert(message, 'special');
    renderApp();
    saveState();
}

// --- NUEVO: LÓGICA DE EJERCICIOS ---
// Límites diarios anti-trampas por ejercicio
const EXERCISE_DAILY_LIMITS = {
    sentadillas: 500,
    flexiones:   300,
    pullups:     100,
    burpees:     150,
    plancha:     3600, // segundos
    saltos:      1000
};

function getTodayExerciseTotal(type) {
    const today = getTodayDateString();
    return (appState.exerciseHistory || [])
        .filter(e => e.date === today && e.type === type)
        .reduce((sum, e) => sum + e.amount, 0);
}

function registerExercise(exerciseType, amount) {
    if (!EXERCISE_CONFIG[exerciseType] || amount <= 0) {
        showCustomAlert('Tipo de ejercicio o cantidad inválida.', 'error');
        return;
    }
    
    // Anti-trampas: límite diario por ejercicio
    const limit = EXERCISE_DAILY_LIMITS[exerciseType] || 999;
    const todayTotal = getTodayExerciseTotal(exerciseType);
    if (todayTotal >= limit) {
        showCustomAlert(`🚫 Límite diario de ${EXERCISE_CONFIG[exerciseType].name}: máx ${limit} por día.`, 'warning');
        return;
    }
    const allowedAmount = Math.min(amount, limit - todayTotal);
    if (allowedAmount < amount) {
        showCustomAlert(`⚠️ Solo puedes registrar ${allowedAmount} más de ${EXERCISE_CONFIG[exerciseType].name} hoy (límite: ${limit}/día).`, 'warning');
    }
    amount = allowedAmount;
    if (amount <= 0) return;
    
    const config = EXERCISE_CONFIG[exerciseType];
    appState.exercises[exerciseType] += amount;
    
    const hellMult = (typeof MP !== 'undefined' && MP.isHellWeekActive()) ? 2 : 1;
    const xpGained = Math.round(config.xp * amount * appState.activeBoosts.xp * hellMult);
    const puntosGained = Math.round(config.points * amount * appState.activeBoosts.points * hellMult);
    const lingotesGained = Math.max(1, Math.round(amount / 10 * hellMult));
    const passXPGained = Math.round(amount * 2 * hellMult);
    
    // Marcar ejercicio en Semana Infernal
    if (typeof MP !== 'undefined' && MP.isHellWeekActive()) MP.markHellExercise();
    
    appState.totalXP += xpGained;
    appState.totalPuntos += puntosGained;
    appState.lingotes += lingotesGained;
    
    SoundSystem.register();
    checkLevelUp();
    checkRankUp();
    updatePassProgression(passXPGained);
    checkMissionProgress(`exercise_${exerciseType}`, amount);
    checkDailyChallengeProgress(`ex_${exerciseType}`, amount);
    
    // Registrar en historial de ejercicios
    appState.exerciseHistory.unshift({
        date: getTodayDateString(),
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        type: exerciseType,
        name: config.name,
        icon: config.icon,
        amount: amount,
        xp: xpGained,
        puntos: puntosGained
    });
    if (appState.exerciseHistory.length > 100) appState.exerciseHistory.pop();
    
    const rewardsMessage = `${config.icon} ${amount} ${config.name}: +${xpGained} XP, +${puntosGained} Puntos, +${lingotesGained}🥇, +${passXPGained} Pase HV XP`;
    showCustomAlert(rewardsMessage, 'success');
    
    renderApp();
    saveState();
}

// --- NUEVO: LÓGICA DEL JUEGO DE BOTELLAS CON ANIMACIÓN ---

function selectBet(betAmount) {
    if (appState.fichas < betAmount) {
        showCustomAlert(`Necesitas ${betAmount} fichas para apostar esa cantidad.`, 'error');
        return;
    }
    
    appState.shellGame.selectedBet = betAmount;
    appState.shellGame.isActive = true;
    appState.shellGame.gameStarted = false;
    
    // Generar botella ganadora aleatoria
    appState.shellGame.correctBottle = Math.floor(Math.random() * 3) + 1;
    
    // NUEVO: Animación de intercambio de botellas
    animateBottleShuffle();
    
    // Actualizar interfaz
    document.querySelectorAll('.bet-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`[data-bet="${betAmount}"]`).classList.add('selected');
    
    const multiplier = calculateShellMultiplier(betAmount);
    document.getElementById('bet-preview').textContent = 
        `Apuesta: ${betAmount} 🎰 | Ganancia potencial: ${betAmount * multiplier} 🎰`;
    
    document.getElementById('shell-result').textContent = 
        '¡Apuesta seleccionada! Las botellas se están mezclando...';
}

// NUEVO: Animación de intercambio de botellas
function animateBottleShuffle() {
    SoundSystem.shuffle();
    const bottles = document.querySelectorAll('.bottle');
    
    // Deshabilitar botellas durante la animación
    bottles.forEach(bottle => {
        bottle.classList.add('shuffling');
        bottle.onclick = null;
    });
    
    // Animación de intercambio
    let shuffleCount = 0;
    const maxShuffles = 8;
    
    const shuffleInterval = setInterval(() => {
        // Intercambiar posiciones aleatoriamente
        const bottle1 = Math.floor(Math.random() * 3);
        const bottle2 = Math.floor(Math.random() * 3);
        
        if (bottle1 !== bottle2) {
            const bottleElements = Array.from(bottles);
            const temp = bottleElements[bottle1].style.transform;
            bottleElements[bottle1].style.transform = bottleElements[bottle2].style.transform || '';
            bottleElements[bottle2].style.transform = temp || '';
        }
        
        shuffleCount++;
        
        if (shuffleCount >= maxShuffles) {
            clearInterval(shuffleInterval);
            
            // Restaurar posiciones originales
            bottles.forEach((bottle, index) => {
                bottle.style.transform = '';
                bottle.classList.remove('shuffling');
            });
            
            // Habilitar botellas para selección
            setTimeout(() => {
                document.getElementById('shell-result').textContent = 
                    '¡Mezcla completa! Ahora elige una botella para revelar el premio.';
                
                bottles.forEach(bottle => {
                    bottle.onclick = () => selectBottle(parseInt(bottle.dataset.bottle));
                });
            }, 500);
        }
    }, 300);
}

function calculateShellMultiplier(bet) {
    // Multiplicadores basados en la apuesta
    if (bet >= 25) return 4; // x4 para apuestas altas
    if (bet >= 10) return 3; // x3 para apuestas medias
    if (bet >= 5) return 2.5; // x2.5 para apuestas bajas-medias
    return 2; // x2 para apuestas mínimas
}

function selectBottle(bottleNumber) {
    if (!appState.shellGame.isActive || appState.shellGame.gameStarted) return;
    
    appState.shellGame.gameStarted = true;
    appState.fichas -= appState.shellGame.selectedBet;
    
    // Deshabilitar todas las botellas
    document.querySelectorAll('.bottle').forEach(bottle => {
        bottle.onclick = null;
        bottle.classList.add('disabled');
    });
    
    // Mostrar resultado con animación
    setTimeout(() => {
        revealBottles(bottleNumber);
    }, 500);
}

function revealBottles(selectedBottle) {
    const correctBottle = appState.shellGame.correctBottle;
    const bet = appState.shellGame.selectedBet;
    const multiplier = calculateShellMultiplier(bet);
    
    document.querySelectorAll('.bottle').forEach((bottle, index) => {
        const bottleNum = index + 1;
        const bottleIcon = bottle.querySelector('.bottle-icon');
        
        if (bottleNum === correctBottle) {
            bottle.classList.add('winner');
            bottleIcon.textContent = '🏆';
        } else {
            bottle.classList.add('loser');
            bottleIcon.textContent = '💔';
        }
    });
    
    if (selectedBottle === correctBottle) {
        // ¡Ganó!
        const winnings = Math.floor(bet * multiplier);
        appState.fichas += winnings;
        appState.shellWins++;
        
        let message = `¡Botella correcta! +${winnings} fichas.`;
        
        // Posibilidad de jackpot para apuestas altas
        if (bet >= 25 && Math.random() < 0.15) {
            appState.gemas += 25;
            appState.lingotes += 100;
            appState.fichas += 50;
            appState.passPlusActive = true;
            message = `🍾 ¡JACKPOT SUPREMO!`;
            showWinCelebration('passPlus', {});
            showCustomAlert(message, 'special');
        } else if (bet >= 10 && Math.random() < 0.25) {
            const bonusGems = Math.floor(bet / 5);
            appState.gemas += bonusGems;
            setTimeout(() => showWinCelebration('win', { subtitle:`¡Botella correcta! (x${multiplier})`, items:[`+${winnings} 🎰 Fichas`, `+${bonusGems} 💎 Gemas Bonus`] }), 400);
            showCustomAlert(message, 'success');
        } else {
            setTimeout(() => showWinCelebration('win', { subtitle:`¡Botella correcta! (x${multiplier})`, items:[`+${winnings} 🎰 Fichas`] }), 400);
            showCustomAlert(message, 'success');
        }
        
        checkMissionProgress('shell_win', 1);
        checkDailyChallengeProgress('shell_wins', 1);
        
    } else {
        // Perdió
        showCustomAlert(`¡Perdiste! 💔 La botella correcta era la #${correctBottle}.`, 'error');
    }
    
    document.getElementById('shell-result').textContent = 
        selectedBottle === correctBottle ? 
        `¡Excelente elección! La botella #${correctBottle} tenía el premio.` :
        `¡Mala suerte! La botella correcta era la #${correctBottle}.`;
    
    // Resetear el juego
    appState.shellGame.isActive = false;
    appState.shellGame.selectedBet = 0;
    appState.shellGame.gameStarted = false;
    
    renderApp();
    saveState();
}

function resetShellGame() {
    appState.shellGame.isActive = false;
    appState.shellGame.selectedBet = 0;
    appState.shellGame.gameStarted = false;
    
    // Resetear interfaz
    document.querySelectorAll('.bet-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.bottle').forEach(bottle => {
        bottle.classList.remove('disabled', 'winner', 'loser', 'shuffling');
        bottle.querySelector('.bottle-icon').textContent = '🍾';
        bottle.onclick = null;
        bottle.style.transform = '';
    });
    
    document.getElementById('bet-preview').textContent = 'Selecciona una apuesta para comenzar.';
    document.getElementById('shell-result').textContent = 'Selecciona tu apuesta y luego elige una botella.';
}

// --- SISTEMA DE AMIGOS ---

function addFriend(name, points) {
    if (!name || name.trim() === '') {
        showCustomAlert('Por favor ingresa un nombre de amigo.', 'error');
        return;
    }
    
    const trimmedName = name.trim();
    
    // Verificar duplicados
    if (appState.friends.find(f => f.name.toLowerCase() === trimmedName.toLowerCase())) {
        showCustomAlert(`Ya tienes a "${trimmedName}" en tu lista de amigos.`, 'warning');
        return;
    }
    
    const friendPoints = Math.max(0, parseInt(points) || 0);
    const friendRank = getFriendRank(friendPoints);
    
    appState.friends.push({
        name: trimmedName,
        points: friendPoints,
        rank: friendRank,
        isFriend: true,
        addedAt: getTodayDateString()
    });
    
    showCustomAlert(`✅ ¡${trimmedName} agregado a tus amigos!`, 'success');
    SoundSystem.addFriend();
    renderFriendsList();
    renderRanking(getCurrentRankingFilter());
    saveState();
}

function removeFriend(name) {
    appState.friends = appState.friends.filter(f => f.name !== name);
    showCustomAlert(`Se eliminó a ${name} de tus amigos.`, 'info');
    renderFriendsList();
    renderRanking(getCurrentRankingFilter());
    saveState();
}

function updateFriendPoints(name, newPoints) {
    const friend = appState.friends.find(f => f.name === name);
    if (friend) {
        friend.points = Math.max(0, newPoints);
        friend.rank = getFriendRank(friend.points);
        saveState();
        renderFriendsList();
        renderRanking(getCurrentRankingFilter());
    }
}

function getFriendRank(points) {
    let rank = 'Novato';
    for (let i = RANK_CONFIG.length - 1; i >= 0; i--) {
        if (points >= RANK_CONFIG[i].points) {
            rank = RANK_CONFIG[i].rank;
            break;
        }
    }
    return rank;
}

function getCurrentRankingFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    if (!activeBtn) return 'all';
    if (activeBtn.id === 'filter-top10') return 'top10';
    if (activeBtn.id === 'filter-around') return 'around';
    if (activeBtn.id === 'filter-friends') return 'friends';
    return 'all';
}

function renderFriendsList() {
    const container = document.getElementById('friends-list-container');
    if (!container) return;
    
    if (appState.friends.length === 0) {
        container.innerHTML = '<p style="color:var(--secondary-text); text-align:center; padding: 15px;">No tienes amigos agregados aún.</p>';
        return;
    }
    
    // Ordenar amigos por puntos
    const sorted = [...appState.friends].sort((a, b) => b.points - a.points);
    
    container.innerHTML = '';
    sorted.forEach(friend => {
        const rankConfig = RANK_CONFIG.find(r => r.rank === friend.rank);
        const rankColor = rankConfig ? rankConfig.color : '#FFFFFF';
        
        const comparison = friend.points > appState.totalPuntos 
            ? `<span class="friend-compare losing">▲ ${(friend.points - appState.totalPuntos).toLocaleString()} pts arriba</span>`
            : friend.points < appState.totalPuntos
            ? `<span class="friend-compare winning">▼ ${(appState.totalPuntos - friend.points).toLocaleString()} pts abajo</span>`
            : `<span class="friend-compare tied">🤝 Empatados</span>`;
        
        const div = document.createElement('div');
        div.className = 'friend-card';
        div.innerHTML = `
            <div class="friend-avatar">${friend.online ? '🟢' : '👤'}</div>
            <div class="friend-info">
                <h4>${friend.name} ${friend.isRealPlayer ? '<span class="real-badge">🔴 En línea</span>' : ''}</h4>
                <div class="friend-stats">
                    <span style="color:${rankColor}; font-weight:bold;">${friend.rank}</span>
                    <span class="friend-points">${friend.points.toLocaleString()} pts</span>
                </div>
                ${comparison}
            </div>
            <div class="friend-actions">
                ${friend.isRealPlayer && friend.id ? `
                    <button class="friend-chat-btn" onclick="MP.openChat('${friend.id}','${friend.name.replace(/'/g,"\\'")}')">💬</button>
                    <button class="friend-challenge-btn" onclick="MP.openChallengeModal('${friend.id}','${friend.name.replace(/'/g,"\\'")}')">⚔️</button>
                ` : `
                    <button class="friend-edit-btn" onclick="promptUpdateFriend('${friend.name}', ${friend.points})" title="Actualizar puntos">✏️</button>
                `}
                <button class="friend-remove-btn" onclick="removeFriend('${friend.name}')" title="Eliminar amigo">🗑️</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function promptUpdateFriend(name, currentPoints) {
    const newPoints = prompt(`Actualizar puntos de ${name}.\nPuntos actuales: ${currentPoints}\nIngresa los nuevos puntos:`);
    if (newPoints !== null && newPoints !== '') {
        const parsed = parseInt(newPoints);
        if (!isNaN(parsed)) {
            updateFriendPoints(name, parsed);
            showCustomAlert(`Puntos de ${name} actualizados a ${parsed.toLocaleString()}.`, 'info');
        }
    }
}


function renderRanksOverview() {
    const container = document.getElementById('ranks-overview-container');
    if (!container) return;
    
    container.innerHTML = '';
    const currentIdx = RANK_CONFIG.findIndex(r => r.rank === appState.currentRank);
    
    RANK_CONFIG.forEach((rankCfg, idx) => {
        const isCurrentOrPast = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        const isNext = idx === currentIdx + 1;
        
        let progressInfo = '';
        if (isCurrent) {
            const nextRank = RANK_CONFIG[idx + 1];
            if (nextRank) {
                const needed = nextRank.points - appState.totalPuntos;
                const total = nextRank.points - rankCfg.points;
                const pct = Math.min(100, Math.round(((appState.totalPuntos - rankCfg.points) / total) * 100));
                progressInfo = `
                    <div class="rank-progress-wrap">
                        <div class="rank-prog-bar-bg">
                            <div class="rank-prog-bar-fill" style="width:${pct}%;background:${rankCfg.color}"></div>
                        </div>
                        <span class="rank-prog-text">${pct}% — faltan ${needed.toLocaleString()} pts</span>
                    </div>`;
            } else {
                progressInfo = '<span class="rank-max-badge">🏆 Rango Máximo</span>';
            }
        } else if (isNext) {
            const needed = rankCfg.points - appState.totalPuntos;
            progressInfo = `<span class="rank-needed">Necesitas ${needed.toLocaleString()} pts más</span>`;
        }
        
        const card = document.createElement('div');
        card.className = `rank-overview-card ${isCurrent ? 'rank-current' : ''} ${isCurrentOrPast && !isCurrent ? 'rank-past' : ''} ${!isCurrentOrPast ? 'rank-locked' : ''}`;
        card.innerHTML = `
            <div class="rank-ov-icon" style="color:${rankCfg.color};${isCurrent?`box-shadow:0 0 18px ${rankCfg.color}40`:''};border-color:${rankCfg.color}40">
                <i class="material-icons" style="color:${rankCfg.color}">${rankCfg.icon}</i>
            </div>
            <div class="rank-ov-info">
                <div class="rank-ov-top">
                    <h4 style="color:${isCurrentOrPast?rankCfg.color:'var(--t3)'}">${rankCfg.rank}</h4>
                    ${isCurrent ? '<span class="rank-badge-current">ACTUAL</span>' : ''}
                    ${isCurrentOrPast && !isCurrent ? '<span class="rank-badge-done">✓</span>' : ''}
                </div>
                <span class="rank-ov-pts">${rankCfg.points.toLocaleString()} puntos</span>
                ${progressInfo}
            </div>
        `;
        container.appendChild(card);
    });
}

// --- NUEVO: SISTEMA DE RANKING ---

function getUserPosition() {
    const userPoints = appState.totalPuntos;
    let position = 1;
    
    for (let player of FAKE_PLAYERS) {
        if (player.points > userPoints) {
            position++;
        }
    }
    
    return position;
}

function generateRankingList(filter = 'all') {
    const userPoints = appState.totalPuntos;

    // Obtener jugadores globales de Firebase (si está disponible)
    const globalPlayers = (typeof MP !== 'undefined' && MP.db) ? MP.getGlobalPlayers() : [];
    
    // Crear lista completa: FAKE_PLAYERS + amigos + globales + usuario
    // Evitar duplicados (amigos reales ya están en globalPlayers)
    const friendIds = new Set(appState.friends.filter(f => f.id).map(f => f.id));
    const uniqueGlobal = globalPlayers.filter(p => !friendIds.has(p.id));
    
    const allPlayers = [...FAKE_PLAYERS, ...appState.friends, ...uniqueGlobal, {
        name: appState.userName,
        points: userPoints,
        rank: appState.currentRank,
        isUser: true
    }];
    
    // Ordenar por puntos
    allPlayers.sort((a, b) => b.points - a.points);
    
    // Aplicar filtros
    let filteredPlayers = [];
    
    switch (filter) {
        case 'top10':
            filteredPlayers = allPlayers.slice(0, 10);
            break;
        case 'around':
            const userIndex = allPlayers.findIndex(p => p.isUser);
            const start = Math.max(0, userIndex - 5);
            const end = Math.min(allPlayers.length, userIndex + 6);
            filteredPlayers = allPlayers.slice(start, end);
            break;
        case 'friends':
            filteredPlayers = allPlayers.filter(p => p.isUser || p.isFriend);
            break;
        default: // 'all'
            filteredPlayers = allPlayers;
            break;
    }
    
    return filteredPlayers.map((player) => ({
        ...player,
        position: allPlayers.findIndex(p => p.name === player.name) + 1
    }));
}

function renderRanking(filter = 'all') {
    const container = document.getElementById('ranking-container');
    const players = generateRankingList(filter);
    
    container.innerHTML = '';
    
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = `ranking-item ${player.isUser ? 'user-item' : ''}`;
        
        const rankConfig = RANK_CONFIG.find(r => r.rank === player.rank);
        const rankIcon = rankConfig ? rankConfig.icon : 'star';
        const rankColor = rankConfig ? rankConfig.color : '#FFFFFF';
        
        let positionClass = '';
        if (player.position === 1) positionClass = 'first-place';
        else if (player.position === 2) positionClass = 'second-place';
        else if (player.position === 3) positionClass = 'third-place';
        
        playerDiv.innerHTML = `
            <div class="ranking-position ${positionClass}">#${player.position}</div>
            <div class="ranking-info">
                <h4>${player.name} ${player.isUser ? '<span class="you-badge">Tú</span>' : ''} ${player.isFriend ? '<span class="friend-badge">Amigo</span>' : ''}</h4>
                <div class="ranking-details">
                    <span class="ranking-points">${player.points.toLocaleString()} pts</span>
                    <span class="ranking-rank">
                        <i class="material-icons" style="color: ${rankColor}; font-size: 16px;">${rankIcon}</i>
                        ${player.rank}
                    </span>
                </div>
            </div>
        `;
        
        container.appendChild(playerDiv);
    });
    
    // Actualizar posición del usuario en el header
    const userPosition = getUserPosition();
    document.getElementById('user-position').textContent = userPosition;
    document.getElementById('user-name-ranking').textContent = appState.userName;
    document.getElementById('user-points-ranking').textContent = appState.totalPuntos.toLocaleString();
}

// --- LÓGICA DE CASINO (Slots y Buscaminas con Animación y Diseño Mejorado) ---

// Pre-calcular resultado antes de animar (evita lag)
function handleSlotsSpin() {
    if (typeof MP !== 'undefined' && MP.isHellWeekActive()) {
        showCustomAlert('🔴 SEMANA INFERNAL: El casino está bloqueado.', 'error');
        SoundSystem.error();
        return;
    }
    if (appState.fichas < 2) {
        showCustomAlert('Necesitas 2 Fichas 🎰 para girar.', 'error');
        return;
    }
    
    const spinBtn = document.getElementById('spin-btn');
    if (spinBtn.disabled) return;
    
    appState.fichas -= 2;
    
    const symbols = ['🍒', '🔔', '💰', '💎', '7️⃣']; 
    const reels = [
        document.getElementById('reel-1'),
        document.getElementById('reel-2'),
        document.getElementById('reel-3')
    ];
    const resultText = document.getElementById('slots-result');
    
    spinBtn.disabled = true;
    resultText.textContent = '¡Girando...!';
    SoundSystem.spin();
    
    // Pre-calcular resultado final ANTES de animar
    const finalResults = symbols.map(() => {
        let s = symbols[Math.floor(Math.random() * symbols.length)];
        if (Math.random() < 0.04) s = '7️⃣';
        return s;
    });
    
    // Girar rodillos — CSS animation simple, sin interval loops
    reels.forEach((reel, i) => {
        reel.classList.remove('spinning', `reel-stop-${i+1}`);
        void reel.offsetWidth; // reflow para reiniciar animación
        reel.classList.add('spinning');
    });
    
    // Parar rodillos en cascada con simples timeouts
    reels.forEach((reel, i) => {
        setTimeout(() => {
            reel.classList.remove('spinning');
            reel.textContent = finalResults[i];
            reel.classList.add(`reel-stop-${i+1}`);
            SoundSystem.reelStop(i);
            
            if (i === 2) {
                // Último rodillo paró — calcular resultado
                setTimeout(() => calculateSlotsResult(finalResults, resultText, spinBtn), 300);
            }
        }, 900 + i * 400);
    });

    // Guardar solo fichas (el estado de recursos), no renderApp todavía
    checkMissionProgress('slots_spin', 1);
    checkDailyChallengeProgress('slots_spins', 1);
}

function calculateSlotsResult(res, resultText, spinBtn) {
    // ... (Se mantiene la función) ...
    let reward = { lingotes: 0, gemas: 0, fichas: 0 };
    let message = `Resultado: ${res.join(' | ')}. `;
    let won = false;

    if (res[0] === res[1] && res[1] === res[2]) {
        won = true;
        appState.slotsWins++;
        if (res[0] === '7️⃣') {
            reward.gemas = 10;
            reward.lingotes = 50;
            reward.fichas = 20;
            appState.passPlusActive = true;
            message = '🎉 ¡JACKPOT! 7️⃣7️⃣7️⃣';
            showWinCelebration('passPlus', {});
            showCustomAlert(message, 'special');
        } else if (res[0] === '💎') {
            reward.gemas = 4;
            reward.fichas = 10;
            message = '💎 ¡TRIPLE GEMA!';
            setTimeout(() => showWinCelebration('win', { subtitle:'¡Triple Gema!', items:['+4 💎 Gemas', '+10 🎰 Fichas'] }), 600);
        } else if (res[0] === '💰') {
            reward.lingotes = 30;
            reward.fichas = 8;
            message = '💰 ¡TRIPLE LINGOTE!';
            setTimeout(() => showWinCelebration('win', { subtitle:'¡Triple Lingote!', items:['+30 🥇 Lingotes', '+8 🎰 Fichas'] }), 600);
        } else if (res[0] === '🔔') {
            reward.lingotes = 15;
            reward.fichas = 5;
            message = '🔔 ¡TRIPLE CAMPANA!';
            setTimeout(() => showWinCelebration('win', { subtitle:'¡Triple Campana!', items:['+15 🥇 Lingotes', '+5 🎰 Fichas'] }), 600);
        } else { // 🍒
            reward.lingotes = 5;
            reward.fichas = 3;
            message = '🍒 ¡TRIPLE CEREZA! Premio Menor.';
        }
    } else if (res[0] === res[1] || res[1] === res[2]) {
        reward.fichas = 3;
        message += 'Parcial. 3 Fichas de vuelta.';
    } else {
        message += 'Sin suerte. Inténtalo de nuevo.';
    }

    appState.lingotes += reward.lingotes;
    appState.gemas += reward.gemas;
    appState.fichas += reward.fichas;

    resultText.textContent = message;
    spinBtn.disabled = false;
    renderApp();
    saveState();
}

let minesweeperGame = {
    isGameActive: false,
    board: [], 
    mines: 6, 
    prizes: 8, 
    size: 5,
    cellsRevealed: 0,
    fichasCost: 5,
    totalCellsToWin: 0,
};

function initializeMinesweeper() {
    // ... (Se mantiene la función de inicialización) ...
    minesweeperGame.isGameActive = true;
    minesweeperGame.cellsRevealed = 0;
    minesweeperGame.board = Array(minesweeperGame.size).fill(0).map(() => Array(minesweeperGame.size).fill(0));
    
    // 1. Colocar las minas (valor -1)
    let minesPlaced = 0;
    while (minesPlaced < minesweeperGame.mines) {
        const r = Math.floor(Math.random() * minesweeperGame.size);
        const c = Math.floor(Math.random() * minesweeperGame.size);
        if (minesweeperGame.board[r][c] !== -1) {
            minesweeperGame.board[r][c] = -1;
            minesPlaced++;
        }
    }
    
    // 2. Colocar los premios (valor 1 - 4)
    const rewardTypes = [1, 1, 2, 2, 3, 3, 4, 4]; 
    let prizesPlaced = 0;
    while (prizesPlaced < minesweeperGame.prizes) {
        const r = Math.floor(Math.random() * minesweeperGame.size);
        const c = Math.floor(Math.random() * minesweeperGame.size);
        
        if (minesweeperGame.board[r][c] !== -1) {
            if (minesweeperGame.board[r][c] === 0) { 
                 const rewardIndex = Math.floor(Math.random() * rewardTypes.length);
                 minesweeperGame.board[r][c] = rewardTypes[rewardIndex];
                 prizesPlaced++;
            }
        }
    }
    
    minesweeperGame.totalCellsToWin = (minesweeperGame.size * minesweeperGame.size) - minesweeperGame.mines;

    renderMinesweeperBoard();
}

function renderMinesweeperBoard() {
    const container = document.getElementById('minesweeper-grid');
    if (!container) return; 
    container.innerHTML = '';
    
    for (let r = 0; r < minesweeperGame.size; r++) {
        for (let c = 0; c < minesweeperGame.size; c++) {
            const cell = document.createElement('button');
            cell.className = 'minesweeper-cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.textContent = '';
            
            if (minesweeperGame.isGameActive) {
                cell.onclick = () => handleMinesweeperClick(r, c, cell);
            } else {
                 cell.disabled = true; 
                 const value = minesweeperGame.board[r][c];
                 if (value === -1) {
                    cell.textContent = '💣';
                    cell.classList.add('bomb');
                 } else if (value > 0) {
                    cell.textContent = getPrizeIcon(value);
                    cell.classList.add('prize');
                 } else {
                    cell.textContent = '';
                    cell.classList.add('revealed');
                 }
            }
            
            container.appendChild(cell);
        }
    }
}

function getPrizeIcon(prizeValue) {
    // Usamos Material Icons para mejor coherencia visual si fuera posible, pero mantenemos emojis por simplicidad de la cuadrícula
    if (prizeValue === 1) return '🥇'; // Lingote pequeño
    if (prizeValue === 2) return '💰'; // Lingote grande
    if (prizeValue === 3) return '💎'; // Gema
    if (prizeValue === 4) return '🎟️'; // Ticket HV
    return ''; 
}

function handleMinesweeperClick(r, c, cell) {
    if (!minesweeperGame.isGameActive || cell.disabled) return;

    const value = minesweeperGame.board[r][c];
    
    cell.disabled = true;
    cell.classList.add('revealed');

    if (value === -1) {
        cell.textContent = '💣';
        SoundSystem.bomb();
        cell.classList.add('bomb');
        document.getElementById('minesweeper-result').textContent = '¡BOMBA! 💥 Has perdido la partida.';
        showCustomAlert('¡Explotaste una BOMBA! 💥', 'error');
        endMinesweeperGame(false);
    } else {
        minesweeperGame.cellsRevealed++;
        
        if (value > 0) {
            cell.textContent = getPrizeIcon(value);
            cell.classList.add('prize');
            applyMinesweeperReward(value);
        } else {
            SoundSystem.reveal();
        }
        
        // Solo actualizar fichas en el header, sin full renderApp
        const fichasEl = document.getElementById('total-fichas');
        if (fichasEl) fichasEl.textContent = appState.fichas;
        const casinoFichas = document.getElementById('casino-total-fichas');
        if (casinoFichas) casinoFichas.textContent = appState.fichas;
        
        if (minesweeperGame.cellsRevealed === (minesweeperGame.size * minesweeperGame.size) - minesweeperGame.mines) {
            document.getElementById('minesweeper-result').textContent = '¡FELICIDADES! 🎉 Has despejado el campo.';
            endMinesweeperGame(true);
        }
    }
    saveState();
}

function applyMinesweeperReward(prizeValue) {
    // ... (Se mantiene la función) ...
    if (prizeValue === 1) {
        appState.lingotes += 3; 
        showCustomAlert('+3 Lingotes 🥇', 'info');
    } else if (prizeValue === 2) {
        appState.lingotes += 6; 
        showCustomAlert('+6 Lingotes 🥇', 'info');
    } else if (prizeValue === 3) {
        appState.gemas += 1;
        showCustomAlert('+1 Gema 💎', 'info');
    } else if (prizeValue === 4) {
        appState.hvTickets += 1;
        showCustomAlert('+1 Ticket HV 🎟️', 'info');
    }
}

function endMinesweeperGame(won) {
    // ... (Se mantiene la función de finalización) ...
    minesweeperGame.isGameActive = false;
    renderMinesweeperBoard();

    if (won) {
        appState.minesweeperWins++;
        checkMissionProgress('minesweeper_win', 1);
        checkDailyChallengeProgress('minesweeper_wins', 1);
        
        if (Math.random() < 0.10) {
            appState.passPlusActive = true;
            showWinCelebration('passPlus', {});
        } else if (Math.random() < 0.25) {
            appState.epicChests += 1;
            setTimeout(() => showWinCelebration('win', { subtitle:'¡Campo despejado!', items:['🏆 Victoria', '🎁 +1 Cofre Épico'] }), 400);
        } else {
            setTimeout(() => showWinCelebration('win', { subtitle:'¡Campo despejado!', items:['🏆 ¡Ganaste el Buscaminas!'] }), 400);
        }
    }
    document.getElementById('minesweeper-start-btn').disabled = false;
    renderApp();
}

function startMinesweeper() {
    // ... (Se mantiene la función de inicio) ...
    if (appState.fichas < minesweeperGame.fichasCost) {
        showCustomAlert(`Necesitas ${minesweeperGame.fichasCost} Fichas 🎰 para empezar.`, 'error');
        return;
    }
    
    appState.fichas -= minesweeperGame.fichasCost;
    document.getElementById('minesweeper-result').textContent = 'Juego en curso... ¡Cuidado con las bombas!';
    document.getElementById('minesweeper-start-btn').disabled = true;
    initializeMinesweeper();
    renderApp();
}

// --- LÓGICA DE APERTURA DE COFRES (ACTUALIZADO para Estandartes) ---

function openChest(type) {
    const config = CHEST_REWARDS[type];
    if (!config) return;
    
    let chestCountKey = `${type}Chests`;
    if (appState[chestCountKey] <= 0) {
        showCustomAlert(`No tienes Cofres ${type === 'epic' ? 'Épicos' : 'Legendarios'} para abrir.`, 'error');
        return;
    }
    
    SoundSystem.chest();
    appState[chestCountKey]--;
    let rewardsGained = {};
    let message = `Abriendo Cofre ${type.toUpperCase()}: `;

    // Obtener recompensas aleatorias
    Object.keys(config).forEach(key => {
        const value = config[key];
        
        if (key === 'lingotesChance') return; // skip config field
        
        if (Array.isArray(value)) {
            // Anti-trampas: lingotes solo con probabilidad
            if (key === 'lingotes') {
                const chance = config.lingotesChance || 0.4;
                if (Math.random() > chance) return; // skip lingotes
            }
            const min = value[0];
            const max = value[1];
            const amount = Math.floor(Math.random() * (max - min + 1)) + min;
            if (amount > 0) {
                appState[key] += amount;
                rewardsGained[key] = amount;
                message += `+${amount} ${key}. `;
            }
        } else if (typeof value === 'number' && value > 0) {
            // Recompensas basadas en probabilidad (passPlus, xpBoost, banner)
            if (Math.random() < value) {
                if (key === 'passPlus') {
                    appState.passPlusActive = true;
                    message += `¡PASE HV PLUS! `;
                    rewardsGained.passPlus = true;
                } else if (key === 'xpBoost') {
                    appState.activeBoosts.xp = 3;
                    message += `¡BOOST XP (x3)! `;
                    rewardsGained.xpBoost = true;
                } else if (key === 'banner') {
                    // Selecciona un estandarte aleatorio que el usuario aún no tenga
                    const availableBanners = ALL_BANNERS_EXCEPT_DEFAULT.filter(b => !appState.banners.includes(b));
                    
                    if (availableBanners.length > 0) {
                        const newBanner = availableBanners[Math.floor(Math.random() * availableBanners.length)];
                        appState.banners.push(newBanner);
                        message += `¡Nuevo Estandarte: ${newBanner} 🚩! `;
                        rewardsGained.banner = newBanner;
                    } else {
                         // Si ya tiene todos, se le da una gema extra como compensación
                         appState.gemas += 1;
                         message += `+1 Gema 💎 (todos los estandartes desbloqueados). `;
                         rewardsGained.gemasExtra = 1;
                    }
                }
                // Muy baja probabilidad de recuperación de racha en cofres legendarios
                if (type === 'legendary' && Math.random() < 0.04) {
                    appState.streakRecoveries = (appState.streakRecoveries || 0) + 1;
                    message += `⚡ ¡Recuperación de Racha! `;
                    rewardsGained.streakRecovery = true;
                }
            }
        }
    });

    // Celebración de cofre
    if (rewardsGained.passPlus) {
        showWinCelebration('passPlus', {});
    } else {
        const chestItems = Object.entries(rewardsGained)
            .filter(([k]) => k !== 'passPlus' && k !== 'xpBoost')
            .map(([k,v]) => {
                const icons = { lingotes:'🥇', gemas:'💎', fichas:'🎰', banner:'🚩' };
                return `+${typeof v === 'string' ? v : v} ${icons[k] || k}`;
            });
        if (chestItems.length > 0) {
            const isLegendary = Object.keys(rewardsGained).includes('gemas') && rewardsGained.gemas > 1;
            setTimeout(() => showWinCelebration('chest', { isLegendary, items: chestItems }), 200);
        }
    }
    showCustomAlert(message, rewardsGained.passPlus || rewardsGained.banner ? 'special' : 'success');
    renderApp();
    saveState();
}

// --- LÓGICA DE GESTIÓN DE ESTANDARTES (NUEVO) ---

function renderBannerInventory() {
    const list = document.getElementById('banner-inventory-list');
    list.innerHTML = '';
    
    if (appState.banners.length === 0) {
        list.innerHTML = '<p style="color:var(--secondary-text);">No has desbloqueado ningún estandarte.</p>';
        return;
    }
    
    // Renderiza el estandarte equipado en el perfil
    const equippedBannerElement = document.getElementById('equipped-banner');
    const equippedConfig = BANNER_CONFIG[appState.equippedBanner];
    if (equippedConfig) {
        equippedBannerElement.textContent = equippedConfig.icon;
        equippedBannerElement.style.backgroundColor = equippedConfig.color;
        equippedBannerElement.style.borderColor = equippedConfig.color;
    }


    appState.banners.forEach(bannerName => {
        const config = BANNER_CONFIG[bannerName];
        if (!config) return;
        
        const item = document.createElement('div');
        item.className = `banner-item ${bannerName === appState.equippedBanner ? 'equipped' : ''}`;
        item.dataset.banner = bannerName;
        
        const preview = document.createElement('div');
        preview.className = 'banner-preview';
        preview.textContent = config.icon;
        preview.style.backgroundColor = config.color;
        
        const name = document.createElement('p');
        name.className = 'banner-name';
        name.textContent = config.name;
        
        item.appendChild(preview);
        item.appendChild(name);
        
        item.onclick = () => equipBanner(bannerName);
        
        list.appendChild(item);
    });
}

function equipBanner(bannerName) {
    if (appState.banners.includes(bannerName)) {
        appState.equippedBanner = bannerName;
        showCustomAlert(`Estandarte ${bannerName} equipado.`, 'info');
        renderApp();
        saveState();
    }
}


// --- RETOS DIFÍCILES DIARIOS ---

const HARD_CHALLENGES_TEMPLATES = [
    { id: 'hc1',  text: 'Estudia 2 horas hoy',               type: 'study_time',     goal: 120, diff: 1, reward: { lingotes: 30,  gemas: 1,  puntos: 200 } },
    { id: 'hc2',  text: 'Haz 100 sentadillas hoy',           type: 'ex_sentadillas', goal: 100, diff: 1, reward: { lingotes: 25,  fichas: 8  } },
    { id: 'hc3',  text: 'Haz 50 flexiones hoy',              type: 'ex_flexiones',   goal: 50,  diff: 1, reward: { lingotes: 30,  fichas: 10 } },
    { id: 'hc4',  text: 'Gana 3 partidas de Buscaminas',     type: 'minesweeper_wins', goal: 3,  diff: 2, reward: { lingotes: 40,  gemas: 2   } },
    { id: 'hc5',  text: 'Gira la tragaperras 15 veces',      type: 'slots_spins',    goal: 15,  diff: 1, reward: { lingotes: 20,  fichas: 15 } },
    { id: 'hc6',  text: 'Estudia 4 horas hoy',               type: 'study_time',     goal: 240, diff: 3, reward: { lingotes: 80,  gemas: 3,  puntos: 500 } },
    { id: 'hc7',  text: 'Haz 200 sentadillas hoy',           type: 'ex_sentadillas', goal: 200, diff: 3, reward: { lingotes: 70,  gemas: 2   } },
    { id: 'hc8',  text: 'Haz 30 pull-ups hoy',               type: 'ex_pullups',     goal: 30,  diff: 3, reward: { lingotes: 90,  gemas: 3   } },
    { id: 'hc9',  text: 'Haz 50 burpees hoy',                type: 'ex_burpees',     goal: 50,  diff: 3, reward: { lingotes: 80,  fichas: 20 } },
    { id: 'hc10', text: 'Gana 5 veces el Juego de Botellas', type: 'shell_wins',     goal: 5,   diff: 3, reward: { lingotes: 60,  gemas: 2,  fichas: 15 } },
    { id: 'hc11', text: '🔥 EXTREMO: Estudia 6 horas hoy',   type: 'study_time',     goal: 360, diff: 5, reward: { lingotes: 200, gemas: 8,  fichas: 30, puntos: 1200 } },
    { id: 'hc12', text: '🔥 EXTREMO: 500 sentadillas hoy',   type: 'ex_sentadillas', goal: 500, diff: 5, reward: { lingotes: 150, gemas: 6,  fichas: 25 } },
    { id: 'hc13', text: '🔥 EXTREMO: 100 pull-ups hoy',      type: 'ex_pullups',     goal: 100, diff: 5, reward: { lingotes: 180, gemas: 7,  fichas: 30 } },
    { id: 'hc14', text: '🔥 EXTREMO: Gana 10 Buscaminas',    type: 'minesweeper_wins', goal: 10, diff: 5, reward: { lingotes: 120, gemas: 5, fichas: 40 } },
    { id: 'hc15', text: '🔥 EXTREMO: Estudia 8 horas hoy',   type: 'study_time',     goal: 480, diff: 5, reward: { lingotes: 300, gemas: 12, fichas: 50, puntos: 2000 } },
];

function generateDailyChallenges() {
    const today = getTodayDateString();
    if (appState.dailyChallenges && appState.dailyChallenges.length > 0 && appState.dailyChallenges[0].date === today) return;
    
    let seed = 0;
    for (let i = 0; i < today.length; i++) { seed = ((seed << 5) - seed) + today.charCodeAt(i); seed |= 0; }
    seed = Math.abs(seed);
    
    const pick = (arr, n, off) => [...arr].sort((a,b) => ((seed+off+a.id.charCodeAt(2)) % arr.length) - ((seed+off+b.id.charCodeAt(2)) % arr.length)).slice(0,n);
    
    const easy   = HARD_CHALLENGES_TEMPLATES.filter(c => c.diff <= 2);
    const medium = HARD_CHALLENGES_TEMPLATES.filter(c => c.diff === 3);
    const hard   = HARD_CHALLENGES_TEMPLATES.filter(c => c.diff === 5);
    
    const selected = [...pick(easy,1,0), ...pick(medium,2,10), ...pick(hard,1,20)];
    appState.dailyChallenges = selected.map(t => ({ ...t, date: today, progress: 0, completed: false, claimed: false }));
}

function checkDailyChallengeProgress(type, amount) {
    if (!appState.dailyChallenges) return;
    let changed = false;
    appState.dailyChallenges.forEach(ch => {
        if (ch.completed || ch.type !== type) return;
        ch.progress = Math.min(ch.goal, (ch.progress || 0) + amount);
        if (ch.progress >= ch.goal) {
            ch.completed = true;
            changed = true;
            SoundSystem.mission();
            showCustomAlert(`💀 ¡Reto completado: "${ch.text}"!`, 'special');
        }
    });
    if (changed) renderDailyChallenges();
}

function claimDailyChallenge(idx) {
    const ch = appState.dailyChallenges && appState.dailyChallenges[idx];
    if (!ch || !ch.completed || ch.claimed) return;
    let msg = '🏆 Reto reclamado: ';
    const r = ch.reward;
    if (r.lingotes) { appState.lingotes   += r.lingotes;  msg += `+${r.lingotes}🥇 `;  }
    if (r.gemas)    { appState.gemas      += r.gemas;     msg += `+${r.gemas}💎 `;      }
    if (r.fichas)   { appState.fichas     += r.fichas;    msg += `+${r.fichas}🎰 `;     }
    if (r.puntos)   { appState.totalPuntos += r.puntos;   msg += `+${r.puntos}pts `;    checkRankUp(); }
    ch.claimed = true;
    showCustomAlert(msg, 'special');
    renderDailyChallenges();
    renderApp();
    saveState();
}

function renderDailyChallenges() {
    const container = document.getElementById('daily-challenges-list');
    if (!container) return;
    generateDailyChallenges();
    const diffLabel = {1:{text:'Fácil',color:'#4CAF50'},2:{text:'Medio',color:'#FFEB3B'},3:{text:'Difícil',color:'#FF9800'},5:{text:'💀 EXTREMO',color:'#F44336'}};
    container.innerHTML = '';
    (appState.dailyChallenges || []).forEach((ch, idx) => {
        const pct = Math.min(100, Math.round((ch.progress / ch.goal) * 100));
        const diff = diffLabel[ch.diff] || diffLabel[3];
        const rewardStr = Object.entries(ch.reward).map(([k,v])=>({lingotes:`+${v}🥇`,gemas:`+${v}💎`,fichas:`+${v}🎰`,puntos:`+${v}pts`}[k]||'')).filter(Boolean).join(' ');
        const div = document.createElement('div');
        div.className = `daily-ch-card${ch.completed?' ch-done':''}${ch.claimed?' ch-claimed':''}`;
        div.innerHTML = `
            <div class="ch-header">
                <span class="ch-diff-badge" style="background:${diff.color}20;color:${diff.color};border:1px solid ${diff.color}40">${diff.text}</span>
                <span class="ch-reward-text">${rewardStr}</span>
            </div>
            <p class="ch-text">${ch.text}</p>
            <div class="ch-progress-wrap">
                <div class="ch-prog-bar-bg"><div class="ch-prog-bar-fill" style="width:${pct}%;background:${diff.color}"></div></div>
                <span class="ch-prog-text">${ch.progress} / ${ch.goal}</span>
            </div>
            ${ch.completed && !ch.claimed ? `<button class="ch-claim-btn" onclick="claimDailyChallenge(${idx})">✅ Reclamar</button>` : ''}
            ${ch.claimed ? `<div class="ch-claimed-badge">RECLAMADO ✅</div>` : ''}
        `;
        container.appendChild(div);
    });
}

function updateSeasonCountdown() {
    const el = document.getElementById('season-countdown');
    if (!el) return;
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
    const diff = next - now;
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    el.textContent = days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`;
}
setInterval(updateSeasonCountdown, 60000);


// --- SISTEMA DE RACHAS ---

function updateStreak() {
    const today = getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = [
        yesterday.getFullYear(),
        String(yesterday.getMonth() + 1).padStart(2, '0'),
        String(yesterday.getDate()).padStart(2, '0')
    ].join('-');

    if (appState.lastStudyDate === today) {
        return; // Ya estudiaste hoy, no hacer nada
    }

    const oldStreak = appState.streak || 0;

    if (appState.lastStudyDate === yesterdayStr) {
        appState.streak++;
    } else if (appState.lastStudyDate === '') {
        appState.streak = 1;
    } else {
        const daysMissed = Math.floor((new Date(today) - new Date(appState.lastStudyDate)) / (1000*60*60*24));
        if (appState.streakShieldDays > 0 && daysMissed <= appState.streakShieldDays) {
            appState.streakShieldDays = Math.max(0, appState.streakShieldDays - daysMissed);
            appState.streak++;
            showCustomAlert(`🛡️ ¡Escudo de racha te protegió! Racha: ${appState.streak} días`, 'special');
        } else {
            appState.streak = 1;
            appState.streakShieldDays = 0;
        }
    }

    appState.lastStudyDate = today;
    
    if (!appState.streakHistory.includes(today)) {
        appState.streakHistory.push(today);
        if (appState.streakHistory.length > 365) {
            appState.streakHistory.shift();
        }
    }

    // Disparar animación estilo Duolingo
    setTimeout(() => playStreakAnimation(oldStreak, appState.streak), 800);

    renderStreakWidget();
}

function renderStreakWidget() {
    const widget = document.getElementById('streak-widget');
    if (!widget) return;
    const s = appState.streak || 0;
    const shield = appState.streakShieldDays || 0;
    widget.innerHTML = `
        <div class="streak-fire" id="streak-fire-icon">${s > 0 ? '🔥' : '💤'}</div>
        <div class="streak-count" id="streak-num">${s}</div>
        ${shield > 0 ? `<div class="streak-shield-badge">🛡️</div>` : ''}
    `;
    widget.title = `Racha: ${s} días${shield > 0 ? ` | Escudo: ${shield} días` : ''}`;
}

function playStreakAnimation(oldStreak, newStreak) {
    // Animación estilo Duolingo al ganar/subir racha
    const widget = document.getElementById('streak-widget');
    if (!widget) return;

    // Crear overlay de celebración de racha
    const existing = document.getElementById('streak-celebration');
    if (existing) existing.remove();

    const cel = document.createElement('div');
    cel.id = 'streak-celebration';
    cel.className = 'streak-celebration-overlay';
    
    const isNewStreak = oldStreak === 0;
    const isMilestone = newStreak > 0 && newStreak % 5 === 0;
    
    cel.innerHTML = `
        <div class="streak-cel-box ${isMilestone ? 'milestone' : ''}">
            <div class="streak-cel-fires">
                <span class="sf-left">🔥</span>
                <span class="sf-center">🔥</span>
                <span class="sf-right">🔥</span>
            </div>
            <div class="streak-cel-number">
                <span class="streak-old-num">${oldStreak}</span>
                <span class="streak-arrow">→</span>
                <span class="streak-new-num">${newStreak}</span>
            </div>
            <div class="streak-cel-label">${isNewStreak ? '¡Iniciaste tu racha!' : isMilestone ? `🏆 ¡${newStreak} días!` : '¡Racha continuada!'}</div>
        </div>
    `;
    
    document.body.appendChild(cel);
    
    // Animar el widget también
    widget.classList.add('streak-bump');
    setTimeout(() => widget.classList.remove('streak-bump'), 600);
    
    // Actualizar números con transición
    renderStreakWidget();
    
    // Auto-quitar en 2.5s
    setTimeout(() => {
        if (cel.parentNode) {
            cel.classList.add('streak-cel-fadeout');
            setTimeout(() => cel.remove(), 400);
        }
    }, 2500);
}

function openStreakCalendar() {
    const modal = document.getElementById('streak-modal');
    if (!modal) return;
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // Generar calendario del mes actual
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    
    const streakSet = new Set(appState.streakHistory || []);
    
    let cells = '';
    const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    const headerCells = dayNames.map(d => `<div class="cal-header">${d}</div>`).join('');
    
    // Días vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
        cells += `<div class="cal-day empty"></div>`;
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const hasStreak = streakSet.has(dateStr);
        const isToday = d === today.getDate();
        cells += `<div class="cal-day ${hasStreak ? 'has-streak' : ''} ${isToday ? 'today' : ''}">
            <span>${d}</span>
            ${hasStreak ? '<span class="cal-fire">🔥</span>' : ''}
        </div>`;
    }
    
    const shield = appState.streakShieldDays || 0;
    const recoveries = appState.streakRecoveries || 0;
    
    document.getElementById('streak-modal-body').innerHTML = `
        <div class="streak-stats-row">
            <div class="streak-stat-box">
                <span class="streak-stat-num">${appState.streak || 0}</span>
                <span class="streak-stat-label">🔥 Racha actual</span>
            </div>
            <div class="streak-stat-box">
                <span class="streak-stat-num">${(appState.streakHistory||[]).length}</span>
                <span class="streak-stat-label">📅 Días totales</span>
            </div>
            <div class="streak-stat-box">
                <span class="streak-stat-num">${shield}</span>
                <span class="streak-stat-label">🛡️ Escudo días</span>
            </div>
            <div class="streak-stat-box">
                <span class="streak-stat-num">${recoveries}</span>
                <span class="streak-stat-label">⚡ Recuperaciones</span>
            </div>
        </div>
        ${recoveries > 0 ? `<button class="btn-use-recovery" onclick="useStreakRecovery()">⚡ Usar Recuperación de Racha</button>` : ''}
        <h4 style="text-align:center;margin:14px 0 8px">${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h4>
        <div class="streak-calendar">
            ${headerCells}
            ${cells}
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeStreakModal() {
    const modal = document.getElementById('streak-modal');
    if (modal) modal.style.display = 'none';
}

function useStreakRecovery() {
    if ((appState.streakRecoveries || 0) <= 0) {
        showCustomAlert('No tienes recuperaciones de racha.', 'error');
        return;
    }
    const today = getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = [
        yesterday.getFullYear(),
        String(yesterday.getMonth() + 1).padStart(2, '0'),
        String(yesterday.getDate()).padStart(2, '0')
    ].join('-');
    
    appState.streakRecoveries--;
    if (!appState.streakHistory.includes(yesterdayStr)) {
        appState.streakHistory.push(yesterdayStr);
    }
    if (appState.lastStudyDate !== today) {
        appState.streak++;
        appState.lastStudyDate = yesterdayStr;
    }
    showCustomAlert(`⚡ ¡Racha recuperada! Racha actual: ${appState.streak} días`, 'special');
    closeStreakModal();
    saveState();
    openStreakCalendar(); // Reabrir actualizado
}

// --- LÓGICA DE REGISTRO DE ESTUDIO (ACTUALIZADO con más puntos de rango) ---

function addStudyToHistory(minutes) {
    // ... (Se mantiene la función) ...
    const today = getTodayDateString();
    
    const existingEntry = appState.studyHistory.find(item => item.date === today);

    if (existingEntry) {
        existingEntry.minutes += minutes;
    } else {
        appState.studyHistory.push({ date: today, minutes: minutes });
        appState.studyHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (appState.studyHistory.length > 90) {
            appState.studyHistory.pop();
        }
    }
}

function handleRegisterStudy() {
    // ACTUALIZADO: Ahora cada hora de estudio da 300 puntos de rango
    const minutes = appState.selectedDuration;
    const materia = document.getElementById('materia-estudio').value.trim() || 'General';

    if (minutes === 0) {
        SoundSystem.error();
        showCustomAlert('Por favor, selecciona una duración de estudio.', 'error');
        return;
    }
    
    // Anti-trampas: límite de 14 horas diarias (840 minutos)
    const DAILY_STUDY_LIMIT = 840;
    const today = getTodayDateString();
    const todayEntry = appState.studyHistory.find(item => item.date === today);
    const minutosHoy = todayEntry ? todayEntry.minutes : 0;
    if (minutosHoy + minutes > DAILY_STUDY_LIMIT) {
        const restante = DAILY_STUDY_LIMIT - minutosHoy;
        if (restante <= 0) {
            showCustomAlert('🚫 Límite diario de 14 horas alcanzado. ¡Vuelve mañana!', 'warning');
        } else {
            showCustomAlert(`🚫 Límite diario: solo puedes registrar ${restante} min más hoy (máx 14h/día).`, 'warning');
        }
        return;
    }
    
    const hellMult = (typeof MP !== 'undefined' && MP.isHellWeekActive()) ? 2 : 1;
    const baseXP = 30; // 30 XP por cada 15 minutos
    const multiplier = minutes / 15;
    
    const xpGained      = Math.round(baseXP * multiplier * appState.activeBoosts.xp * hellMult);
    const puntosGained  = Math.round(75 * multiplier * appState.activeBoosts.points * hellMult);
    const lingotesGained = Math.round(1 * multiplier * hellMult);
    const fichasGained   = Math.round(1 * multiplier * hellMult);
    const passXPGained   = Math.round(150 * multiplier * hellMult);
    
    // Actualiza el historial
    addStudyToHistory(minutes);

    appState.totalXP += xpGained;
    appState.totalPuntos += puntosGained;
    appState.totalHoras += minutes;
    appState.lingotes += lingotesGained;
    appState.fichas += fichasGained;
    
    SoundSystem.register();
    checkLevelUp();
    checkRankUp();
    updatePassProgression(passXPGained);
    checkMissionProgress('register_time', minutes);
    updateStreak(); // Actualizar racha
    checkDailyChallengeProgress('study_time', minutes); // Retos difíciles
    
    const rewardsMessage = `+${xpGained} XP, +${lingotesGained}🥇, +${puntosGained} Puntos, +${passXPGained} Pase HV XP. Materia: ${materia}`;
    showCustomAlert(rewardsMessage, 'success');
    
    // Resetear el selector y deshabilitar el botón
    appState.selectedDuration = 0;
    document.getElementById('registrar-btn').disabled = true;
    document.querySelectorAll('.duration-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('xp-preview').textContent = 'Selecciona una duración.';

    renderApp();
    saveState();
}

// --- MISIONES DIARIAS ---

function generateDailyMissions() {
    const today = getTodayDateString();
    
    // Verificar si ya se generaron misiones para hoy
    if (appState.dailyMissions.length > 0 && appState.dailyMissions[0].date === today) {
        return; // Ya hay misiones para hoy
    }
    
    // Generar 3 misiones aleatorias
    const shuffled = [...MISSION_TEMPLATES].sort(() => 0.5 - Math.random());
    const selectedMissions = shuffled.slice(0, 3);
    
    appState.dailyMissions = selectedMissions.map((template, index) => ({
        id: `${today}_${index}`,
        date: today,
        text: template.text,
        type: template.type,
        goal: template.goal,
        progress: 0,
        reward: template.reward,
        completed: false,
        claimed: false
    }));
}

function checkMissionProgress(type, amount) {
    appState.dailyMissions.forEach(mission => {
        if (mission.type === type && !mission.completed) {
            mission.progress += amount;
            if (mission.progress >= mission.goal) {
                mission.progress = mission.goal;
                mission.completed = true;
                SoundSystem.mission();
                showCustomAlert(`¡Misión completada: ${mission.text}!`, 'success');
            }
        }
    });
    renderApp();
    saveState();
}

function claimMissionReward(missionId) {
    const mission = appState.dailyMissions.find(m => m.id === missionId);
    if (!mission || !mission.completed || mission.claimed) return;
    
    let message = `Recompensa de misión reclamada: `;
    Object.keys(mission.reward).forEach(key => {
        const amount = mission.reward[key];
        if (key === 'passXP') {
            updatePassProgression(amount);
            message += `+${amount} XP Pase. `;
        } else if (appState.hasOwnProperty(key)) {
            appState[key] += amount;
            message += `+${amount} ${key}. `;
        }
    });
    
    mission.claimed = true;
    showCustomAlert(message, 'success');
    renderApp();
    saveState();
}

// --- RENDERIZADO E INICIALIZACIÓN (Ajustado) ---

function calculateHistoryTotals() {
    // ... (Se mantiene la función) ...
    const now = new Date();
    const history = appState.studyHistory;
    
    let total7Days = 0;
    let total30Days = 0;
    
    history.forEach(item => {
        const itemDate = new Date(item.date);
        const diffTime = Math.abs(now.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays <= 7) {
            total7Days += item.minutes;
        }
        if (diffDays <= 30) {
            total30Days += item.minutes;
        }
    });
    
    return {
        total7Days,
        total30Days,
    };
}


function renderHistory() {
    // ... (Se mantiene la función) ...
    const { total7Days, total30Days } = calculateHistoryTotals();
    
    // 1. Totales
    document.getElementById('total-horas-min').textContent = appState.totalHoras;
    document.getElementById('horas-7dias').textContent = formatMinutes(total7Days);
    document.getElementById('total-horas-general').textContent = formatMinutes(appState.totalHoras);
    document.getElementById('max-rank').textContent = appState.maxRankEver;
    
    // 2. Lista Diaria
    const historyList = document.getElementById('daily-history-list');
    historyList.innerHTML = '';
    
    if (appState.studyHistory.length === 0) {
        historyList.innerHTML = '<p style="color:var(--secondary-text);">No hay datos de estudio.</p>';
        return;
    }
    
    appState.studyHistory.slice(0, 7).forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'daily-history-item';
        
        const date = new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
        
        itemDiv.innerHTML = `
            <span>${date}</span>
            <span>${formatMinutes(item.minutes)}</span>
        `;
        historyList.appendChild(itemDiv);
    });
}

function renderCasinoJackpots() {
    // ... (Se mantiene la función) ...
    const slotsDisplay = document.getElementById('slots-jackpot-display');
    const minesweeperDisplay = document.getElementById('minesweeper-jackpot-display');
    const shellDisplay = document.getElementById('shell-jackpot-display'); // NUEVO

    if (slotsDisplay) {
        slotsDisplay.innerHTML = `PREMIO MAYOR: <span>${SLOTS_JACKPOT}</span>`;
    }
    
    if (minesweeperDisplay) {
        minesweeperDisplay.innerHTML = `PREMIO MAYOR: <span>${MINESWEEPER_JACKPOT}</span>`;
    }
    
    // NUEVO: Jackpot del juego de botellas
    if (shellDisplay) {
        shellDisplay.innerHTML = `PREMIO MAYOR: <span>${SHELL_JACKPOT}</span>`;
    }
}


function renderExerciseHistory() {
    const list = document.getElementById('exercise-history-list');
    if (!list) return;

    if (!appState.exerciseHistory || appState.exerciseHistory.length === 0) {
        list.innerHTML = '<p class="empty-msg">Aún no has registrado ejercicios.</p>';
        return;
    }

    // Group by date
    const byDate = {};
    appState.exerciseHistory.forEach(entry => {
        if (!byDate[entry.date]) byDate[entry.date] = [];
        byDate[entry.date].push(entry);
    });

    list.innerHTML = '';
    Object.keys(byDate).forEach(date => {
        const dateObj = new Date(date);
        const label = dateObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
        
        const group = document.createElement('div');
        group.className = 'exhist-group';
        
        const totalXP = byDate[date].reduce((sum, e) => sum + e.xp, 0);
        
        group.innerHTML = `
            <div class="exhist-date">
                <span>${label}</span>
                <span class="exhist-date-xp">+${totalXP} XP</span>
            </div>
        `;
        
        byDate[date].forEach(entry => {
            const row = document.createElement('div');
            row.className = 'exhist-row';
            row.innerHTML = `
                <span class="exhist-icon">${entry.icon}</span>
                <div class="exhist-info">
                    <span class="exhist-name">${entry.name}</span>
                    <span class="exhist-time">${entry.time || ''}</span>
                </div>
                <div class="exhist-values">
                    <span class="exhist-amount">${entry.amount} reps</span>
                    <span class="exhist-xp">+${entry.xp} XP</span>
                </div>
            `;
            group.appendChild(row);
        });
        
        list.appendChild(group);
    });
}

function renderApp() {
    // 1. Recursos y Nombre (Perfil) 
    document.getElementById('total-lingotes').textContent = appState.lingotes;
    document.getElementById('total-gemas').textContent = appState.gemas;
    document.getElementById('total-fichas').textContent = appState.fichas;
    document.getElementById('total-hv-tickets').textContent = appState.hvTickets;
    document.getElementById('mostrar-nombre').textContent = appState.userName;
    
    // RENDERIZAR ESTANDARTES
    renderBannerInventory(); 

    const currentRankConfig = RANK_CONFIG.find(c => c.rank === appState.currentRank);
    const rankIcon = currentRankConfig ? currentRankConfig.icon : 'star';
    const rankColor = currentRankConfig ? currentRankConfig.color : '#FFFFFF';

    const rankElement = document.getElementById('current-rank');
    rankElement.innerHTML = `<i class="material-icons" style="font-size: 1.2em; color: ${rankColor}; vertical-align: middle; margin-right: 5px;">${rankIcon}</i> ${appState.currentRank}`;


    // TIENDA / CASINO - (Recursos en barras superiores)
    const tiendaSection = document.getElementById('tienda');
    let tiendaResourceDisplay = tiendaSection.querySelector('.resource-display-line');
    if (!tiendaResourceDisplay) {
        tiendaResourceDisplay = document.createElement('div');
        tiendaResourceDisplay.className = 'resource-display-line';
        tiendaSection.insertBefore(tiendaResourceDisplay, tiendaSection.querySelector('hr'));
    }
    tiendaResourceDisplay.innerHTML = `
        <span>🥇 Lingotes: <span id="shop-total-lingotes">${appState.lingotes}</span></span>
        <span>💎 Gemas: <span id="shop-total-gemas">${appState.gemas}</span></span>
    `;

    const casinoSection = document.getElementById('casino');
    let casinoResourceDisplay = casinoSection.querySelector('.resource-display-line');
    if (!casinoResourceDisplay) {
        casinoResourceDisplay = document.createElement('div');
        casinoResourceDisplay.className = 'resource-display-line';
        casinoSection.insertBefore(casinoResourceDisplay, casinoSection.querySelector('hr')); 
    }
    casinoResourceDisplay.innerHTML = `
        <span>🎰 Fichas: <span id="casino-total-fichas">${appState.fichas}</span></span>
    `;
    
    // 2. Estadísticas y Progreso
    document.getElementById('total-xp').textContent = appState.totalXP;
    document.getElementById('total-minesweeper-wins').textContent = appState.minesweeperWins;
    document.getElementById('total-slots-wins').textContent = appState.slotsWins;
    
    // NUEVO: Mostrar victorias de botellas
    const shellWinsElement = document.getElementById('total-shell-wins');
    if (shellWinsElement) {
        shellWinsElement.textContent = appState.shellWins;
    }

    const xpBase = appState.currentLevel > 1 
        ? LEVEL_CONFIG.find(c => c.level === appState.currentLevel).xp || 0
        : 0;
    const xpNext = appState.xpToNextLevel;
    
    const xpForDisplay = appState.totalXP - xpBase;
    const xpTotalSegment = xpNext - xpBase;
    
    const levelPercentage = xpTotalSegment > 0 ? (xpForDisplay / xpTotalSegment) * 100 : 100;

    document.getElementById('current-level').textContent = appState.currentLevel;
    document.getElementById('level-progress-bar').style.width = `${Math.min(levelPercentage, 100)}%`;
    document.getElementById('level-progress-text').textContent = xpTotalSegment > 0 ? `${xpForDisplay} / ${xpTotalSegment} XP (Prox. Nivel)` : 'Nivel Máximo Alcanzado';

    const rankConfig = RANK_CONFIG.find(c => c.rank === appState.currentRank);
    const puntosBase = rankConfig ? rankConfig.points : 0;
    const puntosNext = appState.puntosToNextRank;
    
    const puntosForDisplay = appState.totalPuntos - puntosBase;
    const puntosTotalSegment = puntosNext - puntosBase;
    
    const rankPercentage = puntosTotalSegment > 0 ? (puntosForDisplay / puntosTotalSegment) * 100 : 100;

    document.getElementById('rank-progress-bar').style.width = `${Math.min(rankPercentage, 100)}%`;
    document.getElementById('rank-progress-text').textContent = puntosTotalSegment > 0 ? `${puntosForDisplay} / ${puntosTotalSegment} Puntos (Prox. Rango)` : 'Rango Máximo Alcanzado';
    
    // Renderiza el historial (ahora incluye maxRankEver)
    renderHistory();


    // 5. Inventario 
    document.getElementById('epic-chests-count').textContent = appState.epicChests;
    document.getElementById('legendary-chests-count').textContent = appState.legendaryChests;
    
    document.getElementById('open-epic-chest').disabled = appState.epicChests <= 0;
    document.getElementById('open-legendary-chest').disabled = appState.legendaryChests <= 0;
    
    let activeBoostsText = [];
    if (appState.activeBoosts.xp > 1) activeBoostsText.push(`XP (x${appState.activeBoosts.xp})`);
    if (appState.activeBoosts.points > 1) activeBoostsText.push(`Puntos (x${appState.activeBoosts.points})`);
    
    document.getElementById('active-boosts').textContent = activeBoostsText.join(', ') || 'Ninguno';

    // 6. Pase HV
    const passContainer = document.getElementById('pass-rewards-container');
    passContainer.innerHTML = '';
    
    document.getElementById('pass-level').textContent = appState.passLevel;
    const totalPassXP = calculatePassXP(appState.passLevel);
    const passPercentage = (appState.passXP / totalPassXP) * 100;
    document.getElementById('pass-progress-bar').style.width = `${Math.min(passPercentage, 100)}%`;
    document.getElementById('pass-progress-text').textContent = `${appState.passXP} / ${totalPassXP} XP`;
    
    document.getElementById('pass-plus-status').textContent = appState.passPlusActive ? '(ACTIVO)' : '(BLOQUEADO)';

    const getRewardText = (rewardObj) => {
        // ... (Se mantiene la función) ...
        if (!rewardObj) return '';
        return Object.keys(rewardObj).map(k => {
            const amount = rewardObj[k];
            if (k === 'xpBoost') return 'Boost XP (x3)';
            if (k === 'passPlus') return 'Pase HV Plus';
            if (k === 'legendaryChests') return `${amount} Cofres L.`;
            if (k === 'epicChests') return `${amount} Cofres E.`;
            return `${amount} ${k}`;
        }).join(', ');
    };

    // Renderizar niveles 1 a 30
    for (let i = 1; i <= 30; i++) {
        const rewards = PASS_REWARDS[i];
        
        if (!rewards) continue; 
        
        const levelDiv = document.createElement('div');
        levelDiv.className = 'pass-level-reward';
        levelDiv.innerHTML = `<h4>Nivel ${i}</h4>`;

        // Recompensa GRATIS
        if (rewards.free) {
            const rewardKey = `${i}_free`;
            const isClaimed = appState.passRewardsClaimed[rewardKey];
            const isAvailable = i <= appState.passLevel;
            
            const button = document.createElement('button');
            button.className = 'free';
            button.textContent = isClaimed ? 'Reclamado' : `Gratis: ${getRewardText(rewards.free)}`;
            button.disabled = !isAvailable || isClaimed;
            if (isAvailable && !isClaimed) button.classList.add('can-claim');
            button.onclick = () => claimPassReward(i, 'free');
            levelDiv.appendChild(button);
        }

        // Recompensa PLUS
        if (rewards.plus) {
            const rewardKey = `${i}_plus`;
            const isClaimed = appState.passRewardsClaimed[rewardKey];
            const isAvailable = i <= appState.passLevel;
            const isLocked = !appState.passPlusActive;
            
            const button = document.createElement('button');
            button.className = 'plus';
            
            if (isLocked) {
                button.textContent = 'Bloqueado (PLUS)';
                button.classList.add('locked');
                button.disabled = true;
            } else {
                button.textContent = isClaimed ? 'Reclamado' : `PLUS: ${getRewardText(rewards.plus)}`;
                button.disabled = !isAvailable || isClaimed;
                if (isAvailable && !isClaimed) button.classList.add('can-claim');
            }
            button.onclick = () => claimPassReward(i, 'plus');
            levelDiv.appendChild(button);
        }

        passContainer.appendChild(levelDiv);
    }


    // 7. Misiones Diarias (Se mantiene)
    const missionsList = document.getElementById('missions-list');
    missionsList.innerHTML = '';

    if (appState.dailyMissions.length === 0) {
        missionsList.innerHTML = `<li><p style="color:var(--secondary-text)">No hay misiones cargadas. Recarga la página para generar misiones diarias.</p></li>`;
    } else {
        appState.dailyMissions.forEach((mission) => {
            const li = document.createElement('li');
            li.className = `mission-item ${mission.completed ? 'completed' : ''}`;
            
            const icon = mission.completed ? 'check_circle' : 'hourglass_empty';
            
            let rewardText = Object.keys(mission.reward).map(k => {
                const amount = mission.reward[k];
                let unit = k;
                if (k === 'passXP') unit = 'XP Pase';
                if (k === 'lingotes') unit = '🥇';
                if (k === 'fichas') unit = '🎰';
                return `+${amount} ${unit}`;
            }).join(', ');

            li.innerHTML = `
                <i class="material-icons">${icon}</i>
                <div>
                    <h4>${mission.text} (${mission.progress}/${mission.goal})</h4>
                    <p>Recompensa: ${rewardText}</p>
                </div>
            `;
            
            if (mission.completed && !mission.claimed) {
                const claimBtn = document.createElement('button');
                claimBtn.textContent = 'Reclamar';
                claimBtn.onclick = () => claimMissionReward(mission.id);
                claimBtn.style.marginLeft = 'auto';
                li.appendChild(claimBtn);
            }
            
            missionsList.appendChild(li);
        });
    }

    // 8. Logros (Se mantiene)
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    ACHIEVEMENTS_CONFIG.forEach(ach => {
        const isUnlocked = ach.check(appState);
        const isClaimed = appState.achievementsClaimed[ach.id]; 

        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
        
        let icon = isUnlocked ? (isClaimed ? 'done_all' : 'task_alt') : 'lock';
        let status = isUnlocked ? 'Desbloqueado' : 'Bloqueado';
        
        let rewardText = Object.keys(ach.reward).map(k => {
            const amount = ach.reward[k];
            let unit = k;
            if (k === 'lingotes') unit = '🥇';
            if (k === 'gemas') unit = '💎';
            if (k === 'epicChests') unit = '🎁';
            if (k === 'legendaryChests') unit = '👑';
            if (k === 'banner') unit = `🚩 ${amount}`;
            return `${amount} ${unit}`;
        }).join(', ');


        achievementDiv.innerHTML = `
            <i class="material-icons achievement-icon">${ach.icon || icon}</i>
            <div class="achievement-details">
                <h4>${ach.name} (${status})</h4>
                <p>${ach.description}</p>
                <p style="font-weight: bold;">Recompensa: ${rewardText}</p>
            </div>
        `;
        
        if (isUnlocked && !isClaimed) {
             const claimBtn = document.createElement('button');
             claimBtn.textContent = '¡Reclamar Recompensa!';
             claimBtn.style.marginLeft = 'auto';
             claimBtn.style.backgroundColor = '#4CAF50';
             claimBtn.onclick = () => claimAchievement(ach.id);
             achievementDiv.appendChild(claimBtn);
        } else if (isClaimed) {
             const claimedTag = document.createElement('span');
             claimedTag.textContent = 'RECLAMADO ✅';
             claimedTag.style.marginLeft = 'auto';
             claimedTag.style.color = '#4CAF50';
             claimedTag.style.fontWeight = 'bold';
             achievementDiv.appendChild(claimedTag);
        }

        achievementsList.appendChild(achievementDiv);
    });
    
    // Exercise history
    renderExerciseHistory();
    
    // 9. Casino Jackpots
    renderCasinoJackpots();

    // 10. Racha
    renderStreakWidget();

    saveState();
}

// --- INICIALIZACIÓN Y EVENTOS (Ajustado) ---

function setupEventListeners() {
    // ... (Se mantienen los eventos de navegación, nombre y estudio) ...
    // 1. Navegación 
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            document.querySelectorAll('.app-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
            
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
            
            // NUEVO: Renderizar ranking cuando se accede a esa sección
            if (targetId === 'ranking') {
                renderRanking();
                renderFriendsList();
                renderRanksOverview();
                renderDailyChallenges();
                updateSeasonCountdown();
            }
            
            renderApp();
        });
    });

    document.getElementById('guardar-nombre-btn').addEventListener('click', () => {
        const newName = document.getElementById('nombre-usuario').value.trim();
        if (newName) {
            appState.userName = newName;
            document.getElementById('mostrar-nombre').textContent = newName;
            showCustomAlert('Nombre de usuario guardado.', 'info');
            saveState();
        }
    });

    // 2. Estudios - ACTUALIZADO el preview de puntos
    const durationButtons = document.querySelectorAll('.duration-btn');
    const registerBtn = document.getElementById('registrar-btn');

    durationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            durationButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            const minutes = parseInt(this.getAttribute('data-minutes'));
            appState.selectedDuration = minutes;
            registerBtn.disabled = false;
            
            const xpPreview = minutes / 15 * 30 * appState.activeBoosts.xp;
            const puntosPreview = minutes / 15 * 75 * appState.activeBoosts.points; // ACTUALIZADO: 75 puntos por 15 min
            document.getElementById('xp-preview').textContent = `Recibirás ~${xpPreview} XP, ${puntosPreview} Puntos y recursos.`;
        });
    });

    registerBtn.addEventListener('click', handleRegisterStudy);
    
    // Clear exercise history
    const clearHistBtn = document.getElementById('clear-exercise-history-btn');
    if (clearHistBtn) {
        clearHistBtn.addEventListener('click', () => {
            if (confirm('¿Limpiar todo el historial de ejercicios?')) {
                appState.exerciseHistory = [];
                renderExerciseHistory();
                saveState();
                showCustomAlert('Historial de ejercicios limpiado.', 'info');
            }
        });
    }

    // NUEVO: Eventos de ejercicios
    document.querySelectorAll('.exercise-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const exerciseType = this.getAttribute('data-exercise');
            const input = document.getElementById(`${exerciseType}-input`);
            const amount = parseInt(input.value) || 0;
            
            if (amount > 0) {
                registerExercise(exerciseType, amount);
                input.value = '';
            } else {
                showCustomAlert('Por favor, ingresa una cantidad válida.', 'error');
            }
        });
    });

    // 3. Casino 
    document.getElementById('spin-btn').addEventListener('click', handleSlotsSpin);
    document.getElementById('minesweeper-start-btn').addEventListener('click', startMinesweeper);

    // NUEVO: Eventos del juego de botellas
    document.querySelectorAll('.bet-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const betAmount = parseInt(this.getAttribute('data-bet'));
            selectBet(betAmount);
        });
    });

    document.getElementById('shell-reset-btn').addEventListener('click', resetShellGame);

    // NUEVO: Eventos del ranking
    document.getElementById('filter-all').addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('filter-all').classList.add('active');
        renderRanking('all');
    });

    document.getElementById('filter-top10').addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('filter-top10').classList.add('active');
        renderRanking('top10');
    });

    document.getElementById('filter-around').addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('filter-around').classList.add('active');
        renderRanking('around');
    });

    document.getElementById('filter-friends').addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('filter-friends').classList.add('active');
        renderRanking('friends');
    });

    // NUEVO: Eventos de amigos
    document.getElementById('add-friend-btn').addEventListener('click', () => {
        const idInput = document.getElementById('friend-id-input');
        if (idInput && typeof MP !== 'undefined') {
            MP.addFriendById(idInput.value);
            idInput.value = '';
        }
    });

    // Enter en el input de ID de amigo
    const friendIdInput = document.getElementById('friend-id-input');
    if (friendIdInput) {
        friendIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('add-friend-btn').click();
        });
    }

    // 4. Tienda 
    document.getElementById('buy-xp-boost').addEventListener('click', () => handleShopPurchase('xpBoost'));
    document.getElementById('buy-points-boost').addEventListener('click', () => handleShopPurchase('pointsBoost'));
    document.getElementById('buy-epic-chest').addEventListener('click', () => handleShopPurchase('epicChest')); 
    document.getElementById('buy-legendary-chest').addEventListener('click', () => handleShopPurchase('legendaryChest')); 
    document.getElementById('buy-gem-for-lingots').addEventListener('click', () => handleShopPurchase('gemForLingots'));
    document.getElementById('buy-chips-pack').addEventListener('click', () => handleShopPurchase('chipsPack'));
    const buyStreakShield = document.getElementById('buy-streak-shield');
    if (buyStreakShield) buyStreakShield.addEventListener('click', () => handleShopPurchase('streakShield'));
    const buyStreakRecovery = document.getElementById('buy-streak-recovery');
    if (buyStreakRecovery) buyStreakRecovery.addEventListener('click', () => handleShopPurchase('streakRecovery'));
    
    // 5. Inventario 
    document.getElementById('open-epic-chest').addEventListener('click', () => openChest('epic'));
    document.getElementById('open-legendary-chest').addEventListener('click', () => openChest('legendary'));
}

function handleShopPurchase(item) {
    let cost = 0;
    let costType = '';
    let success = false;
    let message = '';

    switch (item) {
        case 'gemForLingots':
            cost = 10;
            costType = 'lingotes';
            if (appState.lingotes >= cost) {
                appState.lingotes -= cost;
                appState.gemas += 1;
                message = '¡Compraste 1 Gema!';
                success = true;
            }
            break;
        case 'chipsPack':
            cost = 15;
            costType = 'lingotes';
            if (appState.lingotes >= cost) {
                appState.lingotes -= cost;
                appState.fichas += 10;
                message = '¡Compraste 10 Fichas!';
                success = true;
            }
            break;
        case 'streakShield':
            cost = 3;
            costType = 'gemas';
            if (appState.gemas >= cost) {
                appState.gemas -= cost;
                appState.streakShieldDays = (appState.streakShieldDays || 0) + 2;
                message = '🛡️ ¡Escudo de Racha activado por 2 días!';
                success = true;
            }
            break;
        case 'streakRecovery':
            cost = 10;
            costType = 'gemas';
            if (appState.gemas >= cost) {
                appState.gemas -= cost;
                appState.streakRecoveries = (appState.streakRecoveries || 0) + 1;
                message = '⚡ ¡Recuperación de Racha obtenida!';
                success = true;
            }
            break;
        case 'epicChest':
            cost = 5;
            costType = 'gemas';
            if (appState.gemas >= cost) {
                appState.gemas -= cost;
                appState.epicChests += 1;
                message = '¡Compraste 1 Cofre Épico!';
                success = true;
            }
            break;
        case 'legendaryChest':
            cost = 7;
            costType = 'gemas';
            if (appState.gemas >= cost) {
                appState.gemas -= cost;
                appState.legendaryChests += 1;
                message = '¡Compraste 1 Cofre Legendario!';
                success = true;
            }
            break;
        case 'xpBoost':
            cost = 50;
            costType = 'lingotes';
            if (appState.lingotes >= cost) {
                appState.lingotes -= cost;
                appState.activeBoosts.xp = 3;
                message = '¡Boost XP (x3) activado!';
                success = true;
            }
            break;
        case 'pointsBoost':
            cost = 30;
            costType = 'lingotes';
            if (appState.lingotes >= cost) {
                appState.lingotes -= cost;
                appState.activeBoosts.points = 2;
                message = '¡Boost Puntos (x2) activado!';
                success = true;
            }
            break;
    }

    if (success) {
        showCustomAlert(message, 'success');
    } else {
        showCustomAlert(`No tienes suficientes ${costType} para comprar este artículo.`, 'error');
    }
    
    renderApp();
    saveState();
}

function initializeApp() {
    loadState(); 
    
    if (!appState.dailyMissions || appState.dailyMissions.length === 0) {
        generateDailyMissions();
    }
    
    setupEventListeners();
    
    const initialSection = document.querySelector('.nav-item[data-target="perfil"]');
    if (initialSection) {
        initialSection.click();
    } else {
        document.getElementById('perfil').classList.remove('hidden');
    }
    
    renderMinesweeperBoard(); 
    renderApp();
}

document.addEventListener('DOMContentLoaded', initializeApp);