import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const formData = req.body;

    try {

        console.log('Sending notification to Slack:')
          const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!slackWebhookUrl) {
            throw new Error('Slack Webhook URL is not set');
        }

        console.log('Sending notification to Slack:', slackWebhookUrl);

        const message = `
    ---------------------------------新しいお問い合わせがありました：---------------------------------
    名前: ${formData.nameLast} ${formData.nameFirst}
    フリガナ: ${formData.nameKanaLast} ${formData.nameKanaFirst}
    メールアドレス: ${formData.email}
    件名: ${formData.subject}
    会社名: ${formData.company}
    役職: ${formData.title}
    部署: ${formData.department}
    電話番号: ${formData.phone}
    郵便番号: ${formData.postalCode}
    メッセージ: ${formData.message}
    ドメイン: 
    ${formData.domains}
    ---------------------------------------------------------------------------------------------
        `;

      const slackResponse = await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });

      if (!slackResponse.ok) {
        const errorText = await slackResponse.text();
        throw new Error(`Slackへの通知送信に失敗しました: ${slackResponse.status} ${errorText}`);
      }

      const responseData = await slackResponse.text();
      console.log('Slack response:', responseData);

      res.status(200).json({ message: '通知が送信されました' });
    } catch (error) {
      console.error('通知エラー:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : '通知の送信に失敗しました' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}