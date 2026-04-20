// api/setting.js
const API_KEY = process.env.API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

// Export ke window
window.API_KEY = API_KEY;
window.API_URL = API_URL;
window.MODEL = MODEL;
