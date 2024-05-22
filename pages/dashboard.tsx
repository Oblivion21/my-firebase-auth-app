// pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { authMiddleware } from '../middlewares/authMiddleware';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return authMiddleware(context);
};

export default Dashboard;
