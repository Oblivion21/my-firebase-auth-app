// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from '../../../firebaseAdmin';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
    });

    return res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
}
