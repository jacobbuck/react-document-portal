import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const DocumentPortal = (props) => {
  const [node, setNode] = useState();

  useEffect(() => {
    setNode((node) => node || document.createElement('div'));
  }, []);

  useEffect(() => {
    if (node) {
      document.body.appendChild(node);
      return () => {
        node.parentNode.removeChild(node);
      };
    }
  }, [node]);

  return node ? ReactDOM.createPortal(props.children, node) : null;
};

DocumentPortal.defaultProps = {
  children: null,
};

DocumentPortal.propTypes = {
  children: PropTypes.node,
};

export default DocumentPortal;
