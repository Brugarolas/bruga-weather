import React, { PureComponent } from 'react';
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

class SwingComponent extends PureComponent {
  constructor (props) {
    super(props);
    this.stack = Swing.Stack(config);
  }

  componentWillUnmount () {
    this.stack.destroyAll();
  }

  addElement (element) {
    if (!element) return;

    const card = this.stack.createCard(element);
    element.style['cursor'] = 'pointer';

    card.on('throwout', this.onTrowOut);
  }
}

export default SwingComponent;
