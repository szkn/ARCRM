# ARC CRM

ARC CRMは、Vercelでホストされている顧客関係管理（CRM）のためのウェブアプリケーションです。Next.jsとTypeScriptを使用して構築されており、Amazon Cognitoを使用して認証を行っています。

## 主な機能

1. ユーザー認証（ログイン、サインアップ、パスワードリセット）
2. 会社情報一覧の表示と検索
3. メール自動送信ツール
4. お問い合わせフォーム自動入力

## 技術スタック

- Next.js 
- TypeScript
- React
- Amazon Cognito
- CSS Modules
- Vercel（ホスティング）

## デプロイ

このプロジェクトはVercelにデプロイされています。Vercelとの連携により、mainブランチへのプッシュ時に自動的にデプロイが行われます。

## 環境変数

Vercelのプロジェクト設定で以下の環境変数を設定してください：

- NEXT_PUBLIC_COGNITO_USER_POOL_ID
- NEXT_PUBLIC_COGNITO_CLIENT_ID
- NEXT_PUBLIC_COGNITO_DOMAIN
- NEXT_PUBLIC_REDIRECT_URI

## ローカル開発

1. リポジトリをクローンします：
   ```
   git clone https://github.com/your-username/arc-crm.git
   cd arc-crm
   ```

2. 依存関係をインストールします：
   ```
   npm install
   ```

3. 環境変数を設定します。.env.localファイルを作成し、必要な変数を設定します。

4. 開発サーバーを起動します：
   ```
   npm run dev
   ```

5. ブラウザで http://localhost:3000 を開いてアプリケーションにアクセスします。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細については、LICENSEファイルを参照してください。

## 今後の改善点

1. バックエンドAPIの実装と統合
2. ユーザーインターフェースの改善
3. エラーハンドリングの強化
4. テストの追加
