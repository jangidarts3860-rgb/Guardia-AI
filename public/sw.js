// Basic Service Worker to satisfy PWA requirements for the "Add to Home Screen" prompt.
self.addEventListener('fetch', function(event) {
  // We can add offline caching later.
  // For now, doing nothing is enough to trigger PWA install prompt.
});
