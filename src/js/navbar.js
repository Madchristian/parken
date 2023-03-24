// navbar.js

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
    }
    
    function navigateTo(page) {
    // navigiere zur angegebenen Seite
    console.log('Navigating, ${page}');
    }
    
    document.getElementById('menuButton').addEventListener('click', toggleMenu);
    
    document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', event => {
    event.preventDefault();
    toggleMenu();
    navigateTo(link.getAttribute('href'));
    });
    });