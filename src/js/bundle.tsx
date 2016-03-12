/// <reference path="../../typings/browser.d.ts" />

import {View as MainView} from './views/main';

import * as React from 'react';
import * as ReactDom from 'react-dom';


ReactDom.render(<MainView />, document.querySelector('.main-view'));
