/**
 * @module cardrank
 * @description Defines a map outlining the ranks of the card in the deck.
 * @type {Map}
 * 
 * @author Ashok S. Nair
 */
'use strict';

const CardRank = new Map([
    ['TWO', 2],
    ['THREE', 3],
    ['FOUR', 4],
    ['FIVE', 5],
    ['SIX', 6],
    ['SEVEN', 7],
    ['EIGHT', 8],
    ['NINE', 9],
    ['TEN', 10],
    ['JACK', 11],
    ['QUEEN', 12],
    ['KING', 13],
    ['ACE', 14]
]);

module.exports = CardRank;