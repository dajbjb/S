// ========================================
// QUANTUM TEMPORAL TRANSMISSION SYSTEM
// LOVE FROM THE FUTURE - דוד ואביה
// ========================================

// --- Particles Background ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.7 ? '#ff0055' : (Math.random() > 0.5 ? '#00ffff' : '#ffffff');
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// ========================================
// CONTENT DATA - הסיפור של דוד ואביה
// ========================================

const scanSteps = [
    { text: "מזהה פנים...", progress: 20 },
    { text: "סורק תווי פנים...", progress: 40 },
    { text: "מאמת זהות...", progress: 60 },
    { text: "בודק הרשאות גישה...", progress: 80 },
    { text: "מאתר קשר רגשי...", progress: 95 },
    { text: "זיהוי הושלם!", progress: 100 }
];

const introLines = [
    "אביה,",
    "מישהו שאוהב אותך מאוד מצא דרך לשלוח לך הודעה...",
    "מ-73 שנים בעתיד."
];

const storyContent = {
    1: {
        year: "2025",
        title: "הפגישה הראשונה",
        text: "  הייתי בן 16 וחצי, את היית בת 18. לא הייתי אמור להתאהב ככה. לא הייתי אמור לדעת מה זו אהבה אמיתית בגיל הזה. אבל אז פגשתי אותך, ומשהו בפנים שלי פשוט ידע. ידע שאת שונה. ידע שאת האחת."
    },
    2: {
        year: "2026",
        title: "השנה הראשונה",
        text: "שנה שלמה ביחד. אני במכינה להנדסת תוכנה, חולם על להיות מתכנת. את בצבא, בשירות חובה, לפעמים רחוקה אבל תמיד קרובה ללב. כל שיחת טלפון, כל סופש ביחד - שווה זהב. המרחק רק גורם לי לאהוב אותך יותר."
    },
    3: {
        year: "2028",
        title: "סיימת צבא",
        text: "הרגע שחיכיתי לו. יצאת משערי הבסיס בפעם האחרונה, ואני עמדתי שם עם פרחים כמו אידיוט מאוהב. אבל לא היה אכפת לי. סוף סוף יכולנו להיות ביחד באמת, בלי לספור ימים עד החופשה הבאה."
    },
    4: {
        year: "2030",
        title: "הדירה הראשונה",
        text: "זוכרת את הדירה הקטנה בתל אביב? הייתה לנו ספה אחת ישנה ומטבח שבקושי נכנסנו בו ביחד. אבל היינו הכי מאושרים בעולם. אני כבר עבדתי כמתכנת בחברת הייטק, ואת סיפרת לי על החלומות שלך. בנינו את העתיד שלנו, צעד אחר צעד."
    },
    5: {
        year: "2032",
        title: "החתונה",
        text: "לבשת שמלה לבנה והיית הדבר הכי יפה שראיתי בחיים. כשאמרתי 'כן' הרגשתי שהלב שלי הולך להתפוצץ מאושר. כל הדרך מאותו יום שהכרנו, כשהייתי רק נער בן 16 - הכל הוביל לרגע הזה."
    },
    6: {
        year: "2045",
        title: "הילדים גדלו",
        text: "הילדים שלנו כבר מתבגרים. אני מסתכל עליהם ורואה אותנו - את החלקים הטובים ביותר של שנינו. החברה שהקמתי הפכה למצליחה, אבל ההצלחה האמיתית יושבת מולי בסלון, צוחקת על בדיחה גרועה שסיפרתי."
    },
    7: {
        year: "2065",
        title: "40 שנה ביחד",
        text: "ארבעים שנה. מאז שהייתי נער בן 16 וחצי שפגש בחורה בת 18 וידע שהיא האחת. עכשיו אנחנו סבא וסבתא, והאהבה רק הלכה וגדלה. כל קמט בפנים שלך מספר סיפור של רגע שצחקנו ביחד."
    },
    8: {
        year: "2099",
        title: "היום",
        text: "אני בן 91, את בת 93. עדיין מחזיקים ידיים כל לילה לפני השינה. עדיין אומר לך 'אני אוהב אותך' כל בוקר. הטכנולוגיה שפיתחתי במשך עשרות שנים סוף סוף מאפשרת לי לשלוח הודעה אחת אחורה בזמן. הודעה אחת בלבד. ובחרתי לשלוח אותה לך, לאביה הצעירה, שרק עכשיו מתחילה את המסע הזה איתי."
    }
};

