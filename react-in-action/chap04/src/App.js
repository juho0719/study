import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
import './shared/styles.scss';

ReactDOM.render(<App />, document.getElementById('app'));