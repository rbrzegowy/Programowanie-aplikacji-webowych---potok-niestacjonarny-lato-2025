document.addEventListener('DOMContentLoaded', appStart)
let pwaInstallEvent
let showInstallPwaButton = false

// niestety nie zadziała w Safari
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstall event', e)
    showInstallPwaButton = true
    // blokujemy i zapamiętujemy żeby pokazać później, np. kliknięciu w przycisk zachęty na stronie
    // e.preventDefault();
    pwaInstallEvent = e;

});

function appStart() {
    initalizieInstallPwaBtn()
    registerServiceWorker()
    watchNetworkStatus()
}

function initalizieInstallPwaBtn() {
    if (showInstallPwaButton) {
        document.querySelector('#install-pwa').classList.add('visible')
    }
    document.querySelector('#install-pwa').addEventListener('click', installPWA)
}

function installPWA() {
    pwaInstallEvent.prompt()
}

function registerServiceWorker() {
    // Zarejestruj ServiceWorker (zwraca Promise)
    navigator.serviceWorker
        .register('service-worker-thread.js')
        .then((registration) => {
            // reg.scope - zasięg działania SW
            console.log('[SW] Register', registration)
            // registration.sync.register('event test: qwerty') //qwerty to event.tag
        })
        .catch((err) => console.log(err))
}
function watchNetworkStatus() {
    const statusContainer = document.querySelector('#net-status')
    setInterval(
        () => {
            const status = navigator.onLine ? '<span id="status-online">Online</span>' : '<span id="status-offline">Offline!</span>'
            statusContainer.innerHTML = 'Stan sieci: ' + status
        }
        , 1000)
}