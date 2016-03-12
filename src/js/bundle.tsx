/// <reference path="../../typings/browser.d.ts" />

import {View as MainView} from './views/main';

import {DOM} from 'yua';
import * as React from 'react';
import * as ReactDom from 'react-dom';

var map: DOM.ElementMap = {
    '.main-view': MainView
};


DOM.iterateElementMap(map, (id: string, Klass: any, el: Element, props: any) => {
    ReactDom.render(<Klass {...props} />, el);
})
