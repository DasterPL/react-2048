import { useEffect, useState } from 'react';
import { isElementOfType } from 'react-dom/test-utils';
import Tile from '../components/Tile';

let count = 0;

export function useTiles(grid_size) {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Funtion to get awaliblable tiles
    function getAwaliblabeCells() {
        const cells = [];
        for (let i = 0; i < grid_size; i++) {
            for (let j = 0; j < grid_size; j++) {
                cells.push({ x: i, y: j });
            }
        }
        const filteredCells = cells.filter(cell => !tiles.some(tile => cell.x === tile.x && cell.y === tile.y));
        return filteredCells;
    }

    //create tille at random free cell witch value 2 or 4
    function createTile() {
        const freeCells = getAwaliblabeCells();
        const randomIndex = Math.floor(Math.random() * freeCells.length);
        const randomCell = freeCells[randomIndex];
        const randomValue = Math.random() < 0.9 ? 2 : 4;
        const key = count++;
        const newTile = { ...randomCell, value: randomValue, key, element: <Tile x={randomCell.x} y={randomCell.y} value={randomValue} className='tile' /> };
        return newTile;
    }

    function insertNewTile() {
        setTiles([...tiles, createTile(), createTile()]);
    }

    //select tiles by column and order them by row
    function selectTilesByColumn(column) {
        const tilesByColumn = tiles.filter(tile => tile.x === column);
        const sortedTilesByColumn = tilesByColumn.sort((a, b) => a.y - b.y);
        return sortedTilesByColumn;
    }
    //select tiles by row  and order them by column
    function selectTilesByRow(row) {
        const tilesByRow = tiles.filter(tile => tile.y === row);
        const sortedTilesByRow = tilesByRow.sort((a, b) => a.x - b.x);
        return sortedTilesByRow;
    }

    //change tile value
    function changeTileValue(tile, value, x, y) {
        tile.x = x;
        tile.y = y;
        tile.element = <Tile x={x} y={y} value={value} />;
        tile.value = value;
    }

    function moveTiles(direction) {
        const newTiles = [...tiles];
        let merged = false;
        let moved = false;
        for (let i = 0; i < grid_size; i++) {
            const tilesByRow = selectTilesByRow(i);
            const tilesByColumn = selectTilesByColumn(i);

            switch (direction) {
                case 'left':
                    for (let j = 0; j < tilesByRow.length; j++) {
                        const tile = tilesByRow[j];
                        const leftTile = tilesByRow[j - 1] || null;
                        if (leftTile && leftTile.value === tile.value) {
                            //merge tiles
                            changeTileValue(leftTile, leftTile.value * 2, leftTile.x, leftTile.y);
                            changeTileValue(tile, 0, leftTile.x, leftTile.y);
                            merged = true;
                            moved = true;
                        }
                        while (tile.x > 0 && (!leftTile || tile.x > leftTile.x + 1)) {
                            //move tile to the left
                            changeTileValue(tile, tile.value, tile.x - 1, tile.y);
                            moved = true;
                        }
                    }
                    break;
                case 'right':
                    for (let j = tilesByRow.length - 1; j >= 0; j--) {
                        const tile = tilesByRow[j];
                        const rightTile = tilesByRow[j + 1] || null;
                        if (rightTile && rightTile.value === tile.value) {
                            //merge tiles
                            changeTileValue(rightTile, rightTile.value * 2, rightTile.x, rightTile.y);
                            changeTileValue(tile, 0, rightTile.x, rightTile.y);
                            merged = true;
                            moved = true;
                        }
                        while (tile.x < grid_size - 1 && (!rightTile || tile.x < rightTile.x - 1)) {
                            //move tile to the right
                            changeTileValue(tile, tile.value, tile.x + 1, tile.y);
                            moved = true;
                        }
                    }
                    break;
                case 'up':
                    for (let j = 0; j < tilesByColumn.length; j++) {
                        const tile = tilesByColumn[j];
                        const upTile = tilesByColumn[j - 1] || null;
                        if (upTile && upTile.value === tile.value) {
                            //merge tiles
                            changeTileValue(upTile, upTile.value * 2, upTile.x, upTile.y);
                            changeTileValue(tile, 0, upTile.x, upTile.y);
                            merged = true;
                            moved = true;
                        }
                        while (tile.y > 0 && (!upTile || tile.y > upTile.y + 1)) {
                            //move tile to the up
                            changeTileValue(tile, tile.value, tile.x, tile.y - 1);
                            moved = true;
                        }
                    }
                    break;
                case 'down':
                    for (let j = tilesByColumn.length - 1; j >= 0; j--) {
                        const tile = tilesByColumn[j];
                        const downTile = tilesByColumn[j + 1] || null;
                        if (downTile && downTile.value === tile.value) {
                            //merge tiles
                            changeTileValue(downTile, downTile.value * 2, downTile.x, downTile.y);
                            changeTileValue(tile, 0, downTile.x, downTile.y);
                            merged = true;
                            moved = true;
                        }
                        while (tile.y < grid_size - 1 && (!downTile || tile.y < downTile.y - 1)) {
                            //move tile to the down
                            changeTileValue(tile, tile.value, tile.x, tile.y + 1);
                            moved = true;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        if (merged) {
            setScore(prevScore => prevScore + 1);
        }
        if (moved) {
            newTiles.push(createTile());
        }
        if (!moved && !merged && getAwaliblabeCells().length === 0) {
            setGameOver(true);
        }
        // setTiles(newTiles);
        setTiles(newTiles.filter(tile => tile.value !== 0));
    }

    return { tiles, moveTiles, insertNewTile, score, gameOver };
}