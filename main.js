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
}); 