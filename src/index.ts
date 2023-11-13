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
): string {
  return stylizeText(msg, { ...config, color: 'greenBright' });
}

function statusError(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
): string {
  return stylizeText(msg, { ...config, color: 'redBright' });
}

function statusInfo(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
): string {
  return stylizeText(msg, { ...config, color: 'blueBright' });
}

function statusWarn(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
): string {
  return stylizeText(msg, { ...config, color: 'yellowBright' });
}

function statusMsg(
  msg: string,
  config?: TStatusMsgConfig | TStylizeTextConfig,
  status?: TStatus,
) {
  switch (status) {
    case 'warn':
      console.warn(statusWarn(msg, config));
      break;
    case 'error':
      console.warn(statusError(msg, config));
      break;
    case 'info':
      console.warn(statusInfo(msg, config));
      break;
    case 'success':
      console.log(statusSuccess(msg, config));
      break;
    default:
      console.log(stylizeText(msg, config));
      break;
  }
}

const g = gradient;
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class sa {
  static log(msg: string, config?: TStylizeTextConfig): void {
    statusMsg(msg, config);
  }

  static warn(msg: string, config?: TStatusMsgConfig): void {
    statusMsg(msg, config, 'warn');
  }

  static error(msg: string, config?: TStatusMsgConfig): void {
    statusMsg(msg, config, 'error');
  }

  static success(msg: string, config?: TStatusMsgConfig): void {
    statusMsg(msg, config, 'success');
  }

  static info(msg: string, config?: TStatusMsgConfig): void {
    statusMsg(msg, config, 'info');
  }

  static start(msg: string, config?: TStylizeTextConfig): Ora {
    return ora(stylizeText(msg, config)).start();
  }

  static stop(
    ora: Ora,
    msg: string,
    config?: TStylizeTextConfig,
    status?: TStatus,
  ): void {
    const txt = stylizeText(msg, config);
    switch (status) {
      case 'warn':
        ora.warn(statusWarn(txt));
        break;
      case 'info':
        ora.info(statusInfo(txt));
        break;
      case 'success':
        ora.succeed(statusSuccess(txt));
        break;
      case 'error':
        ora.fail(statusError(txt));
        break;
      default:
        ora.stopAndPersist({ text: txt });
        break;
    }
    ora.stop();
  }

  static animate(
    msg: string,
    animation: IShellArtistConfig['animation'],
  ): Animation {
    if (animation) {
      return chalkAnimation[animation](msg);
    }
    return chalkAnimation.glitch(msg);
  }

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
