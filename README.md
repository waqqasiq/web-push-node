# web-push-node
Test project to send web push using node and service worker

Important notes:
* npm init -y
* npm i express
* npm i -g nodemon
* npm i web-push
* To generate the VAPID keys in your terminal, use the command: ./node_modules/.bin/web-push generate-vapid-keys

<br/>

How it works:
* Check if serviceWorker is in navigator of browser
* Registering serviceWorker
* Service worker is registered
* Registering push
* User is prompted to allow showing notifications
* Push registered
* Send push
* Push sent
* Push received
<br/>

Other notes:
* Tested in Google Chrome. Works!
* Web push will be enabled in Safari 16 in macOS 13 or later. And notification permission has to be a user gesture. User needs to click bell icon to sign up for notifications. Then user is prompted to allow notification.
* Store subscription data in Database for sending notification to multiple/all users. Example subscription object: 
```
{
     "endpoint":"https://fcm.googleapis.com/fcm/send/e6v-8iFiuNY:APA91bGYnmJSg8tM0QJYUiTJKhM6N7f6NsbjPYD9eLV0AfOfa7R1cSp_VvzkeuLcU5_YGCuD3xX2vog6xAnb-zif9fQpD_9zQhG5UuyLkY1O3k1FhUooHQRp42Pt_HyH06ltoUBi-duG",
     "expirationTime":null,
     "keys":{
          "p256dh":"BMwtmiN_h2hWN23SpJoJGqdu35NWYLawKi2N1BL0y5jZkT2yJzS7lIRspi7q5cCCM-kwBjmTJ7Fa3g9-7lxz2CQ",
          "auth":"3GWr1BtVA3E4FTBSboYhYw"
     }
}
```

