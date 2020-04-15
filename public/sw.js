
// const staticCacheName = "site-static-v1";

// const staticCacheName = "site-static-v1";
// const dynamicCache = 'site-dynamic-v1'
// const assets = [
//   "/",
//   "index.html",
//   "stats.html",
//   "nbatoday.html",
//   "podcast.html",
//   "/js/app.js",
//   "/js/dayjs.js",
//   "/js/league.js",
//   "/js/stats.js",
//   "data.json",
//   "/images/oldlogo.png",
//   "css/tailwind.css",
//   "build/tailwind.css",
//   //may need to cache other tailwind file (maybe build?)
// ];

//Cache size limit function
// const limitCacheSize = (name, size) => {
//     caches.open(name).then(cache => {
//         cache.keys().then(keys => {
//             if(keys.length > size) {
//                 cache.delete(keys[0]).then(limitCacheSize(name, size))
//             }
//         })
//     })
// }

//Install service worker
self.addEventListener("install", (evt) => {

  //console.log('sw has been installed')
  // //console.log('sw has been installed')
  // evt.waitUntil(
  //   caches.open(staticCacheName).then((cache) => {
  //     console.log("caching shell assets");
  //     cache.addAll(assets);
  //   })
  // );
});

//activate event .
self.addEventListener("activate", (evt) => {
  // console.log('sw has been activated')
  // evt.waitUntil(
  //   caches.keys().then((keys) => {
  //     //console.log(keys)//
  //     return Promise.all(
  //       keys
  //         .filter((key) => key !== staticCacheName)
  //         .map((key) => caches.delete(key))
  //     );
  //   })
  // );
});

//fetch event
self.addEventListener("fetch", (evt) => {
  // console.log('fetch event', evt)
  // evt.respondWith(
  //   caches.match(evt.request).then((cacheRes) => {
  //     return cacheRes || fetch(evt.request).then(fetchRes => {
  //         return caches.open(dynamicCache).then(cache => {
  //             cache.put(evt.request.url, fetchRes.clone())
  //             limitCacheSize(dynamicCache, 100)
  //             return fetchRes
  //         })
  //     });
  //   })
  // );
});
//
