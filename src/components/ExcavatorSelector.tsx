import React from 'react'
import { excavatorData, soilGroupMapping } from '../data/constants'

interface ExcavatorSelectorProps {
  selectedExcavator: string
  selectedBucketCapacity: string
  selectedWorkMethod: string
  selectedSoil: string
  onExcavatorChange: (excavator: string) => void
  onBucketCapacityChange: (capacity: string) => void
  onWorkMethodChange: (method: string) => void
}

const ExcavatorSelector: React.FC<ExcavatorSelectorProps> = ({
  selectedExcavator,
  selectedBucketCapacity,
  selectedWorkMethod,
  selectedSoil,
  onExcavatorChange,
  onBucketCapacityChange,
  onWorkMethodChange,
}) => {
  const getAvailableBucketCapacities = (): string[] => {
    const excavator = excavatorData[selectedExcavator as keyof typeof excavatorData]
    if (!excavator) return []
    const capacity = excavator.bucket_capacity
    if (typeof capacity === 'string') return capacity.split(';').map((c) => c.trim())
    return [capacity.toString()]
  }

  const availableCapacities = getAvailableBucketCapacities()
  const currentExcavator = excavatorData[selectedExcavator as keyof typeof excavatorData]

  return (
    <div className="mechanization-block">
      {/* Excavator selection */}
      <div className="soil-type-selector">
        <label>Екскаватор:</label>
        <div className="radio-group">
          {Object.keys(excavatorData).map((excavator) => (
            <label key={excavator} className="radio-label">
              <input
                type="radio"
                name="excavator-type"
                value={excavator}
                checked={selectedExcavator === excavator}
                onChange={(e) => onExcavatorChange(e.target.value)}
                className="radio-input"
              />
              <span className="radio-text">{excavator}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bucket capacity (only when multiple options) */}
      {availableCapacities.length > 1 && (
        <div className="soil-type-selector" style={{ marginTop: '2rem' }}>
          <label>Об'єм ковша (м³):</label>
          <div className="radio-group">
            {availableCapacities.map((capacity) => (
              <label key={capacity} className="radio-label">
                <input
                  type="radio"
                  name="bucket-capacity"
                  value={capacity}
                  checked={selectedBucketCapacity === capacity}
                  onChange={(e) => onBucketCapacityChange(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-text">{capacity}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Work method */}
      <div className="soil-type-selector" style={{ marginTop: '2rem' }}>
        <label>Метод роботи:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="work-method"
              value="TransportLoading"
              checked={selectedWorkMethod === 'TransportLoading'}
              onChange={(e) => onWorkMethodChange(e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">Транспортування та завантаження</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="work-method"
              value="Stockpiling"
              checked={selectedWorkMethod === 'Stockpiling'}
              onChange={(e) => onWorkMethodChange(e.target.value)}
              className="radio-input"
            />
            <span className="radio-text">Складування</span>
          </label>
        </div>
      </div>

      {/* Soil group (read-only, derived) */}
      <div className="soil-type-selector" style={{ marginTop: '2rem' }}>
        <label>Група грунту:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input type="radio" disabled name="soil-group" className="radio-input" />
            <span className="radio-text" style={{ opacity: 0.7 }}>
              {soilGroupMapping[selectedSoil]} - {selectedSoil}
            </span>
          </label>
        </div>
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
          Група грунту автоматично визначається на основі типу грунту
        </p>
      </div>

      {/* Excavator specs */}
      {currentExcavator && (
        <div className="soil-properties" style={{ marginTop: '2rem' }}>
          <h3>Характеристики екскаватора: {selectedExcavator}</h3>
          <div className="properties-grid">
            <div className="property-item">
              <span className="property-label">Вибрана ємність ковша (м³):</span>
              <span className="property-value">{selectedBucketCapacity}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Макс. глибина копання (м):</span>
              <span className="property-value">{currentExcavator.max_dig_depth}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Макс. висота розвантаження (м):</span>
              <span className="property-value">{currentExcavator.max_dump_height}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Макс. радіус копання (м):</span>
              <span className="property-value">{currentExcavator.max_dig_radius}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Потужність двигуна (кВ):</span>
              <span className="property-value">{currentExcavator.engine_power_kw}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Потужність двигуна (л.с):</span>
              <span className="property-value">{currentExcavator.engine_power_hp}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Маса машини (т):</span>
              <span className="property-value">{currentExcavator.machine_mass}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExcavatorSelector

