import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const GoogleButton = () => {
    return (
        <div>
            <GoogleLogin
            width='500px'
            onSuccess={credentialResponse => {
                console.log(credentialResponse.credential);
                const decodeding = jwt_decode(credentialResponse.credential);
                console.log(decodeding)
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
        </div>
    )
}

export default GoogleButton;