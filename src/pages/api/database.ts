import { connectToDatabase } from '@/pages/api/middlewares/mongo'

export const writeUserData = async (custId: string, tier: string) => {
  const { db } = await connectToDatabase()

  const user = await db.collection('user').findOne({ custId })

  const updateDoc = {
    $set: {
      tier,
    },
  }

  if (user) {
    await db.collection('user').updateOne(
      {
        custId,
      },
      updateDoc,
    )
  } else {
    await db.collection('user').insertOne({
      custId,
      tier,
    })
  }
}

export const readUserData = async (custId: string) => {
  const { db } = await connectToDatabase()
  const data = await db
    .collection('user')
    .find({
      custId,
    })
    .toArray()
  // eslint-disable-next-line no-magic-numbers
  return data.length > 0 ? data[0] : {}
}
