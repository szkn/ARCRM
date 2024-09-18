import React from 'react';

interface HomeScreenProps {
  username: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ username }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">ようこそ、{username}さん</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">ARC. Formerへようこそ</h2>
        <p className="text-gray-600 mb-4">
          このアプリケーションでは、以下の機能をご利用いただけます：
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>お問い合わせフォームの利用</li>
          <li>会社情報の閲覧</li>
          <li>営業文面作成ツール</li>
          <li>（近日公開）メール自動送信ツール</li>
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">最新のお知らせ</h2>
        <ul className="space-y-2">
          <li className="text-gray-600">2024/09/18: ARC. Formerがリリースされました</li>
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;