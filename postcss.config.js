module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: [
                'public/index.html',
                'public/nbatoday.html',
                'public/podcast.html',
                'public/stats.html',
                'public/js/app.js',
                'public/js/league.js',
                'public/js/stats.js',

            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
    ]
}