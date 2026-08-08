// Lab login/register — client-only demo auth (no backend). Users live in
// localStorage['lab_users'] (plaintext — demo only), the session in
// sessionStorage['lab_current_user']. Ported from the legacy main.js with null
// guards so it's inert on pages without the lab markup.

interface LabUser {
  username: string;
  email: string;
  password: string;
  registeredAt?: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const $ = (id: string) => document.getElementById(id);

  const loginForm = $('login-form') as HTMLFormElement | null;
  const registerForm = $('register-form') as HTMLFormElement | null;
  const loginSection = $('login-section');
  const registerSection = $('register-section');
  const labContent = $('lab-content');
  const loginError = $('login-error');
  const registerError = $('register-error');
  const registerLink = $('register-link');
  const loginLink = $('login-link');
  const logoutBtn = $('logout-btn');
  const userLabel = $('lab-user');

  // Nothing to wire up if the lab markup isn't on this page.
  if (!loginForm || !registerForm || !loginSection || !registerSection || !labContent) return;

  const val = (id: string) => ($(id) as HTMLInputElement | null)?.value ?? '';
  const readUsers = (): LabUser[] => {
    try {
      return JSON.parse(localStorage.getItem('lab_users') || '[]');
    } catch {
      return [];
    }
  };

  function showLabContent(username?: string) {
    loginSection!.classList.add('hidden');
    registerSection!.classList.add('hidden');
    labContent!.classList.remove('hidden');
    if (userLabel && username) userLabel.textContent = username;
  }

  function checkAuthStatus() {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem('lab_current_user') || 'null');
      if (currentUser && currentUser.loggedIn) showLabContent(currentUser.username);
    } catch {
      /* ignore malformed session */
    }
  }

  // Toggle login <-> register
  registerLink?.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection!.classList.add('hidden');
    registerSection!.classList.remove('hidden');
  });
  loginLink?.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection!.classList.add('hidden');
    loginSection!.classList.remove('hidden');
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = val('username');
    const password = val('password');
    const user = readUsers().find((u) => u.username === username && u.password === password);

    if (user) {
      sessionStorage.setItem(
        'lab_current_user',
        JSON.stringify({ username: user.username, email: user.email, loggedIn: true }),
      );
      showLabContent(user.username);
      loginForm.reset();
      loginError?.classList.add('hidden');
    } else {
      if (loginError) {
        loginError.textContent = 'Invalid username or password';
        loginError.classList.remove('hidden');
      }
    }
  });

  // Register
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = val('reg-username');
    const email = val('reg-email');
    const password = val('reg-password');
    const confirmPassword = val('reg-confirm-password');

    const fail = (msg: string) => {
      if (registerError) {
        registerError.textContent = msg;
        registerError.classList.remove('hidden');
      }
    };

    if (password !== confirmPassword) return fail('Passwords do not match');

    const users = readUsers();
    if (users.some((u) => u.username === username)) return fail('Username already exists');

    users.push({ username, email, password, registeredAt: new Date().toISOString() });
    localStorage.setItem('lab_users', JSON.stringify(users));

    sessionStorage.setItem(
      'lab_current_user',
      JSON.stringify({ username, email, loggedIn: true }),
    );
    showLabContent(username);
    registerForm.reset();
    registerError?.classList.add('hidden');
  });

  // Logout
  logoutBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('lab_current_user');
    labContent!.classList.add('hidden');
    registerSection!.classList.add('hidden');
    loginSection!.classList.remove('hidden');
  });

  checkAuthStatus();
});
