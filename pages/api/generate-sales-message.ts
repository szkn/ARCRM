import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'メソッドが許可されていません' });
  }

  const { companyName, industry, productName, meetingUrl, senderCompany, senderName, senderPosition, senderEmail, prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt.replace('{companyName}', companyName) 
                          .replace('{productName}', productName)
                          .replace('{meetingUrl}', meetingUrl)
                          .replace('{senderName}', senderName)
                          .replace('{senderPosition}', senderPosition)
                          .replace('{senderEmail}', senderEmail),
          },
        ],
        max_tokens: 1024,
        n: 1,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json({ message: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('エラーが発生しました:', error);
    res.status(500).json({ message: 'メッセージの生成中にエラーが発生しました。' });
  }
}