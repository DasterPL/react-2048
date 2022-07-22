import React from 'react'

export default function Tile({ x, y, value }) {
    const power = Math.log2(value);
    const backgroundLightness = 100 - power * 9;
    const textLightness = backgroundLightness < 50 ? 90 : 10;
    return <div
        style={{
            '--x': x,
            '--y': y,
            '--background-lightness': `${backgroundLightness}%`,
            '--text-lightness': `${textLightness}%`
        }}
        className='tile'>
        {value}
    </div>
}