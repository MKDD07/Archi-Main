// --- 1. Global State & Utilities ---
let allArtworks = [];

function loadSnippet(filePath, containerId, callback) {
    fetch(filePath)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) container.innerHTML = html;
            if (typeof callback === "function") callback();
        })
        .catch(err => console.error(`Error loading ${filePath}:`, err));
}

// --- 2. Portfolio Listing Logic ---
function displayPortfolioListing() {
    const container = document.getElementById('portfolio-container');
    if (!container) return;

    container.innerHTML = '';
    allArtworks.forEach((artwork, index) => {
        const portfolioDiv = document.createElement('div');
        portfolioDiv.className = 'de_large-portfolio text-center mb100';

        const link = document.createElement('a');
        link.className = 'd_inner';
        link.href = `12_single-artist.html?id=${artwork.id}`;

        const title = document.createElement('h2');
        title.className = 'ultra-big wow fadeInUp';
        title.setAttribute('data-wow-delay', '.2s');
        title.textContent = artwork.title.split(' ')[0];

        const imageDiv = document.createElement('div');
        imageDiv.className = 'd_image';

        const img = document.createElement('img');
        img.src = artwork.main_image;
        img.alt = artwork.title;
        img.className = 'img-fluid wow fadeInUp';

        const parentdiv = document.createElement('div');
        parentdiv.className = 'absolute bottom-0 mt-2 mb-4';

        const locationSpan = document.createElement('span');
        locationSpan.className = 'single-word-label';
        locationSpan.textContent = artwork?.location ?? artwork?.project_details?.location ?? 'PROJECT';

        const yearSpan = document.createElement('h3');
        yearSpan.style.fontSize = "36px";
        yearSpan.className = 'year-label mt-4 id-color';
        yearSpan.textContent = artwork?.project_details?.year ?? '';

        imageDiv.appendChild(img);
        imageDiv.appendChild(parentdiv);
        parentdiv.appendChild(yearSpan);
        parentdiv.appendChild(locationSpan);
        link.appendChild(title);
        link.appendChild(imageDiv);
        portfolioDiv.appendChild(link);
        container.appendChild(portfolioDiv);
    });
}

// --- 3. Main Execution ---
document.addEventListener("DOMContentLoaded", function () {

    // A. Load HTML Snippets
    loadSnippet("htm/header.html", "header");
    loadSnippet("htm/snippet_homepage_about.html", "snippet_about");
    loadSnippet("htm/snippet_homepage_timeline.html", "snippet_timeline", function () {
        if (typeof initTimeline === "function") initTimeline();
    });
    loadSnippet("htm/footer.html", "footer");

    // B. Fetch JSON and Build Portfolio + Slider
    fetch("js/json/content_sogani.json")
        .then(response => response.json())
        .then(data => {
            // Store data for Portfolio
            allArtworks = data;
            displayPortfolioListing();

            // Build Slider Data
            const sliderData = data.map(item => ({
                img: item.main_image,
                caption: item.title
            }));

            const sliderList = document.getElementById("slider-list");
            if (sliderList) {
                sliderList.innerHTML = ""; // Clear existing
                sliderData.forEach(item => {
                    const li = document.createElement("li");
                    li.setAttribute("data-transition", "fade");
                    li.setAttribute("data-slotamount", "10");
                    li.setAttribute("data-masterspeed", "1000");
                    li.setAttribute("data-thumb", "");

                    const img = document.createElement("img");
                    img.src = item.img;
                    img.alt = item.caption;
                    img.className = "rev-slidebg";
                    img.setAttribute("data-bgparallax", "0");
                    img.setAttribute("data-bgposition", "center center");
                    img.setAttribute("data-bgfit", "cover");
                    img.setAttribute("data-bgrepeat", "no-repeat");

                    const div = document.createElement("div");
                    div.className = "tp-caption ultra-big-white text-white text-center";
                    div.setAttribute("data-x", "center");
                    div.setAttribute("data-y", "center");
                    div.setAttribute("data-voffset", "0");
                    div.setAttribute("data-width", "full");
                    div.setAttribute("data-whitespace", "wrap");
                    div.setAttribute("data-customin", "x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;");
                    div.setAttribute("data-customout", "x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.85;scaleY:0.85;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;");
                    div.setAttribute("data-speed", "1000");
                    div.setAttribute("data-start", "1000");
                    div.setAttribute("data-easing", "easeInOutExpo");
                    div.setAttribute("data-splitin", "none");
                    div.setAttribute("data-splitout", "none");
                    div.setAttribute("data-elementdelay", "0.1");
                    div.setAttribute("data-endelementdelay", "0.1");
                    div.textContent = item.caption;

                    li.appendChild(img);
                    li.appendChild(div);
                    sliderList.appendChild(li);
                });

                // C. Initialize Revolution Slider AFTER slides are added
                if (jQuery("#slider-revolution").length > 0) {
                    jQuery("#slider-revolution").revolution({
                        sliderType: "standard",
                        sliderLayout: "fullscreen", // Keeping your original 'fullscreen' layout
                        delay: 5000,
                        navigation: {
                            arrows: { enable: true },
                            bullets: { enable: false, style: "hermes" }
                        },
                        parallax: {
                            type: "mouse",
                            origo: "slidercenter",
                            speed: 2000,
                            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
                        },
                        spinner: "off",
                        gridwidth: 1140,
                        gridheight: 700,
                        disableProgressBar: "on",
                    });
                }
            }
        })
        .catch(err => console.error("Error loading JSON data:", err));
});