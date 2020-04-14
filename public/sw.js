//Install service worker
self.addEventListener('install', evt => {
    console.log('sw has been installed')
})

//activate event . 
self.addEventListener('activate', evt => {
    console.log('sw has been activated')
})

//fetch event
self.addEventListener('fetch', evt => {
   // console.log('fetch event', evt)
})