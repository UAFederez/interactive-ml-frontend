/**
 * Math utility functions for generating datasets, random numbers, etc.,
 */

/**
 * Generates an array of `num` numbers ranging from [from, to)
 * @param {Number} from Left endpoint
 * @param {Number} to   Right endpoint, not included
 * @param {Number} num  Number of points to sample
 * @returns {Number[]}  `num` evenly spaced numbers within [from, to]
 */
export const generateRange = (from, to, num, func = (e) => e) => {
    if (to <= from) {
        return [];
    }
    const step = (to - from) / num;
    let result = new Array(num).fill(0).map((e, idx) => func(idx));
    return result.map((elem) => from + elem * step);
};

/**
 * Given two sets, a with `m` elements and b with `n` elements, this returns
 * the Cartesian or 'set' product containing all possible tuple combinations
 * (x, y) from a and b
 *
 * @param {Number[]} a      1st set, shape: (m, )
 * @param {Number[]} b      2nd set, shape: (n, )
 * @returns {Number[][]}    Cartesian product of set a and b, shape: (m * n, 2)
 */
export const setProduct = (a, b) => {
    return [].concat(
        ...a.map((a_elem) =>
            b.map((b_elem) =>
                Array.isArray(a_elem)
                    ? a_elem.concat([b_elem])
                    : [a_elem, b_elem]
            )
        )
    );
};

/**
 * Simple dot/inner product function between two arrays
 * @param {*} a vector a
 * @param {*} b vector b
 * @returns {Number} dot product of a and b
 */
export const dotProduct = (a, b) => {
    if (a.length !== b.length) {
        console.error(`Invalid vector dimensions ${a.length} != ${b.length}`);
    }
    return a.reduce((accum, curr, idx) => accum + curr * b[idx], 0.0);
};

// Obtain a random variable that is approximately
// distributed by a Gaussian (mu = 0, var = 1)
// From: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
export const generateRandomBoxMuller = () => {
    let u = 1 - Math.random();
    let v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

/**
 *
 * @param {Number} left Left endpoint of the range left < right
 * @param {Number} right Right endpoint of the range
 * @returns {Number} A random number that is uniformly distributed in [left, right]
 */
export const randomUniform = (left, right) => {
    return left + Math.random() * (right - left);
};
