import { useState } from 'react'
import './App.css'
import { tabs } from './data/constants'
import EarthworkTab from './components/EarthworkTab'
import ConcreteTab from './components/ConcreteTab'

function App() {
  const [activeTab, setActiveTab] = useState(0)
  // foundationDepth is shared between EarthworkTab and ConcreteTab
  const [foundationDepth, setFoundationDepth] = useState('')
  // EarthworkTab states
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')
  const [foundationWidth, setFoundationWidth] = useState('')
  const [foundationOffset, setFoundationOffset] = useState('')
  const [selectedSoil, setSelectedSoil] = useState('Пісок')
  const [selectedExcavator, setSelectedExcavator] = useState('ЭО-2621А')
  const [selectedBucketCapacity, setSelectedBucketCapacity] = useState('0.25')
  const [selectedWorkMethod, setSelectedWorkMethod] = useState('TransportLoading')
  // ConcreteTab states
  const [foundationAboveGroundConcrete, setFoundationAboveGroundConcrete] = useState('')
  const [foundations, setFoundations] = useState([{ length: '', width: '', longitudinalReinforcement: '', transverseReinforcement: '', longitudinalStep: '', transverseStep: '' }])
  const [craneBucketWeight, setCraneBucketWeight] = useState('3')
  const [craneRiggingWeight, setCraneRiggingWeight] = useState('0.05')
  const [craneHeightReserve, setCraneHeightReserve] = useState('0.5')
  const [craneElementHeight, setCraneElementHeight] = useState('3.5')
  const [craneStrappingHeight, setCraneStrappingHeight] = useState('5')
  const [craneAxisDistance, setCraneAxisDistance] = useState('0')

  const addFoundation = () => setFoundations([...foundations, { length: '', width: '', longitudinalReinforcement: '', transverseReinforcement: '', longitudinalStep: '', transverseStep: '' }])
  const removeFoundation = (index: number) =>
    setFoundations(foundations.filter((_, i) => i !== index))
  const updateFoundation = (index: number, field: 'length' | 'width' | 'longitudinalReinforcement' | 'transverseReinforcement' | 'longitudinalStep' | 'transverseStep', value: string) =>
    setFoundations(foundations.map((f, i) => (i === index ? { ...f, [field]: value } : f)))

  const handleExcavatorChange = (excavator: string) => {
    setSelectedExcavator(excavator)
    if (excavator === 'ЭО-2621А') setSelectedBucketCapacity('0.25')
    else if (excavator === 'ЭО-3322') setSelectedBucketCapacity('0.4')
    else if (excavator === 'ЭО-5015') setSelectedBucketCapacity('0.5')
    else if (excavator === 'ЭО-4121') setSelectedBucketCapacity('0.63-0.65')
    else if (excavator === 'ЭО-4321') setSelectedBucketCapacity('0.4')
    else if (excavator === 'ЭО-5122') setSelectedBucketCapacity('1.25')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <EarthworkTab
            foundationDepth={foundationDepth}
            onFoundationDepthChange={setFoundationDepth}
            width={width}
            setWidth={setWidth}
            length={length}
            setLength={setLength}
            foundationWidth={foundationWidth}
            setFoundationWidth={setFoundationWidth}
            foundationOffset={foundationOffset}
            setFoundationOffset={setFoundationOffset}
            selectedSoil={selectedSoil}
            setSelectedSoil={setSelectedSoil}
            selectedExcavator={selectedExcavator}
            setSelectedExcavator={setSelectedExcavator}
            selectedBucketCapacity={selectedBucketCapacity}
            setSelectedBucketCapacity={setSelectedBucketCapacity}
            selectedWorkMethod={selectedWorkMethod}
            setSelectedWorkMethod={setSelectedWorkMethod}
            onExcavatorChange={handleExcavatorChange}
          />
        )
      case 1:
        return (
          <ConcreteTab
            foundationDepth={foundationDepth}
            foundationAboveGroundConcrete={foundationAboveGroundConcrete}
            setFoundationAboveGroundConcrete={setFoundationAboveGroundConcrete}
            foundations={foundations}
            addFoundation={addFoundation}
            removeFoundation={removeFoundation}
            updateFoundation={updateFoundation}
            craneBucketWeight={craneBucketWeight}
            setCraneBucketWeight={setCraneBucketWeight}
            craneRiggingWeight={craneRiggingWeight}
            setCraneRiggingWeight={setCraneRiggingWeight}
            craneHeightReserve={craneHeightReserve}
            setCraneHeightReserve={setCraneHeightReserve}
            craneElementHeight={craneElementHeight}
            setCraneElementHeight={setCraneElementHeight}
            craneStrappingHeight={craneStrappingHeight}
            setCraneStrappingHeight={setCraneStrappingHeight}
            foundationOffset={foundationOffset}
            foundationWidth={foundationWidth}
            craneAxisDistance={craneAxisDistance}
            setCraneAxisDistance={setCraneAxisDistance}
          />
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
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </>
  )
}

export default App
