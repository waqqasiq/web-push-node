const publicVapidKey = 'BGPdQUWV3ltYn1jog81Rox0SKIb0FhJH7Vkr1vVO-y83fk4J2wMvTah6dEDB3WSRvwjp-6Wc19tfnWfUAorOO3k';

if ("serviceWorker" in navigator) {
    console.log('serviceWorker is in navigator');
    send().catch(err => console.error(err));
}

async function send() {
    console.log('registering service worker');
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    })
    console.log('service worker registered');

    //register push
    console.log('registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('push registered');

    const title = "HelloWorld"

    // send push notif
    console.log('Sending push...');
    await fetch('/subscribe?title='+title, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log('push sent');
}

// Web-Push
// Public base64 to Uint
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}