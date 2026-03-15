const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function analyzeJournal(text) {

  try {

    const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You analyze emotions from journal entries."
        },
        {
          role: "user",
          content: `
Return ONLY JSON in this format:

{
"emotion": "single word emotion",
"keywords": ["k1","k2","k3"],
"summary": "short explanation"
}

Journal Entry:
${text}
`
        }
      ],
      temperature: 0.3
    });

    let response = completion.choices[0].message.content.trim();

    return JSON.parse(response);

  } catch (err) {

    console.log("Groq Error:", err.message);

    return {
      emotion: "analysis_failed",
      keywords: [],
      summary: "AI analysis failed. Check API configuration."
    };

  }
}

module.exports = { analyzeJournal };