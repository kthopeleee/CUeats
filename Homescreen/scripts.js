document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    // Add a listener for when the user types
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
  
      if (query.trim() !== '') {
        // Show the search results if there's input
        searchResults.classList.remove('hidden');
  
        // Filter and display results dynamically (example filtering logic)
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach(item => {
          const name = item.querySelector('.result-name').textContent.toLowerCase();
          if (name.includes(query)) {
            item.style.display = 'flex'; // Show matching results
          } else {
            item.style.display = 'none'; // Hide non-matching results
          }
        });
      } else {
        // Hide results if input is cleared
        searchResults.classList.add('hidden');
      }
    });
  
    // Close the search results when clicking outside
    document.addEventListener('click', function (event) {
      if (!searchResults.contains(event.target) && event.target !== searchInput) {
        searchResults.classList.add('hidden');
      }
    });
  });