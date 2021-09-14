import { useState, useEffect } from 'react'
import { firestore } from './Firebase'

export const useRecipes = ({
  limit = 25,
  startAfter = null,
  observe = [],
} = {}) => {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const recipes = await fetchCollection({
          collection: 'recipes',
          limit,
          startAfter,
          filters: [['online', '==', true]],
        })

        setRecipes(recipes)
        setLoading(false)
      } catch (e) {
        setError(error)
      }
    })()
  }, observe)

  return { loading, recipes, error }
}

const fetchCollection = async ({
  collection,
  startAfter,
  orderBy,
  limit = 25,
  filters = [],
}) => {
  let statement = firestore.collection(collection)

  if (orderBy) {
    statement = statement.orderBy(orderBy)
  }

  statement = statement.limit(limit)

  if (startAfter) {
    statement = statement.startAfter(startAfter)
  }

  filters.forEach(([field, operator, value]) => {
    statement = statement.where(field, operator, value)
  })

  const result = await statement.get()

  return result.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}
