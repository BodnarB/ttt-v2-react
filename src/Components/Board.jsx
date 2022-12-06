import React, { useState, useEffect } from 'react'
import Info from './Info'
import Row from './Row'
import { v4 as uuidv4 } from 'uuid';

export default function Board() {
    const winPostions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    const [nextPlayer, setNextPlayer] = useState('x')
    const [board, setBoard] = useState(Array(9).fill(''))
    const [xPositions, setXpositions] = useState([])
    const [OPositions, setOpositions] = useState([])
    const [BO, setBO] = useState(3)  // This will be used later
    const [winner, setWinner] = useState('')
    const [results, setResults] = useState([])
    const [finalWinner, setFinalWinner] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
        if (winner !== '' && winner !== '-') {
            setResults([...results, winner])
        }
        if (winner !== '') {
            setDisabledButton(false)
        }
    }, [winner])

    useEffect(() => {
        if (results.length >= 2) {
            if (results.filter(res => res === 'x').length === 2) {
                setFinalWinner('x')
            }
            else if (results.filter(res => res === 'o').length === 2) {
                setFinalWinner('o')
            }
        }
    }, [results])

    useEffect(() => {
        function checkWinner() {
            if (finalWinner === '') {
                if (!board.includes('')) {
                    setWinner('-')
                }
                if (xPositions.length >= 3) {
                    winPostions.forEach((item, index) => {
                        let matchX = xPositions.filter(element => winPostions[index].includes(element))
                        if (matchX.length === 3) {
                            setWinner('x')
                        }
                    })
                }
                if (OPositions.length >= 3) {
                    winPostions.forEach((item, index) => {
                        let matchO = OPositions.filter(element => winPostions[index].includes(element))
                        if (matchO.length === 3) {
                            setWinner('o')
                        }
                    })
                }
            }
        }
        checkWinner()
    }, [board])

    useEffect(() => {
        if (finalWinner !== '') {
            setNextPlayer('-')
            setDisabledButton(true)
        }
    }, [finalWinner])

    function handleNewGame() {
        setBoard(Array(9).fill(''))
        setXpositions([])
        setOpositions([])
        setResults([])
        setWinner('')
        setNextPlayer('x')
        setFinalWinner('')
    }

    function handleNextGame() {
        setBoard(Array(9).fill(''))
        setDisabledButton(true)
        setXpositions([])
        setOpositions([])
        setWinner('')
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
            <Info
                nextPlayer={nextPlayer}
                newGame={handleNewGame}
                nextGame={handleNextGame}
                games={BO}
                disabledNext={disabledButton}
                results={results.map((item) => <p key={uuidv4()}>{item}</p>)}
            />
            <div className='board-container'>
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
                {winner === '-' && <p className='winner'>No winner</p>}
                {finalWinner !== '' && <p className='final-winner'>Final winner: {finalWinner}</p>}
            </div>
        </>
    )
}
