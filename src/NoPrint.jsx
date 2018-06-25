import React from 'react';
import PropTypes from 'prop-types';
import s from './NoPrint.css';

const propTypes = {
  force: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default class NoPrint extends React.PureComponent {
  render() {
    const { children, force } = this.props;
    const force_ = force ? s._force : '';
    return <div className={`${s.root} ${force_}`}>{children}</div>;
  }
}
NoPrint.propTypes = propTypes;
