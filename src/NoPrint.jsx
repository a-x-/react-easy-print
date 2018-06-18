import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.css';

const propTypes = {
  force: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default class NoPrint extends React.PureComponent {
  render() {
    const { children, force } = this.props;
    const force_ = force ? s.force : '';
    return <div className={`${s.noPrint} ${force_}`}>{children}</div>;
  }
}
NoPrint.propTypes = propTypes;
