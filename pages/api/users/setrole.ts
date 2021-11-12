import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'
// import { connectToDatabase } from '@/util/connectToDb'

export default async function setRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (session) {
    const db = (await clientPromise).db(process.env.MONGODB_DB)
    const {
      userRoleData: { _role },
    } = req.body
    const result = await db
      .collection('users')
      .updateOne({ email: session.user.email }, { $set: { role: _role } })
    return res.status(200).json({ message: 'Successfully updated role.' })
  } else {
    // Not Signed in
    res.status(401).json({
      error:
        'Not signed in. Why are you trying to access sensitive information or attack my site? :(',
    })
  }
}
