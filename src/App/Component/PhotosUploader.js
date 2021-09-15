import React, { useEffect, useState } from 'react'
import styles from './PhotosUploader.module.css'

export default function PhotosUploader({
  id = 'photos',
  onError = () => null,
  onChange = () => null,
}) {
  const [photo, setPhoto] = useState(null)
  const [photoName, setPhotoName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!error) return

    onError(error)
  }, [error])

  const handleFileChange = ev => {
    const files = ev.target.files

    if (!files.length) return setError('Vous devez attacher un fichier valide')

    const photo = files[0]

    const fileReader = new FileReader()

    fileReader.readAsDataURL(photo)
    fileReader.addEventListener('load', e => {
      setPhoto(e.target.result)
      setPhotoName(photo.name)
      onChange(photo)
    })
  }

  const removeFile = () => {
    setPhotoName('')
    setPhoto(null)
  }

  if (!photo) {
    return (
      <>
        <label htmlFor={id} className={styles.noPhotosContainer}>
          <input
            type='file'
            id={id}
            className={styles.fileInput}
            onChange={handleFileChange}
            accept='image/*'
          />
          <i className='far fa-images'></i>
        </label>
      </>
    )
  }

  return (
    <>
      <div className={styles.preview}>
        <input
          type='file'
          id={id}
          className={styles.fileInput}
          onChange={handleFileChange}
          accept='image/*'
        />
        <img alt={photoName} src={photo} />
      </div>
      <button className='btn btn-red' onClick={removeFile}>
        Retirer
      </button>
    </>
  )
}
