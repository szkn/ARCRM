import { useState, FormEvent } from 'react';
import styles from '../styles/Home.module.css';

const ContactForm = () => {
  const [domains, setDomains] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [nameFirst, setNameFirst] = useState('');
  const [nameKanaLast, setNameKanaLast] = useState('');
  const [nameKanaFirst, setNameKanaFirst] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [postalCode1, setPostalCode1] = useState('');
  const [postalCode2, setPostalCode2] = useState('');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setProgress(0);

    const domainList = domains.split('\n').filter(d => d.trim() !== '');
    
    for (let i = 0; i < domainList.length; i++) {
      try {
        await sendForm(domainList[i]);
        setProgress(((i + 1) / domainList.length) * 100);
      } catch (err) {
        setError(`${domainList[i]}への送信中にエラーが発生しました。`);
        break;
      }
    }
  };

  const sendForm = async (domain: string) => {
    // TODO: 実際のAPI呼び出しを実装
    console.log('お問合せ送信:', { 
      domain, 
      nameLast, 
      nameFirst, 
      nameKanaLast, 
      nameKanaFirst, 
      email, 
      subject, 
      company, 
      title, 
      department, 
      phone: `${phone1}-${phone2}-${phone3}`,
      postalCode: `${postalCode1}-${postalCode2}`,
      message 
    });
    // 擬似的な遅延を追加
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>お問い合わせフォーム自動入力</h2>
      <div>
        <label htmlFor="domains">ドメイン（改行で複数指定可）</label>
        <textarea
          id="domains"
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          rows={5}
          className={styles.formTextarea}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.nameInput}>
          <label htmlFor="name_last">姓</label>
          <input
            type="text"
            id="name_last"
            value={nameLast}
            onChange={(e) => setNameLast(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <div className={styles.nameInput}>
          <label htmlFor="name_first">名</label>
          <input
            type="text"
            id="name_first"
            value={nameFirst}
            onChange={(e) => setNameFirst(e.target.value)}
            className={styles.formInput}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div>
          <label htmlFor="name_kana_last">姓（フリガナ）</label>
          <input
            type="text"
            id="name_kana_last"
            value={nameKanaLast}
            onChange={(e) => setNameKanaLast(e.target.value)}
            className={styles.formInput}
          />
        </div>
        <div>
          <label htmlFor="name_kana_first">名（フリガナ）</label>
          <input
            type="text"
            id="name_kana_first"
            value={nameKanaFirst}
            onChange={(e) => setNameKanaFirst(e.target.value)}
            className={styles.formInput}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div>
        <label htmlFor="subject">件名</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div>
        <label htmlFor="company">会社名</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div>
        <label htmlFor="title">役職</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div>
        <label htmlFor="department">部署</label>
        <input
          type="text"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className={styles.formInput}
        />
      </div>
      <div>
        <label htmlFor="phone">電話番号</label>
        <div className={styles.phoneInputs}>
          <input
            type="tel"
            id="phone1"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            maxLength={4}
            className={styles.formInput}
          />
          <span>-</span>
          <input
            type="tel"
            id="phone2"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            maxLength={4}
            className={styles.formInput}
          />
          <span>-</span>
          <input
            type="tel"
            id="phone3"
            value={phone3}
            onChange={(e) => setPhone3(e.target.value)}
            maxLength={4}
            className={styles.formInput}
          />
        </div>
      </div>
      <div>
        <label htmlFor="postcode">郵便番号</label>
        <div className={styles.postcodeInputs}>
          <input
            type="text"
            id="postcode1"
            value={postalCode1}
            onChange={(e) => setPostalCode1(e.target.value)}
            maxLength={3}
            className={styles.formInput}
          />
          <span>-</span>
          <input
            type="text"
            id="postcode2"
            value={postalCode2}
            onChange={(e) => setPostalCode2(e.target.value)}
            maxLength={4}
            className={styles.formInput}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message">メッセージ</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.formTextarea}
        />
      </div>
      <button type="submit" className={styles.submitButton}>実行</button>
      {progress > 0 && (
        <div className={styles.progress}>
          <div 
            className={styles.progressBar} 
            style={{width: `${progress}%`}}
            role="progressbar" 
            aria-valuenow={progress} 
            aria-valuemin={0} 
            aria-valuemax={100}
          >
            {progress}%
          </div>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default ContactForm;