import { useLocation, Navigate } from 'react-router-dom';
import ConfirmationScreen from '../components/ConfirmationScreen';

function ConfirmationPage() {
  const location = useLocation();
  const { unlockDate, deliveryMethod } = location.state || {};

  if (!unlockDate || !deliveryMethod) {
    return <Navigate to="/create" replace />;
  }

  return (
    <div className="confirmation-page">
      <ConfirmationScreen unlockDate={unlockDate} deliveryMethod={deliveryMethod} />
    </div>
  );
}

export default ConfirmationPage;
