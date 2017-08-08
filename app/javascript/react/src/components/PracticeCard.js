import React from 'react'

const PracticeCard = ({ card, flipped, onClick }) => {
  let flippedClass = flipped ? 'flipped' : ''
  return (
    <div className={`card-container ${flippedClass} small-centered column`}>
      <div className='practice-card' onClick={onClick}>
        <p className='front'>
          {card.side1}
        </p>
        <p className='back'>
          {card.side2}
        </p>
      </div>
    </div>
  )
}

export default PracticeCard
