// Main JavaScript file for Amharic pages (mirrors root/main.js)

document.addEventListener('DOMContentLoaded', () => {
    // Search functionality (same as root)
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    let searchData = [];
    fetch('./search-data.json')
        .then(r=>r.json()).then(d=>searchData=d).catch(()=>{});

    if (searchButton) {
        searchButton.addEventListener('click', e=>{
            e.stopPropagation();
            searchBar?.classList.toggle('hidden');
            if (!searchBar?.classList.contains('hidden')) searchInput?.focus();
        });
        document.addEventListener('click', e=>{
            if (searchContainer && !searchContainer.contains(e.target)) searchBar?.classList.add('hidden');
        });
        searchInput?.addEventListener('input', ()=>{
            const q=searchInput.value.toLowerCase();
            if(q.length<2){searchResults.innerHTML='';return;}
            const results=searchData.filter(i=>i.title.toLowerCase().includes(q)||i.content.toLowerCase().includes(q));
            searchResults.innerHTML=results.length?results.map(r=>`<a href="${r.url}" class="block p-2 hover:bg-gray-100 rounded-md"><div class="font-bold text-mainblue">${r.title}</div><div class="text-sm text-gray-600">${r.content}</div></a>`).join(''):'<div class="p-2 text-gray-500">ውጤት አልተገኘም።</div>';});
    }

    /* --------------------------- Mobile Navigation ---------------------------*/
    function ensureMobileNavExists(){
        if(!document.getElementById('mobile-nav')){
            const html=`<div id="mobile-nav" class="fixed inset-0 z-50 bg-white transform translate-x-full transition-transform duration-300 md:hidden overflow-y-auto"><div class="p-6">
                <button id="mobile-nav-close" class="mb-6 text-mainblue focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
                <ul class="space-y-4">
                    <li><a href="index.html" class="text-mainblue text-lg font-medium block">ዋና ገጽ</a></li>

                    <!-- About Us -->
                    <li>
                        <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">ስለ እኛ<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
                        <ul class="mt-2 pl-4 space-y-2 hidden">
                            <li><a href="about.html#about-us" class="block text-mainblue">ስለ እኛ</a></li>
                            <li><a href="about.html#mission-vision-values" class="block text-mainblue">ተልዕኮ / ራዕይ / እሴቶች</a></li>
                            <li><a href="about.html#leadership-officials" class="block text-mainblue">የድርጅት መዋቅር</a></li>
                            <li><a href="about.html#leadership-officials" class="block text-mainblue">የአመራሮች አመራር</a></li>
                            <li><a href="about.html#governing-laws-mandates" class="block text-mainblue">ህጎች እና ሥልጣን</a></li>
                            <li><a href="about.html#strategic-plans" class="block text-mainblue">ስልታዊ ዕቅዶች</a></li>
                        </ul>
                    </li>

                    <!-- Services -->
                    <li>
                        <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">አገልግሎቶች<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
                        <ul class="mt-2 pl-4 space-y-2 hidden">
                            <li><a href="services.html#business-services" class="block text-mainblue">የንግድ አገልግሎቶች</a></li>
                            <li><a href="services.html#online-services" class="block text-mainblue">የመስመር ላይ አገልግሎቶች</a></li>
                            <li><a href="services.html#service-guidelines" class="block text-mainblue">የአገልግሎት መመሪያዎች</a></li>
                            <li><a href="services.html#faqs" class="block text-mainblue">ተደጋጋሚ ጥያቄዎች</a></li>
                            <li><a href="services.html#service-feedback" class="block text-mainblue">የአገልግሎት አስተያየት</a></li>
                        </ul>
                    </li>

                    <!-- Media Center -->
                    <li>
                        <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">የሚዲያ ማዕከል<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
                        <ul class="mt-2 pl-4 space-y-2 hidden">
                            <li><a href="news.html" class="block text-mainblue">የቅርብ ጊዜ ዜናዎች</a></li>
                            <li><a href="news.html" class="block text-mainblue">ጋዜጣዊ መግለጫዎች</a></li>
                            <li><a href="news.html" class="block text-mainblue">የህዝብ መግለጫዎች</a></li>
                            <li><a href="gallery.html" class="block text-mainblue">መጋዜን / ፎቶ</a></li>
                            <li><a href="gallery.html#photo-gallery" class="block text-mainblue">የፎቶ ማዕከል</a></li>
                            <li><a href="gallery.html#video-gallery" class="block text-mainblue">ቪዲዮ</a></li>
                            <li><a href="newsletter.html" class="block text-mainblue">ጋዜጣ መዝገብ</a></li>
                            <li><a href="announcements.html" class="block text-mainblue">የክስተት ዋና ዋና ዜናዎች</a></li>
                        </ul>
                    </li>

                    <!-- Announcements -->
                    <li>
                        <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">ማስታወቂያዎች<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
                        <ul class="mt-2 pl-4 space-y-2 hidden">
                            <li><a href="announcements.html#upcoming-events" class="block text-mainblue">መጪ ክስተቶች</a></li>
                            <li><a href="alumni.html" class="block text-mainblue">የቀድሞ ተማሪዎች</a></li>
                            <li><a href="announcements.html#vacancies" class="block text-mainblue">ክፍት የሥራ ቦታዎች</a></li>
                            <li><a href="announcements.html#bids" class="block text-mainblue">ጨረታዎች</a></li>
                        </ul>
                    </li>

                    <!-- Publications -->
                    <li>
                        <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">ህትመቶች<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
                        <ul class="mt-2 pl-4 space-y-2 hidden">
                            <li><a href="publications.html#news-stories" class="block text-mainblue">ዜና እና ታሪኮች</a></li>
                            <li><a href="publications.html#press-statements" class="block text-mainblue">ጋዜጣዊ መግለጫዎች</a></li>
                            <li><a href="newsletter.html" class="block text-mainblue">ጋዜጣዎች</a></li>
                            <li><a href="publications.html#strategic-documents" class="block text-mainblue">ስልታዊ ሰነዶች</a></li>
                            <li><a href="publications.html#manuals-guidelines" class="block text-mainblue">መመሪያዎች እና መመሪያዎች</a></li>
                            <li><a href="publications.html#annual-reports" class="block text-mainblue">ዓመታዊ ሪፖርቶች</a></li>
                        </ul>
                    </li>

                    <li><a href="audit-reports.html" class="text-mainblue text-lg font-medium block">የኦዲት ሪፖርቶች</a></li>

                    <!-- Portal -->
                    <li>
                        <button class="flex items-center justify-between w-full text-mainblue text-lg font-medium mobile-sub-toggle">ፖርታል<svg class="h-4 w-4 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></button>
                        <ul class="mt-2 pl-4 space-y-2 hidden">
                            <li><a href="portal.html" class="block text-mainblue">ART ፖርታል</a></li>
                            <li><a href="portal-help.html" class="block text-mainblue">የድጋፍ ዴስክ</a></li>
                            <li><a href="apk-portal.html" class="block text-mainblue">የትግበራዎች ፖርታል</a></li>
                        </ul>
                    </li>

                    <li><a href="contact.html" class="text-mainblue text-lg font-medium block">እኛን ያነጋግሩን</a></li>
                </ul>
            </div></div>`;
            document.body.insertAdjacentHTML('afterbegin',html);
        }
        if(!document.getElementById('mobile-menu-button')){
            const headerTop=document.querySelector('header .relative');
            if(headerTop){headerTop.insertAdjacentHTML('beforeend',`<button id="mobile-menu-button" class="absolute right-4 top-1/2 -translate-y-1/2 md:hidden text-mainblue focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg></button>`);
            }
        }
        const searchContainer=document.getElementById('search-container');
        if(searchContainer){const p=searchContainer.parentElement;p.classList.remove('right-8');p.classList.add('left-8','md:left-auto','md:right-8');}
        const headerNav=document.querySelector('header nav');
        headerNav?.classList.add('hidden','md:block');
        const headerLogo=document.querySelector('header img[alt="OFAG Logo"]');
        headerLogo?.classList.remove('h-12');
        headerLogo?.classList.add('h-8','md:h-10');
    }

    function bindHandlers(){
        const btn=document.getElementById('mobile-menu-button');
        const nav=document.getElementById('mobile-nav');
        const closeBtn=document.getElementById('mobile-nav-close');
        if(!btn||!nav||btn.dataset.bound) return;
        const open=()=>{nav.classList.remove('translate-x-full');document.body.style.overflow='hidden';};
        const close=()=>{nav.classList.add('translate-x-full');document.body.style.overflow='';};
        btn.addEventListener('click',open);
        closeBtn?.addEventListener('click',close);
        nav.addEventListener('click',e=>{if(e.target===nav)close();});
        nav.querySelectorAll('.mobile-sub-toggle').forEach(t=>{t.addEventListener('click',()=>{const s=t.nextElementSibling;if(!s)return;s.classList.toggle('hidden');t.querySelector('svg').classList.toggle('rotate-180');});});
        btn.dataset.bound='1';
    }

    ensureMobileNavExists();
    bindHandlers();
}); 