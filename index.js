function search() {
    
    var searchInput = document.getElementById('search-input').value;
    var searchResults = performSearch(searchInput);
    displayResults(searchResults);
  }
  
  function performSearch(query) {
    
    var results = [
        "Lego challenge",
        "Rock, Paper, Scissors",
        "Snowball",
  ];

  return results;
}

function displayResults(results) {
  var searchResultsContainer = document.getElementById('search-results');

  
  searchResultsContainer.innerHTML = '';


  results.forEach(function(result) {
    var p = document.createElement('p');
    p.textContent = result;
    searchResultsContainer.appendChild(p);
  });
}