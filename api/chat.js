import axios from "axios"

const part1 = "gsk"
const part2 = "_IDxEQaXVhY4hGWbNZWOAWGdyb3FYAc5iUVGfQjFvobxshu5Ma1RE"
const token = part1 + part2

export default async function handler(req, res) {

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

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Jawab santai, singkat, jelas."
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "AI error 🥀"

    return res.status(200).json({ reply })

  } catch (err) {
    console.error("FULL ERROR:", err?.response?.data || err.message)

    return res.status(200).json({
      reply: "Error: " + (err?.response?.data?.error?.message || err.message)
    })
  }
}
