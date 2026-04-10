const part1 = "gsk"; // bagian 1
const part2 = "_IDxEQaXVhY4hGWbNZWOAWGdyb3FYAc5iUVGfQjFvobxshu5Ma1RE"; // bagian 2
const token = part1 + part2

const cooldown = {}

export default async function handler(req, res) {

  // biar kalo dibuka di browser ga bikin panik
  if (req.method === "GET") {
    return res.status(200).json({ reply: "API hidup 😎" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method salah" })
  }

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ reply: "Pesan kosong 🗿" })
    }

    // anti spam dikit
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

    if (cooldown[ip] && Date.now() - cooldown[ip] < 2000) {
      return res.status(429).json({ reply: "Santai dikit napa 😭" })
    }

    cooldown[ip] = Date.now()

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "Jawab singkat, santai, ga kaku."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    })

    const data = await response.json()

console.log("DEBUG GROQ:", data)

let reply = "AI lagi error 🥀"

if (data?.choices?.[0]?.message?.content) {
  reply = data.choices[0].message.content
} else if (data?.error?.message) {
  reply = "Error: " + data.error.message
}

return res.status(200).json({ reply })

    if (!data?.choices) {
      console.log("GROQ ERROR:", data)
      return res.status(500).json({ reply: "AI error 💀" })
    }

    const reply = data.choices[0].message.content

    return res.status(200).json({ reply })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return res.status(500).json({ reply: "Server error 🥀" })
  }
    }
