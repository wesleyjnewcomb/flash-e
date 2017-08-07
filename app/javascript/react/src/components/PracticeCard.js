import React from 'react'

const PracticeCard = ({ card, flipped, onClick }) => {
  let body = flipped ? card.side2 : card.side1
  return (
    <div className='card-container small-centered column'>
      <div className='practice-card' onClick={onClick}>
        <div className='text'>
          {body}
        </div>
      </div>
    </div>
  )
}

export default PracticeCard
