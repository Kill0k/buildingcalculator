import React from 'react'
import FoundationForm from './FoundationForm'

interface ConcreteTabProps {
  foundationDepth: string
  foundationAboveGroundConcrete: string
  setFoundationAboveGroundConcrete: (value: string) => void
  foundations: { length: string; width: string }[]
  addFoundation: () => void
  removeFoundation: (index: number) => void
  updateFoundation: (index: number, field: 'length' | 'width', value: string) => void
}

const ConcreteTab: React.FC<ConcreteTabProps> = ({
  foundationDepth,
  foundationAboveGroundConcrete,
  setFoundationAboveGroundConcrete,
  foundations,
  addFoundation,
  removeFoundation,
  updateFoundation,
}) => {
  const totalFoundationHeight =
    foundationDepth && foundationAboveGroundConcrete
      ? (parseFloat(foundationDepth) + parseFloat(foundationAboveGroundConcrete)).toFixed(2)
      : null

  const totalStripLength = foundations
    .reduce((sum, f) => {
      const l = parseFloat(f.length) || 0
      return sum + l
    }, 0)
    .toFixed(2)

  const totalConcreteVolume = totalFoundationHeight
    ? foundations
        .reduce((sum, f) => {
          const l = parseFloat(f.length) || 0
          const w = parseFloat(f.width) || 0
          return sum + l * w * parseFloat(totalFoundationHeight)
        }, 0)
        .toFixed(2)
    : null

  const totalConcreteCost = totalConcreteVolume
    ? (parseFloat(totalConcreteVolume) * 3200).toFixed(2)
    : null

  const totalFormworkArea = totalFoundationHeight && totalStripLength
    ? (2 * parseFloat(totalFoundationHeight) * parseFloat(totalStripLength)).toFixed(2)
    : null

  const totalFormworkCost = totalFormworkArea
    ? (parseFloat(totalFormworkArea) * 140).toFixed(2)
    : null

  return (
    <div className="concrete-tab">
      <h2>Бетонні роботи</h2>
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="foundationAboveGroundConcrete">
            Відстань фундаменту від рівня грунта до нульової позначки (м):
          </label>
          <input
            id="foundationAboveGroundConcrete"
            type="number"
            placeholder="Введіть відстань"
            value={foundationAboveGroundConcrete}
            onChange={(e) => setFoundationAboveGroundConcrete(e.target.value)}
          />
        </div>
      </div>
      {totalFoundationHeight && (
        <div className="area-result">
          <h3>
            Загальна висота фундаменту: <span>{totalFoundationHeight} м</span>
          </h3>
          <p className="calculation-info">
            Формула: глибина закладання фундаменту + відстань від рівня грунта до нульової позначки
          </p>
          <p className="calculation-info">
            {foundationDepth} м + {foundationAboveGroundConcrete} м = {totalFoundationHeight} м
          </p>
          <h3>
            Загальна довжина стрічки фундаментів: <span>{totalStripLength} м</span>
          </h3>
          <p className="calculation-info">Формула: сума довжин фундаментів</p>
          <p className="calculation-info">
            {foundations.map(f => parseFloat(f.length) || 0).join(' + ')} = {totalStripLength} м
          </p>
          <h3>
            Загальний об'єм бетону, необхідний для заливки: <span>{totalConcreteVolume} м³</span>
          </h3>
          <h3>
            Орієнтовна вартість бетону: <span>{totalConcreteCost} грн</span>
          </h3>
          <p className="calculation-info">Формула: об'єм бетону * вартість бетону (3200 грн/м³)</p>
          <p className="calculation-info">
            {totalConcreteVolume} м³ * 3200 грн = {totalConcreteCost} грн
          </p>
          <h3>
            Загальна площа опалубки: <span>{totalFormworkArea} м²</span>
          </h3>
          <p className="calculation-info">Формула: 2 * висота фундаменту * довжина стрічки</p>
          <p className="calculation-info">
            2 * {totalFoundationHeight} м * {totalStripLength} м = {totalFormworkArea} м²
          </p>
          <h3>
            Орієнтовна вартість аренди опалубки: <span>{totalFormworkCost} грн</span>
          </h3>
          <p className="calculation-info">Формула: площа опалубки * 140 грн/м²</p>
          <p className="calculation-info">
            {totalFormworkArea} м² * 140 грн/м² = {totalFormworkCost} грн
          </p>
        </div>
      )}
      {/* Foundations list */}
      <h2 style={{ marginTop: '3rem' }}>Фундаменти</h2>
      {foundations.map((foundation, index) => (
        <FoundationForm
          key={index}
          foundation={foundation}
          index={index}
          onUpdate={updateFoundation}
          onRemove={removeFoundation}
          showRemove={foundations.length > 1}
        />
      ))}
      <button
        type="button"
        onClick={addFoundation}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Додати ще
      </button>
    </div>
  )
}

export default ConcreteTab
