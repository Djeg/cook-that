// Allow a reducer to inverse argument
// makeReducer :: s a. (a -> s -> s) -> (s, a) -> s
export const makeReducer = red => (s, a) => red(a)(s)
