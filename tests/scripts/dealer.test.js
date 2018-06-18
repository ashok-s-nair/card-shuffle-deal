/*
 * CLASS: DealerTest
 * 
 * ASSUMPTIONS:
 * 1. The logic assumes the number of players to be 3 - 8. These
 * values will be the lower and upper limits for the player numbers.
 * 
 * 2. The test assumes an initialized and shuffled deck, ready to be dealt.
 * 
 * INTENT:
 * This test validates the dealer. It verifies that, given a deck that has been initialized
 * and shuffled, a dealer can deal cards from the deck. The number of players are configured
 * by a JSON configuration file.
 * 
 * This test will perform the following validations:
 * 
 * 1. Verify that the number of players are between 3 to 8.
 * 
 * 2. Verify that each player gets an equal number of cards.
 * 
 * 3. Verify that, if the number of players does not exactly divide a deck, then the number
 * of unused cards is non-zero. E.g., if the number of players is 5, then each player gets
 * 10 cards and 2 cards remain unused.
 * 
 * 4. Verify that the set of cards dealt to player index 1 is returned if the user passes
 * a player index of zero.
 * 
 * EXCLUSIONS:
 * 1. A check to ensure every player had been dealt a unique card
 * 
 * EXCLUSION REASON:
 * 
 * The check "Should ensure each cards in an initialized deck is unique." in DeckInit verifies
 * all cards in a deck are unique. The dealer deals to players from these shuffled decks
 * containing unique cards.
 * 
 * A check in this class to ensure that every player had been dealt a unique card was
 * considered a duplicate check, and hence excluded.
 */
'use strict';

// Import the test and assertion libraries. These libraries will not change after the first
// initialization so they are being declared as constant references.
const mocha = require('mocha');
const chai = require('chai');

// Define local imports. These libraries will not change after the first
//initialization so they are being declared as constant references.
const PlayingCard = require('../../app/playingcard');
const CardDeck = require('../../app/carddeck').CardDeck;
const Dealer = require('../../app/dealer');

//Define local constant values. These will follow the all-uppercase naming conventions.
const DECKSIZE = require('../../app/carddeck').DECKSIZE;

// Import player numbers.
let playerConf = require('../configs/userconf.json');


//Define the dealer test suite.
mocha.describe('DealerTest: Validate dealing of a shuffled deck.',
        function() {
    let cardDeck; // initialized to undefined.
    let nPlayers;
    let dealer;


    // Initialize the shuffled deck that will be used in this test.
    mocha.beforeEach(function() {
        cardDeck = new CardDeck();
        cardDeck.shuffleDeck();
        nPlayers = parseInt(playerConf.numPlayers);
        dealer = new Dealer(cardDeck, nPlayers);
    });


    // Verify the number of players is between 3 & 8.
    mocha.it('Should ensure there are between 3 and 8 players.',
            function() {
        chai.assert.isTrue((nPlayers > 2 && nPlayers < 9));
    });


    // Verify that each player gets an equal number of cards.
    mocha.it('Should validate all players have the same number of cards.',
            function() {
        let cardsPerPlayer = Math.floor(DECKSIZE/ nPlayers);

        for (let pCount = 1; pCount <= nPlayers; pCount++) {
            chai.assert.strictEqual(dealer.getNumDealtCards(pCount), cardsPerPlayer);
        }
    });



     // Verify that the set of cards dealt to player 1 is returned if the user
     // passes a player index of zero.
    mocha.it('Should verify that passing a player index of zero returns the ' +
            'cards assigned to player index 1.', function() {
        chai.assert.strictEqual(dealer.getNumDealtCards(0),
                dealer.getNumDealtCards(1));
    });


    // Verify that, if the number of players does not exactly divide a deck, then the
    // number of unused cards is non-zero.
    mocha.it('Should verify when the number of players does not divide a deck' +
            ' the number of unused cards is non-zero.', function() {
        let unusedCount = DECKSIZE % nPlayers;
        chai.assert.strictEqual(dealer.getNumUnusedCards(), unusedCount);
    });


    // Clear the deck that will be used in this test.
    mocha.afterEach(function() {
        cardDeck = null;
        dealer = null;
    });


});