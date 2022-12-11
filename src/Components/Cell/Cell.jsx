import React from 'react'
import '../Cell/Cell.css'

export default function Cell({ cellID, cellContent, handleClick, cellStyle }) {
    return (
        <div data-id={cellID} onClick={handleClick} className={`cell ${cellStyle}`}>{cellContent}</div>
    )
}
