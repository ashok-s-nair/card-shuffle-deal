/**
 * The {@code PlayingCard} class defines a playing card instance.
 * 
 * The class implements:
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
 * The constructor for the {@code PlayingCard} class. It also sets the card suit and rank.
 * 
 * @param cSuit An {@code Enum} containing the card suit value.
 * @param cRank An {@code Enum} containing the card rank value.
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


PlayingCard.prototype.getSuit = function() {
    return this._cardSuit;
};


PlayingCard.prototype.getRank = function() {
    return this._cardRank;
};


PlayingCard.prototype.toString = function() {
    return (this._cardRank + " of " + this._cardSuit);
};


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