import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PrintProviderContext from './PrintProviderContext';
import s from './PrintProvider.css';
import { spliced, debug } from './common';

export const propTypes = {
  loose: PropTypes.bool,
  children: PropTypes.node.isRequired,
  invert: PropTypes.bool
};

const createRender = children => {
  const el = document.createElement('div');
  el.id = 'render';
  document.body.appendChild(el);
  ReactDOM.render(<div className={s.printRender}>{children}</div>, el);
};

const deleteRender = () => {
  const el = document.getElementById('render');
  el && document.body.removeChild(el);
};

export default function PrintProvider (props) {

  const [isInPrintPreview, setIsInPrintPreview] = useState(false);
  const [printableNodes, setPrintableNodes ] = useState([]);

  const printableRegistry = useRef({});
  const hasSingle = useRef(false);

  // hideAll - is being used to cover all of React Portals, popups and modals and etc.
  const hideAll = () => {
    document.body.classList.add(s.hiddenAll);
    hasSingle.current = true;
  };

  const unhideAll = () =>  {
    document.body.classList.remove(s.hiddenAll);
    hasSingle.current = false;
  };

  const regPrintable = (key, node) => {
    const loose = props.loose || props.invert;
    const isSingle = node.props.single || node.props.main;

    debug('reg printable', key, node);

    if (printableRegistry.current[key] !== undefined || loose) return;
    setTimeout(
      () =>
        setPrintableNodes(printableNodes.concat(node)),
      0
    );
    printableRegistry.current[key] = printableNodes.length;

    if (isSingle && !hasSingle) {
      hideAll();
    } else if (isSingle) {
      console.warn(
        new Error(
          'react-easy-print warning \n\t you\'re using more than one `single` Print component'
        )
      );
    }
  };

  const unregPrintable = (key, isSingle) => {
    const loose = props.loose || props.invert;
    if (
      printableRegistry.current[key] === undefined ||
      isInPrintPreview ||
      loose
    )
      return;
    setPrintableNodes(
      spliced(
        printableNodes,
        printableRegistry.current[key]
      )
    );
    printableRegistry.current = {
      ...printableRegistry.current,
      [key]: undefined
    };
    if (isSingle) {
      unhideAll();
    }
  };

  useEffect(() => {
    window.matchMedia('print').onchange = () => {
      debug('toggle print mode', window.matchMedia('print').matches);
      setIsInPrintPreview(window.matchMedia('print').matches);
    };
  });

  useEffect(() => {
    if (isInPrintPreview && printableNodes.length && !loose && !hasSingle) {
      debug('render printable only', printableNodes);
      const children = React.Children.map(printableNodes, (child, key) => {
        return React.cloneElement(child, { key });
      });
      createRender(<div>{children}</div>);
    }
    setTimeout(() => deleteRender(), 0);
  });
  
  useEffect(() => {
    debug('render everything', isInPrintPreview, printableNodes.length, !loose);
  });

  const loose = props.loose || props.invert;
  const loose_ = loose ? s.loose : '';
  const invert_ = props.invert ? s.invert : '';
  return (
    <PrintProviderContext.Provider unregPrintable={unregPrintable} regPrintable={regPrintable}>
      <div className={`${s.wrap} ${loose_} ${invert_} `}>
        {props.children}
      </div>
    </PrintProviderContext.Provider>
  );
};

PrintProvider.propTypes = propTypes;
