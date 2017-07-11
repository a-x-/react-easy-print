import React from 'react';
import PropTypes from 'prop-types';
import s from './index.css';

const spliced = (array, i) => {
  const array_ = [...array];
  array_.splace(i, 1);
  return array_;
};

export default class PrintProvider extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isInPrintPreview: false,
      printableNodes: [],
    };
    this.printableRegistry = {};
    window.matchMedia('print').onchange = () => {
      console.log('toggle print mode', window.matchMedia('print').matches);
      this.setState({ isInPrintPreview: window.matchMedia('print').matches });
    };

    // setTimeout(() => {console.log('go to print mode'); this.setState({isInPrintPreview: true});}, 5000); // todo: remove
  }

  getChildContext () {
    return {
      printProvider: {
        isPrint: window.matchMedia('print').matches,
        regPrintable: this.regPrintable.bind(this),
        unregPrintable: this.unregPrintable.bind(this),
      },
    };
  }

  regPrintable (key, node) {
    console.log('reg printable', key, node);
    if (this.printableRegistry[key]) return;
    setTimeout(() => this.setState({
      printableNodes: this.state.printableNodes.concat(node),
    }), 0);
    this.printableRegistry = Object.assign({}, this.printableRegistry, { [key]: this.state.printableNodes.length });
  }

  unregPrintable (key) {
    if (!this.printableRegistry[key] || this.state.isInPrintPreview) return;
    this.setState({
      printableNodes: spliced(this.state.printableNodes, this.printableRegistry[key]),
    });
    this.printableRegistry = Object.assign({}, this.printableRegistry, { [key]: false });
  }

  render () {
    const { isInPrintPreview, printableNodes } = this.state;
    const { loose } = this.props;
    const children_ = (() => {
      if (isInPrintPreview && printableNodes.length && !loose) {
        console.log('render printable only', printableNodes);
        return React.Children.map(printableNodes, (child, key) => {
          return React.cloneElement(child, { key });
        });
      }
      console.log('render everything', isInPrintPreview, printableNodes.length, !loose);
      return this.props.children;
    })();
    return <div className={ s.wrap }>{ children_ }</div>;
  }
}
PrintProvider.propTypes = {
  loose:    PropTypes.bool,
  children: PropTypes.node.isRequired,
};

PrintProvider.childContextTypes = {
  printProvider: PropTypes.shape({
    regPrintable: PropTypes.func.isRequired,
    unregPrintable: PropTypes.func.isRequired,
    isPrint: PropTypes.bool.isRequired,
  }).isRequired,
};

export class Print extends React.PureComponent {
  componentDidMount() {
    if (this.props.name) {
      console.log('init printable', this.props.name);
      this.context.printProvider.regPrintable(this.props.name, <Print {...this.props}/>);
    }
  }
  componentWillUnmount() {
    if (this.props.name) {
      console.log('remove printable', this.props.name);
      this.context.printProvider.unregPrintable(this.props.name);
    }
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
Print.contextTypes = PrintProvider.childContextTypes;

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
