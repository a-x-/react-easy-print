import React from 'react';
import PropTypes from 'prop-types';

import PrintProvider from './PrintProvider';
import { debug } from './common';
import s from './Print.css';

const propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  main: PropTypes.bool,
  single: PropTypes.bool,
  exclusive: PropTypes.bool,
  printOnly: PropTypes.bool
};
const contextTypes = PrintProvider.childContextTypes;

export default class Print extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      printOffsetLeft: 0,
      printOffsetTop: 0
    };
  }
  componentDidMount() {

    if (this.props.name) {
      debug('init printable', this.props.name);
      const isSingle = (this.props.main || this.props.single);
      this.context.printProvider && this.context.printProvider.regPrintable(this.props.name, <Print {...this.props} />, isSingle);
    }

    if (this.props.main || this.props.single) {

      window.matchMedia('print').onchange = () => {
        const bodyRect = document.body.getBoundingClientRect();
        const elem = this.printElement;
        const elemRect = elem && elem.getBoundingClientRect();
        const printOffsetLeft = elemRect && (elemRect.left - bodyRect.left);
        const printOffsetTop = elemRect && (elemRect.top - bodyRect.top);

        this.setState({
          printOffsetTop,
          printOffsetLeft,
        });
      };
    }
  }

  componentWillUnmount() {
    if (this.props.name) {
      debug('remove printable', this.props.name);
      this.context.printProvider && this.context.printProvider.unregPrintable(this.props.name);
    }

    if (this.props.main || this.props.single) {
      window.matchMedia('print').onchange = null;
    }
  }

  render() {

    const { children, main, single, exclusive, printOnly } = this.props;
    const { printOffsetLeft, printOffsetTop } = this.state;
    const main_ = (main || single) ? s.main : '';
    const excl_ = (exclusive || printOnly) ? s.exclusive : '';
    const isPrint = window.matchMedia('print').matches;
    const offset_ = ((printOffsetTop || printOffsetLeft ) && main_ && isPrint) ? { marginTop: -printOffsetTop, marginLeft: -printOffsetLeft} : {marginTop: 0, marginLeft: 0};
    return <div ref={ (el) => this.printElement = el } style={offset_} className={`${s.root} ${main_} ${excl_}`}>{children}</div>;
  }
}
Print.propTypes = propTypes;
Print.contextTypes = contextTypes;
