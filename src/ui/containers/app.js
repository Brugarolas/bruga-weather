import React, { Component } from 'react';
import HandleError from './error/handle-error.js';
import Header from '@/ui/components/header.js';
import Main from '@/ui/components/main.js';
import Home from '@/ui/containers/home.js';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <>
        <Header />
        <Main>
          <HandleError>
            <Home />
          </HandleError>
        </Main>
      </>
    );
  }
}

export default App;
