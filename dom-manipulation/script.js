// Wait for the DOM to load before running any script
document.addEventListener('DOMContentLoaded', function() {
    // Array to store quotes
    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict your future is to create it.", category: "Future" }
    ];

    // Get DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    // Function to display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) return; // Ensure there's at least one quote to display
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Use innerHTML to update the content of the quoteDisplay div
        quoteDisplay.innerHTML = `<span>"${randomQuote.text}"</span><strong> - ${randomQuote.category}</strong>`;
    }

    // Function to add a new quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText && quoteCategory) {
            // Create new quote object and push to array
            const newQuote = { text: quoteText, category: quoteCategory };
            quotes.push(newQuote);

            // Clear input fields after adding
            newQuoteText.value = '';
            newQuoteCategory.value = '';

            alert('New quote added successfully!');
        } else {
            alert('Please enter both a quote and a category.');
        }
    }

    // Event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);

    // Display an initial random quote when the page loads
    showRandomQuote();
});
