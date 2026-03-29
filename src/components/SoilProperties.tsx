import React from 'react'
import { soilData } from '../data/constants'

interface SoilPropertiesProps {
  selectedSoil: string
}

const SoilProperties: React.FC<SoilPropertiesProps> = ({ selectedSoil }) => {
  const currentSoilData = soilData[selectedSoil as keyof typeof soilData]
  if (!currentSoilData) return null

  return (
    <div className="soil-properties">
      <h3>Властивості грунту: {selectedSoil}</h3>
      <div className="properties-grid">
        <div className="property-item">
          <span className="property-label">Тип роботи екскаватором:</span>
          <span className="property-value">{currentSoilData.excavator_work_type}</span>
        </div>
        <div className="property-item">
          <span className="property-label">Тип роботи бульдозером:</span>
          <span className="property-value">{currentSoilData.bulldozer_work_type}</span>
        </div>
        <div className="property-item">
          <span className="property-label">Коефіцієнт скосу 1:5:</span>
          <span className="property-value">{currentSoilData.slope_modulus_1_5}</span>
        </div>
        <div className="property-item">
          <span className="property-label">Коефіцієнт скосу 1:3:</span>
          <span className="property-value">{currentSoilData.slope_modulus_3}</span>
        </div>
        <div className="property-item">
          <span className="property-label">Коефіцієнт скосу 1:1:</span>
          <span className="property-value">{currentSoilData.slope_modulus_5}</span>
        </div>
        <div className="property-item">
          <span className="property-label">Об'ємна маса (кг/м³):</span>
          <span className="property-value">{currentSoilData.unit_weight}</span>
        </div>
        <div className="property-item">
          <span className="property-label">Залишкова розпушеність (мін):</span>
          <span className="property-value">{(currentSoilData.residual_loosening_min * 100).toFixed(1)}%</span>
        </div>
        <div className="property-item">
          <span className="property-label">Залишкова розпушеність (макс):</span>
          <span className="property-value">{(currentSoilData.residual_loosening_max * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}

export default SoilProperties

