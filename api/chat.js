export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method salah" })
  }

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ reply: "Pesan kosong 🗿" })
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "Jawab santai, singkat, ga kaku."
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

    // debug kalo error
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
