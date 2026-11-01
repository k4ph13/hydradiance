/* ============================================================
   BOOKING / PAYMENT LINKS
   ------------------------------------------------------------
   Fill in `bookingUrl` once Nicole picks a scheduling/payment
   platform (Practice Better, Acuity, Square Appointments, etc.).
   Paste the direct booking link for that service below.

   Consultation and Transformation Journey go through the /book
   pre-booking step first (quiz check + optional answer handoff to
   Nicole), which then sends the visitor on to `bookingUrl`. Until
   a `bookingUrl` is filled in, /book ends on a "booking opens
   soon" note instead — safe to leave live while the platform is
   being set up.

   Note: Consultation and Transformation Journey are one-time
   paid bookings — most scheduling platforms handle those fine.
   Membership is $47/MONTH, recurring. Not every scheduling
   platform bills recurring subscriptions natively — if Nicole's
   platform doesn't, membership may need its own link instead
   (e.g. a Stripe Payment Link, or that platform's subscription/
   membership product), separate from the one-time booking link.
   Membership skips /book entirely — it's for Journey graduates,
   whom Nicole already knows.
   ============================================================ */

export interface Service {
  slug: string
  name: string
  price: string
  cadence: string
  best: string
  includes: string[]
  featured?: boolean
  /** True when "Book Now" goes through the /book quiz-check step. */
  preBooking: boolean
  bookingUrl: string
}

export const SERVICES: Service[] = [
  {
    slug: 'consultation',
    name: 'The Consultation',
    price: '$97',
    cadence: 'One 45-minute virtual call',
    best: 'Best for a single expert read on your skin, right now.',
    includes: [
      '45-minute virtual consultation',
      'Personalized routine built for your skin',
      'Full coaching packet to keep',
      'Product recommendations',
    ],
    preBooking: true,
    bookingUrl: '',
  },
  {
    slug: 'transformation-journey',
    name: 'The Transformation Journey',
    price: '$297',
    cadence: '12 weeks of guided coaching',
    best: 'Best for lasting change — most skin concerns need consistency, not a single fix.',
    includes: [
      'Foundation call (Week 1)',
      'Check-ins at Weeks 3, 6, and 9',
      'Graduation review (Week 12)',
      '12-week coaching workbook',
      'Full coaching packet + graduation summary',
    ],
    featured: true,
    preBooking: true,
    bookingUrl: '',
  },
  {
    slug: 'membership',
    name: 'Membership',
    price: '$47/mo',
    cadence: 'Ongoing, for Journey graduates',
    best: 'Best for keeping progress on track after the Journey ends.',
    includes: ['Monthly check-in', 'Routine adjustments as your skin changes', 'Seasonal updates'],
    preBooking: false,
    bookingUrl: '', // recurring — see note above, this may differ from the links above
  },
]

export function findService(slug: unknown): Service | undefined {
  return typeof slug === 'string' ? SERVICES.find((s) => s.slug === slug) : undefined
}

/* ============================================================
   QUIZ ANSWER HANDOFF
   ------------------------------------------------------------
   When a visitor books through /book and leaves "share my quiz
   answers" checked, the site POSTs their name, email, service and
   quiz answers as JSON to `endpoint`, so Nicole gets them by email
   before the session and can match them to the booking by email.

   Any form-to-email service that accepts a JSON POST works, e.g.:
     Formspree  — endpoint: 'https://formspree.io/f/XXXXXXXX'
     Web3Forms  — endpoint: 'https://api.web3forms.com/submit',
                  extraFields: { access_key: 'XXXXXXXX' }
   The account should be Nicole's, sending to her inbox.

   Until `endpoint` is filled in, nothing is sent and /book goes
   straight on to booking. A failed send never blocks booking.
   ============================================================ */
export const BOOKING_HANDOFF: { endpoint: string; extraFields: Record<string, string> } = {
  endpoint: '',
  extraFields: {},
}
