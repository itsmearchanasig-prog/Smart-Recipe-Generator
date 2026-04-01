// 1. API Key 
const API_KEY = "AIzaSyDrVGFg4fVySI6cuA4sFE2qFtRCUolGpn4"; 

const btn = document.getElementById("btn");
const output = document.getElementById("output");
const ingredientsInput = document.getElementById("ingredients");
const timeLimit = document.getElementById("timeLimit");
const cuisineType = document.getElementById("cuisineType");

// 2. waiting for button respons
btn.addEventListener("click", async () => {
    const userIngredients = ingredientsInput.value;
    const selectedTime = timeLimit.value;
    const selectedCuisine = cuisineType.value;

    if (!userIngredients) {
        alert("Ohooo ooo, Please type Ingredients! 😂");
        return;
    }

    output.innerHTML = "<b>Chef Archana Thinking... 🥣</b>";

    // 3.Tell the AI that it needs to speak in a 'bindaas' (carefree/bold) style.
    const promptText = `Hillooo, just chill. 
    User has ingredients: ${userIngredients}. 
    Time: ${selectedTime}, Cuisine: ${selectedCuisine}. 
    Give a short recipe in Hinglish (Hindi + English) in a very fun way. 
    Add a 'Pro Tip' at the end.`;

    // 4.his is the API call you asked for (look at its address carefully)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    try {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
        }) // bracket closed
    });

        const data = await response.json();

        // 5. Check whether the data has arrived or not
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let finalRecipe = data.candidates[0].content.parts[0].text;
            // Styling the recipe for a better look
            output.innerHTML = finalRecipe.replace(/\n/g, "<br>").replace(/\*\*/g, "");
        } else {
            // If the API sent an error (like 'Model Not Found')
            console.error("API Error:", data);
            output.innerText = "Oops! Google denied it. Errora. Error: " + (data.error ? data.error.message : "Try again");
        }

    } catch (error) {
        // If the internet is down or the URL is incorrect.
        console.error("Network Error:", error);
        output.innerText = "Network's glitching, Please Check it!";
    }
});
