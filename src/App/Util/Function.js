import { evolve } from 'ramda'
// Define a simple delay function
export const delay = ms => new Promise(res => setTimeout(res, ms))

// Define the ability to create an action
export const action = ({ slice, name, reducer }) => {
  const creator = payload => ({
    type: name,
    payload,
  })

  creator.toString = `${slice}.${name}`
  creator.reducer = (state, action) => ({
    ...state,
    [slice]: reducer(action)(state[slice]),
  })

  return creator
}

// combine reducers
export const createRootReducer = reducers => (state, action) =>
  reducers.reduce(
    (acc, creator) => ({ ...acc, ...creator.reducer(state, action) }),
    state,
  )
