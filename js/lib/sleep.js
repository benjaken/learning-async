//

'use strict';

/**
 *
 * Sync version setTimeout
 *
 * @param {number} time in milliseconds
 */
module.exports = function sleep(time) {
    require('child_process').execFileSync('sleep', [time / 1000], {stdio : 'inherit'});
};
