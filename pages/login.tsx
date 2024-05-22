// pages/login.tsx
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

const LoginPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage('Logged in successfully!');
        // Store the token as needed (e.g., in localStorage or cookies)
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessage(`Error: ${errorMessage}`);
    }
  };

  if (session) {
    return (
      <>
        <p>Welcome, {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log In</button>
      <p>{message}</p>
      <p>or</p>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </>
  );
};

export default LoginPage;
