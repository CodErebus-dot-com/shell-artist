import { TPrebuiltGradients, TPrebuiltAnimations } from './types';
import { PREBUILT_GRADIENTS, PREBUILT_ANIMATIONS } from './constants';

function isTPrebuiltGradients(value: any): value is TPrebuiltGradients {
  return PREBUILT_GRADIENTS.includes(value);
}

function isTPrebuiltAnimations(value: any): value is TPrebuiltAnimations {
  return PREBUILT_ANIMATIONS.includes(value);
}

export { isTPrebuiltGradients, isTPrebuiltAnimations };
