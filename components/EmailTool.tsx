import { useState } from 'react';
import styles from '../styles/Home.module.css';

const EmailTool = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: バックエンドのAPIを呼び出してメールを送信する
    console.log('メール送信:', { subject, body, recipients });
    alert('メールが送信されました。');
  };

  return (
    <>
      <h2>メール自動送信ツール</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">件名</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">本文</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="recipients">宛先（カンマ区切り）</label>
          <input
            type="text"
            id="recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            required
          />
        </div>
        <button type="submit">送信</button>
      </form>
    </>
  );
};

export default EmailTool;