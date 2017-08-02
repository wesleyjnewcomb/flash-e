import React from 'react'

const TextField = ({ placeholder, name, value, onChange }) => {
  let editField = e => {
    onChange(e.target.value)
  }
  return (
    <input type='text'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={editField}
    />
  )
}

export default TextField
