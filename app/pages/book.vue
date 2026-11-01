<script setup lang="ts">
useHead({
  title: 'Book — Skin Fluent by Nicole',
})

/* ============================================================
   PRE-BOOKING STEP
   ------------------------------------------------------------
   Sits between "Book Now" on /services and Nicole's external
   booking platform. It (1) checks for a saved quiz result and
   offers to take or retake the quiz, then (2) optionally sends
   Nicole the visitor's name, email and quiz answers, then (3)
   sends them on to the service's booking link. Service data,
   booking links and the handoff endpoint live in
   app/utils/services.ts.

   Query params:
     service=<slug>        which service is being booked
     quiz=confirmed|skip   set by /quiz when it hands back here,
                           so the quiz check isn't shown twice
   ============================================================ */

const route = useRoute()

type Stage = 'loading' | 'pick-service' | 'quiz-check' | 'details' | 'not-open'
const stage = ref<Stage>('loading')
const service = ref<Service | null>(null)
const savedResult = ref<SavedQuizResult | null>(null)
/** The result that will actually be shared; null after "skip". */
const result = ref<SavedQuizResult | null>(null)

// All of this reads the query string and localStorage, so it runs after
// mount — the prerendered page has neither. Re-runs when the query changes
// (the service picker links back to /book itself).
onMounted(init)
watch(() => route.query, init)

function init() {
  const found = findService(route.query.service)
  service.value = null
  result.value = null
  if (!found?.preBooking) {
    stage.value = 'pick-service'
    return
  }
  service.value = found
  savedResult.value = recallQuizResult()

  if (route.query.quiz === 'skip') {
    stage.value = 'details'
  } else if (route.query.quiz === 'confirmed' && savedResult.value) {
    result.value = savedResult.value
    stage.value = 'details'
  } else {
    stage.value = 'quiz-check'
  }
}

