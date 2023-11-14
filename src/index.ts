import chalk, { Chalk } from 'chalk';
import ora, { Ora } from 'ora';
import { has, get } from 'node-emoji';
import gradient from 'gradient-string';
import chalkAnimation, { Animation } from 'chalk-animation';
import boxen from 'boxen';
import figlet from 'figlet';
import center from 'center-align';
import {
  TStylizeTextConfig,
  IShellArtistConfig,
  TStatus,
  TStatusMsgConfig,
} from './types';
import { isTPrebuiltGradients } from './helpers';

function stylizeText(msg: string, config?: TStylizeTextConfig): string {
  let text = msg;
  if (!config) {
    return text;
  }
  if (config.color || config.bgColor || config.modifier) {
    let c: Chalk = chalk;
    if (config.color) {
      c = c[config.color];
    }
    if (config.bgColor) {
      c = c[config.bgColor];
    }
    if (config.modifier) {
      c = c[config.modifier];
    }
    text = c(text);
  }
  if (config.box) {
    const boxConfig = config.box;
    const b: { [key: string]: any } = {
      padding: boxConfig.padding ?? 1,
      margin: boxConfig.margin ?? 1,
      borderStyle: boxConfig.style ?? 'single',
      title: boxConfig.title,
      dimBorder: boxConfig.dimBorder ?? false,
      borderColor: boxConfig.borderColor,
      textAlignment: boxConfig.textAlignment ?? 'center',
      titleAlignment: boxConfig.titleAlignment ?? 'center',
    };
    text = boxen(text, b);
  }
  if (config.emoji) {
    let e;
    if (has(config.emoji)) {
      e = get(config.emoji);
    } else {
      e = config.emoji;
    }
    text = `${e} ${text}`;
  }
  if (config.center) {
    text = center(text, 100);
  }

  return text;
}

function statusSuccess(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
  prefix?: string,
): string {
  const prefixTxt = stylizeText(` ${prefix} `, {
    bgColor: 'bgGreenBright',
    modifier: 'bold',
  });
  return stylizeText(`${prefix ? `> ${prefixTxt}` : ''} ${msg}`, {
    ...config,
    color: 'greenBright',
  });
}

function statusError(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
  prefix?: string,
): string {
  const prefixTxt = stylizeText(` ${prefix} `, {
    bgColor: 'bgRedBright',
    modifier: 'bold',
  });
  return stylizeText(`${prefix ? `> ${prefixTxt}` : ''} ${msg}`, {
    ...config,
    color: 'redBright',
  });
}

function statusInfo(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
  prefix?: string,
): string {
  const prefixTxt = stylizeText(` ${prefix} `, {
    bgColor: 'bgBlueBright',
    modifier: 'bold',
  });
  return stylizeText(`${prefix ? `> ${prefixTxt}` : ''} ${msg}`, {
    ...config,
    color: 'blueBright',
  });
}

function statusWarn(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
  prefix?: string,
): string {
  const prefixTxt = stylizeText(` ${prefix} `, {
    bgColor: 'bgYellowBright',
    modifier: 'bold',
  });
  return stylizeText(`${prefix ? `> ${prefixTxt}` : ''} ${msg}`, {
    ...config,
    color: 'yellowBright',
  });
}

function statusMsg(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
  status?: TStatus,
  prefix?: string,
) {
  switch (status) {
    case 'warn':
      console.warn(statusWarn(msg, config, prefix));
      break;
    case 'error':
      console.warn(statusError(msg, config, prefix));
      break;
    case 'info':
      console.warn(statusInfo(msg, config, prefix));
      break;
    case 'success':
      console.log(statusSuccess(msg, config, prefix));
      break;
    default:
      console.log(stylizeText(msg, config));
      break;
  }
}

