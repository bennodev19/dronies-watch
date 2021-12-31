import { globalBind, shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as flappydronie from './entities/flappydronie';
import * as ui from './entities/ui';
import * as socket from './socket';

shared.integrate(reactIntegration);

export const core = {
  flappydronie,
  ui,
  socket,
};

// For better debugging
if (process.env.NODE_ENV !== 'production') globalBind('__core__', core);

export default core;

export { flappydronie, ui, socket };
