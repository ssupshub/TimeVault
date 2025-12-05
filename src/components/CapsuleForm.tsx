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
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('12:00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const calculateUnlockDate = (): Date => {
    const dateTimeString = `${customDate}T${customTime}`;
    return new Date(dateTimeString);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getFileType = (file: File): string => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const getFileIcon = (file: File): string => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '🎬';
    if (file.type.startsWith('audio/')) return '🎵';
    return '📄';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
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

      if (!customDate) {
        throw new Error('Please select an unlock date');
      }

      const unlockDate = calculateUnlockDate();

      if (unlockDate <= new Date()) {
        throw new Error('Unlock date must be in the future');
      }

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
          <label>Upload File (Optional)</label>
          <div
            className={`file-upload-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              className="file-input"
            />
            {file ? (
              <div className="file-preview">
                <div className="file-icon">{getFileIcon(file)}</div>
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => setFile(null)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <div className="upload-icon">📤</div>
                <p className="upload-text">
                  Drag your file here or <span className="click-text">click to browse</span>
                </p>
                <p className="upload-hint">
                  Supports images, videos, audio, PDFs, and documents
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="unlock-section">
          <h3 className="section-title">Select Unlock Date & Time</h3>
          <p className="section-subtitle">Choose when your capsule will be delivered</p>
          <div className="datetime-inputs">
            <div className="form-group">
              <label htmlFor="custom-date">Date</label>
              <input
                type="date"
                id="custom-date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                min={getMinDate()}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="custom-time">Time</label>
              <input
                type="time"
                id="custom-time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                required
              />
            </div>
          </div>
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
                ? 'Janedoe@email.com'
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
