// Contact form handler.
//
// Primary path: POST the submission to Web3Forms (https://web3forms.com) — a
// free, no-backend form-to-email relay — which emails it to the address the
// access key below is registered to (jebakumarn@gmail.com). A local copy is also
// kept in localStorage['contact_messages'] as a best-effort backup.
// All lookups are null-guarded so the script is inert on pages without the form.

// ── CONFIG ───────────────────────────────────────────────────────────────────
// Get a FREE access key at https://web3forms.com — enter jebakumarn@gmail.com and
// the key is emailed to you; paste it here. Submissions are then delivered to
// that inbox. The key is safe to expose publicly: it can only send to the one
// registered email address.
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
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

    // Honeypot: a real user never sees/ticks this. If ticked, drop silently.
    const botField = document.getElementById('botcheck') as HTMLInputElement | null;
    if (botField?.checked) {
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
      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
        throw new Error('Email relay not configured');
      }
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact: ${subject}`,
          from_name: name,
          replyto: email,
          name,
          email,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

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
