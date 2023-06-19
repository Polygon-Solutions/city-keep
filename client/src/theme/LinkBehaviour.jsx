import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

/** 
 * *
 * Link Behavior Forward Ref
 * @description 
    - Renders any links and buttons from the MUI component 
      library as react-router-dom Link components.
    - Refer to: https://mui.com/material-ui/guides/routing/
 * @listens theme.jsx
 */
const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

// PropTypes

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
};

export default LinkBehavior;
