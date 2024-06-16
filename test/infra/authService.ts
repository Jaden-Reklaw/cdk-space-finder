import {  SignInOutput, signIn } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'us-east-2_8yrKTqsbv',
            userPoolClientId: '6phu0k6l4cu0d0o5osti0up786',
        },
    },
});


export class AuthService {
    public async login(username: string, password: string) {
        const result = (await signIn({
            username,
            password,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH',
            },
        }));
        return result;
    }
}