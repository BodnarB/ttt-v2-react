import React, { useState, useEffect } from 'react'
import Info from '../Info/Info'
import Row from '../Row/Row'
import '../Board/Board.css'
import { v4 as uuidv4 } from 'uuid'

export default function Board() {
    const winPostions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    const [gameStates, setGameStates] = useState({
        nextPlayer: 'x',
        board: Array(9).fill(''),
        xPositions: [],
        oPositions: [],
        BO: 3,
        winner: '',
        results: [],
        finalWinner: '',
        disabledButton: true,
        cellStyle: Array(9).fill('')
    })

    useEffect(() => {
        if (gameStates.winner !== '') {
            setGameStates({
                ...gameStates,
                disabledButton: false,
                results: [...gameStates.results, gameStates.winner]
            })
        }
    }, [gameStates.winner])

    useEffect(() => {
        if (gameStates.results.length >= 2) {
            if (gameStates.results.filter(res => res === 'x').length === 2) {
                setGameStates({
                    ...gameStates,
                    finalWinner: 'x'
                })
            } else if (gameStates.results.filter(res => res === 'o').length === 2) {
                setGameStates({
                    ...gameStates,
                    finalWinner: 'o'
                })
            }
        }
    }, [gameStates.results])

    function checkPlayer(player) {
        if (player.length >= 3) {
            winPostions.forEach((item, index) => {
                let match = player.filter(element => winPostions[index].includes(element))
                if (match.length === 3) {
                    let newWinner = ''
                    if (player === gameStates.xPositions) {
                        newWinner = 'x'
                    }
                    else if (player === gameStates.oPositions) {
                        newWinner = 'o'
                    }
                    let newStyle = gameStates.cellStyle
                    match.forEach((item) => {
                        newStyle[item] = 'win-bg'
                    })
                    setGameStates({
                        ...gameStates,
                        winner: newWinner,
                        cellStyle: newStyle
                    })
                }
            })
        }
    }

    useEffect(() => {
        function checkWinner() {
            if (gameStates.finalWinner === '') {
                if (!gameStates.board.includes('')) {
                    setGameStates({
                        ...gameStates,
                        winner: '-'
                    })
                }
                checkPlayer(gameStates.xPositions)
                checkPlayer(gameStates.oPositions)
            }
        }
        checkWinner()
    }, [gameStates.board])

    useEffect(() => {
        if (gameStates.finalWinner !== '') {
            setGameStates({
                ...gameStates,
                nextPlayer: '-',
                disabledButton: true
            })
        }
    }, [gameStates.finalWinner])

    function handleNewGame() {
        setGameStates({
            ...gameStates,
            cellStyle: Array(9).fill(''),
            board: Array(9).fill(''),
            xPositions: [],
            oPositions: [],
            results: [],
            winner: '',
            nextPlayer: 'x',
            finalWinner: ''
        })
    }

    function handleNextGame() {
        setGameStates({
            ...gameStates,
            cellStyle: Array(9).fill(''),
            board: Array(9).fill(''),
            disabledButton: true,
            xPositions: [],
            oPositions: [],
            winner: ''
        })
    }

    function handleClick(e) {
        if (gameStates.winner === '') {
            let targetCell = Number(e.target.dataset.id)
            if (gameStates.board[targetCell] === '') {
                let newBoard = [...gameStates.board]
                newBoard[targetCell] = gameStates.nextPlayer
                let newXPositions = [...gameStates.xPositions]
                let newOPositions = [...gameStates.oPositions]
                if (gameStates.nextPlayer === 'o') {
                    newOPositions.push(targetCell)
                } else {
                    newXPositions.push(targetCell)
                }
                setGameStates({
                    ...gameStates,
                    board: newBoard,
                    xPositions: newXPositions,
                    oPositions: newOPositions,
                    nextPlayer: gameStates.nextPlayer === 'o' ? 'x' : 'o'
                })
            }
        }
    }

    const cells = [0, 1, 2].map(rowIndex =>
        [0, 1, 2].map(colIndex => ({
            cellID: rowIndex * 3 + colIndex,
            cellContent: gameStates.board[rowIndex * 3 + colIndex],
            cellStyle: gameStates.cellStyle[rowIndex * 3 + colIndex]
        }))
    )

    return (
        <>
            <Info
                nextPlayer={gameStates.nextPlayer}
                newGame={handleNewGame}
                nextGame={handleNextGame}
                games={gameStates.BO}
                disabledNext={gameStates.disabledButton}
                results={gameStates.results.map(item => <p key={uuidv4()}>{item}</p>)}
            />
            <div className='board-container'>
                <div className='board'>
                    <Row cells={cells[0]} handleClick={handleClick} />
                    <Row cells={cells[1]} handleClick={handleClick} />
                    <Row cells={cells[2]} handleClick={handleClick} />
                </div>
                {gameStates.winner === '-' && <p className='winner'>There is no winner</p>}
                {gameStates.finalWinner !== '' && <p className='final-winner'>Final winner: {gameStates.finalWinner}</p>}
            </div>
        </>
    )
}
