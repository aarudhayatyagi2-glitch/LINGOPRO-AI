// 1. Function to fetch and transform words
async function transform() {
    const input = document.getElementById('userInput').value.trim().toLowerCase();
    const resultElement = document.getElementById('result'); // Ensure you have an element with id="result"

    if (!input) {
        alert("Please enter a word first!");
        return;
    }

    // Button glow effect (Visual feedback)
    const btn = document.querySelector('.transform-btn');
    btn.innerText = "THINKING...";

    try {
        // Fetching real synonyms from Dictionary API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        const data = await response.json();

        if (data.title === "No Definitions Found") {
            resultElement.innerText = "Word not found. Try another!";
        } else {
            // Picking the first synonym from the list
            const synonyms = data[0].meanings[0].synonyms;
            if (synonyms && synonyms.length > 0) {
                // Pick the longest synonym to make it look "Advanced"
                const advanced = synonyms.reduce((a, b) => a.length > b.length ? a : b);
                resultElement.innerText = advanced.toUpperCase();
            } else {
                resultElement.innerText = "Already Sophisticated!";
            }
        }
    } catch (error) {
        console.error("Error:", error);
        resultElement.innerText = "Network Error!";
    } finally {
        btn.innerText = "TRANSFORM";
    }
}

// 2. Fix for Curated Suggestions (Click karne par search box mein word jaye)
document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.getElementById('userInput').value = chip.innerText;
        transform(); // Auto-transform on click
    });
});

// 3. Enter key support
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        transform();
    }
});