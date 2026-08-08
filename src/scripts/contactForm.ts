// Contact form handler.
//
// Primary path: POST the submission to FormSubmit.co (https://formsubmit.co) — a
// free, no-signup form-to-email relay — which emails it to the destination below
// and CCs the sender (the email they typed) so they get a copy too. A local copy
// is also kept in localStorage['contact_messages'] as a best-effort backup.
// All lookups are null-guarded so the script is inert on pages without the form.
//
// ONE-TIME ACTIVATION: the very first submission makes FormSubmit send a
// "Confirm your email" message to the destination inbox — click that link once
// and every submission after it is delivered automatically.

// ── CONFIG ───────────────────────────────────────────────────────────────────
// Destination inbox. FormSubmit's AJAX endpoint is /ajax/<email>. For privacy
// (so the raw address isn't in the page source), after the one-time activation
// you can replace the email here with the random alias FormSubmit assigns you,
// e.g. 'https://formsubmit.co/ajax/abcdef0123456789...'.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/jebakumarn@gmail.com';
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const success = document.getElementById('contact-success');
  const errorBox = document.getElementById('contact-error');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;

  const get = (id: string) =>
    (
      document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null
    )?.value.trim() ?? '';

  const showError = (msg: string) => {
    if (!errorBox) return;
    errorBox.textContent = '✖ ' + msg;
    errorBox.classList.remove('hidden');
  };
  const clearAlerts = () => {
    success?.classList.add('hidden');
    errorBox?.classList.add('hidden');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlerts();

    const name = get('name');
    const email = get('email');
    const subject = get('subject');
    const message = get('message');

    // ── Validation ──────────────────────────────────────────────────────────
    if (!name || !email || !subject || !message) {
      showError('Please fill in name, email, subject and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    const entry = { name, email, subject, message, timestamp: new Date().toISOString() };

    // Best-effort local backup (unchanged legacy behavior).
    try {
      const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      messages.push(entry);
      localStorage.setItem('contact_messages', JSON.stringify(messages));
    } catch {
      /* storage unavailable — ignore */
    }

    // Honeypot: a real user never sees/fills this. If filled, drop silently.
    const honey = document.getElementById('_honey') as HTMLInputElement | null;
    if (honey?.value) {
      success?.classList.remove('hidden');
      form.reset();
      return;
    }

    const originalLabel = submitBtn?.textContent ?? '[ send ]';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '[ sending... ]';
    }

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email, // FormSubmit uses this as the Reply-To
          subject,
          message,
          _cc: email, // CC the sender so they get a copy
          _subject: `Portfolio contact: ${subject}`,
          _template: 'table',
          _captcha: 'false', // required for AJAX to return JSON
        }),
      });
      const data = await res.json().catch(() => ({}) as Record<string, unknown>);
      const ok =
        res.ok && String((data as { success?: unknown }).success).toLowerCase() !== 'false';
      if (!ok) throw new Error(`HTTP ${res.status}`);

      success?.classList.remove('hidden');
      form.reset();
      setTimeout(() => success?.classList.add('hidden'), 6000);
    } catch {
      showError(
        "Couldn't send right now — please email jebakumarn@gmail.com directly, or try again shortly.",
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }
  });
});
