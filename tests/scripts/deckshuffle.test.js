/*
 * CLASS: DeckShuffleTest
 * 
 * INTENT:
 * The test case verifies that the initialized deck was shuffled successfully. The following
 * tests are performed by the class as part of this validation.
 * 
 * 1. Verify there are 52 cards in the deck after being shuffled (no cards lost).
 * 
 * 2. Verify that the initialized deck (before shuffling) and the shuffled deck are not
 * identical - i.e., the positions of all 52 cards in the non-shuffled deck must not be
 * the same as their positions in the shuffled deck.
 * 
 * The steps in the test case implicitly verify that the user can deal from an shuffled
 * deck, hence that test is not being explicitly added.
 * 
 * EXCLUSIONS
 * 1. A check to verify there are 13 cards of each suit type in a shuffled deck.
 * 
 * EXCLUSION REASON:
 * 
 * The check "Should show 13 cards per suit in an initialized deck." in DeckInit validates
 * there are 13 cards of each suit.
 * 
 * The check "Should have 52 cards in a shuffled deck." verifies no cards were lost
 * after shuffling. This implies there are 13 cards of each suit type even after the shuffle.
 * 
 * A check to verify there are 13 cards of each suit type in a shuffled deck was hence considered
 * a duplicate check, and was excluded.
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
const CardSuit = require('../../app/cardsuit');
const CardRank = require('../../app/cardrank');

//Define local constant values. These will follow the all-uppercase naming conventions.
const DECKSIZE = require('../../app/carddeck').DECKSIZE;


// Define the deck shuffling test suite.
mocha.describe('DeckShuffle: Validate shuffling of a card deck.', 
        function() {
    let cardDeck; // initialized to undefined.


    // Initialize the shuffled deck that will be used in this test.
    mocha.beforeEach(function() {
        cardDeck = new CardDeck();
        cardDeck.shuffleDeck();
    });


    // Verify there are 52 cards in the deck after being shuffled.
    mocha.it('Should have 52 cards in a shuffled deck.',
            function() {
        chai.assert.strictEqual(cardDeck.size(), DECKSIZE);
    });


    /*
     * Verify that the initialized deck (before shuffling) and the shuffled deck are not
     * identical - i.e., the positions of all 52 cards in the non-shuffled deck must not
     * be the same as their positions in the shuffled deck.
     * 
     * For this, we create another instance of the deck. We then compare
     * the positions of the cards in the stack and track the number of identical cards
     * with identical positions in both decks. The number of matching positions must be
     * 0 <= matchPos < 52.
     */
    mocha.it('Should verify positions of all cards in a shuffled and unshuffled decks' +
            ' are not identical', function() {
        let controlDeck = new CardDeck(); // un-shuffled deck.

        let matchingPos = 0;
        // tracks if identical cards have the same position in both decks.

        let cardIndex = DECKSIZE;
        // Starting position for tracking card indices. The card at DECKSIZE is at the 
        // top of the deck.

        let refCard = null;
        let ctrlCard = null;

        while (cardIndex > 0) {
            refCard = cardDeck.deal();
            ctrlCard = controlDeck.deal();

            if (refCard.compareTo(ctrlCard) === true) {
                matchingPos++;
            }

            cardIndex--;
        }

        chai.assert.isTrue((cardIndex < 52 && cardIndex >= 0));

        // Clear additional elements.
        controlDeck.length = 0;
        ctrlCard = null;
        refCard = null;
    });
});