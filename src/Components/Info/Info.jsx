import React from 'react'
import '../Info/Info.css'

export default function Info({ nextPlayer, newGame, nextGame, games, results, disabledNext }) {
    return (
        <div className='info'>
            <h1>Tic Tac Toe</h1>
            <button className='game-btn new-game' onClick={newGame}>New game</button>
            <div className='game-info'>
                <p className='best-of'>Best of {games}</p>
                <p className='results-p'>Results</p>
                <div className='results-list'>{results}</div>
                <button className='game-btn next-game' disabled={disabledNext} onClick={nextGame}>Next game</button>
            </div>
            <div className='next-player'>
                <p>Next player:</p><p> {nextPlayer}</p>
            </div>
        </div >
    )
}
