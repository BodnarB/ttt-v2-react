import React, { useState, useEffect } from 'react'
import Info from '../Info/Info'
import Row from '../Row/Row'
import '../Board/Board.css'
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
    const [cellStyle, setCellStyle] = useState(Array(9).fill(''))

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

    function checkPlayer(player) {
        if (player.length >= 3) {
            winPostions.forEach((item, index) => {
                let match = player.filter(element => winPostions[index].includes(element))
                if (match.length === 3) {
                    if (player === xPositions) {
                        setWinner('x')
                    }
                    else if (player === OPositions) {
                        setWinner('o')
                    }
                    let newStyle = cellStyle
                    match.forEach((item) => {
                        newStyle[item] = 'win-bg'
                    })
                    setCellStyle(newStyle)
                }
            })
        }
    }

    useEffect(() => {
        function checkWinner() {
            if (finalWinner === '') {
                if (!board.includes('')) {
                    setWinner('-')
                }
                checkPlayer(xPositions)
                checkPlayer(OPositions)
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
        setCellStyle(Array(9).fill(''))
        setBoard(Array(9).fill(''))
        setXpositions([])
        setOpositions([])
        setResults([])
        setWinner('')
        setNextPlayer('x')
        setFinalWinner('')
    }

    function handleNextGame() {
        setCellStyle(Array(9).fill(''))
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

    const cells = [0, 1, 2].map(rowIndex =>
        [0, 1, 2].map(colIndex => ({
            cellID: rowIndex * 3 + colIndex,
            cellContent: board[rowIndex * 3 + colIndex],
            cellStyle: cellStyle[rowIndex * 3 + colIndex]
        }))
    )

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
                    <Row cells={cells[0]} handleClick={handleClick} />
                    <Row cells={cells[1]} handleClick={handleClick} />
                    <Row cells={cells[2]} handleClick={handleClick} />
                </div>
                {winner === '-' && <p className='winner'>There is no winner</p>}
                {finalWinner !== '' && <p className='final-winner'>Final winner: {finalWinner}</p>}
            </div>
        </>
    )
}
