document.addEventListener("DOMContentLoaded", function () {
    var lines = document.querySelectorAll(".line");

    window.addEventListener("scroll", function () {
        lines.forEach(function (line, index) {
            var triggerPosition = line.getBoundingClientRect().top;

            if (triggerPosition < window.innerHeight * 0.75) {
                line.classList.add("show");
            }
        });
    });
});
