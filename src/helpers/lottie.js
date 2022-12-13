import tinycolor from 'tinycolor2'

const fromUnitVector = (n) => Math.round(n * 255)

const getColors = (lottieObj) => {
  let res = []
  function doGet(obj) {
    // if (obj.ty === 'fl') {
    //   const color = obj.c.k
    //   if (color.length === 4) {
    //     let [r, g, b] = color

    //     r = fromUnitVector(r)
    //     g = fromUnitVector(g)
    //     b = fromUnitVector(b)
    //     res.push(tinycolor({ r, g, b }).toHex())
    //   } else {
    //     color.forEach(item => {
    //       const itemColor = item.s
    //       let [r, g, b] = itemColor

    //       r = fromUnitVector(r)
    //       g = fromUnitVector(g)
    //       b = fromUnitVector(b)
    //       res.push(tinycolor({ r, g, b }).toHex())
    //     })
    //   }
    // } else 
    if (obj.ty === 2) {
      const color = obj.v.k
      let [r, g, b] = color
      r = fromUnitVector(r)
      g = fromUnitVector(g)
      b = fromUnitVector(b)
      res.push(tinycolor({ r, g, b }).toHex())
    }

    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        doGet(obj[key])
      }
    }
    return res
  }
  doGet(lottieObj.layers)
  return res
}

const replaceColor = (sourceColor, targetColor, lottieObj) => { // hex, rgb, obj
  function doReplace(sourceLottieColor, targetLottieColor, obj) {
    if (obj.ty === 'fl') {
      const color = obj.c.k
      if (color.length === 4) {
        let [r, g, b] = color
        r = fromUnitVector(r)
        g = fromUnitVector(g)
        b = fromUnitVector(b)
        const originHexValue = tinycolor({ r, g, b }).toHex()
        if (originHexValue === sourceColor) {
          obj.c.k = [
            0.00390625 * targetColor[0],
            0.00390625 * targetColor[1],
            0.00390625 * targetColor[2],
            1,
          ]
        }
      } else {
        color.forEach((item, index) => {
          const itemColor = item.s
          let [r, g, b] = itemColor
          r = fromUnitVector(r)
          g = fromUnitVector(g)
          b = fromUnitVector(b)
          const originHexValue = tinycolor({ r, g, b }).toHex()
          if (originHexValue === sourceColor) {
            obj.c.k[index].s = [
              0.00390625 * targetColor[0],
              0.00390625 * targetColor[1],
              0.00390625 * targetColor[2],
              1,
            ]
          }
        })
      }
    } else if (obj.ty === 2) {
      const color = obj.v.k
      let [r, g, b] = color
      r = fromUnitVector(r)
      g = fromUnitVector(g)
      b = fromUnitVector(b)
      const originHexValue = tinycolor({ r, g, b }).toHex()
      if (originHexValue === sourceColor) {
        obj.v.k = [
          0.00390625 * targetColor[0],
          0.00390625 * targetColor[1],
          0.00390625 * targetColor[2],
          1,
        ]
      }
    }
    for (var key in obj) {
      if (typeof obj[key] === 'object') {
        doReplace(sourceLottieColor, targetLottieColor, obj[key])
      }
    }
    return obj
  }
  return doReplace(sourceColor, targetColor, lottieObj)
}

export {
  getColors,
  replaceColor,
}