const finalMessage = `אביה יקרה,

בטח את שואלת את עצמך איך זה בכלל אפשרי.
איך אני, דוד, שולח לך הודעה משנת 2099?

אז ככה זה עובד:
זוכרת שתמיד אמרתי לך שאני הולך להיות מתכנת מצליח?
שהמכינה להנדסת תוכנה היא רק ההתחלה?

ובכן, הייתי צודק.
החברה שהקמתי ב-2035 הפכה לאחת מהחברות המובילות בעולם.
וב-2089, אחרי עשרות שנים של מחקר, הצלחנו לעשות את הבלתי אפשרי:
לשלוח מידע אחורה בזמן.

הודעה אחת. הודעה יחידה.
זה כל מה שהמערכת מסוגלת להעביר.

ואני בחרתי לשלוח אותה לך.
לא למדענים. לא לממשלות. לא לאף אחד אחר.
לך, אביה. לאהבה שלי.

---

אז הנה מה שרציתי לספר לך:

אנחנו עדיין ביחד.
אחרי 74 שנים. כן, קראת נכון. 74 שנים.

זוכרת את כל הפחדים שהיו לך?
שאנחנו צעירים מדי?
שהמרחק בזמן הצבא יהרוס אותנו?
שאולי זה לא יעבוד?

טעית, מותק. טעית בגדול.

עברנו הכל ביחד.
את הימים הקלים ואת הקשים.
את הלילות שישנו בחיבוק ואת אלה שנרדמנו אחרי ויכוח.
את הזמנים שהכל היה מושלם ואת הרגעים שחשבנו שזה הסוף.

אבל בכל בוקר, בכל בוקר, הסתכלתי עלייך ובחרתי בך מחדש.
ואת בחרת בי.

את הדבר הכי טוב שקרה לי בחיים.
לא הקריירה. לא הכסף. לא ההצלחה.
את.

אז תחייכי.
כי העתיד שלנו מדהים.
ואני מחכה לך שם.

אוהב אותך לנצח ועוד יום,
דוד שלך, מ-2099

P.S. - תגידי לדוד הצעיר שלא ידאג כל כך.
הוא עושה עבודה מצוינת. את בידיים טובות.
`;


// ========================================
// PHASE MANAGEMENT
// ========================================

let currentPhase = 0;
let currentStoryScene = 0;
let isSkipped = false;
let isAutoPlaying = true;
let isTransitioning = false; // Prevent double transitions
const totalStoryScenes = 8;

const phases = [
    'face-scan-screen',
    'sender-screen',
    'intro-message-screen',
    'story-container',
    'final-message-screen',
    'archive-screen'
];

function showPhase(phaseId) {
    phases.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('fade-out');
        }
    });
    const target = document.getElementById(phaseId);
    if (target) {
        target.classList.remove('hidden');
    }
}

// Show specific story scene (instant, no typing)
function showStoryScene(sceneIndex) {
    const scenes = document.querySelectorAll('.story-scene');
    const dots = document.querySelectorAll('.dot');

    scenes.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    if (scenes[sceneIndex]) {
        scenes[sceneIndex].classList.add('active');
    }
    if (dots[sceneIndex]) {
        dots[sceneIndex].classList.add('active');
    }

    // Fill in the text instantly (for manual navigation)
    const textEl = document.getElementById(`scene-${sceneIndex + 1}-text`);
    const content = storyContent[sceneIndex + 1];
    if (textEl && content) {
        textEl.textContent = content.text;
    }

    currentStoryScene = sceneIndex;
}

