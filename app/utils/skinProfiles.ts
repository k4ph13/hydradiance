/* ============================================================
   SHARED QUIZ-RESULT METADATA
   ------------------------------------------------------------
   Lets the quiz result carry its profile forward onto /services
   and /shop (so a "Dry & Dehydrated" result lands on a page that
   already knows that, instead of making the visitor start over).

   `suggestedService` is a starting heuristic — shorter-timeline
   profiles default to the single Consultation, longer-timeline
   ones to the 12-week Transformation Journey. Nicole should sanity
   check / override these once she's seen real quiz traffic.

   `recommendedRoutineUrl` is empty until Nicole maps specific Pomp
   routines/products to each skin type — until then /shop just shows
   its existing general routines, same as it does today.
   ============================================================ */

export type ServiceSlug = 'consultation' | 'transformation-journey'

export interface SkinProfileMeta {
  label: string
  suggestedService: ServiceSlug
  recommendedRoutineUrl: string
}

export const SKIN_PROFILES: Record<string, SkinProfileMeta> = {
  dry: { label: 'Dry & Dehydrated', suggestedService: 'consultation', recommendedRoutineUrl: '' },
  oily: { label: 'Oily & Congested', suggestedService: 'consultation', recommendedRoutineUrl: '' },
  sensitive: { label: 'Sensitive', suggestedService: 'consultation', recommendedRoutineUrl: '' },
  acne: { label: 'Acne-Prone', suggestedService: 'transformation-journey', recommendedRoutineUrl: '' },
  pigment: { label: 'Hyperpigmentation', suggestedService: 'transformation-journey', recommendedRoutineUrl: '' },
  aging: { label: 'Fine Lines & Firmness', suggestedService: 'transformation-journey', recommendedRoutineUrl: '' },
  rosacea: { label: 'Rosacea & Reactive', suggestedService: 'transformation-journey', recommendedRoutineUrl: '' },
}

const STORAGE_KEY = 'skinfluent_quiz_profile'

/** Called when the quiz produces a result, so /services or /shop can still
 *  recognize the visitor if they arrive later via the nav rather than a
 *  direct CTA click. Browser-only; wrapped since localStorage can throw or
 *  be unavailable (private browsing, blocked site data). */
export function rememberQuizProfile(slug: string) {
  try {
    localStorage.setItem(STORAGE_KEY, slug)
  } catch {
    // Not persisted — query-param CTAs from the result page still work.
  }
}

export function recallQuizProfile(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/** Appends the quiz profile to an external booking URL as a plain query
 *  param. Whether the booking platform actually surfaces it to Nicole
 *  depends on what she picks — some platforms map query params straight
 *  into a custom intake field, others ignore unknown params outright. */
export function withQuizProfileParam(url: string, slug: string | null): string {
  if (!url || !slug) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}quiz_profile=${encodeURIComponent(slug)}`
}
