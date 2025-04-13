// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
  
    // Check for saved theme preference or use system preference
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      document.body.setAttribute('data-theme', currentTheme);
      
      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    } else {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
        localStorage.setItem('theme', 'dark');
      }
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