// Manual navigation to a phase (via swipe)
function goToPhase(index) {
    if (index < 0 || index >= phases.length) return;
    if (isTransitioning) return;

    isTransitioning = true;
    isAutoPlaying = false;
    isSkipped = true;

    const oldEl = document.getElementById(phases[currentPhase]);
    if (oldEl) {
        oldEl.classList.add('fade-out');
    }

    setTimeout(() => {
        currentPhase = index;
        showPhase(phases[currentPhase]);

        // If entering story phase, show current scene with full text
        if (phases[currentPhase] === 'story-container') {
            showStoryScene(currentStoryScene);
        }

        // If entering final message phase, show full message
        if (phases[currentPhase] === 'final-message-screen') {
            showFullFinalMessage();
        }

        isTransitioning = false;
    }, 300);
}

// Show full final message instantly (for manual navigation)
function showFullFinalMessage() {
    const finalTextEl = document.getElementById('final-text');
    if (finalTextEl) {
        // Convert newlines to <br> tags
        finalTextEl.innerHTML = finalMessage.replace(/\n/g, '<br>');
    }
}

function goNext() {
    if (isTransitioning) return;

    // If we're in story phase, navigate between scenes first
    if (phases[currentPhase] === 'story-container') {
        if (currentStoryScene < totalStoryScenes - 1) {
            currentStoryScene++;
            showStoryScene(currentStoryScene);
            return;
        } else {
            goToPhase(currentPhase + 1);
            return;
        }
    }

    // Normal phase navigation
    if (currentPhase < phases.length - 1) {
        goToPhase(currentPhase + 1);
    }
}

function goPrev() {
    if (isTransitioning) return;

    // If we're in story phase, navigate between scenes first
    if (phases[currentPhase] === 'story-container') {
        if (currentStoryScene > 0) {
            currentStoryScene--;
            showStoryScene(currentStoryScene);
            return;
        } else {
            goToPhase(currentPhase - 1);
            return;
        }
    }

    // Normal phase navigation
    if (currentPhase > 0) {
        goToPhase(currentPhase - 1);
    }
}

async function transitionToNextPhase() {
    if (isSkipped || !isAutoPlaying) return;

    const currentEl = document.getElementById(phases[currentPhase]);
    if (currentEl) {
        currentEl.classList.add('fade-out');
        await sleep(800);
    }

    currentPhase++;
    if (currentPhase < phases.length) {
        showPhase(phases[currentPhase]);
        await runPhase(currentPhase);
    }
}

async function runPhase(phaseIndex) {
    if (isSkipped || !isAutoPlaying) return;

    switch (phaseIndex) {
        case 0: await runFaceScanPhase(); break;
        case 1: await runSenderPhase(); break;
        case 2: await runIntroMessagePhase(); break;
        case 3: await runStoryPhase(); break;
        case 4: await runFinalMessagePhase(); break;
        case 5: /* Archive is interactive */ break;
    }
}


// ========================================
// SWIPE & NAVIGATION - FINAL VERSION
// ========================================

let touchStartX = 0;
let touchStartY = 0;
let navigationCooldown = false;

// Check if swipe navigation is allowed in current phase
function isSwipeAllowed() {
    const currentPhaseName = phases[currentPhase];
    // Only allow swipe in story and final message phases
    return currentPhaseName === 'story-container' ||
        currentPhaseName === 'final-message-screen';
}

