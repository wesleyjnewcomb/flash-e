import React from 'react'

const TextField = ({ label, placeholder, name, value, onChange }) => {
  let labelElement;
  if (label) {
    labelElement = <label htmlFor={name}>{label}</label>
  }
  return (
    <div>
      {labelElement}
      <input type='text'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextField
