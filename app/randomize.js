/**
 * @module randomize
 * @description Defines a generator generating a random number between a
 * given minimum and maximum number. This is required because Math.random() in
 * Javascript only returns a number between 0 and 1.
 * 
 * @author Ashok S Nair
 */
'use strict';

module.exports = {
        /**
         * @function getRandomNumber
         * @description Generate a random number between a lower and an upper limit.
         * @param {number} min The lower limit
         * @param {number} max The upper limit
         * @returns {number}
         */
        getRandomNumber: function (min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        }
};