// Check if element or parent is scrollable (for vertical scroll)
function isScrollableElement(el) {
    while (el) {
        if (el.classList && (
            el.classList.contains('final-scroll-container') ||
            el.classList.contains('archive-content') ||
            el.classList.contains('modal-content') ||
            el.classList.contains('message-display')
        )) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
}

// Set cooldown to prevent rapid navigation
function setCooldown() {
    navigationCooldown = true;
    setTimeout(() => {
        navigationCooldown = false;
    }, 600); // 600ms cooldown between swipes
}

// TOUCH EVENTS (Mobile)
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (!isSwipeAllowed()) return;
    if (navigationCooldown) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only trigger if horizontal movement is dominant and significant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        // RTL layout: swipe LEFT (positive diffX) = NEXT
        if (diffX > 0) {
            triggerNavigation('next');
        } else {
            triggerNavigation('prev');
        }
        setCooldown();
    }
}, { passive: true });

// TRACKPAD/WHEEL EVENTS (Laptop two-finger swipe)
let lastWheelTime = 0;
let wheelDeltaX = 0;

document.addEventListener('wheel', (e) => {
    // Allow vertical scrolling in scrollable areas
    if (isScrollableElement(e.target) && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        return;
    }

    // Only allow horizontal swipe in allowed phases
    if (!isSwipeAllowed()) return;
    if (navigationCooldown) return;

    const now = Date.now();

    // Reset accumulator if too much time passed
    if (now - lastWheelTime > 300) {
        wheelDeltaX = 0;
    }
    lastWheelTime = now;

    // Accumulate horizontal movement
    wheelDeltaX += e.deltaX;

    // Trigger navigation when threshold is reached
    if (Math.abs(wheelDeltaX) > 100) {
        // Trackpad: positive deltaX = swipe left = NEXT
        if (wheelDeltaX > 0) {
            triggerNavigation('next');
        } else {
            triggerNavigation('prev');
        }
        wheelDeltaX = 0;
        e.preventDefault();
    }
}, { passive: false });

// KEYBOARD (Desktop testing - always works)
document.addEventListener('keydown', (e) => {
    if (navigationCooldown) return;

    if (e.key === 'ArrowLeft') {
        triggerNavigation('next');
    } else if (e.key === 'ArrowRight') {
        triggerNavigation('prev');
    }
});

// UNIFIED NAVIGATION HANDLER
function triggerNavigation(direction) {
    if (isTransitioning) return;
    if (navigationCooldown) return;

    setCooldown();

    if (direction === 'next') {
        goNext();
    } else {
        goPrev();
    }
}


// ========================================
// PHASE IMPLEMENTATIONS
// ========================================

// PHASE 0: Face Scan
async function runFaceScanPhase() {
    const scanText = document.getElementById('scan-text');
    const scanProgress = document.getElementById('scan-progress');
    const scanResult = document.getElementById('scan-result');

    for (const step of scanSteps) {
        if (isSkipped || !isAutoPlaying) return;

        scanText.textContent = step.text;
        scanProgress.style.width = step.progress + '%';

        await sleep(700);
    }

    document.querySelector('.scan-status').style.display = 'none';
    document.querySelector('.scan-laser').style.display = 'none';
    document.querySelector('.face-icon').style.opacity = '0';
    scanResult.classList.remove('hidden');

    await sleep(2500);
    await transitionToNextPhase();
}

// PHASE 1: Sender Reveal
async function runSenderPhase() {
    await sleep(3500);
    await transitionToNextPhase();
}

// PHASE 3: Intro Message
async function runIntroMessagePhase() {
    const lines = [
        document.getElementById('intro-line-1'),
        document.getElementById('intro-line-2'),
        document.getElementById('intro-line-3')
    ];

    for (let i = 0; i < introLines.length; i++) {
        if (isSkipped || !isAutoPlaying) return;

        lines[i].textContent = '';
        lines[i].classList.add('visible');

        for (let j = 0; j < introLines[i].length; j++) {
            if (isSkipped || !isAutoPlaying) return;
            lines[i].textContent += introLines[i].charAt(j);
            await sleep(50);
        }

        if (i === 0) {
            lines[i].style.color = 'var(--primary)';
            lines[i].style.fontSize = '2.5rem';
        }
        if (i === 2) {
            lines[i].classList.add('highlight-text');
        }

        await sleep(1200);
    }

    await sleep(1500);
    await transitionToNextPhase();
}

