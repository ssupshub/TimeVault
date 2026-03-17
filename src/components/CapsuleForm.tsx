import { useState, FormEvent, useRef } from 'react';
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
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (f: File) => setFile(f);

  const getMinDate = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
  };

  const getFileType = (f: File) => {
    if (f.type.startsWith('image/')) return 'image';
    if (f.type.startsWith('video/')) return 'video';
    if (f.type.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const getFileIcon = (f: File) => {
    if (f.type.startsWith('image/')) return '🖼️';
    if (f.type.startsWith('video/')) return '🎬';
    if (f.type.startsWith('audio/')) return '🎵';
    return '📄';
  };

  const fmtSize = (b: number) => {
    if (b === 0) return '0 Bytes';
    const k = 1024, s = ['Bytes','KB','MB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return Math.round(b / Math.pow(k, i) * 100) / 100 + ' ' + s[i];
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]);
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

      if (!customDate) throw new Error('Please select an unlock date');

      const unlockDate = new Date(`${customDate}T${customTime}`);
      if (unlockDate <= new Date()) throw new Error('Unlock date must be in the future');

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
    <div className="form-wrapper">
      <div className="form-header">
        <div className="form-header-icon">⏳</div>
        <h1 className="form-title">Seal Your Story</h1>
        <p className="form-subtitle">A letter locked in time, waiting to be read</p>
      </div>

      <div className="capsule-form-container">
        <form onSubmit={handleSubmit} className="capsule-form">

          {/* Message */}
          <div className="form-section">
            <label className="form-label" htmlFor="message">Your Message</label>
            <textarea
              id="message"
              className="form-textarea"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Dear future self, I'm writing this on a quiet evening…"
              required
              rows={6}
            />
          </div>

          <div className="form-divider">Attachment</div>

          {/* File Upload */}
          <div className="form-section">
            <label className="form-label">Attach a Memory (Optional)</label>
            <div
              className={`upload-zone${dragOver ? ' drag-over' : ''}`}
              onDragEnter={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={e => { e.preventDefault(); setDragOver(false); }}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="file-input"
                onChange={e => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              />
              {file ? (
                <div className="file-preview" onClick={e => e.stopPropagation()}>
                  <span className="file-preview-icon">{getFileIcon(file)}</span>
                  <div className="file-preview-info">
                    <div className="file-preview-name">{file.name}</div>
                    <div className="file-preview-size">{fmtSize(file.size)}</div>
                  </div>
                  <button
                    type="button"
                    className="file-remove-btn"
                    onClick={() => setFile(null)}
                    aria-label="Remove file"
                  >✕</button>
                </div>
              ) : (
                <>
                  <div className="upload-icon-wrap">📎</div>
                  <p className="upload-text">
                    Drop a file here or <strong>click to browse</strong>
                  </p>
                  <p className="upload-hint">Images, videos, audio, PDFs · up to 50 MB</p>
                </>
              )}
            </div>
          </div>

          <div className="form-divider">Schedule</div>

          {/* Unlock date */}
          <div className="unlock-section">
            <div className="unlock-header">
              <span className="unlock-icon">🔐</span>
              <span className="unlock-title">Select Unlock Date & Time</span>
            </div>
            <div className="datetime-row">
              <div className="form-section">
                <label className="form-label" htmlFor="custom-date">Date</label>
                <input
                  type="date"
                  id="custom-date"
                  className="form-input"
                  value={customDate}
                  onChange={e => setCustomDate(e.target.value)}
                  min={getMinDate()}
                  required
                />
              </div>
              <div className="form-section">
                <label className="form-label" htmlFor="custom-time">Time</label>
                <input
                  type="time"
                  id="custom-time"
                  className="form-input"
                  value={customTime}
                  onChange={e => setCustomTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-divider">Delivery</div>

          {/* Delivery method */}
          <div className="form-section">
            <label className="form-label">Delivery Method</label>
            <div className="delivery-options">
              <div className="delivery-option">
                <input
                  type="radio"
                  id="del-email"
                  name="delivery"
                  value="email"
                  checked={deliveryMethod === 'email'}
                  onChange={() => setDeliveryMethod('email')}
                />
                <label className="delivery-label" htmlFor="del-email">
                  <span className="delivery-icon">✉️</span>
                  <div className="delivery-info">
                    <span className="delivery-name">Email</span>
                    <span className="delivery-desc">Inbox delivery</span>
                  </div>
                  <span className="delivery-check" />
                </label>
              </div>
              <div className="delivery-option">
                <input
                  type="radio"
                  id="del-sms"
                  name="delivery"
                  value="sms"
                  checked={deliveryMethod === 'sms'}
                  onChange={() => setDeliveryMethod('sms')}
                />
                <label className="delivery-label" htmlFor="del-sms">
                  <span className="delivery-icon">💬</span>
                  <div className="delivery-info">
                    <span className="delivery-name">SMS</span>
                    <span className="delivery-desc">Text message</span>
                  </div>
                  <span className="delivery-check" />
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="delivery-target">
              {deliveryMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <input
              type={deliveryMethod === 'email' ? 'email' : 'tel'}
              id="delivery-target"
              className="form-input"
              value={deliveryTarget}
              onChange={e => setDeliveryTarget(e.target.value)}
              placeholder={deliveryMethod === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
              required
            />
          </div>

          {error && (
            <div className="form-error">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <span className="submit-btn-spinner" />
                <span>Sealing Capsule…</span>
              </>
            ) : (
              <>
                <span>🔒</span>
                <span>Seal Time Capsule</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CapsuleForm;
