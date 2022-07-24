import React, { useEffect } from 'react'
import { useSwipeable } from 'react-swipeable';

import { useTiles } from '../utils/useTiles';

const grid_size = 4;

export default function Board({ onGameOver, onSetScore }) {
    const tiles = useTiles(grid_size);

    const swipeable = useSwipeable({
        preventScrollOnSwipe: true,
        onSwipedLeft: () => tiles.moveTiles('left'),
        onSwipedRight: () => tiles.moveTiles('right'),
        onSwipedUp: () => tiles.moveTiles('up'),
        onSwipedDown: () => tiles.moveTiles('down'),
    });

    //function to handle key press
    function handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                tiles.moveTiles('up');
                break;
            case 'ArrowDown':
                tiles.moveTiles('down');
                break;
            case 'ArrowLeft':
                tiles.moveTiles('left');
                break;
            case 'ArrowRight':
                tiles.moveTiles('right');
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        //create two random cells at the start of the game
        tiles.insertNewTile();
        tiles.insertNewTile();
    }, []);
    useEffect(() => {
        if (tiles.gameOver) {
            onGameOver();
        }
    }, [tiles.gameOver]);
    useEffect(() => {
        onSetScore(tiles.score);
    }, [tiles.score]);

    return <div className='board' style={{ "--grid-size": grid_size }} onKeyDown={handleKeyDown} {...swipeable} tabIndex={0}>
        {
            Array(grid_size * grid_size).fill(0).map((_, i) => <div className='cell' key={i}></div>)
        }
        {
            tiles.tiles.map((tile) => { return { ...tile.element, key: tile.key } })
        }
    </div>
}