import { OPENAI_API_KEY } from "./config.js";

const adjectives = ["Enchanted", "Runed", "Shadow", "Gilded", "Mystic"];
const nouns = ["Oracle", "Sanctum", "Warden", "Totem", "Relic"];

function generateName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
}

async function generateCard() {
  const title = generateName();
  document.getElementById("cardTitle").innerText = title;
  document.getElementById("cardImage").style.display = "none";

  const prompt = `Black and white fantasy trading card, engraved style, ${title}, centered figure, glowing emblem, symmetrical layout.`;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "url",
    }),
  });

  const data = await response.json();
  document.getElementById("cardImage").src = data.data[0].url;
  document.getElementById("cardImage").style.display = "block";
}
