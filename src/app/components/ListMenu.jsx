'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

export default function ListMenu(props) {
  const { name, value, onChange } = { ...props }
  const [nameLabel, setNameLabel] = useState('')

  const getInfoCombo = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_MENUDO}${
          process.env.NEXT_PUBLIC_URI_MENUS
        }getCombo?id=${value}&type=${1}`
      )
      .then((res) => {
        console.log(res.data.data)
        setNameLabel(
          res.data.data != undefined && res.data.data != null
            ? res.data.data.name
            : ''
        )
      })
      .catch(console.log)
  }
  useEffect(() => {
    getInfoCombo()
  })

  return (
    <div>
      <Form.Control
        // readOnly={true}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type='text'
      />
      <Form.Control
        id='nameControl'
        value={nameLabel}
        name={'nameControl'}
        type='text'
        disabled={true}
        readOnly={true}
      />
    </div>
  )
}
