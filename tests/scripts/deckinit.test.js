/*
 * CLASS: DeckInitializationTest
 * 
 * INTENT:
 * The test case verifies that the deck was initialized successfully. The following
 * tests are performed by the class as part of this validation.
 * 
 * 1. Verify there are 52 cards in the deck after being initialized.
 * 
 * 2. Since the deck is initialized in a given order, and the constructor does not shuffle
 * the deck, verify that the order of cards populated in the deck is the same as the order
 * in which the deck was initialized.
 * 
 * 3. Verify that each card in the deck is unique.
 * 
 * 4. Verify that clearing the deck sets the number of cards in the deck to zero.
 * 
 * 5. Verify that an attempt to deal from an empty deck returns a null PlayingCard object.
 * 
 * 6. Verify that an initialized deck has exactly 13 cards of each suit.
 * 
 * The steps in the test case implicitly verify that the player can deal from an non-shuffled
 * deck, hence that test is not being explicitly added.
 * 
 * EXCLUSIONS:
 * None
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


// Define the deck initialization test suite.
mocha.describe('DeckInit: Validate initialization of a card deck.', 
        function() {
    let cardDeck; // initialized to undefined.

    // Initialize the deck that will be used in this test.
    mocha.beforeEach(function() {
        cardDeck = new CardDeck();
    });


    // Verify there are 52 cards in the deck after being initialized.
    mocha.it('Should verify 52 cards present in the deck after being initialized.',
            function() {
        chai.assert.strictEqual(cardDeck.size(), DECKSIZE);
    });


    /*
     * The CardSuit defines the following order: DIAMONDS, CLUBS, HEARTS, SPADES.
     * The CardRank defines the following order:
     * TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE.
     * 
     * The card deck constructor does not shuffle the deck during initialization. Also,
     * the card deck is a stack. This implies that the stack gets populated in the LIFO
     * order as follows:
     * 1. TWO OF DIAMONDS
     * 2. THREE OF DIAMONDS
     * 3. FOUR OF DIAMONDS, ...
     * ....
     * 48. TEN OF SPADES
     * 49. JACK OF SPADES
     * 50. QUEEN OF SPADES
     * 51. KING OF SPADES
     * 52. ACE OF SPADES
     * 
     * This test verifies that the initialization order of the deck is as expected, by
     * comparing that the five cards at the top of the stack are as outlined in 52 - 48
     * in the above list (in that order, i.e., the topmost card is an ace of spades).
     * 
     * The test will also verify that the last card in the stack is a TWO OF DIAMONDS.
     */
    mocha.it('Should verify the order of cards on an initialized deck.',
            function() {
        let holdingCard;

        // Define the reference cards used in this test.
        const ACEOFSPADES = new PlayingCard('SPADES', 'ACE');
        const KINGOFSPADES = new PlayingCard('SPADES', 'KING');
        const QUEENOFSPADES = new PlayingCard('SPADES', 'QUEEN');
        const JACKOFSPADES = new PlayingCard('SPADES', 'JACK');
        const TENOFSPADES = new PlayingCard('SPADES', 'TEN');
        const TWOOFDIAMONDS = new PlayingCard('DIAMONDS', 'TWO');

        // Deal the first card from the top and verify it is an Ace of Spades.
        holdingCard = cardDeck.deal();
        chai.assert.isTrue(holdingCard.compareTo(ACEOFSPADES));

        // Deal the next card.
        holdingCard = cardDeck.deal();
        chai.assert.isTrue(holdingCard.compareTo(KINGOFSPADES));

        // Deal the next card.
        holdingCard = cardDeck.deal();
        chai.assert.isTrue(holdingCard.compareTo(QUEENOFSPADES));

        // Deal the next card.
        holdingCard = cardDeck.deal();
        chai.assert.isTrue(holdingCard.compareTo(JACKOFSPADES));

        // Deal the next card.
        holdingCard = cardDeck.deal();
        chai.assert.isTrue(holdingCard.compareTo(TENOFSPADES));        

        // Remove all cards except the lowest card on the stack. Verify the lowest card
        // is a 2 of Diamonds.
        let deckSize = cardDeck.size();
        while (deckSize > 1) {
            cardDeck.deal();
            deckSize--;
        }

        holdingCard = cardDeck.deal();
        chai.assert.isTrue(holdingCard.compareTo(TWOOFDIAMONDS));
    });


    /*
     * Verify that every card in the deck is unique.
     * For this:
     * 1. The card at index 0 is compared to cards at 1 - 51.
     * 2. The card at index 1 is compared to cards at index 2 - 51.
     * 3. The card at index 2 is compared to cards at index 3 - 51, and so on.
     */
    mocha.it('Should ensure each cards in an initialized deck is unique.',
            function() {
        let deckSize = cardDeck.size();

        let deckContents = [];
        while (deckSize > 0) {
            deckContents.push(cardDeck.deal());
            deckSize--;
        }

        let contentLen = deckContents.length;
        for (let outerCtr = 0; outerCtr < (contentLen-1); outerCtr++) {
            for (let innerCtr = (outerCtr+1); innerCtr < contentLen; innerCtr++) {
                chai.assert.isFalse(
                        deckContents[outerCtr].compareTo(deckContents[innerCtr])
                        );
            }
        }

        // Clear deckContents.
        deckContents.length = 0;
    });


    // Verify zero cards in the deck after being cleared, and that a cleared deck cannot
    // be dealt from.
    mocha.it('Should verify a cleared deck is empty and can\'t be dealt from.',
            function() {
        cardDeck.clear();
        let holdingCard = cardDeck.deal();

        chai.assert.strictEqual(cardDeck.size(), 0);
        chai.assert.isNull(holdingCard);
    });


    // Verify that an initialized deck has exactly 13 cards of each suit.
    mocha.it('Should show 13 cards per suit in an initialized deck.',
            function() {
        let numSpades = 0;
        let numDiamonds = 0;
        let numClubs = 0;
        let numHearts = 0;

        let holdingCard = null;

        while (cardDeck.size() > 0) {
            holdingCard = cardDeck.deal();

            switch(holdingCard.getSuit()) {
            case 'SPADES':
                numSpades++;
                break;
            case 'HEARTS':
                numHearts++;
                break;
            case 'DIAMONDS':
                numDiamonds++;
                break;
            default:
                numClubs++;
                break;
            }
        }

        const CARDSPERSUIT = DECKSIZE/ CardSuit.size;

        chai.assert.strictEqual(CARDSPERSUIT, 13);
        chai.assert.strictEqual(numSpades, CARDSPERSUIT);
        chai.assert.strictEqual(numDiamonds, CARDSPERSUIT);
        chai.assert.strictEqual(numClubs, CARDSPERSUIT);
        chai.assert.strictEqual(numHearts, CARDSPERSUIT);
    });


    // Clear the deck that will be used in this test.
    mocha.afterEach(function() {
        cardDeck = null;
    });


});