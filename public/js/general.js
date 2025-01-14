var modal = document.getElementById("myModal");
var btn_logins = document.getElementsByClassName("loginBtn");
var span = document.getElementsByClassName("close")[0];
var navbarToggle = document.getElementById('navbar-toggle');
var mobileMenu = document.getElementById('mobile-menu');

for (var i = 0; i < btn_logins.length; i++) {
    btn_logins[i].onclick = function () {
        try {
            modal.style.display = "block";
        } catch { }
    };
}

navbarToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

try {
    span.onclick = function () {
        modal.style.display = "none";
    }
} catch (error) { }

try {
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
} catch (error) { }

AOS.init({
    // once: true
});