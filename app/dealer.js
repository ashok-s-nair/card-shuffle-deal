/**
 * @module dealer
 * @author Ashok S. Nair
 * 
 * @description Defines a dealer dealing from a deck to a given number of users.
 * The dealer assigns cards to players in a round-robin method, ensuring
 * that all players receive an equal number of cards, and any cards that
 * are not assigned to players are considered unavailable for the game.
 */
'use strict';

//Define imports.
let PlayingCard = require('./playingcard');
let CardDeck = require('./carddeck').CardDeck;


/**
 * @constructor
 * @description A dealer deals from a shuffled deck with 52 cards. It deals to all
 * players, ensuring an equal number of cards dealt to each player.
 * Any remaining cards that were not dealt are marked unused/ unavailable.
 * 
 * @param {CardDeck} cardDeck The shuffled deck of cards to be dealt
 * @param {number} numPlayers The number of players in the game
 * @throws Throws an error for one or more invalid inputs.
 */
function Dealer(cardDeck, nPlayers) {
    if (cardDeck === null || (cardDeck instanceof CardDeck) === false ||
            isNaN(nPlayers) === true || nPlayers < 1) {
        throw new Error("Invalid parameters received for Dealer initialization.");
    }

    // This 2-D array is initialized as handsPerPlayer[numPlayers][cardsPerPlayer]
    this._handsPerPlayer = null;
    this._unusedCards = null;

    const CARDSPERPLAYER = Math.floor(cardDeck.size()/ nPlayers);
    const NODEALCARDS = cardDeck.size() % nPlayers;

    this._handsPerPlayer = new Array(nPlayers);
    for (let cpp = 0; cpp < nPlayers; cpp++) {
        this._handsPerPlayer[cpp] = new Array(CARDSPERPLAYER);        
    }

    for (let cardCount = 0; cardCount < CARDSPERPLAYER; cardCount++) {
        for (let playCount = 0; playCount < nPlayers; playCount++) {
            this._handsPerPlayer[playCount][cardCount] = cardDeck.deal();
        }
    }

    this._unusedCards = [];
    while (cardDeck.size() > 0) {
        this._unusedCards.push(cardDeck.deal());
    }
}


/**
 * @function getNumDealtCards
 * @description Returns the number of cards dealt to the specified player.
 * 
 * @param {number} playerIndex A number representing the player index (starts at 1).
 * @return {number}
 */
Dealer.prototype.getNumDealtCards = function(playerId) {
    let retVal = 0;

    if (playerId === 0) {
        retVal = this._handsPerPlayer[0].length;
    } else {
        retVal = this._handsPerPlayer[playerId - 1].length;
    }

    return retVal;
};


/**
 * @function getNumUnusedCards
 * @description Returns the number of unused cards that remain after dealing.
 * 
 * @return {number}
 */
Dealer.prototype.getNumUnusedCards = function() {
    return this._unusedCards.length;
};


//Export the Dealer class.
module.exports = Dealer;