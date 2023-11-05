import { ForegroundColor, BackgroundColor, Modifiers } from 'chalk';
import { Boxes, Spacing } from 'boxen';
import { Fonts, KerningMethods } from 'figlet';
import { PREBUILT_GRADIENTS, PREBUILT_ANIMATIONS } from './constants';
type TPrebuiltGradients = (typeof PREBUILT_GRADIENTS)[number];
type TPrebuiltAnimations = (typeof PREBUILT_ANIMATIONS)[number];

/**
 * @name TGradient
 * @description type def for gradient property which is of either TPrebuiltGradients OR an array of colors in different [formats](https://github.com/bgrins/TinyColor/blob/master/README.md#accepted-string-input)
 * @example
 * [
 *   tinycolor('#FFBB65'),       // tinycolor object
 *   {r: 0, g: 255, b: 0},       // RGB object
 *   {h: 240, s: 1, v: 1, a: 1}, // HSVa object
 *   'rgb(120, 120, 0)',         // RGB CSS string
 *   'gold'                      // named color
 * ]
 */
type TGradient = TPrebuiltGradients | string[];

/**
 * @name TAnimation
 * @description type def for animation property which is of TPrebuiltAnimations
 */
type TAnimation = TPrebuiltAnimations;

/**
 * @name TBox
 * @description type def for box property
 */
interface TBox {
  title?: string;
  padding?: number | Spacing;
  margin?: number | Spacing;
  style?: keyof Boxes;
  dimBorder?: boolean;
  borderColor?: string;
  textAlignment?: 'left' | 'right' | 'center';
  titleAlignment?: 'left' | 'right' | 'center';
}

/**
 * @name TAscii
 * @description type def for ascii property which is of type `Options` from `figlet`
 */
interface TAscii {
  horizontalLayout?: KerningMethods;
  verticalLayout?: KerningMethods;
  font?: Fonts;
  width?: number;
  whitespaceBreak?: boolean;
}

type TStatus = 'warn' | 'info' | 'success' | 'error';

/**
 * @name TStylizeTextConfig
 * @description type def for stylizeText function config parameter
 */
interface TStylizeTextConfig {
  color?: typeof ForegroundColor;
  bgColor?: typeof BackgroundColor;
  modifier?: typeof Modifiers;
  box?: TBox;
  emoji?: string;
  center?: boolean;
}

/**
 * @name TStatusMsgConfig
 * @description type def for statusMsg function config parameter
 */
interface TStatusMsgConfig
  extends Omit<TStylizeTextConfig, 'color' | 'bgColor'> {}

/**
 * @name IShellArtistConfig
 * @description type def for applyGradient and animate methods's parameters
 */
interface IShellArtistConfig extends TStylizeTextConfig {
  gradient?: TGradient;
  animation?: TAnimation;
  ascii?: TAscii;
}

export {
  TPrebuiltGradients,
  TPrebuiltAnimations,
  TGradient,
  TAnimation,
  TStatus,
  TStylizeTextConfig,
  TStatusMsgConfig,
  IShellArtistConfig,
};
