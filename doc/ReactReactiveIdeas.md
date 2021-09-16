# Make react fully reactive

Let's deep dive into reactive react with a simple
counter example :

```js
// src/counter.js
import { action, when, do, useActionEvent } from '@reactive-react/core'
import React from 'react'

/**
 * Define the name of this reactive component.
 * This is an optional step to do (if no name is
 * provided then an random uniq id will be
 * generated). Therefor your will not be able to access
 * to some state element outside of this component
 * of you do not provide a name !
 *
 * @typedef name :: String
 */
export const name = 'counter'

/**
 * This is our initial state. A state MUST
 * be a Map of some data. Here it's just a simple
 * map of an amount.
 *
 * @typedef state :: { amount :: Number }
 */
export const state = { amount: 0 }

/**
 * Our first action wich increment the
 * state by one
 *
 * @typedef increment :: Action 'increment' state
 */
export const increment = action(
  // Define the name of the action
  when('increment'),
  // Define the reducer. It's a curried function
  do(amount => state => state.amount += 1),
)

/**
 * Our second action wich decrement the state
 * by one
 *
 * @typedef decrement :: Action 'increment' state
 */
export const decrement = action(
  when('increment'),
  do(amount => state => state.amount -= 1),
)

/**
 * Finally a simple component that will display
 * our state.
 *
 * @typedef view :: React.FcComponent { amount: state }
 */
export const View = ({ amount }) => (
  <div>
    <p>Counter : {increment}</p>
    {/* useActionEvent will trigger the action on click */}
    <button onClick={useActionEvent(increment)}>Increment</button>
    <button onClick={useActionEvent(decrement)}>Decrement</button>
  </div>
)
```

Finally in your application:

```js
// App.js
import React from 'react'
import * as Counter from './counter'
import { Provider, Render } from '@reactivr/react'

/**
 * @typedef App :: React.Component
 */
export default function App() {
  return (
    <Provider of={[Counter]}>
      <Render state={Counter} />
    </Provider>
  )
}
```

## Using effects

Bellow of more complexe example with a splash screen

```js
// src/splashScreen.js
import React from 'react'
import { effect, action, when, do, Reactive } from '@reactive-react/core'
import { act, delay } from '@reactive-react/effects'

/**
 * @typedef name :: String
 */
export const name = 'splashScreen'

/**
 * @typedef state :: { loading: Boolean, reason: String }
 */
export const state = { loading: false, reason: 'Loading the app...' }

/**
 * This is a simple change reason action
 *
 * @typedef changeReason :: Action 'changeReason' String
 */
export const changeReason = action(
  when('changeReason'),
  do(reason => state => state.reason = reason),
)

/**
 * This is a ready action wich put the loading
 * state to true
 *
 * @typedef ready :: Action 'ready' Void
 */
export const ready = action(
  when('ready'),
  do(() => state => state.loading = false),
)

/**
 * This action is performed when the component will
 * be displayed the first time. Note the "@", it's
 * a special action name wich allows you to execute
 * any code during the component mount.
 *
 * What you can see bellow is that you can attach
 * effects (generator functions using Eff)
 * wery easily to an action. This generator
 * will be triggered and produce some side effect
 * on your action. It's very similar to the
 * redux saga behavior.
 *
 * @typedef init :: Action '@init' state
 */
export const init = action(
  when('@init'),
  effect(function* onInit() {
    yield delay(1500)

    yield act(changeReason('Loading the app step2...'))

    yield delay(1500)

    yield act(changeReason('Welcome :)'))

    yield delay(1000)

    yield act(ready())
  }),
)

/**
 * @typedef View :: React.FcComponent { reason: string }
 */
export const View = ({ reason, children  }) => {
  if (children) return children

  return (
    <div>
      <img alt="loading spinner" src="./spinner.gif" />
      <p>{reason}</p>
    </div>
  )
}
```

And in the application:

