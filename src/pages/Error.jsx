
import { useSelector} from 'react-redux';

function Error() {
  const error = useSelector((state) => state.error.error);
  console.log({inError:error});
  return (
    <div className="sts-error">
        <div className="sts-error__msg">Something went wrong</div>
        <div className="sts-error__description">
            <span>Error Message:</span>
            <span>{error}</span>
        </div>
    </div>
  )
}

export default Error;
