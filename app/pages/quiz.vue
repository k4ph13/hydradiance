<script setup lang="ts">
definePageMeta({
  layout: 'quiz',
})

useHead({
  title: 'Skin Quiz — Skin Fluent by Nicole',
})

interface QuizOption {
  t: string
  sub?: string
  map: Record<string, number>
}

interface QuizQuestion {
  id: string
  label: string
  title: string
  help: string
  type: 'single' | 'multi'
  optional?: boolean
  options: QuizOption[]
}

interface Profile {
  name: string
  guide: string
  timeline: string
  desc: string
  chars: string[]
  insight: string
}

/* ============================================================
   Routing: skin type establishes a base, primary concern
   refines/overrides, sensitivity + secondary concerns act as
   tiebreakers. Concern is weighted most heavily.
   ============================================================ */
const PROFILES: Record<string, Profile> = {
  dry: {
    name: 'Dry & Dehydrated',
    guide: 'Your Barrier Repair Guide',
    timeline: 'Typical Timeline: 8–12 Weeks',
    desc: 'Your skin is struggling to hold onto moisture — leaving it tight, dull, and prone to a compromised barrier. The good news: this is one of the most responsive skin types to treat. With the right barrier-repair routine, real visible change comes quickly.',
    chars: [
      'Tightness after cleansing — even before any products',
      'Flaking or rough patches, especially around the nose and cheeks',
      'Fine lines that look more pronounced when skin is parched',
      'Dull, flat complexion lacking glow',
    ],
    insight:
      "Your biggest mistake is likely <strong>over-cleansing and skipping moisture layers.</strong> Stripping your skin to feel 'clean' breaks the barrier further. Gentle is powerful here.",
  },
  oily: {
    name: 'Oily & Congested',
    guide: 'Your Oil Control Guide',
    timeline: 'Typical Timeline: 10–14 Weeks',
    desc: "You produce more sebum than your skin needs — leading to shine, enlarged pores, and frequent congestion. With consistent oil regulation and smart hydration, your skin can become balanced and clear, not just 'less oily.'",
    chars: [
      'Excess shine throughout the day',
      'Visible, enlarged pores',
      'Frequent blackheads or congestion',
      'Makeup breaks down by midday',
    ],
    insight:
      'Your biggest mistake is likely <strong>stripping your skin and skipping hydration.</strong> Oily skin overproduces oil when it\'s dehydrated — the fix is balance, not aggression.',
  },
  sensitive: {
    name: 'Sensitive',
    guide: 'Your Calm & Comfort Guide',
    timeline: 'Typical Timeline: 8–12 Weeks',
    desc: 'Your skin reacts easily — to products, weather, and stress. With a gentle, barrier-first approach, your skin can become calm, comfortable, and far more resilient over time.',
    chars: [
      'Stinging or burning with new products',
      'Redness or flushing easily triggered',
      'Tight, reactive, or itchy skin',
      'A short list of products you actually trust',
    ],
    insight:
      'Your biggest mistake is likely <strong>introducing too many products too fast.</strong> Sensitive skin needs a minimal, barrier-supporting routine and one new product at a time — patience is your most powerful ingredient.',
  },
  acne: {
    name: 'Acne-Prone',
    guide: 'Your Clarity Guide',
    timeline: 'Typical Timeline: 12–16 Weeks',
    desc: 'Your skin is prone to breakouts — whether comedonal, inflammatory, or hormonal. With consistent, targeted care that respects your barrier, clearer and calmer skin is absolutely achievable.',
    chars: [
      'Recurring breakouts or congestion',
      'Whiteheads, blackheads, or inflamed spots',
      'Post-breakout marks that linger',
      "Skin that reacts badly to harsh 'acne' products",
    ],
    insight:
      'Your biggest mistake is likely <strong>over-treating with too many harsh actives at once.</strong> Acne-prone skin clears fastest with consistency and barrier support — not a war of drying products.',
  },
  pigment: {
    name: 'Hyperpigmentation',
    guide: 'Your Brightening Guide',
    timeline: 'Typical Timeline: 20–24 Weeks',
    desc: 'Dark spots, melasma, or post-inflammatory marks leave your tone uneven. With brightening actives, consistent exfoliation, and dedicated SPF, significant fading is genuinely achievable.',
    chars: [
      'Dark spots or sun spots',
      'Post-acne marks (PIH) that linger',
      'Melasma or patchy discoloration',
      'Overall uneven skin tone',
    ],
    insight:
      "Your biggest mistake is likely <strong>inconsistent SPF.</strong> Without daily sun protection, brightening actives can't win — UV exposure undoes progress faster than any serum can fix it.",
  },
  aging: {
    name: 'Fine Lines & Firmness',
    guide: 'Your Renewal Guide',
    timeline: 'Typical Timeline: 16–24 Weeks',
    desc: "Your skin is showing signs of shifting — fine lines, loss of firmness, or dullness that wasn't there before. With a renewal-focused routine built on proven actives, your skin can look firmer, smoother, and more radiant.",
    chars: [
      'Fine lines and wrinkles',
      'Loss of firmness or elasticity',
      'Dullness or uneven tone',
      'Skin feels drier than it used to',
    ],
    insight:
      'Your biggest mistake is likely <strong>expecting fast results from the wrong products.</strong> This skin rewards consistency with retinoids, peptides, and SPF — measured in months, not days.',
  },
  rosacea: {
    name: 'Rosacea & Reactive',
    guide: 'Your Redness Guide',
    timeline: 'Typical Timeline: 12–16 Weeks',
    desc: 'Your skin flushes, reddens, and reacts — often with visible vessels or persistent warmth. With a calming, anti-inflammatory approach, your skin can become noticeably more even and comfortable.',
    chars: [
      'Persistent redness or flushing',
      'Visible capillaries or facial warmth',
      'Stinging with many products',
      'Triggers like heat, spice, wine, or stress',
    ],
    insight:
      'Your biggest mistake is likely <strong>using actives that inflame.</strong> Reactive skin calms with gentle, anti-inflammatory ingredients and trigger management — less is genuinely more.',
  },
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'type',
    label: 'Your Skin Type',
    title: 'How does your skin feel by midday — with nothing on it?',
    help: 'Think about a normal day after washing your face in the morning.',
    type: 'single',
    options: [
      { t: 'Tight, dry, or flaky', sub: "Feels like it's always thirsty", map: { dry: 4 } },
      { t: 'Oily all over', sub: 'Shiny across the whole face', map: { oily: 4 } },
      { t: 'Oily in the center, drier elsewhere', sub: 'T-zone shiny, cheeks normal or dry', map: { oily: 2, dry: 1 } },
      { t: 'Comfortable — not too oily or dry', sub: 'Balanced, minimal issues', map: { aging: 1 } },
      { t: 'Reactive — stings or reddens easily', sub: 'Feels delicate or irritated', map: { sensitive: 4, rosacea: 2 } },
      { t: 'Tight but still gets oily', sub: 'Dehydrated — parched yet shiny', map: { dry: 3, oily: 1 } },
    ],
  },
  {
    id: 'concern',
    label: 'Your #1 Concern',
    title: "What's the one thing about your skin you'd fix first?",
    help: 'Choose your single biggest priority — this shapes your profile more than anything else.',
    type: 'single',
    options: [
      { t: 'Dryness or dehydration', sub: 'Tight, flaky, or always thirsty', map: { dry: 5 } },
      { t: 'Oiliness, shine, or congestion', sub: 'Shine, blackheads, clogged pores', map: { oily: 5 } },
      { t: 'Breakouts and acne', sub: 'Pimples, cysts, or hormonal breakouts', map: { acne: 6 } },
      { t: 'Dark spots or uneven skin tone', sub: 'Sun spots, PIH, melasma', map: { pigment: 6 } },
      { t: 'Redness or rosacea', sub: 'Flushing, visible vessels, reactive skin', map: { rosacea: 6 } },
      { t: 'Fine lines, firmness, or aging', sub: "Skin shifting, losing elasticity", map: { aging: 6 } },
      { t: 'Sensitivity and reactivity', sub: 'Skin reacts to most things', map: { sensitive: 5 } },
    ],
  },
  {
    id: 'secondary',
    label: 'Secondary Concerns',
    title: 'Any secondary concerns?',
    help: 'Select all that apply — or skip if none.',
    type: 'multi',
    optional: true,
    options: [
      { t: 'Dryness / dehydration', map: { dry: 1 } },
      { t: 'Oiliness or congestion', map: { oily: 1 } },
      { t: 'Breakouts', map: { acne: 1 } },
      { t: 'Dark spots / uneven tone', map: { pigment: 1 } },
      { t: 'Redness', map: { rosacea: 1 } },
      { t: 'Fine lines / loss of firmness', map: { aging: 1 } },
      { t: 'Sensitivity', map: { sensitive: 1 } },
    ],
  },
  {
    id: 'sensitivity',
    label: 'Sensitivity',
    title: 'How sensitive is your skin to new products?',
    help: 'This helps fine-tune how gentle your routine needs to be.',
    type: 'single',
    options: [
      { t: 'Not sensitive — I can use almost anything', map: {} },
      { t: 'Mildly sensitive — occasional reactions', map: { sensitive: 1 } },
      { t: 'Moderately sensitive — I have to be careful', map: { sensitive: 2, rosacea: 1 } },
      { t: 'Very sensitive — I react to most things', map: { sensitive: 4, rosacea: 2 } },
    ],
  },
  {
    id: 'redness',
    label: 'Redness',
    title: 'Do you experience persistent redness or flushing?',
    help: 'Beyond the occasional blush — does redness linger on your skin?',
    type: 'single',
    options: [
      { t: 'No, rarely', map: {} },
      { t: 'Sometimes, in patches', map: { rosacea: 1 } },
      { t: 'Yes — visible redness or flushing often', map: { rosacea: 3 } },
      { t: 'Yes — with visible capillaries or facial warmth', map: { rosacea: 5 } },
    ],
  },
  {
    id: 'age',
    label: 'Age Range',
    title: "What's your age range?",
    help: 'Age helps us prioritize the right actives and timeline for you.',
    type: 'single',
    options: [
      { t: 'Under 25', map: {} },
      { t: '25–34', map: {} },
      { t: '35–44', map: { aging: 1 } },
      { t: '45–54', map: { aging: 2 } },
      { t: '55+', map: { aging: 3 } },
    ],
  },
  {
    id: 'climate',
    label: 'Your Climate',
    title: 'How would you describe your climate?',
    help: 'Environment plays a bigger role in skin behavior than most people realize.',
    type: 'single',
    options: [
      { t: 'Hot & humid', map: { oily: 1 } },
      { t: 'Hot & dry / desert', map: { dry: 1 } },
      { t: 'Mild / temperate', map: {} },
      { t: 'Cold & dry', map: { dry: 1 } },
      { t: 'Cold & damp', map: {} },
      { t: 'Varies a lot by season', map: { dry: 1, oily: 1 } },
    ],
  },
  {
    id: 'routine',
    label: 'Your Routine',
    title: 'How would you describe your current skincare routine?',
    help: "No judgment here — this just tells us where you're starting from.",
    type: 'single',
    options: [
      { t: 'Barely any — cleanser, maybe moisturizer', map: {} },
      { t: 'Basic — a few products, no actives', map: {} },
      { t: 'Intermediate — I use some actives', map: {} },
      { t: 'Advanced — full routine with multiple actives', map: {} },
    ],
  },
]

