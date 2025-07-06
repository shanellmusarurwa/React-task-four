import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/config';
import './SocialAuth.css';

const SocialAuth = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
    }
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Apple:', error);
    }
  };

  return (
    <div className="social-auth-container">
      <button className="social-button google" onClick={signInWithGoogle}>
        <FaGoogle className="social-icon" /> Continue with Google
      </button>
      <button className="social-button facebook" onClick={signInWithFacebook}>
        <FaFacebook className="social-icon" /> Continue with Facebook
      </button>
      <button className="social-button apple" onClick={signInWithApple}>
        <FaApple className="social-icon" /> Continue with Apple
      </button>
    </div>
  );
};

export default SocialAuth;