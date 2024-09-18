import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './common/Button';
import Input from './common/Input';

const SalesMessageTool: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
    const [productName, setProductName] = useState('');
    const [meetingUrl, setMeetingUrl] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderPosition, setSenderPosition] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [editableMessage, setEditableMessage] = useState('');


    const SALES_MESSAGE_PROMPT = `
    会社名: {companyName}
    製品名: {productName}
    面談予約URL: {meetingUrl}
    送信者名: {senderName}
    送信者役職: {senderPosition}
    送信者メールアドレス: {senderEmail}
    
    上記の情報を元に、以下の要素を含む効果的な営業メッセージを日本語で作成してください：
    1. 挨拶と自己紹介
    2. 会社名と業界に合わせた具体的な提案
    3. 製品名を使用した具体的なメリット（数字を含む）
    4. 面談予約用のURL: {meetingUrl}
    5. 会社情報（送信者の会社名、役職、名前、メールアドレス）

    メッセージは300〜400文字程度で作成してください。また改行も適宜してください。

    例は以下になります
    「突然のご連絡失礼いたします。Arc Lab株式会社の鈴木と申します。貴社の営業業務の更なる効率化を図るため、パートナーとしてお手伝いできればと考えております。
    面談のご予約は以下のURLからお願い致します。 https://calendar.app.google/rEH3KXw82mFsi8Tn9
    私たちは、貴社の営業活動をさらに効果的にするためのサービスを提供しています。特に、新規顧客開拓営業における効率向上を目指し、問い合わせフォーム自動送信ツールを活用した新しいアプローチをご提案いたします。
    このツールを導入することで、以下のような成果を期待できます。
    【営業効率の向上】：問い合わせフォームを通じた営業活動により、弊社事例では平均して75%の効率改善が報告されています。改善に伴いアポイント取得5件/月から10件/月の2倍を達成した事例もございます。
    【返信率の向上】：独自の生成AIモデルを活用し、個社ごとに最適なメッセージを構築することで、顧客の興味を引き、返信率を最大10倍向上させることが可能です。
    本サービスにご興味をお持ちいただけましたら、貴社のお力になれると存じますので、上記URLより面談のご予約をお願いいたします。
    何卒よろしくお願い申し上げます。
    Arc Lab 株式会社
    代表取締役 鈴木賢人
    Mail: info@arclab.co.jp」
    `;

    const generateSalesMessage = async (data: any, prompt: string): Promise<string> => {
        try {
          const response = await axios.post('/api/generate-sales-message', { ...data, prompt });
          return response.data.message;
        } catch (error) {
          console.error('エラーが発生しました:', error);
          throw new Error('メッセージの生成中にエラーが発生しました。');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
        const message = await generateSalesMessage({
            companyName,
            productName,
            meetingUrl,
            senderName,
            senderPosition,
            senderEmail
        }, SALES_MESSAGE_PROMPT);
        setGeneratedMessage(message);
        setEditableMessage(message); // 編集可能なメッセージを設定
        } catch (error) {
        console.error('エラーが発生しました:', error);
        setGeneratedMessage('メッセージの生成中にエラーが発生しました。もう一度お試しください。');
        setEditableMessage(''); // エラー時は編集可能なメッセージをクリア
        } finally {
        setIsLoading(false);
        }
    };

    // ローカルストレージから状態を読み込む
    useEffect(() => {
        const savedState = localStorage.getItem('salesMessageToolState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setCompanyName(parsedState.companyName || '');
            setProductName(parsedState.productName || '');
            setMeetingUrl(parsedState.meetingUrl || '');
            setSenderName(parsedState.senderName || '');
            setSenderPosition(parsedState.senderPosition || '');
            setSenderEmail(parsedState.senderEmail || '');
            setEditableMessage(parsedState.editableMessage || '');
        }
    }, []);
        // 状態が変更されたらローカルストレージに保存
        useEffect(() => {
            const stateToSave = {
                companyName,
                productName,
                meetingUrl,
                senderName,
                senderPosition,
                senderEmail,
                editableMessage
            };
        localStorage.setItem('salesMessageToolState', JSON.stringify(stateToSave));
        }, [companyName, productName, meetingUrl, senderName, senderPosition, senderEmail, editableMessage]);

    

    return (
        <div className="flex gap-8 max-w-6xl mx-auto">
        <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">営業文面作成ツール</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="会社名"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <Input
                    label="送信者名"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                />
                <Input
                    label="送信者メールアドレス"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required
                />
                <Input
                    label="送信者役職"
                    value={senderPosition}
                    onChange={(e) => setSenderPosition(e.target.value)}
                />
                <Input
                    label="製品名"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <Input
                    label="面談予約URL"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? '生成中...' : '営業文面を生成'}
                </Button>
            </form>
        </div>
        <div className="w-2/3">
            <h3 className="text-2xl font-bold mb-4">生成された営業文面</h3>
            {isLoading ? (
            <p>生成中...</p>
            ) : editableMessage ? (
            <textarea
                className="w-full h-[calc(100vh-200px)] p-4 border rounded resize-none"
                value={editableMessage}
                onChange={(e) => setEditableMessage(e.target.value)}
            />
            ) : (
            <p>ここに生成された営業文面が表示されます。</p>
            )}
        </div>
        </div>
    );
};

export default SalesMessageTool;