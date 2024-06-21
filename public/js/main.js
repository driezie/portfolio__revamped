// Check if lenis_enabled is already stored in local storage
const lenisEnabled = localStorage.getItem('lenis_enabled');
if (lenisEnabled === null) {
    document.querySelector('.notification-lenis').style.display = 'block';
}

if (lenisEnabled === 'true') {
    enableScroll();
}

function enableScroll() {
    // Enable lenis scroll
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
        console.log('running');
    }
    requestAnimationFrame(raf);

    // Store lenis_enabled = true in local storage
    localStorage.setItem('lenis_enabled', true);

    // Hide the notification
    document.querySelector('.notification-lenis').style.display = 'none';
}

function ignoreScroll() {
    // Store lenis_enabled = false in local storage
    localStorage.setItem('lenis_enabled', false);

    // Hide the notification
    document.querySelector('.notification-lenis').style.display = 'none';
}


function updateTime() {
  var amsterdamTime = new Date().toLocaleTimeString('en-US', {timeZone: 'Europe/Amsterdam'});
  document.getElementById('amsterdam-time').textContent = "AMSTERDAM TIME: " + amsterdamTime;
}

setInterval(updateTime, 1000); // Update every second

