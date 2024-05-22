// middlewares/authMiddleware.ts
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';
import { firebaseAdmin } from '../firebaseAdmin';
import { User } from '../types';

export const authMiddleware = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ user: User }>> => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const email = session.user.email;

  if (!email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    if (!userRecord.emailVerified) {
      return {
        redirect: {
          destination: '/verify-email',
          permanent: false,
        },
      };
    }

    const user: User = {
      email: userRecord.email!,
      // Add other properties if needed
    };

    return { props: { user } };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
