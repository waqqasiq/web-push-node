require('dotenv').config();
const express = require('express');
const app = express();
const webpush = require('web-push');
const bodyparser = require('body-parser');
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privatVapideKey = process.env.VAPID_PRIVATE_KEY;
const PORT = process.env.PORT;

webpush.setVapidDetails(
    "mailto:mdwaqqasiqbal@gmail.com",
    publicVapidKey,
    privatVapideKey
)

app.use(bodyparser.json());
app.use(express.static(__dirname + '/client'));

// api endpoint
app.post('/subscribe', (req, res) => {

    console.log('/subscribe START');
    const subscription = req.body;
    console.log('req.body ', subscription);

    // console.log('req.query ', req.query);
    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Notification" });

    // pass obj in sendNotification
    webpush
        .sendNotification(subscription, payload)
        .then((res) =>{console.log('res ', res)})
        .catch(err => console.log('err ', err));

})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/* store /subscribe req.body object in db for sending future notification to all users
    req.body  {
        endpoint: 'https://fcm.googleapis.com/fcm/send/e6v-8iFiuNY:APA91bGYnmJSg8tM0QJYUiTJKhM6N7f6NsbjPYD9eLV0AfOfa7R1cSp_VvzkeuLcU5_YGCuD3xX2vog6xAnb-zif9fQpD_9zQhG5UuyLkY1O3k1FhUooHQRp42Pt_HyH06ltoUBi-duG',
        expirationTime: null,
        keys: {
            p256dh: 'BMwtmiN_h2hWN23SpJoJGqdu35NWYLawKi2N1BL0y5jZkT2yJzS7lIRspi7q5cCCM-kwBjmTJ7Fa3g9-7lxz2CQ',
            auth: '3GWr1BtVA3E4FTBSboYhYw'
        }
    }
*/