/* ============================================================
   FLODESK DELIVERY CONFIG
   ------------------------------------------------------------
   Fill this in once Nicole's Flodesk account + segments exist.
   For EACH profile key below, paste the "Action URL" and the
   hidden field name from that segment's Flodesk form:
     Flodesk → Forms → [that segment's form] → Embed → Custom HTML
   You'll see something like:
     <form action="https://form.flodesk.com/forms/XXXXXXXX/submit" ...>
       <input type="hidden" name="segment_ids[]" value="XXXXXXXX">
       <input type="email" name="email">
     </form>
   Copy the action URL into `endpoint` and the hidden field's
   name+value into `hiddenField` / `hiddenValue` for each profile.
   Until this is filled in, FLODESK_ENABLED stays false and the
   quiz simply shows the "your guide is on its way" confirmation
   without actually sending anything — safe to leave live while
   Flodesk is being set up.
   ============================================================ */
const FLODESK_ENABLED = false // flip to true once all 7 rows below are filled in

const FLODESK_CONFIG: Record<string, { endpoint: string; hiddenField: string; hiddenValue: string }> = {
  dry: { endpoint: '', hiddenField: '', hiddenValue: '' },
  oily: { endpoint: '', hiddenField: '', hiddenValue: '' },
  sensitive: { endpoint: '', hiddenField: '', hiddenValue: '' },
  acne: { endpoint: '', hiddenField: '', hiddenValue: '' },
  pigment: { endpoint: '', hiddenField: '', hiddenValue: '' },
  aging: { endpoint: '', hiddenField: '', hiddenValue: '' },
  rosacea: { endpoint: '', hiddenField: '', hiddenValue: '' },
}