```js
// src/App.js
import * as SplashScreen from './splashScreen'
import { Provider, Render } from '@reactivr/react'
import React from 'react'

export default function App() {
  return (
    <Provider of={[SplashScreen]}>
      <Render state={SplashScreen}>
        <h1>Welcome !</h1>
      </Render>
    </Provider>
  )
}
```

# Using form helpers

In order to dispatch actions easily, reactive react
comes with various hooks and functions to help
you handle the DOM Events.

For example you can use @reactive-react/forms in order
to create, update and handle form events and state
easily !

Let's take a basic example with a login form

```js
// src/loginForm.js
import { action, do, when, event } from '@reactive-react/core'
import { useActionEvent } from '@reactivr/react'
import { select, act, call } from '@reactive-react/effects'
import { doFillFormField, formField,  useChangeFieldEvent } from '@reactive-react/forms'
import React from 'react'

/**
 * @typedef name :: String
 */
export const name = 'loginForm'

/**
 * Let's define the shape of a login form
 * state
 *
 * @typedef FormField :: { value :: String, error :: String }
 *
 * @typedef state :: {
 *  emailField :: FormField
 *  passwordField :: FormField
 *  error :: String
 *  loading :: Boolean
 *  done :: Boolean
 * }
 */
export const state = {
  emailField: formField(),
  passwordField: formField(),
  error: '',
  loading: false,
  done: false,
}

/**
 * Fill the email field using the @reactive-react/form
 * helpers
 *
 * @typedef changeEmail :: Action 'changeEmeial' FormField
 */
export const changeEmail = action(
  when('changeEmail'),
  doFillFormField('emailField'),
)

/**
 * Fill the password field
 *
 * @typedef changeEmail :: Action 'changeEmeial' FormField
 */
export const changePassword = action(
  when('changePassword'),
  doFillFormField('passwordField'),
)

/**
 * We can also handle global error
 *
 * @typedef setError :: Action 'setError' String
 */
export const error = action(
  when('setError'),
  do(error => R.assoc('error', error)),
)

/**
 * Set the loading boolean
 *
 * @typedef load :: Action 'load' Boolean
 */
export const load = action(
  when('load'),
  do(loading => R.assoc('loading', loading)),
)

/**
 * Set the done state
 *
 * @typedef done :: Action 'done' Boolean
 */
export const done = action(
  when('done'),
  do(done => R.assoc('done', done)),
)

/**
 * Send the login form to some API's
 *
 * @typedef send :: Action 'send' Void
 */
export const send = action(
  when('send'),
  effect(function* sendLoginForm() {
    const { emailField, passwordField } = yield select()

    yield act(error(''))

    try {
      const response = yield call(sendLoginForm, emailField, passwordField)

      if (response.status !== 200) {
        throw Error()
      }

      yield act(load(false))
      yield act(done(true))
    } catch(e) {
      yield act(error('Invalid credentials'))
      yield act(load(false))
    }
  })
)

/**
 * Now we can create the view
 *
 * @typedef View :: React.Fc state
 */
const View = ({ emailField, passwordField, loading, done, error }) => (
  <form>
    <div className="form-control">
      <label htmlFor="email">Email:</label>
      {emailField.error && <p className="error">{emailField.error}</p>}
      <input type="email" value={emailField.value} onChange={useChangeFieldEvent(changeEmail)} />
    </div>
    <div className="form-control">
      <label htmlFor="password">Password:</label>
      {passwordField.error && <p className="error">{passwordField.error}</p>}
      <input type="password" value={passwordField.value} onChange={useChangeFieldEvent(changePassword)} />
    </div>
    <div className="form-control">
      {error && <p className='error'>{error}</p>}
      {loading && <img alt="spinner" src="./spinner.gif" />}
      {!loading && (
        <button onClick={useActionEvent(send)}>Send</button>
      )}
    </div>
  </form>
)
```

And finally connect this login form into your app

```js
import React from 'react'
import { Provider, Render } from '@reactivr/core'
import * as LoginForm from './loginForm'

export default function App() {
  return (
    <Provider of={[LoginForm]}>
      <Render state={LoginForm} />
    </Provider>
  )
}
```

## Reuses states of other components

Let's take back our counter example above
and try to retrieve it's state and call actions
outside of this component. For example, let's
try to get the state and actions working inside
a footer component

```js
import React from 'react'
import * as Counter from './counter'
import {
  Provider,
  Render,
  ForeignState,
  useActionEvent,
  useForeignState,
} from '@reactivr/react'

/**
 * Thanks to the ForeignState component usage, it's fairly simple
 * to use a foreign state
 */
export default function Footer() {
  /**
   * Thanks to this hooks, retrieving a foreign state is easy :
   */
  const { amount } = useForeignState(Counter)

  return (
    <footer>
      <p>The counter amount is (using useForeignState hooks) : {amount}</p>
      {/**
        You can also use the ForeignState component 
      */}
      <ForeignState state={Counter}>
        {({ amount: x }) => (
          <p>The counter amount is (using ForeignState component) : {x}</p>
        )}
      </ForeignState>
      {/*
        You can also dispatch any actions inside the counter
        just by calling the action using useActionEvent hooks
      */}
      <button onClick={useActionEvent(Counter.increment)}>increment</button>
      <button onClick={useActionEvent(Counter.decrement)}>decrement</button>
    </footer>
  )
}
```

And now let's code the glue : App

```js
import React from 'react'
import * as Counter from './counter'
import Footer from './footer'
import { Provider, Render } from '@reactivr'

export default function App() {
  return (
    <Provider of={[Counter]}>
      <Render state={Counter} />
      <Footer />
    </Provider>
  )
}
```

## How to use foreign state and actions in effects ?

Let's say we have a component wich must know, inside an effect,
the amount of the counter :

```js
import React from 'react'
import * as Counter from './counter'
import { action, do, when, effect } from '@reactivr/core'
import { selectForeign, delay, act } from '@reactivr/effects'

export const doSomethingWithForeignState = action(
  when('doSomething'),
  effect(function* doSomething() {
    // Simply use selectForeign in order to select
    // a foreign state inside effects
    const { amount } = yield selectForeign(Counter)

    yield delay(1500)

    yield act(Counter.increment())
  })
)
```

## How to handle states displayed plural times

Let's take an example : We have many counters displayed on the screens.
How can we access and modify the second counter ?

It's fairly simple too, you only need to

```js
// src/App.js
import React from 'react'
import * as Counter from './counter'
import Footer from './footer'
import { Provider, Render } from '@reactivr'

/**
 * Let's display 3 counters with an id on each
 */
export default function App() {
  return (
    <Provider of={[Counter]}>
      <Render state={Counter} id='first' />
      <Render state={Counter} id='second' />
      <Render state={Counter} id='third' />
      <Footer />
    </Provider>
  )
}
```

Now let's try to retrieve state and actions of the given
counters inside the footer

```js
import React from 'react'
import * as Counter from './counter'
import {
  ForeignState,
  useActionEventId,
  useForeignStateId,
} from '@reactivr/react'

/**
 * Thanks to the ForeignState component usage, it's fairly simple
 * to use a foreign state
 */
export default function Footer() {
  /**
   * We are retrieving the state of the counter with the id 'first'
   */
  const { amount } = useForeignStateId('first', Counter)

  return (
    <footer>
      <p>
        The first counter amount is (using useForeignState hooks) : {amount}
      </p>
      {/**
        Same thing here
      */}
      <ForeignState state={Counter} id='first'>
        {({ amount: x }) => (
          <p>
            The second counter amount is (using ForeignState component) : {x}
          </p>
        )}
      </ForeignState>
      {/*
        Thanks to 'useActionEventId' it's simple to dispatch an
        action on the counter with the id 'first' !
      */}
      <button onClick={useActionEventId('first', Counter.increment)}>
        increment
      </button>
      <button onClick={useActionEventId('first', Counter.decrement)}>
        decrement
      </button>
    </footer>
  )
}
```
