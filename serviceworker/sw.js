self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received');
    console.log(`[Service Worker] Push had this data: ${event.data.text()}`);

    const title = 'Push Codelab';
    const options = {
        body: 'it works',
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    }

    event.waitUntil(self.registration.showNotification(title, options));
})

// 푸시 알림창 클릭 이벤트
self.addEventListener('notificationclick', function(event){
    console.log('[service worker] notification click received');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('http://www.naver.com')
    )
})