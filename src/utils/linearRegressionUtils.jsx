import {
    dotProduct,
    generateRandomBoxMuller,
    generateRange,
    setProduct,
} from "./math";

/**
 * Generates a linear dataset
 * Each axis of the dataset has `num` points in [from, to)
 *
 * @param {Number[]} coefficients   shape = (n, )
 * @param {Number} intercept        shape = (1, )
 * @param {Number} from             Left enpoint of range, not inclusive
 * @param {Number} to               Right endpoint of range, not inclusive
 * @param {Number} num              Number of points in range of [from, to)
 * @returns {[Number[], Number[]]}
 *          train_x and train_y, respectively,
 *          train_x shape: (num ** coefficients.length, coefficients.length)
 *          train_y shape: (num, 1)
 */
export const generateLinearDataset = (
    coefficients,
    intercept,
    from,
    to,
    num,
    noise_fac
) => {
    let x_values = generateRange(from, to, num);

    // Generate all possible points given the x_values
    let x_data = x_values;
    for (let i = 0; i < coefficients.length - 1; i++) {
        x_data = setProduct(x_data, x_values);
    }

    // If this is the 1D case, then x_data has shape (n, ) for n datapoints
    // In order for the dot_product below to work with the (1,) dataset, then
    // x_data has to be reshaped to (n, 1)
    if (coefficients.length === 1) {
        x_data = x_data.map((elem) => [elem]);
    }

    let y_values = x_data.map(
        (x) =>
            dotProduct(x, coefficients) +
            intercept +
            noise_fac * generateRandomBoxMuller()
    );

    // Reshape x_data to (n, ) to work with existing LinearRegression dataset
    return [
        coefficients.length === 1 ? x_data.map((elem) => elem[0]) : x_data,
        y_values,
    ];
};

export const evalMeanSquaredError = (coeffs, bias, dataset) => {
    return dataset.train_x.reduce(
        (accum, x_i, idx) =>
            accum +
            (dataset.train_y[idx] -
                (dotProduct(coeffs, Array.isArray(x_i) ? x_i : [x_i]) +
                    bias)) **
                2 /
                dataset.train_x.length,
        0.0
    );
};

export const calcLossLandscape = (coeffs, biases, dataset) => {
    if (coeffs.length !== biases.length) {
        console.error(
            `Invalid length of coefficients and biases: ${coeffs.length} != ${biases.length}`
        );
        return;
    }
    return coeffs.map((coeff, idx) => {
        return evalMeanSquaredError(coeff, biases[idx], dataset);
    });
};
