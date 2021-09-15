import { useState } from 'react'

export const useFormField = initialValue => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  return {
    value,
    error,
    setField: ({ error, value }) => {
      if (error !== undefined) {
        setError(error)
      }

      if (value !== undefined) {
        setValue(value)
      }
    },
  }
}

export const useInputChangeOn = setField => ev =>
  setField({ error: '', value: ev.target.value })

export const useValueChangeOn = setField => value =>
  setField({ error: '', value })

export const useErrorChangeOn = setField => error => setField({ error })
