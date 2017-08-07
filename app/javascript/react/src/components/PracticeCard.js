import React from 'react'

const PracticeCard = ({ card, flipped, onClick }) => {
  let body = flipped ? card.side2 : card.side1
  return (
    <div className='card-container small-centered column'>
      <div className='practice-card' onClick={onClick}>
        <p className='text'>
          {body}
        </p>
      </div>
    </div>
  )
}

export default PracticeCard
