import { JWT, fetchAuthSession } from '@aws-amplify/auth';
import { AuthService } from './authService';

async function testAuth() {
    const service = new AuthService();
    const result = await service.login('axel1', 'Halo34)ife');

    console.log(result);
    const session = await fetchAuthSession();

    const { idToken, accessToken } = session.tokens;
    console.log("id token", idToken)
    console.log("access token", accessToken)
    
    //how do I get the jwt token from the session?
    return idToken;
}

testAuth();