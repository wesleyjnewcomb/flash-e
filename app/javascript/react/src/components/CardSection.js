import React from 'react'

const CardSection = ({ cards, hidden }) => {
  let cardTiles = cards.map(card => {
    return (
      <tr key={card.id} className='card-tile'>
        <td className='small-6 columns side1'>{card.side1}</td>
        <td className='small-6 columns side2'>{card.side2}</td>
      </tr>
    )
  })
  let className = 'card-section' + (hidden ? ' hidden' : '')
  return (
    <div className={className}>
      <table>
        <tbody>
          <tr>
            <th className='small-6 columns side1'>Side 1</th>
            <th className='small-6 columns side2'>Side 2</th>
          </tr>
          {cardTiles}
        </tbody>
      </table>
    </div>
  )
}

export default CardSection
