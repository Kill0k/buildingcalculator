import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')
  const [foundationWidth, setFoundationWidth] = useState('')
  const [foundationOffset, setFoundationOffset] = useState('')
  const [foundationDepth, setFoundationDepth] = useState('')
  const [foundationAboveGround, setFoundationAboveGround] = useState('')
  const [foundationAboveGroundConcrete, setFoundationAboveGroundConcrete] = useState('')
  const [selectedSoil, setSelectedSoil] = useState('Пісок')
  const [selectedExcavator, setSelectedExcavator] = useState('ЭО-2621А')
  const [selectedBucketCapacity, setSelectedBucketCapacity] = useState('0.25')
  const [selectedWorkMethod, setSelectedWorkMethod] = useState('TransportLoading')
  const [foundations, setFoundations] = useState([{ length: '', width: '' }])

  // Дані про трудомісткість розробки грунта екскаватором (години на 100 м³)
  const laborIntensityData = {
    '0.25': {
      TransportLoading: { I: 4.5, II: 5.9, III: 7.8 },
      Stockpiling: { I: 3.8, II: 5, III: 6.7 },
    },
    '0.4': {
      TransportLoading: { I: 3.2, II: 4.1, III: 5.2, IV: 6 },
      Stockpiling: { I: 2.5, II: 3.3, III: 4.2, IV: 4.8 },
    },
    '0.5': {
      TransportLoading: { I: 2.8, II: 3.4, III: 4.2, IV: 5.4, V: 7.1, VI: 8.4 },
      Stockpiling: { I: 2.2, II: 2.7, III: 3.3, IV: 4.3, V: 5.7, VI: 6.6 },
    },
    '0.63-0.65': {
      TransportLoading: { I: 2.1, II: 2.6, III: 3.2, IV: 4.3, V: 5.2, VI: 6.4 },
      Stockpiling: { I: 1.8, II: 2.1, III: 2.8, IV: 3.7, V: 4.7, VI: 5.7 },
    },
    '1': {
      TransportLoading: { I: 1.9, II: 2.2, III: 2.8, IV: 3.7, V: 4.5, VI: 5.5 },
      Stockpiling: { I: 1.6, II: 1.9, III: 2.3, IV: 3.1, V: 3.9, VI: 4.7 },
    },
    '1.25': {
      TransportLoading: { I: 2.6, II: 3, III: 4, IV: 5.4, V: 6.4, VI: 7 },
      Stockpiling: { I: 1.98, II: 2.2, III: 3.2, IV: 4.2, V: 5, VI: 5.4 },
    },
    '1.6': {
      TransportLoading: { I: 1.9, II: 2.2, III: 2.8, IV: 4, V: 5, VI: 5.6 },
      Stockpiling: { I: 1.46, II: 1.74, III: 2.2, IV: 3, V: 3.8, VI: 4.4 },
    },
  }

  // Групи грунту та їх відповідність типам грунту
  const soilGroupMapping = {
    'Пісок': 'I',
    'Супісок': 'II',
    'Суглинок': 'IV',
    'Глина': 'V',
    'Лес': 'III',
  }

  // Дані про вартість механізації (екскаватора) - грн/год
  const machineRentalPrices = {
    '0.1-0.4': 800,
    '0.4-0.6': 950,
    '0.6-0.8': 1100,
    '0.8-1.0': 1400,
    '1.0-1.2': 1600,
    '1.2-1.6': 2000,
  }

  // Функція для отримання ціни механізації на основі об'єму ковша
  const getMachineRentalPrice = (capacity: string): number | null => {
    const capacityNum = parseFloat(capacity)

    if (capacityNum >= 0.1 && capacityNum <= 0.4) {
      return machineRentalPrices['0.1-0.4']
    } else if (capacityNum > 0.4 && capacityNum <= 0.6) {
      return machineRentalPrices['0.4-0.6']
    } else if (capacityNum > 0.6 && capacityNum <= 0.8) {
      return machineRentalPrices['0.6-0.8']
    } else if (capacityNum > 0.8 && capacityNum <= 1.0) {
      return machineRentalPrices['0.8-1.0']
    } else if (capacityNum > 1.0 && capacityNum <= 1.2) {
      return machineRentalPrices['1.0-1.2']
    } else if (capacityNum > 1.2 && capacityNum <= 1.6) {
      return machineRentalPrices['1.2-1.6']
    }
    return null
  }

  const excavatorData = {
    'ЭО-2621А': {
      bucket_capacity: 0.25,
      max_dig_depth: 3,
      max_dump_height: 2.2,
      max_dig_radius: 5,
      engine_power_kw: 44,
      engine_power_hp: 60,
      machine_mass: 5.45,
    },
    'ЭО-3322': {
      bucket_capacity: '0.4;0.5;0.63',
      max_dig_depth: '5.0;4.2;4.3',
      max_dump_height: '5.2;4.8',
      max_dig_radius: '8.2;7.5',
      engine_power_kw: '59;55',
      engine_power_hp: '80;75',
      machine_mass: 14.5,
    },
    'ЭО-5015': {
      bucket_capacity: 0.5,
      max_dig_depth: 4.5,
      max_dump_height: 3.9,
      max_dig_radius: 7.3,
      engine_power_kw: 59,
      engine_power_hp: 80,
      machine_mass: 13,
    },
    'ЭО-4121': {
      bucket_capacity: '0.65;1',
      max_dig_depth: 5.8,
      max_dump_height: 5,
      max_dig_radius: 9,
      engine_power_kw: 95,
      engine_power_hp: 129,
      machine_mass: 19.2,
    },
    'ЭО-4321': {
      bucket_capacity: '0.4;0.65;1',
      max_dig_depth: '6.7;5.5;4',
      max_dump_height: '6.18;5.6;5',
      max_dig_radius: '10.2;9;6.9',
      engine_power_kw: 59,
      engine_power_hp: 80,
      machine_mass: 19.2,
    },
    'ЭО-5122': {
      bucket_capacity: '1.25;1.6',
      max_dig_depth: 6,
      max_dump_height: 5,
      max_dig_radius: 9.4,
      engine_power_kw: 125,
      engine_power_hp: 170,
      machine_mass: 35.8,
    },
  }

  // Дані про типи грунту
  const soilData = {
    'Пісок': {
      excavator_work_type: 1,
      bulldozer_work_type: 2,
      slope_modulus_1_5: 0.5,
      slope_modulus_3: 1,
      slope_modulus_5: 1,
      unit_weight: 1900,
      residual_loosening_min: 0.02,
      residual_loosening_max: 0.05,
    },
    'Супісок': {
      excavator_work_type: 1,
      bulldozer_work_type: 2,
      slope_modulus_1_5: 0.25,
      slope_modulus_3: 0.67,
      slope_modulus_5: 0.85,
      unit_weight: 1850,
      residual_loosening_min: 0.03,
      residual_loosening_max: 0.05,
    },
    'Суглинок': {
      excavator_work_type: 3,
      bulldozer_work_type: 2,
      slope_modulus_1_5: 0,
      slope_modulus_3: 0.5,
      slope_modulus_5: 0.75,
      unit_weight: 2000,
      residual_loosening_min: 0.03,
      residual_loosening_max: 0.08,
    },
    'Глина': {
      excavator_work_type: 2,
      bulldozer_work_type: 2,
      slope_modulus_1_5: 0,
      slope_modulus_3: 0.25,
      slope_modulus_5: 0.5,
      unit_weight: 2100,
      residual_loosening_min: 0.04,
      residual_loosening_max: 0.09,
    },
    'Лес': {
      excavator_work_type: 1,
      bulldozer_work_type: 1,
      slope_modulus_1_5: 0,
      slope_modulus_3: 0.5,
      slope_modulus_5: 0.5,
      unit_weight: 1750,
      residual_loosening_min: 0.04,
      residual_loosening_max: 0.07,
    },
  }

  const tabs = [
    { name: 'Земляні роботи', id: 'earthwork' },
    { name: 'Бетонні роботи', id: 'concrete' },
    { name: "Кам'яні роботи", id: 'stone' },
    { name: 'Теплоізоляційні роботи', id: 'insulation' },
  ]

  const area = width && length ? (parseFloat(width) * parseFloat(length)).toFixed(2) : null
  const excavationWidth = width && foundationWidth && foundationOffset
    ? (parseFloat(foundationWidth) + 2 * parseFloat(foundationOffset)).toFixed(2)
    : null
  const excavationLength = length && foundationWidth && foundationOffset
    ? (parseFloat(foundationWidth) + 2 * parseFloat(foundationOffset)).toFixed(2)
    : null

  // Розрахунок площі низу котловану
  const excavationBottomArea = width && length && foundationWidth && foundationOffset
    ? ((parseFloat(width) + parseFloat(foundationWidth) + parseFloat(foundationOffset) * 2) *
       (parseFloat(length) + parseFloat(foundationWidth) + parseFloat(foundationOffset) * 2)).toFixed(2)
    : null

  // Функція для отримання правильного slope_modulus на основі глибини
  const getSlopeModulus = () => {
    if (!foundationDepth) return null
    const depth = parseFloat(foundationDepth)
    const soilInfo = soilData[selectedSoil as keyof typeof soilData]

    if (depth <= 1.5) {
      return soilInfo.slope_modulus_1_5
    } else if (depth <= 3) {
      return soilInfo.slope_modulus_3
    } else {
      return soilInfo.slope_modulus_5
    }
  }

  // Розрахунок площі по верху котловану
  const excavationTopArea = width && length && foundationWidth && foundationOffset && foundationDepth
    ? (() => {
        const slope = getSlopeModulus()
        if (!slope) return null
        return ((parseFloat(width) + parseFloat(foundationWidth) + parseFloat(foundationOffset) * 2 + 2 * slope * parseFloat(foundationDepth)) *
                (parseFloat(length) + parseFloat(foundationWidth) + parseFloat(foundationOffset) * 2 + 2 * slope * parseFloat(foundationDepth))).toFixed(2)
      })()
    : null

  const currentSoilData = soilData[selectedSoil as keyof typeof soilData]

  // Функція для отримання доступних об'ємів ковша для вибраного екскаватора
  const getAvailableBucketCapacities = () => {
    const excavator = excavatorData[selectedExcavator as keyof typeof excavatorData]
    if (!excavator) return []

    const capacity = excavator.bucket_capacity
    if (typeof capacity === 'string') {
      return capacity.split(';').map(c => c.trim())
    }
    return [capacity.toString()]
  }

  // Функція для отримання ключа таблиці трудомісткості на основі об'ємів ковша
  const mapCapacityToLaborIntensityKey = (capacity: string): string => {
    // Якщо вже є ключ у таблиці (наприклад '0.63-0.65'), повертаємо його
    if (capacity in laborIntensityData) {
      return capacity
    }

    // Маппінг окремих об'ємів на ключі таблиці
    const capacityMap: { [key: string]: string } = {
      '0.25': '0.25',
      '0.4': '0.4',
      '0.5': '0.5',
      '0.63': '0.63-0.65',
      '0.65': '0.63-0.65',
      '1': '1',
      '1.25': '1.25',
      '1.6': '1.6',
    }

    return capacityMap[capacity] || capacity
  }

  // Розрахунок об'єм грунта для земляних робіт
  // Формула: ((площа по низу + площа по верху) / 2) * глибина
  const excavationVolume = excavationBottomArea && excavationTopArea && foundationDepth
    ? (((parseFloat(excavationBottomArea) + parseFloat(excavationTopArea)) / 2) * parseFloat(foundationDepth)).toFixed(2)
    : null

  // Розрахунок маси грунта
  // маса = об'єм * об'ємна маса грунту
  const excavationMass = excavationVolume && currentSoilData
    ? (parseFloat(excavationVolume) * currentSoilData.unit_weight).toFixed(2)
    : null

  // Розрахунок трудомісткості розробки грунта екскаватором
  const getLaborIntensity = () => {
    const mappedCapacity = mapCapacityToLaborIntensityKey(selectedBucketCapacity)
    const workData = laborIntensityData[mappedCapacity as keyof typeof laborIntensityData]
    if (!workData) return null

    const methodData = workData[selectedWorkMethod as keyof typeof workData]
    if (!methodData) return null

    const soilGroup = soilGroupMapping[selectedSoil as keyof typeof soilGroupMapping]
    const intensity = methodData[soilGroup as keyof typeof methodData]
    return intensity || null
  }

  // Розрахунок часу на розробку грунта (години)
  const excavationTimeHours = (() => {
    const intensity = getLaborIntensity()
    if (excavationVolume && intensity) {
      return (parseFloat(excavationVolume) / 100 * intensity).toFixed(2)
    }
    return null
  })()

  // Розрахунок машино-годин (екскаватор працює у змінах)
  const machineHours = excavationTimeHours ? excavationTimeHours : null

  // Розрахунок машино-змін (8 годин на зміну)
  const machineShifts = excavationTimeHours
    ? (parseFloat(excavationTimeHours) / 8).toFixed(2)
    : null

  // Розрахунок часу на робото-дні (8 годин на день для робітників)
  const excavationTimeDays = excavationTimeHours
    ? (parseFloat(excavationTimeHours) / 8).toFixed(2)
    : null

  // Розрахунок вартості механізації (екскаватора)
  const machineRentalCost = (() => {
    if (!machineHours) return null
    const price = getMachineRentalPrice(selectedBucketCapacity)
    if (!price) return null
    return (parseFloat(machineHours) * price).toFixed(2)
  })()

  const renderTabContent = () => {
    switch(activeTab) {
      case 0: // Земляні роботи
        return (
          <div className="earthwork-tab">
            <h2>Характеристики грунту</h2>
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
                      onChange={(e) => setSelectedSoil(e.target.value)}
                      className="radio-input"
                    />
                    <span className="radio-text">{soil}</span>
                  </label>
                ))}
              </div>
            </div>

            {currentSoilData && (
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
            )}

            <h2 style={{ marginTop: '3rem' }}>Вибір механізації</h2>
            <div className="mechanization-block">
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
                        onChange={(e) => {
                          setSelectedExcavator(e.target.value)
                          // Скидаємо вибір об'єму ковша при зміні екскаватора на перший доступний
                          if (e.target.value === 'ЭО-2621А') {
                            setSelectedBucketCapacity('0.25')
                          } else if (e.target.value === 'ЭО-3322') {
                            setSelectedBucketCapacity('0.4')
                          } else if (e.target.value === 'ЭО-5015') {
                            setSelectedBucketCapacity('0.5')
                          } else if (e.target.value === 'ЭО-4121') {
                            setSelectedBucketCapacity('0.63-0.65')
                          } else if (e.target.value === 'ЭО-4321') {
                            setSelectedBucketCapacity('0.4')
                          } else if (e.target.value === 'ЭО-5122') {
                            setSelectedBucketCapacity('1.25')
                          }
                        }}
                        className="radio-input"
                      />
                      <span className="radio-text">{excavator}</span>
                    </label>
                  ))}
                </div>
              </div>

              {getAvailableBucketCapacities().length > 1 && (
                <div className="soil-type-selector" style={{ marginTop: '2rem' }}>
                  <label>Об'єм ковша (м³):</label>
                  <div className="radio-group">
                    {getAvailableBucketCapacities().map((capacity) => (
                      <label key={capacity} className="radio-label">
                        <input
                          type="radio"
                          name="bucket-capacity"
                          value={capacity}
                          checked={selectedBucketCapacity === capacity}
                          onChange={(e) => setSelectedBucketCapacity(e.target.value)}
                          className="radio-input"
                        />
                        <span className="radio-text">{capacity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="soil-type-selector" style={{ marginTop: '2rem' }}>
                <label>Метод роботи:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="work-method"
                      value="TransportLoading"
                      checked={selectedWorkMethod === 'TransportLoading'}
                      onChange={(e) => setSelectedWorkMethod(e.target.value)}
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
                      onChange={(e) => setSelectedWorkMethod(e.target.value)}
                      className="radio-input"
                    />
                    <span className="radio-text">Складування</span>
                  </label>
                </div>
              </div>

              <div className="soil-type-selector" style={{ marginTop: '2rem' }}>
                <label>Група грунту:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" disabled name="soil-group" className="radio-input" />
                    <span className="radio-text" style={{ opacity: 0.7 }}>
                      {soilGroupMapping[selectedSoil as keyof typeof soilGroupMapping]} - {selectedSoil}
                    </span>
                  </label>
                </div>
                <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                  Група грунту автоматично визначається на основі типу грунту
                </p>
              </div>

              {excavatorData[selectedExcavator as keyof typeof excavatorData] && (
                <div className="soil-properties" style={{ marginTop: '2rem' }}>
                  <h3>Характеристики екскаватора: {selectedExcavator}</h3>
                  <div className="properties-grid">
                    <div className="property-item">
                      <span className="property-label">Вибрана ємність ковша (м³):</span>
                      <span className="property-value">{selectedBucketCapacity}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Макс. глибина копання (м):</span>
                      <span className="property-value">{excavatorData[selectedExcavator as keyof typeof excavatorData].max_dig_depth}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Макс. висота розвантаження (м):</span>
                      <span className="property-value">{excavatorData[selectedExcavator as keyof typeof excavatorData].max_dump_height}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Макс. радіус копання (м):</span>
                      <span className="property-value">{excavatorData[selectedExcavator as keyof typeof excavatorData].max_dig_radius}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Потужність двигуна (кВ):</span>
                      <span className="property-value">{excavatorData[selectedExcavator as keyof typeof excavatorData].engine_power_kw}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Потужність двигуна (л.с):</span>
                      <span className="property-value">{excavatorData[selectedExcavator as keyof typeof excavatorData].engine_power_hp}</span>
                    </div>
                    <div className="property-item">
                      <span className="property-label">Маса машини (т):</span>
                      <span className="property-value">{excavatorData[selectedExcavator as keyof typeof excavatorData].machine_mass}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                <h3>Площа будівлі: <span>{area} м²</span></h3>
              </div>
            )}

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
                  onChange={(e) => setFoundationDepth(e.target.value)}
                />
              </div>
            </div>

            <h2 style={{ marginTop: '3rem' }}>Фундаменти</h2>
            {foundations.map((foundation, index) => (
              <div key={index} className="foundation-form">
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
                      onChange={(e) => updateFoundation(index, 'length', e.target.value)}
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
                      onChange={(e) => updateFoundation(index, 'width', e.target.value)}
                    />
                  </div>
                  {foundations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFoundation(index)}
                      style={{ marginTop: '2rem', padding: '0.5rem 1rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Видалити
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFoundation}
              style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Додати ще
            </button>

            {excavationVolume && (
              <div className="area-result excavation-volume-result">
                <h3>Об'єм грунта для земляних робіт: <span>{excavationVolume} м³</span></h3>
                <p className="calculation-info">
                  Формула: ((площа по низу + площа по верху) / 2) × глибина закладання фундаменту
                </p>
                <p className="calculation-info">
                  (({excavationBottomArea} + {excavationTopArea}) / 2) × {foundationDepth} = {excavationVolume} м³
                </p>
              </div>
            )}

            {excavationMass && (
              <div className="area-result excavation-mass-result">
                <h3>Маса грунта: <span>{excavationMass} кг</span></h3>
                <p className="calculation-info">
                  Формула: об'єм × об'ємна маса грунту
                </p>
                <p className="calculation-info">
                  {excavationVolume} м³ × {currentSoilData?.unit_weight} кг/м³ = {excavationMass} кг
                </p>
                <p className="calculation-info">
                  Маса у тонах: <span style={{ color: 'inherit' }}>{(parseFloat(excavationMass) / 1000).toFixed(2)} т</span>
                </p>
              </div>
            )}

            {excavationTimeHours && (
              <div className="area-result excavation-labor-result">
                <h3>Трудомісткість розробки грунта: <span>{excavationTimeHours} годин</span></h3>
                <p className="calculation-info">
                  Об'єм грунта: {excavationVolume} м³
                </p>
                <p className="calculation-info">
                  Об'єм ковша: {selectedBucketCapacity} м³
                </p>
                <p className="calculation-info">
                  Метод роботи: {selectedWorkMethod === 'TransportLoading' ? 'Транспортування та завантаження' : 'Складування'}
                </p>
                <p className="calculation-info">
                  Група грунту: {soilGroupMapping[selectedSoil as keyof typeof soilGroupMapping]}
                </p>
                <p className="calculation-info">
                  Трудомісткість: {getLaborIntensity()} годин на 100 м³
                </p>
                <p className="calculation-info">
                  Розрахунок: {excavationVolume} м³ ÷ 100 × {getLaborIntensity()} = {excavationTimeHours} годин
                </p>
                <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />
                <p className="calculation-info">
                  <strong style={{ color: '#7b1fa2' }}>Машино-години:</strong> {machineHours} машино-годин
                </p>
                <p className="calculation-info">
                  <strong style={{ color: '#7b1fa2' }}>Машино-зміни:</strong> {machineShifts} машино-змін (8 годин на зміну)
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
                  Ціна за годину (об'єм ковша {selectedBucketCapacity} м³): {getMachineRentalPrice(selectedBucketCapacity)} грн/год
                </p>
                <p className="calculation-info">
                  Розрахунок: {machineHours} машино-годин × {getMachineRentalPrice(selectedBucketCapacity)} грн/год = <strong style={{ color: '#d32f2f', fontSize: '1.1rem' }}>{machineRentalCost} грн</strong>
                </p>
              </div>
            )}

            {!excavationTimeHours && (
              <div className="area-result" style={{ borderLeftColor: '#999', background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' }}>
                <h3 style={{ color: '#666' }}>Розрахунок трудомісткості</h3>
                <p className="calculation-info" style={{ color: '#999' }}>
                  ⚠ Заповніть всі параметри будівлі та фундаменту для розрахунку трудомісткості:
                </p>
                <ul style={{ textAlign: 'left', display: 'inline-block', color: '#999', marginBottom: '1rem' }}>
                  <li>Ширина будівлі (м) {width ? '✓' : '✗'}</li>
                  <li>Довжина будівлі (м) {length ? '✓' : '✗'}</li>
                  <li>Ширина фундаменту (м) {foundationWidth ? '✓' : '✗'}</li>
                  <li>Відступ від краю фундаменту (м) {foundationOffset ? '✓' : '✗'}</li>
                  <li>Глибина закладання фундаменту (м) {foundationDepth ? '✓' : '✗'}</li>
                </ul>
                <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                  <p><strong>Діагностика:</strong></p>
                  <p>Площа низу котловану: {excavationBottomArea ? excavationBottomArea + ' м²' : 'не розраховується'}</p>
                  <p>Площа по верху котловану: {excavationTopArea ? excavationTopArea + ' м²' : 'не розраховується'}</p>
                  <p>Об'єм грунта: {excavationVolume ? excavationVolume + ' м³' : 'не розраховується'}</p>
                  <p>Трудомісткість (години/100м³): {getLaborIntensity() ? getLaborIntensity() : 'не знайдена'}</p>
                </div>
              </div>
            )}
          </div>
        )
      case 1: // Бетонні роботи
        return (
          <div className="concrete-tab">
            <h2>Бетонні роботи</h2>
            <div className="input-group">
              <div className="input-field">
                <label htmlFor="foundationAboveGroundConcrete">Відстань фундаменту від рівня грунта до нульової позначки (м):</label>
                <input
                  id="foundationAboveGroundConcrete"
                  type="number"
                  placeholder="Введіть відстань"
                  value={foundationAboveGroundConcrete}
                  onChange={(e) => setFoundationAboveGroundConcrete(e.target.value)}
                />
              </div>
            </div>
            {foundationDepth && foundationAboveGroundConcrete && (
              <div className="area-result">
                <h3>Загальна висота фундаменту: <span>{(parseFloat(foundationDepth) + parseFloat(foundationAboveGroundConcrete)).toFixed(2)} м</span></h3>
                <p className="calculation-info">
                  Формула: глибина закладання фундаменту + відстань від рівня грунта до нульової позначки
                </p>
                <p className="calculation-info">
                  {foundationDepth} м + {foundationAboveGroundConcrete} м = {(parseFloat(foundationDepth) + parseFloat(foundationAboveGroundConcrete)).toFixed(2)} м
                </p>
              </div>
            )}
          </div>
        )
      case 2:
        return <p>Інформація про кам'яні роботи</p>
      case 3:
        return <p>Інформація про теплоізоляційні роботи</p>
      default:
        return <p>Виберіть вкладку</p>
    }
  }

  return (
    <>
      <h1>Виконання робіт</h1>
      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </>
  )
}

export default App
