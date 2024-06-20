import * as THREE from 'three';

export const generateOrbitPoints = (center, radius, numPoints) => {
    const curve = new THREE.EllipseCurve(
        center.x, center.y, // Center of the ellipse
        radius, radius, // xRadius, yRadius
        0, 2 * Math.PI, // Start and end angle (radians)
        true, // Clockwise
        0 // Rotation
    );
    return curve.getPoints(numPoints);
};