import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

interface CapsuleFormProps {
  onCapsuleCreated: (id: string, unlockDate: string, deliveryMethod: string) => void;
}

function CapsuleForm({ onCapsuleCreated }: CapsuleFormProps) {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'sms'>('email');
  const [deliveryTarget, setDeliveryTarget] = useState('');
  const [unlockPeriod, setUnlockPeriod] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const calculateUnlockDate = (years: string): Date => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + parseInt(years));
    return date;
  };

  const getFileType = (file: File): string => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let fileUrl = null;
      let fileType = null;

      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('capsule-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('capsule-files')
          .getPublicUrl(fileName);

        fileUrl = urlData.publicUrl;
        fileType = getFileType(file);
      }

      const unlockDate = calculateUnlockDate(unlockPeriod);

      const { data, error: insertError } = await supabase
        .from('time_capsules')
        .insert({
          message,
          file_url: fileUrl,
          file_type: fileType,
          delivery_method: deliveryMethod,
          delivery_target: deliveryTarget,
          unlock_date: unlockDate.toISOString(),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      onCapsuleCreated(data.id, unlockDate.toISOString(), deliveryMethod);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create capsule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="capsule-form-container">
      <div className="header">
        <div className="logo">⏳</div>
        <h1>TimeVault</h1>
        <p className="subtitle">Create a message to your future self</p>
      </div>

      <form onSubmit={handleSubmit} className="capsule-form">
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message to your future self..."
            required
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload File (Optional)</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
          />
          {file && <p className="file-name">{file.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="unlock-period">Unlock In</label>
          <select
            id="unlock-period"
            value={unlockPeriod}
            onChange={(e) => setUnlockPeriod(e.target.value)}
          >
            <option value="1">1 Year</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
          </select>
        </div>

        <div className="form-group">
          <label>Delivery Method</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="email"
                checked={deliveryMethod === 'email'}
                onChange={(e) => setDeliveryMethod(e.target.value as 'email')}
              />
              <span>Email</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="sms"
                checked={deliveryMethod === 'sms'}
                onChange={(e) => setDeliveryMethod(e.target.value as 'sms')}
              />
              <span>SMS</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="delivery-target">
            {deliveryMethod === 'email' ? 'Email Address' : 'Phone Number'}
          </label>
          <input
            type={deliveryMethod === 'email' ? 'email' : 'tel'}
            id="delivery-target"
            value={deliveryTarget}
            onChange={(e) => setDeliveryTarget(e.target.value)}
            placeholder={
              deliveryMethod === 'email'
                ? 'your@email.com'
                : '+1234567890'
            }
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Sealing Capsule...' : 'Seal Time Capsule'}
        </button>
      </form>
    </div>
  );
}

export default CapsuleForm;
