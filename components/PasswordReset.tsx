import { useState, FormEvent } from 'react';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handlePasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent!');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handlePasswordReset}>
      <h1>Reset Password</h1>
      {message && <p>{message}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordReset;
