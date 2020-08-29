import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const DocumentPortal = (props) => {
  const child = React.Children.only(props.children);
const nodeRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (nodeRef.current === null) {
      nodeRef.current = document.createElement('div');
    }

    document.body.appendChild(nodeRef.current);

    return () => document.body.removeChild(nodeRef.current);
  }, []);

  return ReactDOM.createPortal(child, nodeRef.current);
};

DocumentPortal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DocumentPortal;
