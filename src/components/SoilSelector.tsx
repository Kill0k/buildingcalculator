import React from 'react'
import { soilData } from '../data/constants'

interface SoilSelectorProps {
  selectedSoil: string
  onSoilChange: (soil: string) => void
}

const SoilSelector: React.FC<SoilSelectorProps> = ({ selectedSoil, onSoilChange }) => {
  return (
    <div className="soil-type-selector">
      <label>Тип грунту:</label>
      <div className="radio-group">
        {Object.keys(soilData).map((soil) => (
          <label key={soil} className="radio-label">
            <input
              type="radio"
              name="soil-type"
              value={soil}
              checked={selectedSoil === soil}
              onChange={(e) => onSoilChange(e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">{soil}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default SoilSelector

