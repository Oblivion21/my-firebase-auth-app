// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from '../../../firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const user = await firebaseAdmin.auth().getUserByEmail(email);
    const customToken = await getAuth().createCustomToken(user.uid);

    return res.status(200).json({ token: customToken });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
}
