// pages/protected.tsx
import { GetServerSideProps } from 'next';
import { authMiddleware } from '../middlewares/authMiddleware';
import { User } from '../types';

interface ProtectedPageProps {
  user: User;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ user }) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return authMiddleware(context);
};

export default ProtectedPage;
