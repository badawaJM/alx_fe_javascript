// Array to store quotes
let quotes = [];

// Function to display a random quote from the array
function showRandomQuote() {
    const filteredQuotes = filterByCategory(quotes);
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
    if (randomQuote) {
        document.getElementById('quoteDisplay').innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
    } else {
        document.getElementById('quoteDisplay').innerHTML = '<p>No quotes available for this category.</p>';
    }
}

// Function to filter quotes by selected category
function filterByCategory(quotes) {
    const selectedCategory = document.getElementById('categoryFilter').value;
    return selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
}

// Function to add a new quote and save it to local storage
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };

        quotes.push(newQuote);
        saveQuotes(); // Save to local storage
        populateCategories(); // Update categories in the dropdown
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
        showRandomQuote(); // Show a new quote after adding
    } else {
        alert('Please enter both the quote text and category.');
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const data = JSON.stringify(quotes);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json'; // Name of the exported file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Append the imported quotes
        saveQuotes(); // Save them to local storage
        populateCategories(); // Update categories dropdown
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories dynamically
function populateCategories() {
    const categorySet = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

    categorySet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selectedCategory); // Save to local storage
    showRandomQuote(); // Show quote based on the new filter
}

// Initialize the app and load quotes on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories(); // Populate categories from loaded quotes

    // Restore last selected filter from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || "all";
    document.getElementById('categoryFilter').value = lastSelectedCategory;

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportJson').addEventListener('click', exportQuotes);
    showRandomQuote(); // Show an initial quote
});
