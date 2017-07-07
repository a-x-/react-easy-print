import React from 'react';
import PropTypes from 'prop-types';

export default class PrintProvider extends React.PureComponent {
  getChildContext () {
    return {
      regPrintable: this.regPrintable.bind(this),
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      isInPrintPreview: false,
      printableNodes: [],
      printableRegistry: {},
    };
    window.matchMedia('print').onchange = () => {
      this.setState({ isInPrintPreview: window.matchMedia('print').matches });
    };
  }

  regPrintable (key, node) {
    if (this.state.printableRegistry[key]) return;
    this.setState({
      printableNodes: this.state.printableNodes.concat(node),
      printableRegistry: Object.assign({}, printableRegistry, { [key]: true }),
    });
  }

  render () {
    if (this.state.isInPrintPreview) {
      return React.Children.map(this.state.printableNodes, (child, key) => {
        return React.cloneElement(child, { key });
      });
    }

    return this.props.children;
  }
}

PrintProvider.childContextTypes = {
  printProvider: PropTypes.shape({
    regPrintable: PropTypes.func.isRequired,
  }).isRequired,
};

export class Print extends React.PureComponent {
  constructor (props, context) {
    super(props);
    context.printProvider.regPrintable(props.name, this)
  }
  render () {
    return this.props.children;
  }
}

Print.contextTypes = PrintProvider.childContextTypes;
