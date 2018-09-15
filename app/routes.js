module.exports = function(app, passport) {	

    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {     
        successRedirect : '/dashboard',
        failureRedirect : '/signup', // Jika gagal
        failureFlash : true
    }));    

    // =====================================
    // DASHBOARD SECTION =====================
    // =====================================
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.ejs', {
            user : req.user // ambil user session
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// Jika user sudah login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}