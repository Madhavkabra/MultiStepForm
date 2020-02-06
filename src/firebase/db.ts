import { db } from './firebase';

interface queryParameters {
  userId?: any;
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

export const setOnboardingDetails = (userId: string, data: any) => db
  .collection('onboardingDetails')
  .doc(`${userId}`)
  .set({
    ...data
  }, { merge: true });;

export const getOnboardingDetails = async (userId: string) => {
  const userRef = db.collection('onboardingDetails').doc(`${userId}`);
  const getDoc = await userRef.get();
  const snapshot = await getDoc.data();
  return <Object>snapshot;
}
