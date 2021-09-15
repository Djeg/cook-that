import React, { useState, useEffect } from 'react'

export default function DifficultyPicker({ value, onChange = () => null }) {
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    if (value && !difficulty) {
      setDifficulty(value)
      return
    }

    onChange(difficulty)
  }, [difficulty])

  const handleChange = difficulty => () => setDifficulty(difficulty)

  return (
    <>
      <button
        className={`btn mgv-10 ${'easy' === difficulty && 'btn-green'}`}
        onClick={handleChange('easy')}
      >
        Facile
      </button>
      <button
        className={`btn mgv-10 ${'medium' === difficulty && 'btn-yellow'}`}
        onClick={handleChange('medium')}
      >
        Moyen
      </button>
      <button
        className={`btn mgv-10 ${'hard' === difficulty && 'btn-red'}`}
        onClick={handleChange('hard')}
      >
        Difficile
      </button>
    </>
  )
}
