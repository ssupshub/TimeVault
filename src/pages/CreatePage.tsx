import { useNavigate } from 'react-router-dom';
import CapsuleForm from '../components/CapsuleForm';

function CreatePage() {
  const navigate = useNavigate();

  const handleCapsuleCreated = (_id: string, unlockDate: string, deliveryMethod: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/confirmation', { state: { unlockDate, deliveryMethod } });
  };

  return (
    <div className="create-page">
      <CapsuleForm onCapsuleCreated={handleCapsuleCreated} />
    </div>
  );
}

export default CreatePage;
