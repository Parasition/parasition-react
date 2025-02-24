import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children }) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (!container) {
      setContainer(document.createElement('div'));
      return;
    }
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return container ? ReactDOM.createPortal(children, container) : null;
};

Portal.propTypes = {
  children: PropTypes.node,
};

export default Portal;
