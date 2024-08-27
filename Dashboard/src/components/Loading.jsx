import React from 'react'
import { PacmanLoader } from 'react-spinners';

function Loading() {
    return (
        <div>
            <PacmanLoader
                color="rgba(251, 138, 0, 1)"
                size={40}
                speedMultiplier={1}
            />
        </div>
    )
}

export default Loading
