/**
 * Defines a random number generator which generates a random number between a
 * given minimum and maximum number. This is required because Math.random() in
 * Javascript only returns a number between 0 and 1.
 */
'use strict';

module.exports = {
        getRandomNumber: function (min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        }
};