const params = {
    sunIntensity: 4, // brightness of the sun
    earthSpeedFactor: 20.0,
    moonSpeedFactor: 20.0 * .27, // speed of the earth divided by 27 days to orbit the earth 
    atmOpacity: { value: 0.7 },
    atmPowFactor: { value: 4.1 },
    atmMultiplier: { value: 9.5 },
    astronomicalConversion: { value: 450 }, // 1AU = 450 units in scale
    earthSize: { value: 12 }
  }

  
export default params;