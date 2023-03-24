// spinner.js

export function showSpinner() {
    const spinner = document.createElement('div');
    spinner.id = 'spinner';
    spinner.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    document.body.appendChild(spinner);
    }
    
    export function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
    spinner.remove();
    }
    }