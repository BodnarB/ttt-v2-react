import React from 'react'

export default function Cell({ cellID, cellContent, handleClick }) {
    return (
        <div data-id={cellID} onClick={handleClick} className='cell'>{cellContent}</div>
    )
}
