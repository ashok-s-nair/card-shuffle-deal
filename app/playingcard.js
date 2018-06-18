/**
 * @module playingcard
 * @author Ashok S. Nair
 * @description The PlayingCard module defines a playing card instance. It implements:
 * 1. Getters for rank and suit.
 * 2. The string representation of this object.
 * 3. A compareTo function that compares for equality of this PlayingCard instance
 * with another PlayingCard instance.
 */
'use strict';

// Import the Rank and Suit maps.
const CardRank = require('./cardrank');
const CardSuit = require('./cardsuit');


/**
 * @constructor
 * @description Constructor for the PlayingCard. It also sets the card suit and rank.
 * @param {string} cSuit An upper-case string containing the card suit value.
 * @param {string} cRank An upper-case string containing the card rank value.
 */
function PlayingCard(cSuit, cRank) {
    this._cardSuit = null;
    this._cardRank = null;

    if (typeof(cSuit) === "string" && typeof(cRank) === "string") {
        let suitFound = false;
        let rankFound = false;

        for (let suit of CardSuit.keys()) {
            if (cSuit === suit) {
                suitFound = true;
                break;
            }
        }

        for (let rank of CardRank.keys()) {
            if (cRank === rank) {
                rankFound = true;
                break;
            }
        }

        if (suitFound === true && rankFound === true) {
            this._cardSuit = cSuit;
            this._cardRank = cRank;
        }
    }
}


/**
 * @function getSuit
 * @description Returns the string for the card suit.
 * @returns {string} 
 */
PlayingCard.prototype.getSuit = function() {
    return this._cardSuit;
};


/**
 * @function getRank
 * @description Returns the string for the card rank.
 * @returns {string} 
 */
PlayingCard.prototype.getRank = function() {
    return this._cardRank;
};


/**
 * @override
 * @function toString
 * @description Returns the string representation for the playing card.
 * @returns {string} 
 */
PlayingCard.prototype.toString = function() {
    return (this._cardRank + " of " + this._cardSuit);
};


/**
 * @function compareTo
 * @description Compares this card with another card and returns a boolean result.
 * @param {PlayingCard} targCard The PlayingCard instance to compare this card with.
 * @returns {boolean} 
 */
PlayingCard.prototype.compareTo = function(targCard) {
  let compResult; // initializes to "undefined".

  if (targCard === null || (targCard instanceof PlayingCard) === false ||
          this._cardRank === null || this._cardSuit === null) {
      return compResult;
  }

  if (this._cardRank === targCard._cardRank && this._cardSuit === targCard._cardSuit) {
      compResult = true;
  } else {
      compResult = false;
  }

  return compResult;
};


// Export the PlayingCard class.
module.exports = PlayingCard;