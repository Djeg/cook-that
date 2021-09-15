import React, { useEffect, useState } from 'react'
import styles from './StepPicker.module.css'

export default function StepPicker({
  steps: defaultSteps = [],
  onChange = () => null,
}) {
  const { steps, addStep, removeStep, changeStep } = useSteps(defaultSteps)

  useEffect(() => {
    onChange(steps)
  }, [steps])

  return (
    <>
      {steps.map((step, index) => (
        <div key={`step-${index}`} className={styles.container}>
          <div className={styles.firstLine}>
            <div className={styles.indicatorContainer}>
              <div className={styles.indicator}>
                <p>{index + 1}</p>
              </div>
            </div>
            <div className={styles.contentContainer}>
              <textarea
                onChange={e => changeStep(index, e.target.value)}
                value={step}
              ></textarea>
            </div>
          </div>
          <div className='form-control mgv-10'>
            <button className='btn btn-red' onClick={e => removeStep(index)}>
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <button className='btn' onClick={() => addStep('')}>
        Ajouter une étape
      </button>
    </>
  )
}

const useSteps = (defaultSteps = []) => {
  const [steps, setSteps] = useState([])

  return {
    steps,
    addStep: content => setSteps([...steps, content]),
    removeStep: index => setSteps(steps.filter((v, i) => i !== index)),
    changeStep: (index, content) =>
      setSteps(steps.map((s, i) => (i === index ? content : s))),
  }
}
