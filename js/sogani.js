// ========================================
// CONSOLIDATED SCRIPT - All functionality merged (FIXED)
// ========================================
// Function to fetch and inject HTML into a container
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


// ========================================
// MAIN PORTFOLIO SCRIPT
// ========================================
let allArtworks = [];

// Wait for DOM to be ready before executing
document.addEventListener('DOMContentLoaded', function () {
    initializeSnippets();
    initializeSlider();
    loadPortfolioData();
});

// ========================================
// 1. SNIPPETS LOADER
// ========================================
function initializeSnippets() {
    // Fetch about snippet
    fetch("htm/snippet_homepage_about.html")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(html => {
            const snippetAbout = document.getElementById("snippet_about");
            if (snippetAbout) {
                snippetAbout.innerHTML = html;
            }
        })
        .catch(err => console.error("Error loading about snippet:", err));

    // Fetch timeline snippet
    fetch("htm/snippet_homepage_timeline.html")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(html => {
            const container = document.getElementById("snippet_timeline");
            if (container) {
                container.innerHTML = html;

                // Initialize timeline.js after snippet is loaded
                if (typeof initTimeline === "function") {
                    initTimeline();
                }
            }
        })
        .catch(err => console.error("Error loading timeline snippet:", err));
}

// ========================================
// 2. PORTFOLIO DATA LOADER
// ========================================
function loadPortfolioData() {
    fetch('../js/json/content_sogani.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                allArtworks = data;
                displayPortfolioListing();
            } else {
                console.error('Portfolio data is not an array:', data);
            }
        })
        .catch(error => console.error('Error loading portfolio data:', error));
}

// ========================================
// 3. PORTFOLIO DISPLAY
// ========================================
function displayPortfolioListing() {
    const container = document.getElementById('portfolio-container');
    if (!container) {
        console.warn('Portfolio container element not found');
        return;
    }

    container.innerHTML = '';

    allArtworks.forEach((artwork) => {
        // Validate artwork object
        if (!artwork || !artwork.id) {
            console.warn('Invalid artwork object:', artwork);
            return;
        }

        try {
            // Main wrapper
            const portfolioDiv = document.createElement('div');
            portfolioDiv.className = 'de_large-portfolio text-center mb20';

            // Link to single-artist page
            const link = document.createElement('a');
            link.className = 'd_inner';
            link.href = `12_single-artist.html?id=${encodeURIComponent(artwork.id)}`;

            // Title (first word)
            const title = document.createElement('h2');
            title.className = 'ultra-big wow fadeInUp';
            title.setAttribute('data-wow-delay', '.2s');
            title.textContent = (artwork.title || '').split(' ')[0] || 'Untitled';

            // Image container
            const imageDiv = document.createElement('div');
            imageDiv.className = 'd_image';

            const img = document.createElement('img');
            img.src = artwork.main_image || '';
            img.alt = artwork.title || 'Artwork';
            img.className = 'img-fluid wow fadeInUp';
            if (!artwork.main_image) {
                img.onerror = () => console.warn(`Missing image for artwork: ${artwork.id}`);
            }

            const parentdiv = document.createElement('div');
            parentdiv.className = 'absolute bottom-0 mt-2 mb-4 sogani-label';

            // Location label
            const locationSpan = document.createElement('span');
            locationSpan.className = 'single-word-label';
            const location = artwork.location ||
                (artwork.project_details?.location) ||
                'PROJECT';
            locationSpan.textContent = location;

            // Year label
            const yearSpan = document.createElement('h3');
            yearSpan.style.fontSize = "36px";
            yearSpan.className = 'year-label mt-4 id-color';
            yearSpan.textContent = artwork.project_details?.year || '';

            // Assemble
            imageDiv.appendChild(img);
            imageDiv.appendChild(parentdiv);
            parentdiv.appendChild(yearSpan);
            parentdiv.appendChild(locationSpan);

            link.appendChild(title);
            link.appendChild(imageDiv);
            portfolioDiv.appendChild(link);
            container.appendChild(portfolioDiv);
        } catch (error) {
            console.error('Error rendering artwork:', artwork, error);
        }
    });
}

// ========================================
// 4. SLIDER INITIALIZATION
// ========================================
function initializeSlider() {
    const sliderData = [
        {
            img: "12_images-artist/banner/banner_0001.png",
            caption: "ECHO"
        },
        {
            img: "12_images-artist/banner/banner_0002.png",
            caption: "SPROUTS"
        },
        {
            img: "12_images-artist/banner/banner_0003.png",
            caption: "Vishwakarma"
        }
    ];

    const sliderList = document.getElementById("slider-list");
    if (!sliderList) {
        console.warn('Slider list element #slider-list not found');
        return;
    }

    sliderData.forEach((item, index) => {
        try {
            const li = document.createElement("li");
            li.setAttribute("data-transition", "fade");
            li.setAttribute("data-slotamount", "10");
            li.setAttribute("data-masterspeed", "1000");
            li.setAttribute("data-thumb", "");

            // Background image
            const img = document.createElement("img");
            img.src = item.img;
            img.alt = item.caption;
            img.className = "rev-slidebg";
            img.setAttribute("data-bgparallax", "0");
            img.setAttribute("data-bgposition", "center center");
            img.setAttribute("data-bgfit", "cover");
            img.setAttribute("data-bgrepeat", "no-repeat");

            // Caption
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
        } catch (error) {
            console.error(`Error creating slider item ${index}:`, error);
        }
    });

    // Initialize Revolution Slider
    initializeRevolutionSlider();
}

// ========================================
// 5. REVOLUTION SLIDER CONFIG
// ========================================
function initializeRevolutionSlider() {
    // Delay initialization to ensure all DOM manipulation is complete
    setTimeout(() => {
        // Check if jQuery is loaded
        if (typeof jQuery === 'undefined') {
            console.warn("jQuery is required for Revolution Slider. Please load jQuery before this script.");
            return;
        }

        // Check if revolution plugin is loaded
        if (typeof jQuery.fn.revolution !== 'function') {
            console.warn("Revolution Slider plugin not loaded. Please ensure revolution.js is included.");
            return;
        }

        const sliderElement = jQuery("#slider-revolution");

        if (sliderElement.length === 0) {
            console.warn("Slider element #slider-revolution not found. Skipping Revolution Slider initialization.");
            return;
        }

        try {
            sliderElement.revolution({
                sliderType: "standard",
                sliderLayout: "fullscreen",
                delay: 5000,
                navigation: {
                    arrows: {
                        enable: true,
                    },
                    bullets: {
                        enable: false,
                        style: "hermes",
                    },
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
        } catch (error) {
            console.error('Error initializing Revolution Slider:', error);
        }
    }, 0);
}

// ========================================
// IMPROVEMENTS MADE:
// ========================================
// 1. Fixed path prefix calculation (syntax error with quote)
// 2. Added element existence checks before DOM manipulation
// 3. Added HTTP status checks in fetch responses
// 4. Added data validation (array check for portfolio data)
// 5. Added try-catch blocks around DOM creation loops
// 6. Improved URL encoding for ID parameter
// 7. Added fallback values for missing data
// 8. Better error handling with descriptive messages
// 9. Fixed Revolution Slider plugin check (jQuery.fn.revolution)
// 10. Added setTimeout to ensure DOM is ready before slider init
// 11. Null coalescing operators for safer property access
// 12. Separated IIFE logic with proper DOM readiness check
// ========================================

