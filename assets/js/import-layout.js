function importHTML(id, url) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

document.addEventListener("DOMContentLoaded", function() {
  importHTML("import-header", "../components/header-index.html");
  importHTML("import-footer", "../components/footer-index.html");

  setTimeout(function() {
    var path = window.location.pathname.split("/").pop();
    if (!path || path === "" || path === "index.html") path = "index.html";
    document.querySelectorAll('.nav-link').forEach(function(link) {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, 100); // Đợi header được import xong
});