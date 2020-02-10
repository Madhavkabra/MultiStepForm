import { db } from './firebase';

interface queryParameters {
  userId?: string;
}

interface Data {
  firstName?: string;
  lastName?: string;
  college?: string;
  email?: string;
  lastCompany?: string;
  phone?: number;
  shortResponse?: string;
  yearsOfExperince?: number;  
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

export const setOnboardingDetails = async(userId: string, data: Data) => {
  const onboardingCollection = await db.collection('onboardingDetails');
  const onboardingDocument = await onboardingCollection.doc(`${userId}`);
  await onboardingDocument.set({
    ...data
  }, { merge: true });
};

export const getOnboardingDetails = async (userId: string) => {
  const userRef = db.collection('onboardingDetails').doc(`${userId}`);
  const getDoc = await userRef.get();
  const snapshot = await getDoc.data();
  return <Object>snapshot;
}
