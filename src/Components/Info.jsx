import React from 'react'

export default function Info({ nextPlayer, newGame }) {
    return (
        <div className='info'>
            <h3>Tic Tac Toe</h3>
            <button className='new-game-btn' onClick={newGame}>New game</button>
            <p>Next player: {nextPlayer}</p>
        </div>
    )
}
