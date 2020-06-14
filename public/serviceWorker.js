self.addEventListener('push', event => {
  const title = 'Got a notification';
  const options = {
    body: event.data.text()
  };

  self.registration.showNotification(title, options).then(r => console.log(r));
});