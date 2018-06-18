/**
 * @module cardsuit
 * @description Defines a map outlining the suits of the card in the deck.
 * @type {Map}
 * 
 * @author Ashok S. Nair
 */
'use strict';

const CardSuit = new Map([
    ['DIAMONDS', 0],
    ['CLUBS', 1],
    ['HEARTS', 2],
    ['SPADES', 3]
]);

module.exports = CardSuit;