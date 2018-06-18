/*
 * CLASS: CardInitializationTest
 * 
 * INTENT:
 * The test case verifies that playing cards can be initialized successfully, and that
 * invalid suit and rank values are appropriately handled.
 * 
 * The following validations are done by this test:
 * 
 * 1. Verify that up to 52 cards can be initialized with valid values. The cards initialized
 * with valid suit and rank should not return null when their suit or rank are queried. They
 * should also return the same rank and suit that they were initialized with.
 * 
 * 2. Verify that cards initialized with an invalid suit and/ or rank return null when their
 * suit or rank are queried.
 * 
 * 3. Verify that two cards with the same rank and suit are considered equal in comparison.
 * Also verify that cards are not considered equal if their rank or suit are different.
 * 
 * 4. Verify there are 4 valid values for suit and 13 valid values for rank that a card can
 * initialize with.
 * 
 * 5. Verify that the string representation of the card is as expected.
 * 
 * EXCLUSIONS:
 * None
 */
'use strict';

//Import the test and assertion libraries. These libraries will not change after the first
//initialization so they are being declared as constant references.
const mocha = require('mocha');
const chai = require('chai');

//Define local imports. These libraries will not change after the first
//initialization so they are being declared as constant references.
const PlayingCard = require('../../app/playingcard');
const CardSuit = require('../../app/cardsuit');
const CardRank = require('../../app/cardrank');

//Define local constant values. These will follow the all-uppercase naming conventions.
const DECKSIZE = require('../../app/carddeck').DECKSIZE;


// Define the card initialization test suite.
mocha.describe('CardInit: Validate initialization and values for playing cards.', 
        function() {


    // Verify that up to 52 cards can be initialized with valid suit and rank.
    // The cards initialized with valid suit and rank should not return null when their
    // suit or rank and queried. They should also return the same rank and suit that they
    // were initialized with.
    mocha.it('Should verify successful initialization of 52 cards.',
            function() {
        let holdingCard = null;
        let cardsArr = [];

        for (let suit of CardSuit.keys()) {
            for (let rank of CardRank.keys()) {
                holdingCard = new PlayingCard(suit, rank);

                chai.assert.isDefined(holdingCard);
                chai.assert.isDefined(holdingCard.getSuit());
                chai.assert.isDefined(holdingCard.getRank());

                chai.assert.isNotNull(holdingCard.getSuit());
                chai.assert.isNotNull(holdingCard.getRank());

                chai.assert.strictEqual(holdingCard.getSuit(), suit);                
                chai.assert.strictEqual(holdingCard.getRank(), rank);

                cardsArr.push(holdingCard);
            }
        }

        chai.assert.strictEqual(cardsArr.length, DECKSIZE);
    });


    // Verify that cards initialized with invalid suit and rank return null when their suit
    // or rank are queried.
    mocha.it('Should handle invalid initializations appropriately.',
            function() {
        let cardA = new PlayingCard(null, null);
        let cardB = new PlayingCard(undefined, undefined);
        let cardC = new PlayingCard(null, undefined);
        let cardD = new PlayingCard(undefined, null);
        let cardE = new PlayingCard(2018, 'FIFA');
        let cardF = new PlayingCard('FIFA', '2018');
        let cardG = new PlayingCard('FIFA', 2018);
        let cardH = new PlayingCard('SPADES', undefined);
        let cardI = new PlayingCard(null, 'QUEEN');

        chai.assert.isNull(cardA.getSuit());
        chai.assert.isNull(cardA.getRank());

        chai.assert.isNull(cardB.getSuit());
        chai.assert.isNull(cardB.getRank());

        chai.assert.isNull(cardC.getSuit());
        chai.assert.isNull(cardC.getRank());

        chai.assert.isNull(cardD.getSuit());
        chai.assert.isNull(cardD.getRank());

        chai.assert.isNull(cardE.getSuit());
        chai.assert.isNull(cardE.getRank());

        chai.assert.isNull(cardF.getSuit());
        chai.assert.isNull(cardF.getRank());

        chai.assert.isNull(cardG.getSuit());
        chai.assert.isNull(cardG.getRank());

        chai.assert.isNull(cardH.getSuit());
        chai.assert.isNull(cardH.getRank());

        chai.assert.isNull(cardI.getSuit());
        chai.assert.isNull(cardI.getRank());
    });


    // Verify that two cards with the same rank and suit are considered equal in comparison.
    // Also verify that cards are not considered equal if their rank or suit are different.
    mocha.it('Should handle card comparisons appropriately.',
            function() {
        let cardA = new PlayingCard('DIAMONDS', 'TWO');
        let cardB = new PlayingCard('DIAMONDS', 'TWO');
        let cardC = new PlayingCard('DIAMONDS', 'THREE');
        let cardD = new PlayingCard('CLUBS', 'TWO');
        let cardE = new PlayingCard(undefined, undefined);

        chai.assert.isTrue(cardA.compareTo(cardB));
        chai.assert.isFalse(cardA.compareTo(cardC));
        chai.assert.isFalse(cardA.compareTo(cardD));
        chai.assert.isFalse(cardA.compareTo(cardE));
    });


    // Verify there are 4 valid values for suit and 13 valid values for rank, that a card
    // can initialize with.
    mocha.it('Should verify 4 valid values for suit and 13 valid values for rank.',
            function() {
        chai.assert.strictEqual(CardSuit.size, 4);
        chai.assert.strictEqual(CardRank.size, 13);
    });


    // Verify there are 4 valid values for suit and 13 valid values for rank, that a card
    // can initialize with.
    mocha.it('Should ensure the expected representation for a card',
            function() {
        let holdingCard = new PlayingCard('CLUBS', 'ACE');
        chai.assert.strictEqual(holdingCard.toString(), 'ACE of CLUBS');
    });

});