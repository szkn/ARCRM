import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-northeast-1_Czn9JR0fI',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || ''
};

export const userPool = new CognitoUserPool(poolData);