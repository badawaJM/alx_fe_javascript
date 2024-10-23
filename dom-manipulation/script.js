let quotes = [];
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

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
        saveQuotes();
        populateCategories();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
        showRandomQuote();
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

// Function to simulate fetching quotes from a server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const data = await response.json();

        const fetchedQuotes = data.map(item => ({
            text: item.title,
            category: "General"
        }));

        syncQuotesWithServer(fetchedQuotes);
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}

// Sync local quotes with server quotes
function syncQuotesWithServer(fetchedQuotes) {
    const newQuotes = fetchedQuotes.filter(fetchedQuote => {
        return !quotes.some(localQuote => localQuote.text === fetchedQuote.text);
    });

    if (newQuotes.length > 0) {
        quotes.push(...newQuotes);
        saveQuotes();
        alert(`${newQuotes.length} new quotes added from server.`);
    }

    handleConflicts(fetchedQuotes);
}

// Conflict resolution logic
function handleConflicts(fetchedQuotes) {
    fetchedQuotes.forEach(fetchedQuote => {
        const existingQuoteIndex = quotes.findIndex(localQuote => localQuote.text === fetchedQuote.text);

        if (existingQuoteIndex !== -1) {
            quotes[existingQuoteIndex] = fetchedQuote;
            alert(`Quote updated: ${fetchedQuote.text}`);
        }
    });

    saveQuotes();
}

// Function to start periodic fetching
function startPeriodicFetching() {
    fetchQuotesFromServer(); // Initial fetch
    setInterval(fetchQuotesFromServer, 30000); // Fetch every 30 seconds
}

// Populate categories dynamically
function populateCategories() {
    const categorySet = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categorySet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selectedCategory);
    showRandomQuote();
}

// Initialize the app and load quotes on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || "all";
    document.getElementById('categoryFilter').value = lastSelectedCategory;

    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportJson').addEventListener('click', exportQuotes);
