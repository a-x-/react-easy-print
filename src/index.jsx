import React from 'react';
import './index.css';

export default class PrintProvider extends React.PureComponent {
  getChildContext () {
    return {
      printProvider: {
        isPrint: window.matchMedia('print').matches,
      },
    };
  }

  render () {
    return <div className="print-provider__wrap">{ this.props.children }</div>;
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
  return <div className="print-provider__print${ main_ }${ excl_ }">{ children }</div>;
};

export const NoPrint = () => {
  return <div className="print-provider__no-print">{ this.props.children }</div>;
};
