import React from 'react'

import TextField from './TextField'

const EditCardTile = ({ cardData, onChange, onDelete, moveUp, moveDown }) => {
  let editSide1 = e => {
    let value = e.target.value
    onChange(cardData.id, 'side1', value)
  }
  let editSide2 = e => {
    let value = e.target.value
    onChange(cardData.id, 'side2', value)
  }
  let deleteCard = () => {
    onDelete(cardData.id)
  }

  let upArrowClass = "fa fa-chevron-up" + (moveUp ? "" : " hidden")
  let downArrowClass = "fa fa-chevron-down" + (moveDown ? "" : " hidden")

  return (
    <div className='card-tile panel secondary row collapse medium-uncollapse'>
      <div className='hide-for-small-only medium-2 large-1 columns text-right'>
        <i className={upArrowClass}
          onClick={moveUp}
          aria-hidden="true"
        ></i>
        <br/>
        <i className={downArrowClass}
          onClick={moveDown}
          aria-hidden="true"
        ></i>
      </div>
      <div className='small-9 medium-8 large-10 columns'>
        <div className='row'>
          <div className='small-12 medium-6 columns'>
            <TextField
              placeholder='Side 1'
              name={`card-${cardData.id} side1`}
              value={cardData.side1}
              onChange={editSide1}
            />
          </div>
          <div className='small-12 medium-6 columns'>
            <TextField
              placeholder='Side 2'
              name={`card-${cardData.id} side2`}
              value={cardData.side2}
              onChange={editSide2}
            />
          </div>
        </div>
      </div>
      <div className='small-3 medium-2 large-1 columns'>
        <button className='button alert tiny' onClick={deleteCard}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
}

export default EditCardTile