/* ---- State ---- */
const stage = ref<'intro' | 'question' | 'result'>('intro')
const qIndex = ref(0)
const answers = reactive<Record<string, number | number[] | undefined>>({})
const resultKey = ref<string | null>(null)

const currentQuestion = computed(() => QUESTIONS[qIndex.value])
const progressPct = computed(() => (qIndex.value / QUESTIONS.length) * 100)
const canNext = computed(() => {
  const q = currentQuestion.value
  if (q.type === 'multi') return true
  return answers[q.id] !== undefined
})
const profile = computed(() => (resultKey.value ? PROFILES[resultKey.value] : null))

function isSelected(i: number) {
  const q = currentQuestion.value
  const sel = answers[q.id]
  return q.type === 'multi' ? Array.isArray(sel) && sel.includes(i) : sel === i
}

function pick(i: number) {
  const q = currentQuestion.value
  if (q.type === 'multi') {
    const arr = Array.isArray(answers[q.id]) ? (answers[q.id] as number[]) : []
    const at = arr.indexOf(i)
    if (at > -1) arr.splice(at, 1)
    else arr.push(i)
    answers[q.id] = arr
  } else {
    answers[q.id] = i
  }
}

function startQuiz() {
  qIndex.value = 0
  stage.value = 'question'
}

function nextQ(skip = false) {
  if (skip) answers[currentQuestion.value.id] = undefined
  if (qIndex.value < QUESTIONS.length - 1) {
    qIndex.value++
  } else {
    computeResult()
  }
}

function prevQ() {
  if (qIndex.value > 0) qIndex.value--
}

function computeResult() {
  const scores: Record<string, number> = {}
  Object.keys(PROFILES).forEach((k) => (scores[k] = 0))
  QUESTIONS.forEach((q) => {
    const a = answers[q.id]
    if (a === undefined) return
    const idxs = Array.isArray(a) ? a : [a]
    idxs.forEach((i) => {
      const map = q.options[i]?.map ?? {}
      Object.entries(map).forEach(([prof, pts]) => {
        scores[prof] += pts
      })
    })
  })
  let best: string | null = null
  let bestScore = -1
  Object.entries(scores).forEach(([prof, s]) => {
    if (s > bestScore) {
      bestScore = s
      best = prof
    }
  })
  resultKey.value = best
  stage.value = 'result'
}

function retake() {
  Object.keys(answers).forEach((k) => Reflect.deleteProperty(answers, k))
  qIndex.value = 0
  resultKey.value = null
  fname.value = ''
  email.value = ''
  submitted.value = false
  submitError.value = false
  emailInvalid.value = false
  stage.value = 'intro'
}

/* ---- Email capture: posts to Flodesk when configured, otherwise
   shows the confirmation state so the on-screen flow always works ---- */
const fname = ref('')
const email = ref('')
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref(false)
const emailInvalid = ref(false)

async function submitEmail() {
  const trimmedEmail = email.value.trim()
  if (!trimmedEmail || !trimmedEmail.includes('@')) {
    emailInvalid.value = true
    return
  }
  emailInvalid.value = false
  submitting.value = true
  submitError.value = false

  const cfg = resultKey.value ? FLODESK_CONFIG[resultKey.value] : undefined
  let delivered = true

  if (FLODESK_ENABLED && cfg?.endpoint) {
    try {
      const body = new FormData()
      body.append('email', trimmedEmail)
      const trimmedName = fname.value.trim()
      if (trimmedName) body.append('first_name', trimmedName)
      if (cfg.hiddenField) body.append(cfg.hiddenField, cfg.hiddenValue)
      await fetch(cfg.endpoint, { method: 'POST', mode: 'no-cors', body })
      /* no-cors means we can't read the response status, so we
         optimistically show success — Flodesk itself will reject
         malformed submissions silently rather than erroring here. */
    } catch {
      delivered = false
    }
  }

  submitting.value = false
  if (delivered) submitted.value = true
  else submitError.value = true
}
</script>

<template>
  <div class="quiz-shell">
    <div v-if="stage === 'question'" class="progress-wrap">
      <div class="progress-meta">
        <span>{{ currentQuestion.label }}</span>
        <span>{{ qIndex + 1 }} / {{ QUESTIONS.length }}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" :style="{ width: progressPct + '%' }" /></div>
    </div>

    <div v-if="stage === 'intro'" class="card intro">
      <h1>Your skin has a <em>language.</em><br >Let's learn to speak it.</h1>
      <p>
        Answer a few quick questions and I'll match you to your personalized skin profile — built
        on expertise from a licensed esthetician practicing since 2006.
      </p>
      <p class="intro-note">No wrong answers. The more honest you are, the better your match.</p>
      <button type="button" class="btn btn-next" @click="startQuiz">Begin the Quiz</button>
      <div class="meta">Takes about 2 minutes · Free personalized result</div>
    </div>

    <div v-else-if="stage === 'question'" class="card">
      <div class="q-eyebrow">{{ currentQuestion.label }}</div>
      <div class="q-title">{{ currentQuestion.title }}</div>
      <div class="q-help">{{ currentQuestion.help }}</div>
      <div class="opts">
        <button
          v-for="(o, i) in currentQuestion.options"
          :key="i"
          type="button"
          class="opt"
          :class="{ multi: currentQuestion.type === 'multi', sel: isSelected(i) }"
          @click="pick(i)"
        >
          <span class="dot" />
          <span class="opt-label">{{ o.t }}<span v-if="o.sub" class="opt-sub">{{ o.sub }}</span></span>
        </button>
      </div>
      <div class="nav">
        <button type="button" class="btn btn-back" :style="qIndex === 0 ? 'visibility:hidden' : ''" @click="prevQ">
          ← Back
        </button>
        <div class="nav-right">
          <button v-if="currentQuestion.optional" type="button" class="btn-skip" @click="nextQ(true)">Skip</button>
          <button type="button" class="btn btn-next" :disabled="!canNext" @click="nextQ()">
            {{ qIndex === QUESTIONS.length - 1 ? 'See My Result' : 'Next' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="stage === 'result' && profile" class="card">
      <div class="result-hero">
        <div class="result-eyebrow">Your Skin Profile</div>
        <div class="result-name">{{ profile.name }}</div>
        <div class="result-guide">{{ profile.guide }}</div>
        <div class="result-timeline">{{ profile.timeline }}</div>
      </div>

      <div class="result-section">
        <h3>What This Means</h3>
        <p class="result-desc">{{ profile.desc }}</p>
      </div>

      <div class="result-section">
        <h3>You Likely Recognize</h3>
        <div class="char-list">
          <div v-for="c in profile.chars" :key="c" class="char"><span class="pip" /><span>{{ c }}</span></div>
        </div>
      </div>

      <div class="result-section">
        <h3>Your Skin's Biggest Mistake</h3>
        <div class="insight"><p v-html="profile.insight" /></div>
      </div>

      <div class="capture">
        <template v-if="!submitted">
          <h3>Get Your Full {{ profile.name }} Guide</h3>
          <p>
            Your complete profile guide — routines, ingredient lists, your transformation
            timeline, and more — delivered free to your inbox.
          </p>
          <div class="capture-form">
            <input v-model="fname" type="text" placeholder="First name" >
            <input
              v-model="email"
              type="email"
              placeholder="Email address"
              :class="{ invalid: emailInvalid }"
              @focus="emailInvalid = false"
            >
            <button type="button" class="btn btn-next" :disabled="submitting" @click="submitEmail">
              {{ submitting ? 'Sending...' : 'Send My Free Guide' }}
            </button>
          </div>
          <p v-if="submitError" class="capture-error">That didn't go through — please try again in a moment.</p>
          <div class="fineprint">No spam, ever. Just your guide and the occasional skin tip from Nicole.</div>
        </template>
        <div v-else class="thanks">
          <div class="check">✓</div>
          <h3>Your guide is on its way{{ fname ? ', ' + fname : '' }}!</h3>
          <p>
            Check your inbox in the next few minutes for your full {{ profile.name }} guide. While
            you wait — your personalized routine is just one consultation away.
          </p>
        </div>
      </div>

      <div class="coach-cta">
        <p>Want a routine built specifically for <em>you</em>? Book a 1-on-1 virtual consultation with Nicole.</p>
        <button type="button" class="btn-ghost">Explore Coaching →</button>
      </div>

      <div class="restart"><button type="button" @click="retake">↺ Retake the quiz</button></div>
    </div>
  </div>
</template>

<style scoped>
.quiz-shell {
  max-width: 680px;
  margin: 0 auto;
  padding: 40px 22px 80px;
}

/* ---------- Progress ---------- */
.progress-wrap {
  margin-bottom: 30px;
}
.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-mute);
  margin-bottom: 8px;
}
.progress-track {
  height: 3px;
  background: var(--color-pale-purple);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--color-periwinkle), var(--color-pale-lavender));
  border-radius: 3px;
  width: 0;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---------- Cards ---------- */
