import React from 'react'
import Cell from '../Cell/Cell'
import '../Row/Row.css'
import { v4 as uuidv4 } from 'uuid';

export default function Row({ cells, handleClick }) {
    return (
        <div className="row">
            {cells.map(({ cellID, cellContent, cellStyle }) => (
                <Cell
                    key={uuidv4()}
                    handleClick={handleClick}
                    cellID={cellID}
                    cellContent={cellContent}
                    cellStyle={cellStyle}
                />
            ))}
        </div>
    );
}