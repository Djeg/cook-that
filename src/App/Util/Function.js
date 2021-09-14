import { evolve } from 'ramda'
// Define a simple delay function
export const delay = ms => new Promise(res => setTimeout(res, ms))

// Define the ability to create an action
export const action = ({ slice, name, reducer }) => {
  const type = `${slice}.${name}`

  function creator(payload) {
    return {
      type,
      payload,
    }
  }

  creator.toString = type
  creator.prototype.toString = type
  creator.type = type
  creator.reducer = (state, action) => ({
    ...state,
    [slice]: reducer(action)(state[slice]),
  })

  return creator
}

// combine reducers
export const createRootReducer = reducers => (state, action) =>
  reducers.reduce(
    (acc, creator) =>
      action.type === creator.type
        ? { ...acc, ...creator.reducer(acc, action) }
        : acc,
    state,
  )
