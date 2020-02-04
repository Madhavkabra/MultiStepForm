import { db } from './firebase';

interface queryParameters {
  userId?: Number;
}

export const checkUserId = async (params: queryParameters) => {
  if (params && params.userId)
    return params.userId
  else
    return createNewUser();
}

const createNewUser = async () => {
  let detailsRef = await db.collection('onboardingDetails').add({})
  return detailsRef.id
}

export const setOnboardingDetails = (userId: string, data:any) => db
  .collection('onboardingDetails')
  .doc(`${userId}`)
  .set({
   ...data
  }, {merge: true});;
