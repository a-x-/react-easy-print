import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';
import { spliced, debug } from './common';

export const propTypes = {
  loose:    PropTypes.bool,
  children: PropTypes.node.isRequired,
  invert:   PropTypes.bool,
};

export const childContextTypes = {
  printProvider:    PropTypes.shape({
    regPrintable:   PropTypes.func.isRequired,
    unregPrintable: PropTypes.func.isRequired,
    isPrint:        PropTypes.bool.isRequired,
  }).isRequired,
};

export default class PrintProvider extends React.PureComponent {
  constructor (props) {
    super(props);
    // TODO: remove state
    this.state = {
      isInPrintPreview: false,
      printableNodes: [],
    };
    this.wasInPrintPreview = false;
    this.printableRegistry = {};
    window.matchMedia('print').onchange = () => {
      debug('toggle print mode', window.matchMedia('print').matches);
      // TODO: remove setState
      this.setState({ isInPrintPreview: window.matchMedia('print').matches });
    };
  }

  // FIXME: how to update context w/o children useless re-renders and state loosing
  getChildContext () {
    return {
      printProvider: {
        // TODO: add into documentation (print mode customization cases)
        isPrint: window.matchMedia('print').matches,
        regPrintable: this.regPrintable.bind(this),
        unregPrintable: this.unregPrintable.bind(this),
      },
    };
  }

  regPrintable (key, node) {
    const loose = this.props.loose || this.props.invert;
    debug('reg printable', key, node);
    if (this.printableRegistry[key] !== undefined || loose) return;
    // TODO: remove setState
    setTimeout(() => this.setState({
      printableNodes: this.state.printableNodes.concat(node),
    }), 0);
    this.printableRegistry[key] = this.state.printableNodes.length;
  }

  unregPrintable (key) {
    const loose = this.props.loose || this.props.invert;
    if (this.printableRegistry[key] === undefined || this.state.isInPrintPreview || loose) return;
    // TODO: remove setState
    this.setState({
      printableNodes: spliced(this.state.printableNodes, this.printableRegistry[key]),
    });
    this.printableRegistry = Object.assign({}, this.printableRegistry, { [key]: undefined });
  }

  handlePrintModeChange () {
    throw 'not implemented yet';

    const loose = this.props.loose || this.props.invert;
    const { isInPrintPreview, printableNodes } = this.state;
    if (isInPrintPreview && printableNodes.length && !loose) {
      debug('render printable only', printableNodes);
      this.renderPortal(() => {
        return React.Children.map(printableNodes, (child, key) => {
          return React.cloneElement(child, { key });
        });
      });
      this.wasInPrintPreview = true;
    }
    if (this.wasInPrintPreview) {
      this.wasInPrintPreview = false;
      this.clearPortal();
    }
  }

  // TODO: use React.portal if available
  renderPortal () {
    throw 'not implemented yet';
  }
  clearPortal () {
    throw 'not implemented yet';
  }

  render () {
    const loose = this.props.loose || this.props.invert;
    const loose_ = loose ? s.loose : '';
    const invert_ = this.props.invert ? s.invert : '';

    return <div className={`${ s.wrap } ${ loose_ } ${ invert_ }`}>
      { this.props.children }
    </div>;
  }
}
PrintProvider.propTypes = propTypes;
PrintProvider.childContextTypes = childContextTypes;
