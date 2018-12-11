import React, { Component } from 'react';
import HandleError from './error/handle-error.js';
import Header from '@/ui/components/header.js';
import Main from '@/ui/components/main.js';
import Home from '@/ui/containers/home.js';
import Control from '@/ui/containers/control.js';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <HandleError>
        <Header />
        <Main>
          <Home />
        </Main>
        <Control />
      </HandleError>
    );
  }
}

export default App;
