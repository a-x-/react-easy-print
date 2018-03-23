import React from 'react';
import PropTypes from 'prop-types';

import PrintProvider from './print-provider';
import { debug } from './common';
import s from './styles.css';

const propTypes = {
  name:     PropTypes.string,
  children: PropTypes.node.isRequired,
  main: PropTypes.bool,
  exclusive: PropTypes.bool,
};
const contextTypes = PrintProvider.childContextTypes;

export default class Print extends React.PureComponent {
  componentDidMount() {
    if (this.props.name) {
      debug('init printable', this.props.name);
      this.context.printProvider.regPrintable(this.props.name, <Print {...this.props}/>);
    }
  }
  componentWillUnmount() {
    if (this.props.name) {
      debug('remove printable', this.props.name);
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
Print.propTypes = propTypes;
Print.contextTypes = contextTypes;
