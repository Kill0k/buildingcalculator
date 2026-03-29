import React from 'react'

interface Foundation {
  length: string
  width: string
  longitudinalReinforcement: string
  transverseReinforcement: string
  longitudinalStep: string
  transverseStep: string
}

interface FoundationFormProps {
  foundation: Foundation
  index: number
  onUpdate: (index: number, field: 'length' | 'width' | 'longitudinalReinforcement' | 'transverseReinforcement' | 'longitudinalStep' | 'transverseStep', value: string) => void
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
        <div className="input-field">
          <label htmlFor={`foundation-longitudinal-${index}`}>Поздовжнє армування (мм):</label>
          <select
            id={`foundation-longitudinal-${index}`}
            value={foundation.longitudinalReinforcement}
            onChange={(e) => onUpdate(index, 'longitudinalReinforcement', e.target.value)}
          >
            <option value="">Виберіть діаметр</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="22">22</option>
            <option value="25">25</option>
            <option value="28">28</option>
            <option value="32">32</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor={`foundation-transverse-${index}`}>Поперечне армування (мм):</label>
          <select
            id={`foundation-transverse-${index}`}
            value={foundation.transverseReinforcement}
            onChange={(e) => onUpdate(index, 'transverseReinforcement', e.target.value)}
          >
            <option value="">Виберіть діаметр</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="22">22</option>
            <option value="25">25</option>
            <option value="28">28</option>
            <option value="32">32</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor={`foundation-longitudinal-step-${index}`}>Крок поздовжньої арматури (м):</label>
          <input
            id={`foundation-longitudinal-step-${index}`}
            type="number"
            step="0.05"
            placeholder="Введіть крок"
            value={foundation.longitudinalStep}
            onChange={(e) => onUpdate(index, 'longitudinalStep', e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor={`foundation-transverse-step-${index}`}>Крок поперечної арматури (м):</label>
          <input
            id={`foundation-transverse-step-${index}`}
            type="number"
            step="0.05"
            placeholder="Введіть крок"
            value={foundation.transverseStep}
            onChange={(e) => onUpdate(index, 'transverseStep', e.target.value)}
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
