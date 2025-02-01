import PropTypes from 'prop-types';
import Header from '../components/Header';
const UserRoutes = ({children}) => {
  return (
    <div>
      <div className="sts">
      <Header
      />
      <div className="sts-body">{children}</div>
      <footer className='sts-footer'>copyright</footer>
    </div>
    </div>
  )
}
UserRoutes.propTypes = {
    children: PropTypes.any,
  };
export default UserRoutes;
