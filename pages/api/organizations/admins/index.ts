import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'
const mongodb = require('mongodb')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const isConnected = await clientPromise
  const db = isConnected.db(process.env.MONGODB_DB)
  if (req.method === 'PUT') {
    res.status(201).json({})
  }

  if (req.method === 'GET') {
    res.status(200).json({})
  }

  if (req.method === 'POST') {
    if (session) {
      const {
        adminData: { organizationId, _email },
      } = req.body
      const adminExistsAsMember = await db
        .collection('organizations')
        .find({
          _id: new mongodb.ObjectId(organizationId),
          membersList: {
            $elemMatch: { email: _email },
          },
        })
        .count()
      const adminExists = await db
        .collection('organizations')
        .find({
          _id: new mongodb.ObjectId(organizationId),
          superMembersList: {
            $elemMatch: { email: _email },
          },
        })
        .count()
      const userNotFound = await db
        .collection('users')
        .find({ email: _email })
        .count()
      if (adminExists > 0) {
        res
          .status(403)
          .json({ message: 'Admin already exists in organization.' })
      } else if (userNotFound === 0) {
        res.status(404).json({ error: 'User does not exist.' })
      } else if (adminExistsAsMember > 0) {
        const userDetails = await db
          .collection('users')
          .aggregate([
            {
              $match: { email: _email },
            },
            {
              $project: {
                adminId: '$_id',
                admin: '$name',
                email: '$email',
                _id: 0,
              },
            },
          ])
          .toArray()
        await db.collection('users').updateOne(
          {
            email: _email,
          },
          {
            $pull: {
              memberOfOrg: new mongodb.ObjectId(organizationId),
            },
            $push: {
              adminOfOrg: new mongodb.ObjectId(organizationId),
            },
          }
        )
        await db.collection('organizations').updateOne(
          { _id: new mongodb.ObjectId(organizationId) },
          {
            $pull: {
              membersList: { email: _email },
            },
            $addToSet: {
              // We use userDetails[0] because mongodb returns
              // the document as an object within an array via
              // the .toArray() function. We don't want the array
              // format though so we instead find the 0th index
              // since there will only ever be one item within
              // the returned array since emails are unique
              superMembersList: userDetails[0],
            },
          }
        )
        res.status(201).json({ message: 'Member upgraded to Admin.' })
      } else {
        const userDetails = await db
          .collection('users')
          .aggregate([
            {
              $match: { email: _email },
            },
            {
              $project: {
                adminId: '$_id',
                admin: '$name',
                email: '$email',
                _id: 0,
              },
            },
          ])
          .toArray()
        await db.collection('users').updateOne(
          {
            email: _email,
          },
          {
            $push: {
              adminOfOrg: new mongodb.ObjectId(organizationId),
            },
          }
        )
        await db.collection('organizations').updateOne(
          { _id: new mongodb.ObjectId(organizationId) },
          {
            $addToSet: {
              // We use userDetails[0] because mongodb returns
              // the document as an object within an array via
              // the .toArray() function. We don't want the array
              // format though so we instead find the 0th index
              // since there will only ever be one item within
              // the returned array since emails are unique
              superMembersList: userDetails[0],
            },
          }
        )
        res.status(200).json({ message: 'Successfully added admin.' })
      }
    } else {
      // Not Signed in
      res.status(401).json({
        error:
          'Not signed in. Why are you trying to access sensitive information or attack my site? :(',
      })
    }
  }

  if (req.method === 'PATCH') {
    if (session) {
      const {
        adminData: { organizationId, _email },
      } = req.body
      const isCreator = await db
        .collection('organizations')
        .find({
          _id: new mongodb.ObjectId(organizationId),
          email: _email,
          superMembersList: {
            $elemMatch: { email: _email },
          },
        })
        .count()
      const adminExists = await db
        .collection('organizations')
        .find({
          _id: new mongodb.ObjectId(organizationId),
          superMembersList: {
            $elemMatch: { email: _email },
          },
        })
        .count()
      if (isCreator > 0) {
        res.status(403).json({
          message: 'You cannot remove yourself until you transfer ownership.',
        })
      } else if (adminExists === 0) {
        res.status(404).json({ message: 'This Admin does not exist.' })
      } else {
        await db.collection('users').updateOne(
          {
            email: _email,
          },
          {
            $pull: {
              adminOfOrg: new mongodb.ObjectId(organizationId),
            },
          }
        )
        await db.collection('organizations').updateOne(
          { _id: new mongodb.ObjectId(organizationId) },
          {
            $pull: {
              superMembersList: { email: _email },
            },
          }
        )
        res.status(200).json({ message: 'Successfully removed member.' })
      }
    } else {
      // Not Signed in
      res.status(401).json({
        error:
          'Not signed in. Why are you trying to access sensitive information or attack my site? :(',
      })
    }
  }
}