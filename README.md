# web-push-node
Test project to send web push using node and service worker

Important notes:
* npm init -y
* npm i express
* npm i -g nodemon
* npm i web-push
* To generate the VAPID keys in your terminal, use the command: ./node_modules/.bin/web-push generate-vapid-keys

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

### Only works in chrome so far

### Web push will be enabled in Safari 16 in macOS 13 or later. And notification permission has to be a user gesture. User needs to click bell icon to sign up for notifications. Then user is prompted to allow notification.
