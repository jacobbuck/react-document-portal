import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const DocumentPortal = (props) => {
  const child = React.Children.only(props.children);
  const [node, setNode] = useState();

  useEffect(() => {
    setNode((node) => node || document.createElement('div'));
  }, []);

  useEffect(() => {
    if (node) {
      document.body.appendChild(node);
      return () => {
        document.body.removeChild(node);
      };
    }
  }, [node]);

  return node ? ReactDOM.createPortal(child, node) : null;
};

DocumentPortal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DocumentPortal;
