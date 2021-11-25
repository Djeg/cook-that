import { setLogLevel } from '@firebase/app'
import { useEffect, useState } from 'react'

export default function Counter() {
  const [counter, setCounter] = useState(0)
  const [ms, setMs] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [startChrono, setStartChrono] = useState(false)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0)
      setMinutes(minutes => minutes + 1)
    }
  }, [seconds])

  useEffect(() => {
    if (ms >= 100) {
      setMs(0)
      setSeconds(seconds => seconds + 1)
    }
  }, [ms])

  useEffect(() => {
    if (startChrono === false) {
      if (timer) {
        clearInterval(timer)
      }

      return
    }

    setTimer(
      setInterval(() => {
        setMs(ms => ms + 1)
      }, 10),
    )
  }, [startChrono])

  return (
    <div>
      <p>
        Chronomètre : {formatTime(minutes)}:{formatTime(seconds)}:
        {formatTime(Math.round((ms / 100) * 60))}
      </p>
      <button
        onClick={() => {
          setStartChrono(true)
        }}
      >
        Démarer le Chronomètre
      </button>
      <button
        onClick={() => {
          setStartChrono(false)
        }}
      >
        Arréter le Chronomètre
      </button>
      <button
        onClick={() => {
          setMs(0)
          setSeconds(0)
          setMinutes(0)
        }}
      >
        Remettre le chrono à 00:00:00
      </button>
      <p>Le conteur est à {counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        Augmenter
      </button>
      <button
        onClick={() => {
          setCounter(counter - 1)
        }}
      >
        Diminuer
      </button>
      <button
        onClick={() => {
          setCounter(0)
        }}
      >
        Remettre à zero
      </button>
    </div>
  )
}

const formatTime = amount => (amount < 10 ? '0' + amount : amount)
