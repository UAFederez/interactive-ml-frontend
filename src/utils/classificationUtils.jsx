import { generateRandomBoxMuller, generateRange } from "./math";

export const generateCirclesDataset = (radii, noiseFactor, numPoints) => {
    let dataPoints = [[], []];
    let dataLabels = [];
    radii.map((radius, idx) => {
        let xCoords = [];
        let yCoords = [];

        generateRange(0.0, 2.0 * Math.PI, numPoints, (e) => {
            const dist = radius + generateRandomBoxMuller() * noiseFactor;
            xCoords.push(Math.cos(e) * dist);
            yCoords.push(Math.sin(e) * dist);
            return e;
        });

        const label = idx % 2;

        dataPoints[0] = dataPoints[0].concat(xCoords);
        dataPoints[1] = dataPoints[1].concat(yCoords);
        dataLabels = dataLabels.concat(new Array(numPoints).fill(label));
    });
    return [dataPoints, dataLabels];
};

/**
 * @param {Number[][]} centroids    Each element is an [x, y] pair containing the location of the centroid
 * @param {Number} radius           The radius of the extent of the cluster (TODO: change to Number[] for varying the radius per cluster)
 * @param {Number} noiseFactor      Amount of noise in each position generated, 0 means they fall into the circumference given the radius
 * @param {Number} pointsPerCluster Number of poitns per cluster
 * @returns {[trainFeatures, trainLabels]}
 */
export const generateClusters = (
    centroids,
    radius,
    noiseFactor,
    pointsPerCluster
) => {
    let trainFeatures = [[], []];
    let trainLabels = [];

    centroids.forEach(([cx, cy], idx) => {
        for (let i = 0; i < pointsPerCluster; i++) {
            let angle = Math.random() * Math.PI * 2.0;
            let distance = radius + noiseFactor * generateRandomBoxMuller();
            trainFeatures[0].push(cx + Math.cos(angle) * distance);
            trainFeatures[1].push(cy + Math.sin(angle) * distance);
            trainLabels.push(idx % centroids.length);
        }
    });

    return [trainFeatures, trainLabels];
};

export const sigmoid = (z) => 1 / (1 + Math.exp(-z));
