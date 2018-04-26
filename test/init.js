import jsdom from 'jsdom';
import safetyOutlierExplorer from '../src/wrapper';
import expect from 'expect';
import { select } from 'd3';

describe('safety-outlier-explorer initialization', () => {
    const
        { JSDOM } = jsdom,
        settings = {
        },
        data = require('./data/ADBDS.json');
    let dom,
        container,
        SOE;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
        container = dom.window.document.querySelector('div');
        SOE = safetyOutlierExplorer(container, settings, dom);
        SOE.init(data, true);
    });

    beforeEach(() => {
    });

    afterEach(() => {
    });

    describe('User calls init method of safetyOutlierExplorer.', () => {

        it('renders a population annotation', () => {
            const populationAnnotation = dom.window.document.querySelector('#participant-count').textContent;
            console.log(populationAnnotation);
            expect(populationAnnotation).toBeTruthy();
            //console.log(populationAnnotation.textContent);
        });

    });
});
