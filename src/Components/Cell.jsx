import React from 'react'

export default function Cell({ cellID, cellContent, handleClick, cellStyle }) {
    return (
        <div data-id={cellID} onClick={handleClick} className={`cell ${cellStyle}`}>{cellContent}</div>
    )
}
