import type { ContactFormSchema } from '@/lib/validation'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

// Web3Forms access key. This key only authorizes inbound form submissions to
// the configured destination inbox — it is safe to ship in client-side code,
// which is how Web3Forms is designed to be used (no server component required).
const WEB3FORMS_ACCESS_KEY = '0fd46ce9-1895-44f7-aca5-846abd53e20d'

export class ContactSubmissionError extends Error {}

/**
 * Submits the contact form to Web3Forms.
 * Throws a ContactSubmissionError on network failure or when Web3Forms
 * reports the submission as unsuccessful.
 */
export async function submitContactForm(data: ContactFormSchema): Promise<void> {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New project inquiry from ${data.name} — BTech website`,
    from_name: 'BTech Website',
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || 'Not provided',
    service: data.service,
    budget: data.budget,
    message: data.message,
  }

  let response: Response
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ContactSubmissionError('Network error while submitting the contact form.')
  }

  let result: { success?: boolean; message?: string } | null = null
  try {
    result = await response.json()
  } catch {
    // Ignore malformed JSON — handled by the !response.ok / !result.success checks below.
  }

  if (!response.ok || !result?.success) {
    throw new ContactSubmissionError(result?.message ?? 'Web3Forms submission failed.')
  }
}
