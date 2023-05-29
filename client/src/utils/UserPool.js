import { CognitoUserPool } from 'amazon-cognito-identity-js';

/** 
 * *
 * UserPool (Cognito)
 * @description 
    - Used for AWS Cognito operations through the amazon-cognito-identity-js package
 * @listens AccountState.js
 */

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USERPOOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export default new CognitoUserPool(poolData);