const preBookingServices = SERVICES.filter((s) => s.preBooking)
const savedProfile = computed(() => (savedResult.value ? SKIN_PROFILES[savedResult.value.profile] : null))
const resultProfile = computed(() => (result.value ? SKIN_PROFILES[result.value.profile] : null))
const savedIsStale = computed(() => (savedResult.value ? isQuizResultStale(savedResult.value) : false))
const savedDate = computed(() =>
  savedResult.value
    ? new Date(savedResult.value.takenAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '',
)
const quizHref = computed(() => `/quiz?return=book&service=${service.value?.slug}`)

function useSavedResult() {
  result.value = savedResult.value
  stage.value = 'details'
}

function skipQuiz() {
  result.value = null
  stage.value = 'details'
}

/* ---- Details + handoff ---- */
const fname = ref('')
const email = ref('')
const share = ref(true)
const emailInvalid = ref(false)
const submitting = ref(false)
const sentToNicole = ref(false)

async function sendToNicole(): Promise<boolean> {
  if (!BOOKING_HANDOFF.endpoint || !service.value) return false
  const r = result.value
  const payload: Record<string, string> = {
    ...BOOKING_HANDOFF.extraFields,
    subject: `New booking: ${service.value.name} — ${fname.value.trim() || email.value.trim()}`,
    name: fname.value.trim(),
    email: email.value.trim(),
    service: service.value.name,
    quiz_result: r ? SKIN_PROFILES[r.profile]?.label ?? r.profile : 'Not taken',
    quiz_taken: r ? new Date(r.takenAt).toLocaleDateString('en-US') : '',
  }
  r?.answers.forEach((a) => {
    payload[a.question] = a.answer
  })

  // Never let a slow or failed handoff hold up the booking itself.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 6000)
  try {
    const res = await fetch(BOOKING_HANDOFF.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    return res.ok
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

async function continueToBooking() {
  if (!service.value) return
  if (share.value) {
    const trimmed = email.value.trim()
    if (!trimmed || !trimmed.includes('@')) {
      emailInvalid.value = true
      return
    }
  }
  emailInvalid.value = false
  submitting.value = true
  sentToNicole.value = share.value ? await sendToNicole() : false

  if (service.value.bookingUrl) {
    window.location.assign(withQuizProfileParam(service.value.bookingUrl, result.value?.profile ?? null))
    return
  }
  submitting.value = false
  stage.value = 'not-open'
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <p class="section-label">Booking</p>
        <h1>{{ service ? `Book ${service.name}` : 'Book a session with Nicole' }}</h1>
        <p v-if="service" class="lede">{{ service.cadence }} · {{ service.price }}</p>
      </div>
    </section>

    <section class="container book-body">
      <div v-if="stage === 'pick-service'" class="book-card">
        <h2>Which session would you like to book?</h2>
        <div class="choice-list">
          <NuxtLink
            v-for="s in preBookingServices"
            :key="s.slug"
            :to="`/book?service=${s.slug}`"
            class="choice"
          >
            <span class="choice-name">{{ s.name }}</span>
            <span class="choice-meta">{{ s.cadence }} · {{ s.price }}</span>
          </NuxtLink>
        </div>
        <p class="fineprint">Not sure? <NuxtLink to="/services">Compare services</NuxtLink></p>
      </div>

      <div v-else-if="stage === 'quiz-check'" class="book-card">
        <p class="step">Step 1 of 2 · Your skin quiz</p>

        <template v-if="savedResult && savedProfile && !savedIsStale">
          <h2>We have your <em>{{ savedProfile.label }}</em> result from {{ savedDate }}.</h2>
          <p>Does that still sound like your skin? Nicole will use it to prepare for your session.</p>
          <div class="actions">
            <button type="button" class="btn btn-primary" @click="useSavedResult">Yes, Continue</button>
            <NuxtLink :to="quizHref" class="btn btn-outline">Retake the Quiz</NuxtLink>
          </div>
        </template>

        <template v-else-if="savedResult && savedProfile">
          <h2>Your last quiz result was <em>{{ savedProfile.label }}</em>, from {{ savedDate }}.</h2>
          <p>
            Skin changes with the seasons and your routine, so a quick retake will give Nicole a
            more current picture. It takes about 2 minutes.
          </p>
          <div class="actions">
            <NuxtLink :to="quizHref" class="btn btn-primary">Retake the Quiz</NuxtLink>
            <button type="button" class="btn btn-outline" @click="useSavedResult">Use My Last Result</button>
          </div>
        </template>

        <template v-else>
          <h2>Want to take the skin quiz first?</h2>
          <p>
            It takes about 2 minutes and helps Nicole prepare for your session, so you spend your
            time together on your skin, not on background questions.
          </p>
          <div class="actions">
            <NuxtLink :to="quizHref" class="btn btn-primary">Take the Quiz</NuxtLink>
            <button type="button" class="btn btn-outline" @click="skipQuiz">Skip for Now</button>
          </div>
        </template>
      </div>

      <div v-else-if="stage === 'details'" class="book-card">
        <p class="step">Step 2 of 2 · Before you book</p>
        <h2>Help Nicole prepare</h2>
        <p v-if="resultProfile">
          Your <strong>{{ resultProfile.label }}</strong> result is ready to send.
          <NuxtLink :to="quizHref">Retake the quiz</NuxtLink>
        </p>
        <p v-else>
          No quiz result yet — that's fine. You can still let Nicole know you're booking.
          <NuxtLink :to="quizHref">Take the quiz</NuxtLink>
        </p>

        <label class="share">
          <input v-model="share" type="checkbox" >
          <span v-if="resultProfile">
            Send Nicole my name, email and quiz answers so she can prepare for my session
          </span>
          <span v-else>Send Nicole my name and email so she knows I'm booking</span>
        </label>

        <div v-if="share" class="fields">
          <input v-model="fname" type="text" placeholder="First name" autocomplete="given-name" >
          <input
            v-model="email"
            type="email"
            placeholder="Email address (the one you'll book with)"
            autocomplete="email"
            :class="{ invalid: emailInvalid }"
            @focus="emailInvalid = false"
          >
          <p v-if="emailInvalid" class="field-error">Please enter the email address you'll book with.</p>
        </div>

        <div class="actions">
          <button type="button" class="btn btn-primary" :disabled="submitting" @click="continueToBooking">
            {{ submitting ? 'One moment…' : 'Continue to Booking →' }}
          </button>
        </div>
        <p class="fineprint">
          Your answers are only sent if this box is checked. See our
          <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
        </p>
      </div>

      <div v-else-if="stage === 'not-open'" class="book-card">
        <h2>Online booking is opening soon</h2>
        <p v-if="sentToNicole">
          Nicole has your details{{ fname ? `, ${fname}` : '' }} and will be in touch to schedule
          your session.
        </p>
        <p v-else>
          In the meantime, reach out to Nicole directly and she'll help you find a time.
        </p>
        <div class="actions">
          <NuxtLink to="/contact" class="btn btn-primary">Contact Nicole</NuxtLink>
          <NuxtLink to="/services" class="btn btn-outline">Back to Services</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  background: var(--color-navy);
  padding: 72px 0 56px;
}

.page-hero h1 {
  color: var(--color-white);
  font-size: clamp(30px, 4vw, 42px);
  margin: 10px 0 12px;
}

.lede {
  color: var(--color-periwinkle);
  font-size: 16px;
  font-weight: 300;
}

.book-body {
  padding: 56px 24px 96px;
}

.book-card {
  max-width: 600px;
  margin: 0 auto;
  background: var(--color-white);
  border: 1px solid var(--color-pale-lavender);
  border-radius: 16px;
  padding: 36px 32px;
}

.book-card h2 {
  font-size: 26px;
  margin-bottom: 12px;
}

.book-card h2 em {
  font-style: italic;
  color: var(--color-mid-purple);
}

.book-card p {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 20px;
}

.book-card p a,
.fineprint a {
  color: var(--color-mid-purple);
  text-decoration: underline;
}

.step {
  font-size: 11px !important;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-mute);
  margin-bottom: 10px !important;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.actions .btn:disabled {
  opacity: 0.5;
  cursor: wait;
}

.share {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  margin-bottom: 16px;
}

.share input {
  margin-top: 4px;
  width: 16px;
  height: 16px;
  accent-color: var(--color-mid-purple);
  flex-shrink: 0;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.fields input {
  font-family: var(--font-body);
  font-size: 14px;
  border: 1px solid var(--color-pale-lavender);
  border-radius: 10px;
  padding: 12px 14px;
  width: 100%;
}

.fields input:focus {
  outline: 2px solid var(--color-periwinkle);
  border-color: transparent;
}

.fields input.invalid {
  outline: 2px solid var(--color-mid-purple);
}

.field-error {
  font-size: 13px !important;
  color: var(--color-mid-purple);
  margin: 0 !important;
}

.fineprint {
  font-size: 12px !important;
  color: var(--color-mute);
  margin: 18px 0 0 !important;
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0 4px;
}

.choice {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid var(--color-pale-lavender);
  border-radius: 12px;
  padding: 16px 18px;
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.choice:hover {
  border-color: var(--color-periwinkle);
  transform: translateX(3px);
}

.choice-name {
  font-family: var(--font-display);
  font-size: 19px;
  color: var(--color-navy);
}

.choice-meta {
  font-size: 13px;
  color: var(--color-mid-purple);
}

@media (max-width: 520px) {
  .book-card {
    padding: 28px 20px;
  }
}
</style>
