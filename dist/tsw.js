self.addEventListener('install', function(event)
 {
    event.waitUntil(
        caches.open('gettickets-static-v7').then(function(cache){
            return cache.addAll([
                'tskeleton.html',
        'css/materialize.min.css',
        'css/style.css',
        'js/jquery.js',
        'js/tscripts.js',
        'js/materialize.min.js'
    ]);
        })
    );
});

self.addEventListener("offline", function(e) { console.log("offline"); });
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // try to return untouched request from network first
    fetch(event.request.url).catch(function() {
      // if it fails, try to return request from the cache
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        // if not found in cache, return default offline content
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('tskeleton.html');
        }
      })
    })
  );
});