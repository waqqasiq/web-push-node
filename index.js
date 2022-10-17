const express = require('express');
const app = express();
const webpush = require('web-push');
const bodyparser = require('body-parser');
const path = require('path');

const publicVapidKey = 'BGPdQUWV3ltYn1jog81Rox0SKIb0FhJH7Vkr1vVO-y83fk4J2wMvTah6dEDB3WSRvwjp-6Wc19tfnWfUAorOO3k';
const privatVapideKey = 'VBTIsrV4GYS_ElDdTPcYgcKvSGhHgSoeJY67aAuIuA4';

webpush.setVapidDetails(
    "mailto:mdwaqqasiqbal@gmail.com",
    publicVapidKey,
    privatVapideKey
)

app.use(bodyparser.json());
app.use(express.static(__dirname + '/client'));


app.post('/subscribe', (req, res) => {

    console.log('/subscribe START');
    const subscription = req.body;
    console.log('req.body ', subscription);
    // console.log('req.query ', req.query);

    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Notification"});

    // pass obj in sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.log('err ', err));

})


const port = 3022;

app.listen(port, () => console.log(`Server started on port ${port}`));