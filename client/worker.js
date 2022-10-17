console.log('service worker loaded');

self.addEventListener("push", e => {

    const data = e.data.json();
    console.log('push received');
    console.log('data ', data);

    self.registration.showNotification(data.title, {
        body: 'Test notification',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
    });
})