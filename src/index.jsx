import React from 'react';
import PropTypes from 'prop-types';
import s from './index.css';

export default class PrintProvider extends React.PureComponent {
  getChildContext () {
    return {
      printProvider: {
        isPrint: window.matchMedia('print').matches,
      },
    };
  }

  render () {
    return <div className={ s.wrap }>{ this.props.children }</div>;
  }
}
PrintProvider.propTypes = {
  children: PropTypes.node,
};

PrintProvider.childContextTypes = {
  printProvider: PropTypes.shape({
    isPrint: PropTypes.bool.isRequired,
  }).isRequired,
};

export const Print = () => {
  const { children, main, exclusive } = this.props;
  const main_ = main ? s.main : '';
  const excl_ = exclusive ? s.exclusive : '';
  return <div className={`${ s.print } ${ main_ } ${ excl_ }`}>{ children }</div>;
};
Print.propTypes = {
  children: PropTypes.node,
  main: PropTypes.bool,
  exclusive: PropTypes.bool,
};
export const NoPrint = () => {
  return <div className={ s.noPrint }>{ this.props.children }</div>;
};
NoPrint.propTypes = {
  children: PropTypes.node,
};
