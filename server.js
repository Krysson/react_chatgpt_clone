const PORT = 8000
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

//const API_KEY = "ADD_API_KEY_HERE"

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100
    })
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options)
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
