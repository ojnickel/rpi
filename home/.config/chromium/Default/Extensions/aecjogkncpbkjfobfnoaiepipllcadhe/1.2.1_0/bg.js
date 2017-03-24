chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('edit.html', {
    state: "maximized"
  });
});