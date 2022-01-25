import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'
const mongodb = require('mongodb')

const cloudinary = require('cloudinary').v2

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL)

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
})

export default async function editEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const isConnected = await clientPromise
  const db = isConnected.db(process.env.MONGODB_DB)
  if (session) {
    const {
      newEventData: {
        eventId,
        _oldImagePublicId,
        _oldEventImage,
        _newEventName,
        _newEventDetails,
        _newEventStartDate,
        _newEventEndDate,
        _newEventImage,
      },
    } = req.body
    let cloudinaryRes = {
      secure_url: _oldEventImage,
      public_id: _oldImagePublicId,
    }
    if (_newEventImage) {
      const image = await cloudinary.uploader.destroy(_oldImagePublicId)
      cloudinaryRes = await cloudinary.uploader.upload(_newEventImage)
    }
    // const cloudinaryRes = await cloudinary.uploader.upload(_newEventImage)
    await db.collection('events').updateOne(
      { _id: new mongodb.ObjectId(eventId) },
      {
        $set: {
          eventName: _newEventName,
          eventDetails: _newEventDetails,
          eventStartDate: new Date(_newEventStartDate),
          eventEndDate: new Date(_newEventEndDate),
          eventImageURL: cloudinaryRes.secure_url,
          imagePublicId: cloudinaryRes.public_id,
          createdAt: new Date(),
        },
      }
    )
    res.status(200).json({ message: 'Successfully edited event.' })
  } else {
    res.status(401).json({
      error: 'Not signed in.',
    })
  }
}