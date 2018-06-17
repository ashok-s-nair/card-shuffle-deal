/**
 * The {@code CardDeck} class defines a deck of cards. It implements methods to initialize,
 * shuffle, deal and clear a deck of cards. The size of the deck can be queried as well.
 */
'use strict';

// Define imports.
let CardSuit = require('./cardsuit');
let CardRank = require('./cardrank');

let PlayingCard = require('./playingcard');
let randomize = require('./randomize');

// Define constants.
const DECKSIZE = 52;


/**
 * The constructor for the {@code CardDeck} class. The constructor initializes the deck
 * by populating it with the 52 playing cards. The constructor does not shuffle the deck
 * during initialization.
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
 * This method shuffles the deck of cards using an implementation of the Fisher-Yates
 * shuffle algorithm. For details of the algorithm, please see:
 * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
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
 * This method deals (pops) a card from a non-empty deck.
 * 
 * @return PlayingCard if the deck is not empty
 * @return null if the deck is empty
 */
CardDeck.prototype.deal = function() {
    let retVal = null;

    if (this._cardDeck.length > 0) {
        retVal = this._cardDeck.pop();
    }

    return retVal;
};


/**
 * This method clears the deck.
 */
CardDeck.prototype.clear = function() {
    this._cardDeck.length = 0;
};


/**
 * This method returns the number of cards on the deck.
 * 
 * @return int The number of cards on the deck.
 */
CardDeck.prototype.size = function() {
    return  this._cardDeck.length;
};


// Export the CardDeck class.
module.exports = {
        CardDeck : CardDeck,
        DECKSIZE : DECKSIZE
};