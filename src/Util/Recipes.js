import { firestore } from './Firebase'
import { collection, getDocs, limit, query } from '@firebase/firestore'

/**
 * Fetch the latest recipes from the firestore
 */
export const fetchLatestRecipes = async () => {
  const q = query(collection(firestore, 'recipes'), limit(25))

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
}
