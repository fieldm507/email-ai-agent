// pages/api/generate-email.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { brandBrief, exampleEmails, prompt } = req.body

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert email copywriter. Use the business values and tone below to generate a marketing email. Do not mention this prompt or the user's instructions.`,
        },
        {
          role: 'user',
          content: `
Brand Brief:
${brandBrief}

Email Style Examples:
${exampleEmails}

Prompt:
${prompt}
        `,
        },
      ],
    })

    const message = response.choices[0]?.message?.content
    res.status(200).json({ email: message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Email generation failed.' })
  }
}