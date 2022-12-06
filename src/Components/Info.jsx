import React from 'react'


export default function Info({ nextPlayer, newGame, nextGame, games, results }) {
    return (
        <div className='info'>
            <h2>Tic Tac Toe</h2>
            <div className='btn-container'>
                <button className='game-btn new-game' onClick={newGame}>New game</button>
                <button className='game-btn next-game' onClick={nextGame}>Next game</button>
            </div>
            <div className='game-info'>
                <p className='best-of'>Best of {games}</p>
                <p className='results-p'>Results</p>
                <div className='results-list'>{results}</div>
            </div>
            <p className='next-player'>Next player: {nextPlayer}</p>
        </div >
    )
}
