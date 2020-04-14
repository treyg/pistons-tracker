if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js') //make sure this path is right
    .then((reg) => console.log('sw registered', reg))
    .catch((err) => console.log('sw not registered', err))
}