// PHASE 4: Story Sequence
async function runStoryPhase() {
    const scenes = document.querySelectorAll('.story-scene');
    const dots = document.querySelectorAll('.dot');

    for (let i = 0; i < scenes.length; i++) {
        if (isSkipped || !isAutoPlaying) return;

        currentStoryScene = i;

        scenes.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        scenes[i].classList.add('active');
        dots[i].classList.add('active');

        const textEl = document.getElementById(`scene-${i + 1}-text`);
        const content = storyContent[i + 1];

        if (textEl && content) {
            textEl.textContent = '';
            for (let j = 0; j < content.text.length; j++) {
                if (isSkipped || !isAutoPlaying) return;
                textEl.textContent += content.text.charAt(j);
                await sleep(18);
            }
        }

        // Wait before moving to next scene (only if still auto-playing)
        if (!isSkipped && isAutoPlaying) {
            await sleep(3500);
        }
    }

    await transitionToNextPhase();
}

// PHASE 5: Final Message (FIXED - won't get stuck)
async function runFinalMessagePhase() {
    const finalTextEl = document.getElementById('final-text');
    const scrollContainer = document.getElementById('final-scroll');

    // Clear previous content
    if (finalTextEl) {
        finalTextEl.innerHTML = '';
    }

    for (let i = 0; i < finalMessage.length; i++) {
        // Check if we should stop
        if (isSkipped || !isAutoPlaying) {
            // Show full message when interrupted
            showFullFinalMessage();
            return;
        }

        if (finalMessage.charAt(i) === '\n') {
            finalTextEl.innerHTML += '<br>';
        } else {
            finalTextEl.innerHTML += finalMessage.charAt(i);
        }

        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }

        await sleep(15);
    }

    await sleep(8000);
    await transitionToNextPhase();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function skipToArchive() {
    isSkipped = true;
    isAutoPlaying = false;
    showPhase('archive-screen');
    currentPhase = phases.length - 1;
    document.getElementById('skip-btn').style.display = 'none';
}

// ========================================
// ARCHIVE & REPLAY FUNCTIONALITY
// ========================================

document.querySelectorAll('.archive-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.archive-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const panelId = 'panel-' + tab.dataset.tab;
        document.querySelectorAll('.archive-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(panelId).classList.add('active');
    });
});

function showMemoryDetail(index) {
    const memory = storyContent[index];
    if (!memory) return;

    document.getElementById('modal-year').textContent = memory.year;
    document.getElementById('modal-title').textContent = memory.title;
    document.getElementById('modal-text').textContent = memory.text;

    document.getElementById('memory-modal').classList.remove('hidden');
}

function closeMemoryModal() {
    document.getElementById('memory-modal').classList.add('hidden');
}

// REPLAY STORY ONLY (not from the beginning)
function replayStory() {
    // Reset state for story replay
    isSkipped = false;
    isAutoPlaying = true;
    isTransitioning = false;
    currentStoryScene = 0;

    // Clear story scene text elements
    for (let i = 1; i <= 8; i++) {
        const textEl = document.getElementById(`scene-${i}-text`);
        if (textEl) {
            textEl.textContent = '';
        }
    }

    // Clear final message
    const finalTextEl = document.getElementById('final-text');
    if (finalTextEl) {
        finalTextEl.innerHTML = '';
    }

    // Go to story phase (phase 4)
    currentPhase = 4;
    showPhase('story-container');

    // Run the story sequence
    runStoryPhase();
}

// ========================================
// AUDIO (Optional)
// ========================================

let audioEnabled = false;

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('audio-btn');
    btn.textContent = audioEnabled ? '🔊' : '🔇';
}

// ========================================
// START
// ========================================

window.onload = async () => {
    showPhase(phases[0]);
    await runPhase(0);
};
