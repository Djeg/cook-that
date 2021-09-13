// Allow a reducer to inverse argument
// fredux :: s a. (a -> s -> s) -> (s, a) -> s
export const fredux = red => (s, a) => red(a)(s)
