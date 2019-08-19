import rendererSettings from './rendererSettings';
import webchartsSettings from './webchartsSettings';
import syncSettings from './syncSettings';
import controlInputs from './controlInputs';
import syncControlInputs from './syncControlInputs';

export default {
    rendererSettings,
    webchartsSettings,
    settings: Object.assign({}, rendererSettings(), webchartsSettings()),
    syncSettings,
    controlInputs,
    syncControlInputs
};
