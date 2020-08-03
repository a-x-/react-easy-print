import React, { useState, useEffect, useRef } from 'react';
import { usePrintProvider } from './PrintProviderContext';
import PropTypes from 'prop-types';
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

export default function Print (props) {
  const [printOffsetLeft, setPrintOffsetLeft] = useState(0);
  const [printOffsetTop, setPrintOffsetTop] = useState(0);
  const { regPrintable, unregPrintable } = usePrintProvider();
  const printElement = useRef(null);
  const main_ = (props.main || props.single) ? s._main : '';
  const excl_ = (props.exclusive || props.printOnly) ? s._exclusive : '';
  const isPrint = window.matchMedia('print').matches;
  const offset_ = ((printOffsetTop || printOffsetLeft) && main_ && isPrint) ?
    { marginTop: -printOffsetTop, marginLeft: -printOffsetLeft } : {};
  const globalClassName = 'react-easy-print-print'; // using in hiddenAll
  const className = `${globalClassName} ${s.root} ${main_} ${excl_}`;

  useEffect(() => {
    if (props.name) {
      debug('init printable', props.name);
      const isSingle = (props.main || props.single);
      regPrintable(name, <Print {...props} />, isSingle);
    }

    if (props.main || props.single) {

      window.matchMedia('print').onchange = () => {
        const isPrint = window.matchMedia('print').matches;

        if (isPrint) {
          const bodyRect = document.body.getBoundingClientRect();
          const elem = printElement.current;
          const elemRect = elem && elem.getBoundingClientRect();
          const printOffsetLeft = elemRect && (elemRect.left - bodyRect.left);
          const printOffsetTop = elemRect && (elemRect.top - bodyRect.top);

          setPrintOffsetLeft(printOffsetLeft);
          setPrintOffsetTop(printOffsetTop);
        } else {
          setPrintOffsetLeft(0);
          setPrintOffsetTop(0);
        }
      };
    }

    return () => {
      if (props.name) {
        debug('remove printable', props.name);
        const isSingle = (props.main || props.single);
        unregPrintable(props.name, isSingle);
      }
  
      if (props.main || props.single) {
        window.matchMedia('print').onchange = null;
      }
    };
  }, []);
  return <div ref={printElement} style={offset_} className={className}>{props.children}</div>;
}

Print.propTypes = propTypes;
