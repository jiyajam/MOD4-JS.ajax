document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const query = document.getElementById('query').value;
        const apiUrl = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;


        resultsDiv.innerHTML = '';


        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    resultsDiv.textContent = 'No shows found.';
                } else {
                    data.forEach(show => {
                        const showElement = document.createElement('div');
                        showElement.innerHTML = `
                            <h3>${show.show.name}</h3>
                            <p>Premiered: ${show.show.premiered}</p>
                            <p>Genres: ${show.show.genres.join(', ')}</p>
                        `;
                        resultsDiv.appendChild(showElement);
                    });
                }
            })
            .catch(error => {
                resultsDiv.textContent = 'Error fetching data.';
                console.error('Error:', error);
            });
    });
});
