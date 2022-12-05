import React, { useState, useEffect } from 'react'
import Info from './Info'
import Row from './Row'


export default function Board() {
    const winPostions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    const [nextPlayer, setNextPlayer] = useState('x')
    const [board, setBoard] = useState(Array(9).fill(''))
    const [xPositions, setXpositions] = useState([])
    const [OPositions, setOpositions] = useState([])
    const [winner, setWinner] = useState('')

    useEffect(() => {
        function checkWinner() {
            if (!board.includes('')) {
                setWinner('-')
            }
            if (xPositions.length >= 3) {
                winPostions.map((item, index) => {
                    let matchX = xPositions.filter(element => winPostions[index].includes(element))
                    if (matchX.length === 3) {
                        setWinner('x')
                    }
                })
            }
            if (OPositions.length >= 3) {
                winPostions.map((item, index) => {
                    let matchO = OPositions.filter(element => winPostions[index].includes(element))
                    if (matchO.length === 3) {
                        setWinner('o')
                    }
                })
            }
        }
        checkWinner()
    }, [board])

    function handleNewGame() {
        setBoard(Array(9).fill(''))
        setXpositions([])
        setOpositions([])
        setWinner('')
        setNextPlayer('x')
    }

    function handleClick(e) {
        if (winner === '') {
            let targetCell = Number(e.target.dataset.id)
            if (board[targetCell] === '') {
                let newBoard = [...board]
                newBoard[targetCell] = nextPlayer
                if (nextPlayer === 'o') {
                    setOpositions([...OPositions, targetCell])
                    setNextPlayer('x')
                }
                else {
                    setXpositions([...xPositions, targetCell])
                    setNextPlayer('o')
                }
                setBoard(newBoard)
            }
        }
    }

    return (
        <>
            <Info nextPlayer={nextPlayer} newGame={handleNewGame} />
            <div className='board'>
                <Row handleClick={handleClick}
                    cell1ID={0} cell1Content={board[0]}
                    cell2ID={1} cell2Content={board[1]}
                    cell3ID={2} cell3Content={board[2]}
                />
                <Row handleClick={handleClick}
                    cell1ID={3} cell1Content={board[3]}
                    cell2ID={4} cell2Content={board[4]}
                    cell3ID={5} cell3Content={board[5]}
                />
                <Row handleClick={handleClick}
                    cell1ID={6} cell1Content={board[6]}
                    cell2ID={7} cell2Content={board[7]}
                    cell3ID={8} cell3Content={board[8]}
                />
            </div>
            {winner !== '' && <p className='winner'>The winner: {winner}</p>}
        </>
    )
}
