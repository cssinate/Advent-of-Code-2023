/**
 * We receive a bunch of "codes", each being a string with some amount of letters and numbers.
 * 
 * Part 1 asks us to create a two-digit number for each code made up of the first digit and the last digit
 * (e.g. 1six7396484 => 14, 36qv => 36, fourzx1 => 11) and then sum all of the two-digit numbers.
 * 
 * Part 2 asks us to transform any string versions of numbers into their digit counterparts first before
 * recalculating the sum of all two-digit numbers.
 * This was a little tricky for a day one challenge since it wasn't explicitly clear in the problem
 * description/examples that `eightwo` should become `82` and not `8wo`.
 */

import { data } from './data';

const codeData = data.split("\n");

const numbers = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
}

const extractNumbers = (s: string) => {
    return Array.from(s.matchAll(/one|two|three|four|five|six|seven|eight|nine/g)).flat()
}

const produceSums = (part: number) => {
    return codeData.reduce((v, c) => {
        if (part === 2) {
            let numberMatches = extractNumbers(c);
            while (numberMatches.length) {
                numberMatches.forEach(number => {
                    c = c.replace(number, numbers[number as keyof typeof numbers]);
                })
                numberMatches = extractNumbers(c);
            }
        }

        const match = Array.from(c.matchAll(/\d/g))
        const allDigits = match.flat();
        const f = allDigits[0];
        const l = allDigits.at(-1);
        return Number(`${f}${l}`) + v;
    }, 0)
}

console.log('Part 1 answer: ', produceSums(1));
console.log('Part 2 answer: ', produceSums(2));