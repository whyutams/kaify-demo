const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();

app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for testing
}));
app.set('view engine', 'ejs'); // Set EJS sebagai view engine
app.set('views', path.join(__dirname, 'public', 'views')); // folder views untuk file EJS
app.use(express.static(path.join(__dirname, 'public'))); // Middleware untuk mengakses file statis di folder 'public'
app.use(express.urlencoded({ extended: true })); // Allow JSON
app.use(express.json());

let main_data = {
    projects: [
        {
            name: "Dexafy",
            desc: "Situs web untuk mencari data dari berbagai sumber dengan teknik Web Scraping",
            icon: {
                src: "https://dexafyx.web.app/assets/media/icon-3.png",
                alt: "Dexafy"
            },
            base_url: "https://dexafyx.web.app"
        },
    ]
}

main_data.projects.map(x => {
    app.get(`/${x.name.toLowerCase()}`, (req, res) => {
        res.redirect(x.base_url);
    });
});

app.get('/', (req, res) => {
    if (req.session.username) {
        res.render('admin', { session: req.session });
        return;
    }

    res.render('index', {
        projects: main_data.projects
    });

});

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
