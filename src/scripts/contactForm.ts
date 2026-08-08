// Contact form handler. No backend — persists messages to localStorage
// (key 'contact_messages'), same as the legacy site, and shows a success note.
// All lookups are null-guarded so the script is inert on pages without the form.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const success = document.getElementById('contact-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const get = (id: string) =>
      (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '';

    const entry = {
      name: get('name'),
      email: get('email'),
      subject: get('subject'),
      message: get('message'),
      timestamp: new Date().toISOString(),
    };

    try {
      const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      messages.push(entry);
      localStorage.setItem('contact_messages', JSON.stringify(messages));
    } catch {
      /* storage unavailable — still show success so the UX doesn't break */
    }

    success?.classList.remove('hidden');
    form.reset();
    setTimeout(() => success?.classList.add('hidden'), 5000);
  });
});
