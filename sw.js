// sw.js
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.activateAll));

self.addEventListener('push', e => {
  if (!e.data) return;

  const data = e.data.json();

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/001.png',
      badge: '/001.png',
      tag: 'riego-diario',       // reemplaza notificaciones anteriores del mismo tag
      renotify: false,
      data: { url: self.location.origin }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === e.notification.data.url && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow)
        return clients.openWindow(e.notification.data.url);
    })
  );
});
