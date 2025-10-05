import { useState } from 'react';
import CapsuleForm from './components/CapsuleForm';
import ConfirmationScreen from './components/ConfirmationScreen';

function App() {
  const [capsuleId, setCapsuleId] = useState<string | null>(null);
  const [unlockDate, setUnlockDate] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<string | null>(null);

  const handleCapsuleCreated = (id: string, date: string, method: string) => {
    setCapsuleId(id);
    setUnlockDate(date);
    setDeliveryMethod(method);
  };

  return (
    <div className="app">
      {!capsuleId ? (
        <CapsuleForm onCapsuleCreated={handleCapsuleCreated} />
      ) : (
        <ConfirmationScreen
          unlockDate={unlockDate!}
          deliveryMethod={deliveryMethod!}
        />
      )}
    </div>
  );
}

export default App;
