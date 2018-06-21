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
    };
    this.printableRegistry = {};
    window.matchMedia('print').onchange = () => {
      debug('toggle print mode', window.matchMedia('print').matches);
      this.setState({ isInPrintPreview: window.matchMedia('print').matches });
    };

    this.hasSingle = false;
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

  // hideAll - is being used to cover all of React Portals, popups and modals and etc.
  hideAll() {
    document.body.classList.add(s.hiddenAll);
    this.hasSingle = true;
  }

  unhideAll() {
    document.body.classList.remove(s.hiddenAll);
    this.hasSingle = false;
  }

  regPrintable(key, node) {
    const loose = this.props.loose || this.props.invert;
    const isSingle = node.props.single || node.props.main;
    const { hasSingle } = this;

    debug('reg printable', key, node);

    if (this.printableRegistry[key] !== undefined || loose) return;
    setTimeout(() => this.setState({
      printableNodes: this.state.printableNodes.concat(node),
    }), 0);
    this.printableRegistry[key] = this.state.printableNodes.length;

    if (isSingle && !hasSingle) {
      this.hideAll();
    }else if(isSingle){
      console.warn(new Error('react-easy-print warning \n\t you\'re using more than one `single` Print component'));
    }
  }

  unregPrintable(key, isSingle) {
    const loose = this.props.loose || this.props.invert;
    if (this.printableRegistry[key] === undefined || this.state.isInPrintPreview || loose) return;
    this.setState({
      printableNodes: spliced(this.state.printableNodes, this.printableRegistry[key]),
    });
    this.printableRegistry = Object.assign({}, this.printableRegistry, { [key]: undefined });
    if (isSingle) {
      this.unhideAll();
    }
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
    const { isInPrintPreview, printableNodes } = this.state;
    const loose = this.props.loose || this.props.invert;
    const { hasSingle } = this;

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
    return <div className={`${s.wrap} ${loose_} ${invert_} `}>{this.props.children}</div>;
  }
}
PrintProvider.propTypes = propTypes;
PrintProvider.childContextTypes = childContextTypes;
