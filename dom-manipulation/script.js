// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Array to store quotes (loaded from localStorage if available)
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict your future is to create it.", category: "Future" }
    ];

    // DOM Elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const formContainer = document.createElement('div');
    document.body.appendChild(formContainer);

    // Function to display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<span>"${randomQuote.text}"</span><strong> - ${randomQuote.category}</strong>`;
        sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote)); // Store last displayed quote in sessionStorage
    }

    // Function to create the form for adding new quotes
    function createAddQuoteForm() {
        formContainer.innerHTML = `
            <div>
                <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
                <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
                <button id="addQuoteBtn">Add Quote</button>
            </div>
        `;
        document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
    }

    // Function to add a new quote
    function addQuote() {
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (quoteText && quoteCategory) {
            const newQuote = { text: quoteText, category: quoteCategory };
            quotes.push(newQuote);
            localStorage.setItem('quotes', JSON.stringify(quotes)); // Save quotes to localStorage

            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';

            alert('New quote added successfully!');
        } else {
            alert('Please enter both a quote and a category.');
        }
    }

    // Load last viewed quote from sessionStorage if available
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastViewedQuote) {
        quoteDisplay.innerHTML = `<span>"${lastViewedQuote.text}"</span><strong> - ${lastViewedQuote.category}</strong>`;
    } else {
        showRandomQuote(); // Display a random quote if no session data
    }

    // Event listener for showing a random quote
    newQuoteButton.addEventListener('click', showRandomQuote);
    createAddQuoteForm();
});
