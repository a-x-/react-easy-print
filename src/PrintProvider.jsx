import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import s from './PrintProvider.css';
import { spliced, debug } from './common';

export const propTypes = {
  loose: PropTypes.bool,
  children: PropTypes.node.isRequired,
  invert: PropTypes.bool,
};

export const childContextTypes = {
  printProvider: PropTypes.shape({
    regPrintable: PropTypes.func.isRequired,
    unregPrintable: PropTypes.func.isRequired,
    isPrint: PropTypes.bool.isRequired,
  }).isRequired,
};

export default class PrintProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInPrintPreview: false,
      printableNodes: [],
      hasSingle: false,
    };
    this.printableRegistry = {};
    window.matchMedia('print').onchange = () => {
      debug('toggle print mode', window.matchMedia('print').matches);
      this.setState({ isInPrintPreview: window.matchMedia('print').matches });
    };
  }

  getChildContext() {
    return {
      printProvider: {
        isPrint: window.matchMedia('print').matches,
        regPrintable: this.regPrintable.bind(this),
        unregPrintable: this.unregPrintable.bind(this),
      },
    };
  }

  regPrintable(key, node, isSingle) {
    const loose = this.props.loose || this.props.invert;
    debug('reg printable', key, node);

    this.setState({
      hasSingle: this.state.hasSingle || isSingle
    });

    if (this.printableRegistry[key] !== undefined || loose || isSingle) return;
    setTimeout(() => this.setState({
      printableNodes: this.state.printableNodes.concat(node),
    }), 0);
    this.printableRegistry[key] = this.state.printableNodes.length;
  }

  unregPrintable(key) {
    const loose = this.props.loose || this.props.invert;
    if (this.printableRegistry[key] === undefined || this.state.isInPrintPreview || loose) return;
    this.setState({
      printableNodes: spliced(this.state.printableNodes, this.printableRegistry[key]),
    });
    this.printableRegistry = Object.assign({}, this.printableRegistry, { [key]: undefined });
  }

  createRender(children) {
    const el = document.createElement('div');
    el.id = 'render';
    document.body.appendChild(el);

    ReactDOM.render(<div className={s.printRender} >{children}</div>, el);
  }

  deleteRender() {
    const el = document.getElementById('render');
    el && document.body.removeChild(el);
  }

  render() {
    const { isInPrintPreview, printableNodes, hasSingle } = this.state;
    const loose = this.props.loose || this.props.invert;

    if (isInPrintPreview && printableNodes.length && !loose && !hasSingle) {
      debug('render printable only', printableNodes);
      const children = React.Children.map(printableNodes, (child,key) => {
        return React.cloneElement(child, { key });
      });

      this.createRender(<div>{children}</div>);
    }
    setTimeout(() => this.deleteRender(), 0);

    debug('render everything', isInPrintPreview, printableNodes.length, !loose);
    const loose_ = loose ? s.loose : '';
    const invert_ = this.props.invert ? s.invert : '';
    const hiddenAll_ = hasSingle ? s.hiddenAll : '';

    return <div className={`${s.wrap} ${loose_} ${invert_} ${hiddenAll_} `}>{this.props.children}</div>;
  }
}
PrintProvider.propTypes = propTypes;
PrintProvider.childContextTypes = childContextTypes;