const g = gradient;
let start: [number, number], end: [number, number];
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class sa {
  /**
   * @description log to console
   * @param {string} msg text to be logged
   * @param {TStylizeTextConfig} config configuration to stylize the text
   */
  static log(msg: string, config?: TStylizeTextConfig): void {
    statusMsg(msg, config);
  }

  /**
   * @description log prestyled warning to console
   * @param {string} msg text to be logged
   * @param {TStylizeTextConfig} config configuration to stylize the text
   * @param {string} prefix prestyled prefix to be added (eg. brand name)
   */
  static warn(msg: string, config?: TStatusMsgConfig, prefix?: string): void {
    statusMsg(msg, config, 'warn', prefix || '');
  }

  /**
   * @description log prestyled error message to console
   * @param {string} msg text to be logged
   * @param {TStylizeTextConfig} config configuration to stylize the text
   * @param {string} prefix prestyled prefix to be added (eg. brand name)
   */
  static error(msg: string, config?: TStatusMsgConfig, prefix?: string): void {
    statusMsg(msg, config, 'error', prefix || '');
  }

  /**
   * @description log prestyled success message to console
   * @param {string} msg text to be logged
   * @param {TStylizeTextConfig} config configuration to stylize the text
   * @param {string} prefix prestyled prefix to be added (eg. brand name)
   */
  static success(
    msg: string,
    config?: TStatusMsgConfig,
    prefix?: string,
  ): void {
    statusMsg(msg, config, 'success', prefix || '');
  }

  /**
   * @description log prestyled info to console
   * @param {string} msg text to be logged
   * @param {TStylizeTextConfig} config configuration to stylize the text
   * @param {string} prefix prestyled prefix to be added (eg. brand name)
   */
  static info(msg: string, config?: TStatusMsgConfig, prefix?: string): void {
    statusMsg(msg, config, 'info', prefix || '');
  }

  /**
   * @description to start ora loader (spinner)
   * @param {string} msg text to be logged while starting the spinner
   * @param {TStylizeTextConfig} config configuration to stylize the text
   * @returns {Ora}
   */
  static start(msg?: string, config?: TStylizeTextConfig): Ora {
    start = process.hrtime();
    return ora(stylizeText(msg || '', config)).start();
  }

  /**
   * @description to stop ora loader (spinner)
   * @param {Ora} ora reference to an already created spinner
   * @param {string} msg text to be logged while stopping the spinner
   * @param {TStylizeTextConfig} config configuration to stylize the text
   */
  static stop(
    ora: Ora,
    msg?: string,
    config?: TStylizeTextConfig,
    status?: TStatus,
  ): void {
    const txt = stylizeText(msg || '', config);
    end = process.hrtime(start);
    const elapsedTime = (end[0] * 1e9 + end[1]) / 1e6;
    const seconds = Math.ceil(elapsedTime / 1000);

    switch (status) {
      case 'warn':
        ora.warn(statusWarn(`${txt} (${seconds}s)`));
        break;
      case 'info':
        ora.info(statusInfo(`${txt} (${seconds}s)`));
        break;
      case 'success':
        ora.succeed(statusSuccess(`${txt} (${seconds}s)`));
        break;
      case 'error':
        ora.fail(statusError(`${txt} (${seconds}s)`));
        break;
      default:
        ora.stopAndPersist({ text: `${txt} (${seconds}s)` });
        break;
    }
    ora.stop();
  }

  /**
   * @description to animate the text with prebuilt animations
   * @param {string} msg text to be logged
   * @param {IShellArtistConfig['animation']} animation prebuilt animations
   * @returns {Animation}
   */
  static animate(
    msg: string,
    animation: IShellArtistConfig['animation'],
  ): Animation {
    if (animation) {
      return chalkAnimation[animation](msg);
    }
    return chalkAnimation.glitch(msg);
  }

  /**
   * @description to apply gradients on the text
   * @param {string} msg text to be logged
   * @param {IShellArtistConfig['gradient']} gradient prebuilt gradients or custom array of colors
   * @returns {string}
   */
  static applyGradient(
    msg: string,
    gradient: IShellArtistConfig['gradient'],
  ): string {
    if (gradient) {
      if (isTPrebuiltGradients(gradient)) {
        msg = g[gradient](msg);
      } else {
        msg = g(gradient)(msg);
      }
    }
    return msg;
  }

  /**
   * @description to create ascii art
   * @param {string} msg text to be logged
   * @param {IShellArtistConfig['ascii']} ascii configuration for creating custom ascii arts
   * @returns {string}
   */
  static createAscii(msg: string, ascii?: IShellArtistConfig['ascii']): string {
    const asciiTxt = figlet.textSync(msg, {
      font: 'Standard' ?? ascii?.font,
      horizontalLayout: 'default' ?? ascii?.horizontalLayout,
      verticalLayout: 'default' ?? ascii?.verticalLayout,
      width: 80 ?? ascii?.width,
      whitespaceBreak: true ?? ascii?.whitespaceBreak,
    });
    return asciiTxt;
  }
}
