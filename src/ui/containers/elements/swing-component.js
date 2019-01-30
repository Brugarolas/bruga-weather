import React, { Component } from 'react';
import Swing from '@andres-brugarolas/swing';

const config = {
  allowedDirections: [Swing.Direction.LEFT],
  throwOutConfidence: (xOffset, yOffset, element) => {
    return Math.min(Math.abs(xOffset) / (element.offsetWidth * 0.4), 1);
  },
  throwOutDistance: () => {
    return window.innerWidth;
  },
  rotation: () => { return 0; },
  vertical: false,
  velocity: 1
}

const skipFlipAnimation = (event) => {
  const element = event.target.parentElement;
  element.classList.add('skipFlipAnimation');
}

const getStack = (() => {
  const singletonStack = Swing.Stack(config);
  return () => singletonStack;
})();

const singletonStack = Swing.Stack(config);

class SwingComponent extends Component {
  constructor (props) {
    super(props);
    this.stack = getStack();
  }

  componentWillUnmount () {
    this.destroyCurrentCard();
  }

  destroyCurrentCard () {
    this.card && this.card.destroy();
  }

  addElement (element) {
    if (!element) return;
    this.destroyCurrentCard();

    this.card = this.stack.createCard(element);
    element.style['cursor'] = 'pointer';

    this.card.on('throwout', skipFlipAnimation);
    this.card.on('throwoutend', this.onTrowOut);
  }
}

export default SwingComponent;
