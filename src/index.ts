import chalk, { BackgroundColorName, ColorName } from 'chalk';
import boxen from 'boxen';
import ora, { Ora } from 'ora';
import { has, get } from 'node-emoji';
import gradient from 'gradient-string';
import chalkAnimation, { Animation } from 'chalk-animation';

export interface IShellArtistConfig {
  color?: ColorName;
  bgColor?: BackgroundColorName;
  box?: string;
  title?: string;
  emoji?: string;
  gradient?: string[];
  animation?: chalkAnimation.AnimationFn;
  status?: 'warn' | 'info' | 'success' | 'error';
}

function stylizeText(msg: string, config?: IShellArtistConfig): string {
  let text = msg;
  if (!config) {
    return text;
  }
  if (config.color || config.bgColor) {
    let c = chalk;
    if (config.color) {
      c = c[config.color];
    }
    if (config.bgColor) {
      c = c[config.bgColor];
    }
    text = c(text);
  }
  if (config.box || config.title) {
    const b: { [key: string]: any } = {
      padding: 1,
      margin: 1,
      borderStyle: config.box ?? 'single',
    };
    if (config.title) {
      b.title = config.title;
    }
    text = boxen(text, b);
  }
  if (config.gradient) {
    text = gradient(config.gradient)(text);
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

  return text;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ShellArtist {
  static log(msg: string, config?: IShellArtistConfig): void {
    console.log(stylizeText(msg, config));
  }

  static warn(msg: string, config?: IShellArtistConfig): void {
    console.warn(ShellArtist.log(msg, { ...config, color: 'yellow' }));
  }

  static error(msg: string, config?: IShellArtistConfig): void {
    console.error(ShellArtist.log(msg, { ...config, color: 'red' }));
  }

  static success(msg: string, config?: IShellArtistConfig): void {
    console.log(ShellArtist.log(msg, { ...config, color: 'green' }));
  }

  static info(msg: string, config?: IShellArtistConfig): void {
    console.info(ShellArtist.log(msg, { ...config, color: 'blue' }));
  }

  static start(msg: string, config?: IShellArtistConfig): Ora {
    return ora(stylizeText(msg, config)).start();
  }

  static stop(ora: Ora, msg: string, config?: IShellArtistConfig): void {
    const txt = stylizeText(msg, config);
    switch (config?.status) {
      case 'warn':
        ora.warn(txt);
        break;
      case 'info':
        ora.info(txt);
        break;
      case 'success':
        ora.succeed(txt);
        break;
      case 'error':
        ora.fail(txt);
        break;
      default:
        ora.stopAndPersist({ text: txt });
        break;
    }
    ora.stop();
  }

  static animate(msg: string, config?: IShellArtistConfig): Animation {
    const txt = stylizeText(msg, config);
    if (config?.animation) {
      return config.animation(txt);
    }
    return chalkAnimation.glitch(txt);
  }
}
