import { generateRandomBoxMuller, generateRange } from "./math";

export const generateCirclesDataset = (radii, noiseFactor, numPoints) => {
    let dataPoints = [[], []];
    let dataLabels = [];
    radii.map((radius, idx) => {
        let xCoords = [];
        let yCoords = [];

        generateRange(0.0, 2.0 * Math.PI, numPoints, (e) => {
            xCoords.push(Math.cos(e) * radius);
            yCoords.push(Math.sin(e) * radius);
            return e;
        });

        const label = idx % 2 == 0 ? 1.0 : 0.0;

        dataPoints[0] = dataPoints[0].concat(xCoords);
        dataPoints[1] = dataPoints[1].concat(yCoords);
        dataLabels = dataLabels.concat(new Array(numPoints).fill(label));
    });
    return [dataPoints, dataLabels];
};

export const generateBinaryClusters = (
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
            trainLabels.push(idx % 2);
        }
    });

    return [trainFeatures, trainLabels];
};

export const sigmoid = (z) => 1 / 1 + Math.exp(-z);
