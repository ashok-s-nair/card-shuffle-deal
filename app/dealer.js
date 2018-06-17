/**
 * The {@code Dealer} class defines a dealing algorithm that deals a deck of cards to a
 * defined number of users.
 * <p>
 * The dealer assigns cards to players in a round-robin method, ensuring that all players
 * receive an equal number of cards, and any cards that are not assigned to players are
 * considered unavailable for the game.
 */
'use strict';

//Define imports.
let PlayingCard = require('./playingcard');
let CardDeck = require('./carddeck').CardDeck;


/**
 * The constructor for the {@code Dealer} class. The constructor accepts as parameters
 * the number of players and the stack deck to be dealt.
 * <p>
 * It initializes the playing set with the given number of players and deals to all
 * players, while ensuring that the number of cards dealt to all players are equal.
 * <p>
 * Any remaining cards that were not dealt are marked unused and are unavailable to
 * deal.
 * 
 * @param cardDeck The shuffled deck of cards to be dealt
 * @param numPlayers The number of players in the game
 * @throws NullPointerException if {@code cardDeck} is null.
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
 * Returns the number of cards dealt to the specified player.
 * The player index is 1-based. The method returns the array of cards dealt to
 * player 1 if the parameter value of zero is passed.
 * 
 * @param playerIndex A number representing the player's index (starts at 1).
 * @return int The number of cards dealt to this player.
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
 * Returns the list of unused cards that remain after dealing.
 * 
 * @return int The number of unused cards that remain after dealing.
 */
Dealer.prototype.getNumUnusedCards = function() {
    return this._unusedCards.length;
};


//Export the Dealer class.
module.exports = Dealer;