import React from 'react'

const PracticeCard = ({ card, flipped, onClick }) => {
  let body = flipped ? card.side2 : card.side1
  return (
    <div className='practice-card' onClick={onClick}>
      <h2 className='text-center'>
        {body}
      </h2>
    </div>
  )
}

export default PracticeCard
