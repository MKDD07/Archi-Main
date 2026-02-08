function loadSnippet(filePath, containerId, callback) {
    fetch(filePath)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(containerId);
            container.innerHTML = html;

            if (typeof callback === "function") {
                callback(); // optional function after snippet loaded
            }
        })
        .catch(err => console.error(`Error loading ${filePath}:`, err));
}

// Load all snippets

loadSnippet("../htm/header.html", "header");

loadSnippet("../htm/snippet_homepage_about.html", "snippet_about");
loadSnippet("../htm/snippet_homepage_timeline.html", "snippet_timeline", function () {
    if (typeof initTimeline === "function") initTimeline();
});
loadSnippet("../htm/footer.html", "footer");

