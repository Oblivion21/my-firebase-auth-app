// pages/index.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Authentication project</h1>
      <nav>
        <ul>
          <li>
            <Link href="/signup">
              Sign Up
            </Link>
          </li>
          <li>
            <Link href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link href="/reset-password">
              Reset Password
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;