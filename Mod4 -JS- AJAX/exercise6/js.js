document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const query = document.getElementById('searchQuery').value; // Get the search term
        const apiUrl = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`; // Create API URL

        // Clear previous results
        resultsDiv.innerHTML = '';

        // Fetch jokes from API
        fetch(apiUrl)
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                // Check if jokes are found
                if (data.result.length > 0) {
                    // Loop through jokes and display them
                    data.result.forEach(joke => {
                        const jokeElement = document.createElement('article');
                        jokeElement.innerHTML = `<p>${joke.value}</p>`;
                        resultsDiv.appendChild(jokeElement);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No jokes found for that search term.</p>';
                }
            });
    });
});