.card {
  background: var(--color-white);
  border-radius: 22px;
  padding: 38px 34px 34px;
  box-shadow: 0 10px 50px rgba(27, 42, 74, 0.08);
  animation: rise 0.5s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.q-eyebrow {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-periwinkle);
  font-weight: 600;
  margin-bottom: 12px;
}
.q-title {
  font-family: var(--font-display);
  font-size: 27px;
  font-weight: 500;
  color: var(--color-navy);
  line-height: 1.25;
  margin-bottom: 6px;
}
.q-help {
  font-size: 13px;
  color: var(--color-mute);
  margin-bottom: 24px;
  font-weight: 300;
}

/* ---------- Options ---------- */
.opts {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.opt {
  text-align: left;
  width: 100%;
  background: var(--color-cream);
  border: 1.5px solid transparent;
  border-radius: 14px;
  padding: 16px 18px;
  font-family: var(--font-body);
  font-size: 14.5px;
  color: var(--color-ink);
  cursor: pointer;
  transition: all 0.18s ease;
  display: flex;
  align-items: center;
  gap: 14px;
}
.opt:hover {
  border-color: var(--color-powder-blue);
  background: var(--color-white);
  transform: translateX(3px);
}
.opt .dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--color-pale-lavender);
  flex-shrink: 0;
  transition: all 0.18s ease;
  position: relative;
}
.opt.sel {
  border-color: var(--color-periwinkle);
  background: var(--color-white);
  box-shadow: 0 4px 18px rgba(143, 167, 212, 0.15);
}
.opt.sel .dot {
  border-color: var(--color-periwinkle);
  background: var(--color-periwinkle);
}
.opt.sel .dot::after {
  content: '';
  position: absolute;
  inset: 4px;
  background: var(--color-white);
  border-radius: 50%;
}
.opt-label {
  flex: 1;
}
.opt-sub {
  display: block;
  font-size: 11.5px;
  color: var(--color-mute);
  margin-top: 2px;
  font-weight: 300;
}

/* multi-select checkbox style */
.opt.multi .dot {
  border-radius: 5px;
}
.opt.multi.sel .dot::after {
  border-radius: 1px;
  inset: 0;
  background: transparent;
  content: '✓';
  color: var(--color-white);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---------- Nav ---------- */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
  gap: 12px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 14px;
}
.btn-next,
.btn-back,
.btn-skip,
.btn-ghost {
  font-family: var(--font-body);
  font-size: 13px;
  letter-spacing: 1px;
  border: none;
  border-radius: 30px;
  padding: 13px 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}
