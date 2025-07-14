// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    let searchData = [];

    // Fetch search data
    fetch('search-data.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        })
        .catch(error => console.error('Error fetching search data:', error));

    // Toggle search bar
    searchButton.addEventListener('click', (event) => {
        event.stopPropagation();
        searchBar.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    // Hide search bar when clicking outside
    document.addEventListener('click', (event) => {
        if (searchContainer && !searchContainer.contains(event.target)) {
            searchBar.classList.add('hidden');
        }
    });

    // Perform search
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );

        displayResults(results);
    });

    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="p-2 text-gray-500">No results found.</div>';
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="block p-2 hover:bg-gray-100 rounded-md">
                <div class="font-bold text-mainblue">${result.title}</div>
                <div class="text-sm text-gray-600">${result.content}</div>
            </a>
        `).join('');
    }

    // Hide search bar on result click
    searchResults.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            searchBar.classList.add('hidden');
        }
    });

    // Feedback form logic
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        const feedbackType = document.getElementById('feedback-type');
        const fileUploadContainer = document.getElementById('file-upload-container');

        feedbackType.addEventListener('change', () => {
            if (feedbackType.value === 'fraud') {
                fileUploadContainer.classList.remove('hidden');
            } else {
                fileUploadContainer.classList.add('hidden');
            }
        });
    }

    /* ---------------------------
       Mobile Navigation Logic
    ----------------------------*/
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');

    if (mobileMenuBtn && mobileNav) {
        const openMobileNav = () => {
            mobileNav.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        };
        const closeMobileNav = () => {
            mobileNav.classList.add('translate-x-full');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openMobileNav);
        if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

        // Close when clicking outside drawer area
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) closeMobileNav();
        });

        // Submenu accordion
        const subToggles = mobileNav.querySelectorAll('.mobile-sub-toggle');
        subToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const sublist = btn.nextElementSibling;
                if (!sublist) return;
                const expanded = !sublist.classList.contains('hidden');
                // Collapse any open siblings (optional)
                /* subToggles.forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        const otherList = otherBtn.nextElementSibling;
                        if (otherList && !otherList.classList.contains('hidden')) {
                            otherList.classList.add('hidden');
                            otherBtn.querySelector('svg').classList.remove('rotate-180');
                        }
                    }
                }); */

                sublist.classList.toggle('hidden');
                btn.querySelector('svg').classList.toggle('rotate-180');
            });
        });
    }

    /* ---------------------------------
       Ensure Mobile Nav on all pages
    ---------------------------------*/
    function ensureMobileNavExists() {
        if (!document.getElementById('mobile-nav')) {
            const mobileNavHTML = `
            <div id="mobile-nav" class="fixed inset-0 z-50 bg-white transform translate-x-full transition-transform duration-300 md:hidden overflow-y-auto">
                <div class="p-6">
                    <button id="mobile-nav-close" class="mb-6 text-mainblue focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul class="space-y-4">
                        <li><a href="index.html" class="text-mainblue text-lg font-medium block">Home</a></li>
                        <li>
                            <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">About us<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                            <ul class="mt-2 pl-4 space-y-2 hidden">
                                <li><a href="about.html#about-us" class="block text-mainblue">About Us</a></li>
                                <li><a href="about.html#mission-vision-values" class="block text-mainblue">Mission, Vision and Values</a></li>
                                <li><a href="about.html#leadership-officials" class="block text-mainblue">Organizational Structure</a></li>
                                <li><a href="about.html#leadership-officials" class="block text-mainblue">Leadership Officials</a></li>
                                <li><a href="about.html#governing-laws-mandates" class="block text-mainblue">Governing Laws & Mandates</a></li>
                                <li><a href="about.html#strategic-plans" class="block text-mainblue">Strategic Plans</a></li>
                            </ul>
                        </li>
                        <li>
                            <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">Services<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                            <ul class="mt-2 pl-4 space-y-2 hidden">
                                <li><a href="services.html#business-services" class="block text-mainblue">Business Services</a></li>
                                <li><a href="services.html#online-services" class="block text-mainblue">Online Services</a></li>
                                <li><a href="services.html#service-guidelines" class="block text-mainblue">Service Guidelines</a></li>
                                <li><a href="services.html#faqs" class="block text-mainblue">FAQs</a></li>
                                <li><a href="services.html#service-feedback" class="block text-mainblue">Service Feedback</a></li>
                            </ul>
                        </li>
                        <li>
                            <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">Media Center<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                            <ul class="mt-2 pl-4 space-y-2 hidden">
                                <li><a href="news.html" class="block text-mainblue">Latest News</a></li>
                                <li><a href="gallery.html" class="block text-mainblue">Magazine & Gallery</a></li>
                                <li><a href="newsletter.html" class="block text-mainblue">Archive</a></li>
                                <li><a href="announcements.html" class="block text-mainblue">Event Highlights</a></li>
                            </ul>
                        </li>
                        <li>
                            <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">Announcements<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                            <ul class="mt-2 pl-4 space-y-2 hidden">
                                <li><a href="announcements.html#upcoming-events" class="block text-mainblue">Upcoming Events</a></li>
                                <li><a href="alumni.html" class="block text-mainblue">OFAG Alumni</a></li>
                                <li><a href="announcements.html#vacancies" class="block text-mainblue">Vacancies</a></li>
                                <li><a href="announcements.html#bids" class="block text-mainblue">Bids</a></li>
                            </ul>
                        </li>
                        <li>
                            <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">Publications<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                            <ul class="mt-2 pl-4 space-y-2 hidden">
                                <li><a href="publications.html#news-stories" class="block text-mainblue">News and Stories</a></li>
                                <li><a href="publications.html#press-statements" class="block text-mainblue">Press Statements</a></li>
                                <li><a href="newsletter.html" class="block text-mainblue">Newsletters</a></li>
                                <li><a href="publications.html#strategic-documents" class="block text-mainblue">Strategic Documents</a></li>
                                <li><a href="publications.html#manuals-guidelines" class="block text-mainblue">Manuals & Guidelines</a></li>
                                <li><a href="publications.html#annual-reports" class="block text-mainblue">Annual Reports</a></li>
                            </ul>
                        </li>
                        <li><a href="audit-reports.html" class="text-mainblue text-lg font-medium block">Audit Reports</a></li>
                        <li>
                            <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">Portal<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg></button>
                            <ul class="mt-2 pl-4 space-y-2 hidden">
                                <li><a href="portal.html" class="block text-mainblue">ART Portal</a></li>
                                <li><a href="portal-help.html" class="block text-mainblue">Helpdesk</a></li>
                                <li><a href="apk-portal.html" class="block text-mainblue">Applications Portal</a></li>
                            </ul>
                        </li>
                        <li><a href="contact.html" class="text-mainblue text-lg font-medium block">Contact Us</a></li>
                    </ul>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('afterbegin', mobileNavHTML);
        }

        if (!document.getElementById('mobile-menu-button')) {
            const headerTop = document.querySelector('header .relative');
            if (headerTop) {
                const btn = document.createElement('button');
                btn.id = 'mobile-menu-button';
                btn.className = 'absolute right-4 top-1/2 -translate-y-1/2 md:hidden text-mainblue focus:outline-none';
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>';
                headerTop.appendChild(btn);
            }
        }

        // Adjust search container position if necessary
        const searchContainer = document.getElementById('search-container');
        if (searchContainer && !searchContainer.parentElement.classList.contains('left-8')) {
            const parent = searchContainer.parentElement;
            parent.classList.remove('right-8');
            parent.classList.add('left-8', 'md:left-auto', 'md:right-8');
        }

        // Hide desktop navigation on mobile if not already hidden
        const headerNav = document.querySelector('header nav');
        if (headerNav && !headerNav.classList.contains('hidden')) {
            headerNav.classList.add('hidden', 'md:block');
        }

        // Reduce logo size universally
        const headerLogo = document.querySelector('header img[alt="OFAG Logo"]');
        if (headerLogo) {
            headerLogo.classList.remove('h-12', 'h-11', 'h-10');
            if (!headerLogo.classList.contains('h-8')) {
                headerLogo.classList.add('h-8', 'md:h-10');
            }
        }
    }

    ensureMobileNavExists();

    /* Attach handlers (safe to call multiple times) */
    function bindMobileNavHandlers() {
        const btn = document.getElementById('mobile-menu-button');
        const nav = document.getElementById('mobile-nav');
        const closeBtn = document.getElementById('mobile-nav-close');
        if (!btn || !nav || btn.dataset.bound) return;

        const open = () => { nav.classList.remove('translate-x-full'); document.body.style.overflow = 'hidden'; };
        const close = () => { nav.classList.add('translate-x-full'); document.body.style.overflow = ''; };

        btn.addEventListener('click', open);
        if (closeBtn) closeBtn.addEventListener('click', close);
        nav.addEventListener('click', (e)=>{ if(e.target===nav) close(); });

        nav.querySelectorAll('.mobile-sub-toggle').forEach(tg=>{
            tg.addEventListener('click', ()=>{
                const sub=tg.nextElementSibling; if(!sub) return; sub.classList.toggle('hidden'); tg.querySelector('svg').classList.toggle('rotate-180');
            });
        });

        btn.dataset.bound = '1';
    }

    bindMobileNavHandlers();
}); 