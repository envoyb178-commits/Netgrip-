// All working free APIs
module.exports = {
  // Gemini AI (Free)
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyDpslVoFn7Nq4XJXkQ7KpZqL5MkY8xQnR0',
  
  // Weather APIs (Free)
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || 'b1b15e88fa797225412429c1c50c122a',
  
  // News API (Free)
  NEWS_API_KEY: process.env.NEWS_API_KEY || 'd5c1a2b3e4f5a6b7c8d9e0f1a2b3c4d5',
  
  // Free endpoints (no key needed)
  FREE_APIS: {
    translate: 'https://translate.googleapis.com',
    quote: 'https://zenquotes.io/api/random',
    joke: 'https://v2.jokeapi.dev/joke/Any',
    meme: 'https://meme-api.com/gimme',
    advice: 'https://api.adviceslip.com/advice',
    cat: 'https://api.thecatapi.com/v1/images/search',
    dog: 'https://dog.ceo/api/breeds/image/random',
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    anime: 'https://animechan.xyz/api/random'
  }
};