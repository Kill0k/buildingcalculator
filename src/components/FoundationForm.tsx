import React from 'react'

interface Foundation {
  length: string
  width: string
}

interface FoundationFormProps {
  foundation: Foundation
  index: number
  onUpdate: (index: number, field: 'length' | 'width', value: string) => void
  onRemove: (index: number) => void
  showRemove: boolean
}

const FoundationForm: React.FC<FoundationFormProps> = ({
  foundation,
  index,
  onUpdate,
  onRemove,
  showRemove,
}) => {
  return (
    <div className="foundation-form">
      <h3>Фундамент {index + 1}</h3>
      <div className="input-group">
        <div className="input-field">
          <label htmlFor={`foundation-length-${index}`}>Довжина фундаменту (м):</label>
          <input
            id={`foundation-length-${index}`}
            type="number"
            step="0.1"
            placeholder="Введіть довжину"
            value={foundation.length}
            onChange={(e) => onUpdate(index, 'length', e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor={`foundation-width-${index}`}>Ширина фундаменту (м):</label>
          <input
            id={`foundation-width-${index}`}
            type="number"
            step="0.05"
            placeholder="Введіть ширину"
            value={foundation.width}
            onChange={(e) => onUpdate(index, 'width', e.target.value)}
          />
        </div>
        {showRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            style={{
              marginTop: '2rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Видалити
          </button>
        )}
      </div>
    </div>
  )
}

export default FoundationForm


