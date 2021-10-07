import React, { useState, useEffect } from 'react'
import SelectBox from '../../Util/Component/SelectBox'
import styles from './IngredientPicker.module.css'

const INGREDIENT_UNITS = {
  NONE: 'aucune',
  GRAMMES: 'grammes',
  CAC: 'c.à.c',
  CAS: 'c.à.s',
}

export default function IngredientPicker({
  ingredients: defaultIngredients = [],
  onChange = () => null,
}) {
  const { ingredients, addIngredient, removeIngredient, changeIngredient } =
    useIngredients(defaultIngredients)

  useEffect(() => {
    onChange(ingredients)
  }, [ingredients])

  return (
    <>
      {ingredients.map((ingredient, index) => (
        <div key={`ingredient-${index}`} className={styles.ingredientContainer}>
          <div className='form-control'>
            <input
              type='text'
              value={ingredient.name}
              onChange={e =>
                changeIngredient(index, {
                  name: e.target.value,
                })
              }
              placeholder="nom de l'ingrédient"
            />
          </div>
          <div className={styles.group}>
            <div className='form-control'>
              <label>Quantité :</label>
              <input
                type='number'
                value={ingredient.quantity}
                onChange={e =>
                  changeIngredient(index, {
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className='form-control'>
              <label>Unité :</label>
              <SelectBox
                onChange={e =>
                  changeIngredient(index, {
                    unit: e.target.value,
                  })
                }
              >
                {Object.entries(INGREDIENT_UNITS).map(([key, name]) => (
                  <option
                    key={`ingredient-${index}-unit-${key}`}
                    selected={ingredient.unit === name}
                    value={name}
                  >
                    {name}
                  </option>
                ))}
              </SelectBox>
            </div>
          </div>
          <div className='form-control'>
            <button
              className='btn btn-red'
              onClick={e => removeIngredient(index)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <button
        className='btn'
        onClick={() =>
          addIngredient({
            name: '',
            quantity: 0,
            unit: INGREDIENT_UNITS.NONE,
          })
        }
      >
        Ajouter un ingrédient
      </button>
    </>
  )
}

const useIngredients = (defaultIngredients = []) => {
  const [ingredients, setIngredients] = useState(defaultIngredients)

  return {
    ingredients,
    addIngredient: ({ name, quantity, unit }) =>
      setIngredients([...ingredients, { name, quantity, unit }]),
    removeIngredient: index =>
      setIngredients(ingredients.filter((v, i) => i !== index)),
    changeIngredient: (index, ingredient) =>
      setIngredients(
        ingredients.map((ig, i) =>
          i === index ? { ...ig, ...ingredient } : ig,
        ),
      ),
  }
}
