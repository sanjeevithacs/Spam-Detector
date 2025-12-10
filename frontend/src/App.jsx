import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [comment, setComment] = useState('');
  const [spamStatus, setSpamStatus] = useState('Not checked');
  const [spamProbability, setSpamProbability] = useState(null);
  const [history, setHistory] = useState([]);

  const spamWords = ['free', 'win', 'offer', 'buy', 'click','exclusive','updates'];

  // Highlight spam words in given text
  function highlightSpamWords(text) {
    const regex = new RegExp(`\\b(${spamWords.join('|')})\\b`, 'gi');
    return text.split(regex).map((part, i) =>
      spamWords.includes(part.toLowerCase()) ? <mark key={i}>{part}</mark> : part
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpamStatus('Checking...');
    setSpamProbability(null);

    try {
      const response = await axios.post('http://localhost:8080/api/check-spam', { comment });
      const isSpam = response.data.isSpam;
      const probabilityRaw = response.data.spamProbability;
      const probability = isNaN(probabilityRaw) ? 0 : parseFloat(probabilityRaw);
      const clampedProbability = Math.min(Math.max(probability, 0), 1);

      setSpamStatus(isSpam ? 'Spam' : 'Not Spam');
      setSpamProbability(clampedProbability);

      setHistory(prev => [
        ...prev,
        { comment, spamStatus: isSpam ? 'Spam' : 'Not Spam', date: new Date().toLocaleString() }
      ]);

      setComment('');
    } catch (error) {
      setSpamStatus('Error checking spam');
      setSpamProbability(null);
      console.error(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '48px auto',
        padding: 36,
        background: 'linear-gradient(135deg, #f8fafc 70%, #dbeafe 100%)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(37,99,235,0.10)',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        border: '1.5px solid #e0e7ef',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#2563eb', // Blue heading
          marginBottom: 28,
          fontWeight: 800,
          fontSize: 34,
          textShadow: '0 2px 8px #dbeafe',
        }}
      >
        Comment Spam Detector
      </h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 18 }}>
        <textarea
          rows="5"
          style={{
            width: '100%',
            padding: 16,
            border: '2px solid #93c5fd',
            borderRadius: 8,
            fontSize: 17,
            marginBottom: 14,
            background: '#fff',
            resize: 'vertical',
            outline: 'none',
            transition: 'border 0.2s',
            boxShadow: '0 2px 8px rgba(59,130,246,0.06)',
            color: '#222', // Black text
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          required
        />
        <button
          type="submit"
          style={{
            marginTop: 8,
            background: '#2563eb', // Blue button
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 34px',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
            transition: 'background 0.2s, transform 0.1s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Check Spam
        </button>
      </form>

      {/* Highlighted comment preview */}
      <div
        style={{
          marginTop: 18,
          whiteSpace: 'pre-wrap',
          border: '1.5px solid #bae6fd',
          background: '#f0f9ff',
          padding: 14,
          borderRadius: 8,
          minHeight: 54,
          fontSize: 16,
          fontFamily: 'inherit',
          boxShadow: '0 1px 4px rgba(59,130,246,0.04)',
          color: '#222', // Black text
        }}
      >
        {highlightSpamWords(comment)}
      </div>

      {/* Spam result */}
      <div
        style={{
          marginTop: 28,
          fontSize: 16,
          color: '#222', // Default black
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span>
          <strong>Spam Status:</strong>{' '}
          {spamStatus === 'Spam' ? (
            <span style={{ color: '#dc2626',fontWeight: 700  }}>Spam</span>
          ) : spamStatus === 'Not Spam' ? (
            <span style={{ color: '#16a34a',fontWeight: 700  }}>Not Spam</span>
          ) : (
            <span>{spamStatus}</span>
          )}
        </span>
      </div>

      {spamProbability !== null && (
        <div style={{ marginTop: 10, fontSize: 16, color: '#222' }}>
          <strong>Spam Probability:</strong>{' '}
          <span style={{ color: spamProbability > 0.5 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
            {(spamProbability * 100).toFixed(2)}%
          </span>
        </div>
      )}

      {/* History Table */}
      {history.length > 0 && (
        <div style={{ marginTop: 44 }}>
          <h3 style={{ color: '#2563eb', marginBottom: 14, fontWeight: 700, fontSize: 21 }}>
            Comment History
          </h3>
          <div
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(59,130,246,0.07)',
              border: '1.5px solid #e0e7ef',
              background: '#fff',
            }}
          >
            <table
              border="0"
              cellPadding="8"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 15.5,
                color: '#222', 
              }}
            >
              <thead>
                <tr style={{ background: '#e0e7ef' }}>
                  <th style={{ textAlign: 'left', padding: 10, fontWeight: 700 }}>Comment</th>
                  <th style={{ textAlign: 'center', padding: 10, fontWeight: 700 }}>Status</th>
                  <th style={{ textAlign: 'center', padding: 10, fontWeight: 700 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, idx) => (
                  <tr
                    key={idx}
                    style={{
                      background: idx % 2 === 0 ? '#f8fafc' : '#fff',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    <td style={{ maxWidth: 340, wordWrap: 'break-word', padding: 10 }}>
                      {highlightSpamWords(entry.comment)}
                    </td>
                    <td
                      style={{
                        color: entry.spamStatus === 'Spam' ? '#dc2626' : '#16a34a',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: 10,
                        fontSize: 16,
                      }}
                    >
                      {entry.spamStatus === 'Spam' ? (
                        <span style={{ color: '#dc2626' }}>Spam</span>
                      ) : (
                        <span style={{ color: '#16a34a' }}>Not Spam</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', color: '#222', padding: 10 }}>
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
