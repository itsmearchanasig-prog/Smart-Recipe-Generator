// 1. Apni API Key yahan rakhein
const API_KEY = "AIzaSyD2lL6dQL7Eh_iZZXXXRSuexsPAR4JjtZI"; 

const btn = document.getElementById("btn");
const output = document.getElementById("output");
const ingredientsInput = document.getElementById("ingredients");
const timeLimit = document.getElementById("timeLimit");
const cuisineType = document.getElementById("cuisineType");

// 2. Button par click hone ka intezar karein
btn.addEventListener("click", async () => {
    const userIngredients = ingredientsInput.value;
    const selectedTime = timeLimit.value;
    const selectedCuisine = cuisineType.value;

    if (!userIngredients) {
        alert("Ohooo ooo, Please type Ingredients! 😂");
        return;
    }

    output.innerHTML = "<b>Chef Archana Thinking... 🥣</b>";

    // 3. AI ko batayein ki use 'Archana' ki tarah bindaas bolna hai
    const promptText = `Hillooo, just chill. 
    User has ingredients: ${userIngredients}. 
    Time: ${selectedTime}, Cuisine: ${selectedCuisine}. 
    Give a short recipe in Hinglish (Hindi + English) in a very fun way. 
    Add a 'Pro Tip' at the end.`;

    // 4. Ye hai wo API Call jo aapne pucha tha (Iska address dhyan se dekhiye)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();

        // 5. Check karein ki data aaya ya nahi
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let finalRecipe = data.candidates[0].content.parts[0].text;
            // Recipe ko sundar dikhane ke liye Formatting
            output.innerHTML = finalRecipe.replace(/\n/g, "<br>").replace(/\*\*/g, "");
        } else {
            // Agar API ne koi error bheja (jaise Model Not Found)
            console.error("API Error:", data);
            output.innerText = "Oops! Google denied it. Errora. Error: " + (data.error ? data.error.message : "Try again");
        }

    } catch (error) {
        // Agar internet band hai ya URL galat hai
        console.error("Network Error:", error);
        output.innerText = "Network's glitching, Please Check it!";
    }
});
