import React from 'react';
import { useUiLibrary } from '../context/UiLibraryContext';

const UiLibrarySwitcher: React.FC = () => {
  const { library, setLibrary } = useUiLibrary();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>
        UI:
      </label>
      <select
        value={library}
        onChange={(e) => setLibrary(e.target.value as any)}
        style={{
          padding: '6px 10px',
          fontSize: '13px',
          border: '1px solid #e5e5e5',
          borderRadius: '6px',
          background: '#fff',
          color: '#1a1a1a',
          cursor: 'pointer',
          outline: 'none',
          fontWeight: '500'
        }}
      >
        <option value="tailwind">Tailwind</option>
        <option value="mui">Material UI</option>
        <option value="bootstrap">Bootstrap</option>
      </select>
    </div>
  );
};

export default UiLibrarySwitcher;


