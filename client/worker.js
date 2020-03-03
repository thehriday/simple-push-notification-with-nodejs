self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "http://adda-golpo.herokuapp.com/photos/logo.png",
    data: {
      link: data.link
    }
  });
});

self.addEventListener("notificationclick", function(e) {
  var notification = e.notification;
  var action = e.action;

  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow(notification.data.link);
    notification.close();
  }
});
