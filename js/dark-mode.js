// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
  
    // Apply a saved preference, or a dark system preference. With no saved
    // preference we keep the page's dark-first default (set in the HTML).
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.body.setAttribute('data-theme', currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }

    // Sync the toggle to whichever theme is actually active
    const activeTheme = document.body.getAttribute('data-theme') || 'dark';
    if (toggleSwitch) {
      toggleSwitch.checked = (activeTheme === 'dark');
    }
  
    // Function to switch theme
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }    
    }
  
    // Event listener for theme switch
    toggleSwitch.addEventListener('change', switchTheme, false);
  });