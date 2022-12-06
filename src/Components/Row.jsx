import React from 'react'
import Cell from './Cell'

export default function Row({ cell1ID, cell2ID, cell3ID, cell1Content, cell2Content, cell3Content, handleClick, cell1Style, cell2Style, cell3Style }) {
    return (
        <div className='row'>
            <Cell handleClick={handleClick} cellID={cell1ID} cellContent={cell1Content} cellStyle={cell1Style} />
            <Cell handleClick={handleClick} cellID={cell2ID} cellContent={cell2Content} cellStyle={cell2Style} />
            <Cell handleClick={handleClick} cellID={cell3ID} cellContent={cell3Content} cellStyle={cell3Style} />
        </div>
    )
}
