import React from 'react'
import { soilData, soilGroupMapping } from '../data/constants'
import { getLaborIntensity, getMachineRentalPrice } from '../utils/calculations'
import SoilSelector from './SoilSelector'
import SoilProperties from './SoilProperties'
import ExcavatorSelector from './ExcavatorSelector'

interface EarthworkTabProps {
  foundationDepth: string
  onFoundationDepthChange: (value: string) => void
  width: string
  setWidth: (value: string) => void
  length: string
  setLength: (value: string) => void
  foundationWidth: string
  setFoundationWidth: (value: string) => void
  foundationOffset: string
  setFoundationOffset: (value: string) => void
  selectedSoil: string
  setSelectedSoil: (value: string) => void
  selectedExcavator: string
  setSelectedExcavator: (value: string) => void
  selectedBucketCapacity: string
  setSelectedBucketCapacity: (value: string) => void
  selectedWorkMethod: string
  setSelectedWorkMethod: (value: string) => void
  onExcavatorChange: (excavator: string) => void
}

const EarthworkTab: React.FC<EarthworkTabProps> = ({
  foundationDepth,
  onFoundationDepthChange,
  width,
  setWidth,
  length,
  setLength,
  foundationWidth,
  setFoundationWidth,
  foundationOffset,
  setFoundationOffset,
  selectedSoil,
  setSelectedSoil,
  selectedExcavator,
  setSelectedExcavator,
  selectedBucketCapacity,
  setSelectedBucketCapacity,
  selectedWorkMethod,
  setSelectedWorkMethod,
  onExcavatorChange,
}) => {
  const handleExcavatorChange = (excavator: string) => {
    setSelectedExcavator(excavator)
    if (excavator === 'ЭО-2621А') setSelectedBucketCapacity('0.25')
    else if (excavator === 'ЭО-3322') setSelectedBucketCapacity('0.4')
    else if (excavator === 'ЭО-5015') setSelectedBucketCapacity('0.5')
    else if (excavator === 'ЭО-4121') setSelectedBucketCapacity('0.63-0.65')
    else if (excavator === 'ЭО-4321') setSelectedBucketCapacity('0.4')
    else if (excavator === 'ЭО-5122') setSelectedBucketCapacity('1.25')
  }

  // Derived calculations
  const area =
    width && length ? (parseFloat(width) * parseFloat(length)).toFixed(2) : null

  const currentSoilData = soilData[selectedSoil as keyof typeof soilData]

  const excavationVolume =
    area && foundationDepth
      ? (parseFloat(area) * parseFloat(foundationDepth)).toFixed(2)
      : null

  const excavationMass =
    excavationVolume && currentSoilData
      ? (parseFloat(excavationVolume) * currentSoilData.unit_weight).toFixed(2)
      : null

  const laborIntensity = getLaborIntensity(selectedBucketCapacity, selectedWorkMethod, selectedSoil)

  const excavationTimeHours =
    excavationVolume && laborIntensity !== null
      ? ((parseFloat(excavationVolume) / 100) * laborIntensity).toFixed(2)
      : null

  const machineHours = excavationTimeHours
  const machineShifts = excavationTimeHours
    ? (parseFloat(excavationTimeHours) / 8).toFixed(2)
    : null
  const excavationTimeDays = excavationTimeHours
    ? (parseFloat(excavationTimeHours) / 8).toFixed(2)
    : null

  const machineRentalCost = (() => {
    if (!machineHours) return null
    const price = getMachineRentalPrice(selectedBucketCapacity)
    if (!price) return null
    return (parseFloat(machineHours) * price).toFixed(2)
  })()

  return (
    <div className="earthwork-tab">
      {/* Soil */}
      <h2>Характеристики грунту</h2>
      <SoilSelector selectedSoil={selectedSoil} onSoilChange={setSelectedSoil} />
      {currentSoilData && <SoilProperties selectedSoil={selectedSoil} />}

      {/* Mechanization */}
      <h2 style={{ marginTop: '3rem' }}>Вибір механізації</h2>
      <ExcavatorSelector
        selectedExcavator={selectedExcavator}
        selectedBucketCapacity={selectedBucketCapacity}
        selectedWorkMethod={selectedWorkMethod}
        selectedSoil={selectedSoil}
        onExcavatorChange={handleExcavatorChange}
        onBucketCapacityChange={setSelectedBucketCapacity}
        onWorkMethodChange={setSelectedWorkMethod}
      />

      {/* Building area */}
      <h2 style={{ marginTop: '3rem' }}>Розрахунок площі будівлі</h2>
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="width">Ширина будівлі (м):</label>
          <input
            id="width"
            type="number"
            placeholder="Введіть ширину"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="length">Довжина будівлі (м):</label>
          <input
            id="length"
            type="number"
            placeholder="Введіть довжину"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
      </div>
      {area && (
        <div className="area-result">
          <h3>
            Площа будівлі: <span>{area} м²</span>
          </h3>
        </div>
      )}

      {/* Excavation parameters */}
      <h2 style={{ marginTop: '3rem' }}>Розрахунок котловану</h2>
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="foundationWidth">Ширина фундаменту (м):</label>
          <input
            id="foundationWidth"
            type="number"
            placeholder="Введіть ширину фундаменту"
            value={foundationWidth}
            onChange={(e) => setFoundationWidth(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="foundationOffset">Відступ від краю фундаменту (м):</label>
          <input
            id="foundationOffset"
            type="number"
            placeholder="Введіть відступ"
            value={foundationOffset}
            onChange={(e) => setFoundationOffset(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="foundationDepth">Глибина закладання фундаменту (м):</label>
          <input
            id="foundationDepth"
            type="number"
            placeholder="Введіть глибину"
            value={foundationDepth}
            onChange={(e) => onFoundationDepthChange(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      {excavationVolume && (
        <div className="area-result excavation-volume-result">
          <h3>
            Об'єм грунта для земляних робіт: <span>{excavationVolume} м³</span>
          </h3>
          <p className="calculation-info">
            Формула: ((площа по низу + площа по верху) / 2) × глибина закладання фундаменту
          </p>
          <p className="calculation-info">
            (({excavationVolume}) / 2) × {foundationDepth} ={' '}
            {excavationVolume} м³
          </p>
        </div>
      )}

      {excavationMass && (
        <div className="area-result excavation-mass-result">
          <h3>
            Маса грунта: <span>{excavationMass} кг</span>
          </h3>
          <p className="calculation-info">Формула: об'єм × об'ємна маса грунту</p>
          <p className="calculation-info">
            {excavationVolume} м³ × {currentSoilData?.unit_weight} кг/м³ = {excavationMass} кг
          </p>
          <p className="calculation-info">
            Маса у тонах:{' '}
            <span style={{ color: 'inherit' }}>
              {(parseFloat(excavationMass) / 1000).toFixed(2)} т
            </span>
          </p>
        </div>
      )}

      {excavationTimeHours ? (
        <div className="area-result excavation-labor-result">
          <h3>
            Трудомісткість розробки грунта: <span>{excavationTimeHours} годин</span>
          </h3>
          <p className="calculation-info">Об'єм грунта: {excavationVolume} м³</p>
          <p className="calculation-info">Об'єм ковша: {selectedBucketCapacity} м³</p>
          <p className="calculation-info">
            Метод роботи:{' '}
            {selectedWorkMethod === 'TransportLoading'
              ? 'Транспортування та завантаження'
              : 'Складування'}
          </p>
          <p className="calculation-info">
            Група грунту: {soilGroupMapping[selectedSoil]}
          </p>
          <p className="calculation-info">
            Трудомісткість: {laborIntensity} годин на 100 м³
          </p>
          <p className="calculation-info">
            Розрахунок: {excavationVolume} м³ ÷ 100 × {laborIntensity} = {excavationTimeHours}{' '}
            годин
          </p>
          <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />
          <p className="calculation-info">
            <strong style={{ color: '#7b1fa2' }}>Машино-години:</strong> {machineHours}{' '}
            машино-годин
          </p>
          <p className="calculation-info">
            <strong style={{ color: '#7b1fa2' }}>Машино-зміни:</strong> {machineShifts}{' '}
            машино-змін (8 годин на зміну)
          </p>
          <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />
          <p className="calculation-info">
            <strong>Час на виконання робіт: {excavationTimeDays} робото-днів (8 годин на день)</strong>
          </p>
          <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />
          <p className="calculation-info">
            <strong style={{ color: '#d32f2f' }}>Вартість механізації:</strong>
          </p>
          <p className="calculation-info">
            Ціна за годину (об'єм ковша {selectedBucketCapacity} м³):{' '}
            {getMachineRentalPrice(selectedBucketCapacity)} грн/год
          </p>
          <p className="calculation-info">
            Розрахунок: {machineHours} машино-годин ×{' '}
            {getMachineRentalPrice(selectedBucketCapacity)} грн/год ={' '}
            <strong style={{ color: '#d32f2f', fontSize: '1.1rem' }}>{machineRentalCost} грн</strong>
          </p>
        </div>
      ) : (
        <div
          className="area-result"
          style={{
            borderLeftColor: '#999',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
          }}
        >
          <h3 style={{ color: '#666' }}>Розрахунок трудомісткості</h3>
          <p className="calculation-info" style={{ color: '#999' }}>
            ⚠ Заповніть всі параметри будівлі та фундаменту для розрахунку трудомісткості:
          </p>
          <ul
            style={{
              textAlign: 'left',
              display: 'inline-block',
              color: '#999',
              marginBottom: '1rem',
            }}
          >
            <li>Ширина будівлі (м) {width ? '✓' : '✗'}</li>
            <li>Довжина будівлі (м) {length ? '✓' : '✗'}</li>
            <li>Ширина фундаменту (м) {foundationWidth ? '✓' : '✗'}</li>
            <li>Відступ від краю фундаменту (м) {foundationOffset ? '✓' : '✗'}</li>
            <li>Глибина закладання фундаменту (м) {foundationDepth ? '✓' : '✗'}</li>
          </ul>
          <div
            style={{
              fontSize: '0.85rem',
              color: '#999',
              marginTop: '1rem',
              borderTop: '1px solid #ccc',
              paddingTop: '1rem',
            }}
          >
            <p>
              <strong>Діагностика:</strong>
            </p>
            <p>
              Площа низу котловану:{' '}
              {foundationWidth ? foundationWidth + ' м²' : 'не розраховується'}
            </p>
            <p>
              Площа по верху котловану:{' '}
              {foundationOffset ? foundationOffset + ' м²' : 'не розраховується'}
            </p>
            <p>
              Об'єм грунта:{' '}
              {excavationVolume ? excavationVolume + ' м³' : 'не розраховується'}
            </p>
            <p>
              Трудомісткість (години/100м³):{' '}
              {laborIntensity !== null ? laborIntensity : 'не знайдена'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EarthworkTab