.btn-next {
  background: var(--color-navy);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.btn-next:hover {
  background: #2c3e64;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(27, 42, 74, 0.22);
}
.btn-next:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.btn-back {
  background: transparent;
  color: var(--color-mute);
  padding: 13px 10px;
}
.btn-back:hover {
  color: var(--color-navy);
}
.btn-skip {
  background: transparent;
  color: var(--color-periwinkle);
  font-size: 12px;
  text-decoration: underline;
  padding: 6px;
}

/* ---------- Intro ---------- */
.intro {
  text-align: center;
  padding: 46px 34px;
}
.intro h1 {
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 500;
  color: var(--color-navy);
  line-height: 1.15;
  margin-bottom: 16px;
}
.intro h1 em {
  font-style: italic;
  color: var(--color-periwinkle);
}
.intro p {
  font-size: 15px;
  color: var(--color-ink);
  max-width: 440px;
  margin: 0 auto 10px;
  font-weight: 300;
}
.intro .intro-note {
  color: var(--color-mute);
  font-size: 13px;
}
.intro .meta {
  font-size: 12px;
  color: var(--color-mute);
  margin-top: 20px;
  letter-spacing: 1px;
}
.intro .btn-next {
  margin-top: 30px;
}

/* ---------- Results ---------- */
.result-hero {
  text-align: center;
  padding-bottom: 8px;
}
.result-eyebrow {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-periwinkle);
  font-weight: 600;
  margin-bottom: 14px;
}
.result-name {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 600;
  color: var(--color-navy);
  line-height: 1.15;
}
.result-guide {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 19px;
  color: var(--color-mid-purple);
  margin-top: 4px;
  margin-bottom: 8px;
}
.result-timeline {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-periwinkle);
  border: 1px solid var(--color-powder-blue);
  border-radius: 30px;
  padding: 6px 16px;
  margin-top: 8px;
}
.result-section {
  margin-top: 26px;
}
.result-section h3 {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-navy);
  font-weight: 600;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-pale-purple);
}
.result-desc {
  font-size: 14.5px;
  color: var(--color-ink);
  font-weight: 300;
  line-height: 1.75;
}
.char-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 4px;
}
.char {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 300;
}
.char .pip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-periwinkle);
  margin-top: 8px;
  flex-shrink: 0;
}
.insight {
  background: linear-gradient(135deg, rgba(143, 167, 212, 0.12), rgba(228, 223, 245, 0.12));
  border-left: 3px solid var(--color-periwinkle);
  border-radius: 0 12px 12px 0;
  padding: 18px 20px;
  margin-top: 8px;
}
.insight :deep(strong) {
  color: var(--color-navy);
  font-weight: 600;
}
.insight p {
  font-size: 14px;
  font-weight: 300;
  color: var(--color-ink);
  margin: 0;
}

/* email capture */
.capture {
  background: var(--color-navy);
  color: var(--color-white);
  border-radius: 18px;
  padding: 30px 28px;
  margin-top: 30px;
  text-align: center;
}
.capture h3 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  border: none;
  color: var(--color-white);
  text-transform: none;
  letter-spacing: 0;
  margin-bottom: 8px;
  padding: 0;
}
.capture p {
  font-size: 13.5px;
  opacity: 0.85;
  font-weight: 300;
  max-width: 400px;
  margin: 0 auto 20px;
}
.capture-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 360px;
  margin: 0 auto;
}
.capture input {
  font-family: var(--font-body);
  font-size: 14px;
  border: none;
  border-radius: 30px;
  padding: 14px 20px;
  width: 100%;
  text-align: center;
}
.capture input:focus {
  outline: 2px solid var(--color-periwinkle);
}
.capture input.invalid {
  outline: 2px solid var(--color-mid-purple);
}
.capture .btn-next {
  background: var(--color-periwinkle);
  width: 100%;
}
.capture .btn-next:hover {
  background: var(--color-powder-blue);
  color: var(--color-navy);
}
.capture .fineprint {
  font-size: 11px;
  opacity: 0.6;
  margin-top: 14px;
}
.capture-error {
  color: var(--color-white);
  font-size: 12px;
  margin-top: 10px;
  opacity: 0.85;
}

.coach-cta {
  text-align: center;
  margin-top: 26px;
  padding-top: 24px;
  border-top: 1px solid var(--color-pale-purple);
}
.coach-cta p {
  font-size: 13.5px;
  color: var(--color-mute);
  font-weight: 300;
  margin-bottom: 14px;
}
.btn-ghost {
  background: transparent;
  border: 1.5px solid var(--color-navy);
  color: var(--color-navy);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
}
.btn-ghost:hover {
  background: var(--color-navy);
  color: var(--color-white);
}

.restart {
  text-align: center;
  margin-top: 24px;
}
.restart button {
  background: none;
  border: none;
  color: var(--color-mute);
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  font-family: var(--font-body);
}

.thanks {
  text-align: center;
  padding: 30px 20px;
  animation: rise 0.5s ease both;
}
.thanks .check {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-periwinkle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  color: var(--color-white);
  font-size: 26px;
}
.thanks h3 {
  font-family: var(--font-display);
  font-size: 26px;
  color: var(--color-white);
  font-weight: 500;
  margin-bottom: 8px;
}
.thanks p {
  font-size: 14px;
  color: var(--color-misty-blue);
  font-weight: 300;
  max-width: 380px;
  margin: 0 auto;
}

@media (max-width: 520px) {
  .card {
    padding: 30px 22px;
  }
  .intro {
    padding: 38px 22px;
  }
  .intro h1 {
    font-size: 30px;
  }
  .q-title {
    font-size: 23px;
  }
  .result-name {
    font-size: 28px;
  }
}
</style>
