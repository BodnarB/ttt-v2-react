import React from 'react'

export default function Info({ nextPlayer, newGame }) {
    return (
        <div className='info'>
            <h2>Tic Tac Toe</h2>
            <button className='new-game-btn' onClick={newGame}>New game</button>
            <p className='next-player'>Next player: {nextPlayer}</p>
        </div>
    )
}
