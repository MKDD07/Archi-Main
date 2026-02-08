// Load timeline data and render
fetch('js/json/work_sogani.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('timeline-container');
        let html = '';

        data.forEach(item => {
            html += `
                <div class="tl-block wow fadeInUp" data-wow-delay="${item.delay}">
                    <div class="tl-time text-center">
                        <h4>${item.year}</h4>
                    </div>
                    <div class="tl-bar">
                        <div class="tl-line"></div>
                    </div>
                    <div class="tl-message">
                        <div class="tl-icon">&nbsp;</div>
                        <div class="tl-main">
                            <h4 class="id-color">${item.title}</h4>
                           <p class="d-md-block d-none"> ${item.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Initialize WOW.js if available
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    })
    .catch(error => console.error('Error loading timeline:', error));