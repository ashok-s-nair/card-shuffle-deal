/**
 * @module carddeck
 * @author Ashok S. Nair
 * @description The CardDeck module defines a deck of cards.
 * The class implements methods to initialize, shuffle, deal and clear
 * a deck of cards. The size of the deck can be queried as well.
 */
'use strict';

// Define imports.
let CardSuit = require('./cardsuit');
let CardRank = require('./cardrank');

let PlayingCard = require('./playingcard');
let randomize = require('./randomize');

/**
 * @constant {number} DECKSIZE The size of the deck of cards.
 */
const DECKSIZE = 52;


/**
 * @constructor
 * @description It initializes an un-shuffled deck with 52 cards.
 */
function CardDeck() {
    this._cardDeck = [];

    for (let suit of CardSuit.keys()) {
        for (let rank of CardRank.keys()) {
            this._cardDeck.push(new PlayingCard(suit, rank));
        }
    }
}


/**
 * @function shuffleDeck
 * @description Shuffles the deck using the Fisher-Yates algorithm. Please see
 * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
 * for details. It does not accept parameters or return a value/ object.
 */
CardDeck.prototype.shuffleDeck = function() {
    /*
     * The Fisher-Yates shuffle algorithm is as follows:
     * (reference: https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm)
     * To shuffle an array a of n elements of indices 0 to n-1:
     *      for i from n−1 down to 1 do
     *          j ← random integer such that 0 ≤ j ≤ i
     *          exchange a[j] and a[i]
     */
    let rIndex = 0;
    let holdingRef = null;

    for (let sRef = DECKSIZE - 1; sRef > 0; sRef--) {
        rIndex = randomize.getRandomNumber(0, sRef);
        holdingRef = this._cardDeck[sRef - 1];
        this._cardDeck[sRef - 1] = this._cardDeck[rIndex];
        this._cardDeck[rIndex] = holdingRef;
    }
};


/**
 * @function deal
 * @description Deals (pops) a card from a non-empty deck; returns null otherwise.
 * @returns {(PlayingCard|null)}
 */
CardDeck.prototype.deal = function() {
    let retVal = null;

    if (this._cardDeck.length > 0) {
        retVal = this._cardDeck.pop();
    }

    return retVal;
};


/**
 * @function clear
 * @description Clears the deck and sets its size to zero.
 */
CardDeck.prototype.clear = function() {
    this._cardDeck.length = 0;
};


/**
 * @function size
 * @description Returns the number of cards on the deck.
 * @return {number}
 */
CardDeck.prototype.size = function() {
    return  this._cardDeck.length;
};


// Export the CardDeck class.
module.exports = {
        CardDeck : CardDeck,
        DECKSIZE : DECKSIZE
};