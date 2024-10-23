document.addEventListener('DOMContentLoaded', function() {
    let quotes = loadQuotes(); // Load quotes from localStorage
    
    // Elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const exportButton = document.getElementById('exportJson');
    const importFile = document.getElementById('importFile');

    // Display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
    }

    // Add a new quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText && quoteCategory) {
            const newQuote = { text: quoteText, category: quoteCategory };
            quotes.push(newQuote);
            saveQuotes();  // Save to localStorage
            newQuoteText.value = '';
            newQuoteCategory.value = '';
            alert('Quote added successfully!');
        } else {
            alert('Please enter both quote text and category');
        }
    }

    // Load quotes from localStorage
    function loadQuotes() {
        const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
        return storedQuotes;
    }

    // Save quotes to localStorage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Export quotes to a JSON file
    function exportToJson() {
        const blob = new Blob([JSON.stringify(quotes)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);  // Append imported quotes
            saveQuotes();  // Save updated quotes to localStorage
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Event Listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportToJson);
    importFile.addEventListener('change', importFromJsonFile);

    // Show an initial quote
    showRandomQuote();
});
