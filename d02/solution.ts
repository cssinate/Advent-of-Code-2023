/**
 * An elf has a 100 bags containing some number of red, green and blue cubes.
 * Each bag is a new game in which he pulls out a handful of cubes some number of times.
 * The data lists the games with the number of each color of cubes for each draw.
 * 
 * Part 1 says that any game where the bag is known to have more than 
 * 12 red, 13 green or 14 blue cubes is invalid.
 * The challenge is to sum the IDs (1-100) of the valid games.
 * 
 * Part 2 asks us to find the absolute minimum number of each color of cube each bag might contain,
 * create a "power" for that game by multiplying the three minimums,
 * and then summing all powers for all games.
 */

import { data } from './data'

type Result = {
    red: number;
    green: number;
    blue: number;
}

type Color = 'green' | 'red' | 'blue';

const gameData = data.split("\n");
let validGameSum: number = 0;
let gamePowerSum: number = 0;
const gameIdRegex = /Game (\d{1,3})/;
const resultRegex = /(\d{1,2}) (red|green|blue)/g;

const highestCriteria: Result = {
    red: 12,
    green: 13,
    blue: 14
};

const isValid = (color: Color, qty: number) => {
    if (qty <= highestCriteria[color]) return true;
    return false;
}
gameData.forEach((g, i) => {

    const gameId = Number(g.match(gameIdRegex)?.[1]) || i + 100;
    const gameResults = Array.from(g.matchAll(resultRegex));

    const highestResults: Result = {
        red: 0,
        green: 0,
        blue: 0
    };

    gameResults.forEach(r => {
        if (r[1] && r[2]) {
            const color = r[2] as Color;
            const qty = Number(r[1]);
            highestResults[color] = Math.max(qty, highestResults[color]);
        }
    });

    let gameIsValid = true;
    let gamePower = 1;

    for (const [color, qty] of Object.entries(highestResults)) {
        if (!isValid(color as Color, qty)) { gameIsValid = false; }
        gamePower = gamePower * qty;
    }

    if (gameIsValid) validGameSum = validGameSum + gameId;
    gamePowerSum = gamePowerSum + gamePower;
})

console.log('Part 1 answer: ', validGameSum);
console.log('Part 2 answer: ', gamePowerSum);