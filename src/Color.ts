import { HexString } from './types/hex';
import { RgbaObject, RgbaString, RgbObject, RgbString } from './types/rgb';

type Strings = {
  rgb: RgbString
  rgba: RgbaString
  hex: string
}

export class Color {
  public rgb: RgbObject
  public rgba: RgbaObject
  public strings: Strings

  constructor(rgbaObject: RgbaObject) {
    const { a: alpha = 1, ...rgbObject } = rgbaObject
    const { r: red, b: blue, g: green } = rgbObject
    this.rgb = rgbObject

    this.rgba = { ...rgbaObject, a: alpha }

    this.strings = {
      rgb: `rgb(${red as number}, ${green as number}, ${blue as number})`,
      rgba: `rgba(${red as number}, ${green as number}, ${
        blue as number
      }, ${alpha})`,
      hex: rgbaToHex(rgbaObject),
    }
  }
}

export const numberToHex = (value: number) =>
  (value | (1 << 8)).toString(16).slice(1)

export const rgbaToHex = ({
  r: red,
  g: green,
  b: blue,
  a: alpha = 1,
}: RgbaObject) => {
  let hexColor = `#${numberToHex(red)}${numberToHex(green)}${numberToHex(blue)}`
  if (alpha !== 1) {
    const hexAlpha = ((alpha * 255) | (1 << 8)).toString(16).slice(1)
    hexColor += hexAlpha
  }
  return hexColor
}