# ShellArtist

ShellArtist is a package that provides a simplified logging API. It takes some of the best npm packages, ties them together and wraps them around to your favorite Web API i.e. [console](https://developer.mozilla.org/en-US/docs/Web/API/console).

## Table of Contents

- [Features](#features)
- [Use Cases](#use-cases)
- [Packages Used](#packages-used)
- [Usage](#usage)
  - [Installation](#installation)
  - [Default Log](#default-log)
  - [With config object](#with-config-object)
  - [Spinner](#spinner)
  - [Log Levels](#log-levels)
  - [Gradient](#gradient)
  - [Animations](#animations)

## Features

- Apply Colors and Background colors to your texts
- Create colorful and customizable Boxes in your terminal
- Use amazing prebuilt Animations
- Apply Gradient colors to your texts
- Use prebuilt Status messages for your console
- Add attractive spinners for async operations
- Get your favorite emoticons to make it fun

## Use Cases

- You can create your custom logging service
- You can create spectacular CLIs

## Packages Used

- [ora](https://www.npmjs.com/package/ora)
- [chalk](https://www.npmjs.com/package/chalk)
- [chalk-animation](https://www.npmjs.com/package/chalk-animation)
- [gradient-string](https://www.npmjs.com/package/gradient-string)
- [boxen](https://www.npmjs.com/package/boxen)
- [node-emoji](https://www.npmjs.com/package/node-emoji)

## Usage

### Installation

```bash
# using npm
npm i shell-artist

# using yarn
yarn add shell-artist

# using pnpm
pnpm add shell-artist
```

### Default Log

```typescript
import sa from 'shell-artist';

sa.log('Hello World');
```

### With `config` object

```typescript
import sa from 'shell-artist';

sa.log(' MY CLI APP ', {
  bgColor: 'bgGreenBright', // https://github.com/chalk/chalk/tree/main#background-colors,
  color: 'white', // https://github.com/chalk/chalk/tree/main#colors
  modifier: 'bold', // https://github.com/chalk/chalk/tree/main#modifiers
  emoji: 'rocket', // https://github.com/muan/emojilib/blob/main/dist/emoji-en-US.json,
  box: {
    title: 'package update',
    borderColor: 'green',
    style: 'double' // https://github.com/sindresorhus/boxen/tree/main#borderstyle (default - 'single')
    padding: 2, // default - 1
    margin: 2, // default - 1
    dimBorder: true, // default - false
    textAligment: 'center', // default - 'center'
    titleAlignment: 'left' // default - 'center'
  }
});
```

### Log Levels

```typescript
import sa from 'shell-artist';

sa.warn('CAUTION');
sa.error('FAILURE');
sa.info('INFO');
// with the config object
sa.success(' SUCCESS ', {
  box: {
    title: 'success',
    borderColor: 'green',
  },
  modifier: 'bold',
});
```

### Spinner

```typescript
import sa from 'shell-artist';
import { setTimeout as sleep } from 'node:timers/promises';

const spinner = sa.start('Installing dependencies...');
await sleep(3000);

sa.stop(spinner, 'All set!');
// with the config object
sa.stop(spinner, 'All set!', {
  color: 'greenBright',
});
// with prebuilt log levels
sa.stop(
  spinner,
  'All set!',
  {
    color: 'greenBright',
  },
  'status',
); // status = 'success' | 'error' | 'info' | 'warn'
sa.stop(spinner, 'Something went wrong', ,'error');
```

### Gradient

```typescript
import sa from 'shell-artist';

// with array of colors
sa.applyGradient('This tool will help you write beautiful logs', [
  'red',
  'blue',
  'green',
  'yellow',
]);
// with prebuilt gradient
sa.applyGradient('This tool will help you write beautiful logs', 'rainbow'); // https://github.com/bokub/gradient-string#available-built-in-gradients
```

### Animations

```typescript
import sa from 'shell-artist';

sa.animate('ANIMATED HEADING', 'neon'); // https://github.com/bokub/chalk-animation#available-animations
```
