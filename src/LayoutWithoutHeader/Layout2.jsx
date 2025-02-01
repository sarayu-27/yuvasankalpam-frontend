import PropTypes from 'prop-types';

const Layout2 = ({ children }) => {
  return <div className="sts">{children}</div>;
};

Layout2.propTypes = {
  children: PropTypes.any
};

export default Layout2;
