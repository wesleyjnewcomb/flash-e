import React from 'react'

import TextField from './TextField'

const EditCardTile = ({ cardData, onChange, onDelete }) => {
  let editSide1 = value => {
    onChange(cardData.id, 'side1', value)
  }
  let editSide2 = value => {
    onChange(cardData.id, 'side2', value)
  }
  let deleteCard = () => {
    onDelete(cardData.id)
  }

  return (
    <div className='edit-card-tile row'>
      <div className='medium-6 columns'>
        <div className='row'>
          <div className='small-1 columns'>order</div>
          <div className='small-11 columns'>
            <TextField
              placeholder='Side 1'
              name={`card-${cardData.id} side1`}
              value={cardData.side1}
              onChange={editSide1}
            />
          </div>
        </div>
      </div>
      <div className='medium-6 columns'>
        <div className='row'>
          <div className='small-11 columns'>
            <TextField
              placeholder='Side 2'
              name={`card-${cardData.id} side2`}
              value={cardData.side2}
              onChange={editSide2}
            />
          </div>
          <div className='small-1 columns'>
            <button className='button alert tiny' onClick={deleteCard}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCardTile
