
const publicVapidKey = 'BGPdQUWV3ltYn1jog81Rox0SKIb0FhJH7Vkr1vVO-y83fk4J2wMvTah6dEDB3WSRvwjp-6Wc19tfnWfUAorOO3k';

if ("serviceWorker" in navigator) {
    console.log('serviceWorker is in navigator');
    registerSW().catch(err => console.error(err));
}

// 
async function registerSW() {
    //
    navigator.serviceWorker.register('worker.js', { scope: "/" })
        .then(
            function (reg) {
                var serviceWorker;
                if (reg.installing) {
                    serviceWorker = reg.installing;
                    // console.log('Service worker installing');
                } else if (reg.waiting) {
                    serviceWorker = reg.waiting;
                    // console.log('Service worker installed & waiting');
                } else if (reg.active) {
                    serviceWorker = reg.active;
                    // console.log('Service worker active');
                }

                if (serviceWorker) {
                    console.log("sw current state", serviceWorker.state);
                    if (serviceWorker.state == "activated") {
                        //If push subscription wasnt done yet have to do here
                        console.log("sw already activated - Do watever needed here");
                    }
                    serviceWorker.addEventListener("statechange", function (e) {
                        console.log("sw statechange : ", e.target.state);
                        if (e.target.state == "activated") {
                            // use pushManger for subscribing here.
                            console.log("Just now activated. now we can subscribe for push notification")
                            subscribeForPushNotification(reg);
                        }
                    });
                }
            },
            function (err) {
                console.error('unsuccessful registration with ', 'worker.js', err);
            }
        );
    //

}

async function subscribeForPushNotification(register) {

    let serverPublicVapidKey = 'BGPdQUWV3ltYn1jog81Rox0SKIb0FhJH7Vkr1vVO-y83fk4J2wMvTah6dEDB3WSRvwjp-6Wc19tfnWfUAorOO3k';

    let subscriptionOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(serverPublicVapidKey)
    }

    const subscription = await register.pushManager.subscribe(subscriptionOptions);
    console.log('push registered');

    // send push notif
    console.log('Sending push...');
    
    await fetch('/subscribe', {
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