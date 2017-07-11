import React from 'react';
import PropTypes from 'prop-types';
import s from './index.css';

export default class PrintProvider extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isInPrintPreview: false,
      printableNodes: [],
      printableRegistry: {},
    };
    window.matchMedia('print').onchange = () => {
      console.log('toggle print mode', window.matchMedia('print').matches);
      this.setState({ isInPrintPreview: window.matchMedia('print').matches });
    };

    setTimeout(() => this.setState({isInPrintPreview: true}), 500);
  }

  getChildContext () {
    return {
      printProvider: {
        isPrint: window.matchMedia('print').matches,
        regPrintable: this.regPrintable.bind(this),
      },
    };
  }

  regPrintable (key, node) {
    console.log('reg printable', key, node);
    if (this.state.printableRegistry[key]) return;
    this.setState({
      printableNodes: this.state.printableNodes.concat(node),
      printableRegistry: Object.assign({}, this.state.printableRegistry, { [key]: true }),
    });
  }

  render () {
    const { isInPrintPreview, printableNodes } = this.state;
    const { loose } = this.props;
    if (isInPrintPreview && printableNodes.length && !loose) {
      console.log('render printable only', printableNodes)
      return React.Children.map(printableNodes, (child, key) => {
        return React.cloneElement(child, { key });
      });
    }
    console.log('render everything')
    return <div className={ s.wrap }>{ this.props.children }</div>;
  }
}
PrintProvider.propTypes = {
  loose:    PropTypes.bool,
  children: PropTypes.node.isRequired,
};

PrintProvider.childContextTypes = {
  printProvider: PropTypes.shape({
    regPrintable: PropTypes.func.isRequired,
    isPrint: PropTypes.bool.isRequired,
  }).isRequired,
};

export class Print extends React.PureComponent {
  constructor (props, context) {
    super(props);
    console.log('init printable')
    props.name && context.printProvider.regPrintable(props.name, this);
  }
  render () {
    const { children, main, exclusive } = this.props;
    const main_ = main ? s.main : '';
    const excl_ = exclusive ? s.exclusive : '';
    return <div className={`${ s.print } ${ main_ } ${ excl_ }`}>{ children }</div>;
  }
}
Print.propTypes = {
  name:     PropTypes.string,
  children: PropTypes.node.isRequired,
  main: PropTypes.bool,
  exclusive: PropTypes.bool,
};
export class NoPrint extends React.PureComponent {
  render () {
    const { children, force } = this.props;
    const force_ = force ? s.force : '';
    return <div className={`${ s.noPrint } ${ force_ }`}>{ children }</div>;
  }
}
NoPrint.propTypes = {
  force:    PropTypes.bool,
  children: PropTypes.node.isRequired,
};
