import { useState } from "react";
import styles from "./rate-modal.module.css";

interface RateModalProps {
  onClose: () => void;
  onSave: (rate: number) => void;
}

export const RateModal = ({ onClose, onSave }: RateModalProps) => {
  const [mark, setMark] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    const markValue = parseInt(mark);
    if (markValue >= 0 && markValue <= 10) {
      onSave(markValue);
    } else {
      setError("Please enter a valid mark between 0-10.");
    }
  };

  const markDescription = (mark: number) => {
    if (mark >= 0 && mark <= 3) return "Fail";
    if (mark >= 4 && mark <= 6) return "Fine";
    if (mark >= 7 && mark <= 8) return "Good";
    if (mark >= 9 && mark <= 10) return "Excellent";
    return "";
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Assign Mark</h3>
        <select value={mark} onChange={(e) => setMark(e.target.value)}>
          <option value="">Select mark</option>
          {Array.from({ length: 11 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {mark && <p>{markDescription(parseInt(mark))}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};