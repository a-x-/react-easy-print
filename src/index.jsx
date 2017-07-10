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
    return <div style={ s.wrap }>{ this.props.children }</div>;
  }
}

PrintProvider.childContextTypes = {
  printProvider: PropTypes.shape({
    isPrint: PropTypes.bool.isRequired,
  }).isRequired,
};

export const Print = () => {
  const { children, main, exclusive } = this.props;
  const main_ = main ? ' _main' : '';
  const excl_ = exclusive ? ' _exclusive' : '';
  return <div style={ s.print } className="${ main_ }${ excl_ }">{ children }</div>;
};

export const NoPrint = () => {
  return <div style={ s['no-print'] }>{ this.props.children }</div>;
};
