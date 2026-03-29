import React from 'react'
import FoundationForm from './FoundationForm'
import { rebarMassPerMeter, craneData } from '../data/constants'

interface ConcreteTabProps {
  foundationDepth: string
  foundationAboveGroundConcrete: string
  setFoundationAboveGroundConcrete: (value: string) => void
  foundations: { length: string; width: string; longitudinalReinforcement: string; transverseReinforcement: string; longitudinalStep: string; transverseStep: string }[]
  addFoundation: () => void
  removeFoundation: (index: number) => void
  updateFoundation: (index: number, field: 'length' | 'width' | 'longitudinalReinforcement' | 'transverseReinforcement' | 'longitudinalStep' | 'transverseStep', value: string) => void
  craneBucketWeight: string
  setCraneBucketWeight: (value: string) => void
  craneRiggingWeight: string
  setCraneRiggingWeight: (value: string) => void
  craneHeightReserve: string
  setCraneHeightReserve: (value: string) => void
  craneElementHeight: string
  setCraneElementHeight: (value: string) => void
  craneStrappingHeight: string
  setCraneStrappingHeight: (value: string) => void
  foundationOffset: string
  foundationWidth: string
  craneAxisDistance: string
  setCraneAxisDistance: (value: string) => void
}

const ConcreteTab: React.FC<ConcreteTabProps> = ({
  foundationDepth,
  foundationAboveGroundConcrete,
  setFoundationAboveGroundConcrete,
  foundations,
  addFoundation,
  removeFoundation,
  updateFoundation,
  craneBucketWeight,
  setCraneBucketWeight,
  craneRiggingWeight,
  setCraneRiggingWeight,
  craneHeightReserve,
  setCraneHeightReserve,
  craneElementHeight,
  setCraneElementHeight,
  craneStrappingHeight,
  setCraneStrappingHeight,
  foundationOffset,
  foundationWidth,
  craneAxisDistance,
  setCraneAxisDistance,
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

  const rebarMassByDiameter: Record<string, number> = {}
  const totalRebarMass = foundations
    .reduce((sum, f) => {
      const length = parseFloat(f.length) || 0
      const width = parseFloat(f.width) || 0
      const longStep = parseFloat(f.longitudinalStep) || 0
      const transStep = parseFloat(f.transverseStep) || 0
      const longDia = f.longitudinalReinforcement
      const transDia = f.transverseReinforcement

      let longMass = 0
      if (longStep > 0 && longDia && rebarMassPerMeter[longDia]) {
        const longCount = Math.ceil((width - 0.01) / longStep)
        const longTotalLength = longCount * length
        longMass = longTotalLength * rebarMassPerMeter[longDia]
        if (!rebarMassByDiameter[longDia]) rebarMassByDiameter[longDia] = 0
        rebarMassByDiameter[longDia] += longMass
      }

      let transMass = 0
      if (transStep > 0 && transDia && rebarMassPerMeter[transDia]) {
        const transCount = Math.ceil((length - 0.01) / transStep)
        const transTotalLength = transCount * width
        transMass = transTotalLength * rebarMassPerMeter[transDia]
        if (!rebarMassByDiameter[transDia]) rebarMassByDiameter[transDia] = 0
        rebarMassByDiameter[transDia] += transMass
      }

      return sum + longMass + transMass
    }, 0)
    .toFixed(2)

  const totalRebarCost = (parseFloat(totalRebarMass) * 36).toFixed(2)

  const totalMaterialCost = (parseFloat(totalConcreteCost || '0') + parseFloat(totalFormworkCost || '0') + parseFloat(totalRebarCost || '0')).toFixed(2)

  const craneCapacity = (parseFloat(craneBucketWeight || '0') + parseFloat(craneRiggingWeight || '0')).toFixed(2)

  const craneHookHeight = (parseFloat(foundationAboveGroundConcrete || '0') + parseFloat(craneHeightReserve || '0') + parseFloat(craneElementHeight || '0') + parseFloat(craneStrappingHeight || '0')).toFixed(2)

  const craneBoomReach = (2 + 3 + parseFloat(foundationOffset || '0') + (parseFloat(foundationWidth || '0') / 2) + parseFloat(craneAxisDistance || '0')).toFixed(2)

  const suitableCranes = Object.entries(craneData).map(([craneName, crane]) => {
    const requiredCapacity = parseFloat(craneCapacity)
    const requiredHeight = parseFloat(craneHookHeight)
    const requiredReach = parseFloat(craneBoomReach)

    // Найти ближайшую высоту
    const heights = Object.keys(crane.capacities).map(h => parseFloat(h)).sort((a, b) => a - b)
    const closestHeight = heights.reduce((prev, curr) => Math.abs(curr - requiredHeight) < Math.abs(prev - requiredHeight) ? curr : prev)

    // Найти индекс ближайшего вылета
    const reaches = crane.boomReaches
    const closestReachIndex = reaches.reduce((prevIndex, curr, index) => {
      const prevDiff = Math.abs(reaches[prevIndex] - requiredReach)
      const currDiff = Math.abs(curr - requiredReach)
      return currDiff < prevDiff ? index : prevIndex
    }, 0)

    const capacity = crane.capacities[closestHeight]?.[closestReachIndex]
    const boomReach = reaches[closestReachIndex]

    return {
      craneName,
      boomReach,
      capacity,
      height: closestHeight,
      unit: crane.unit,
    }
  }).filter(item => item.capacity !== null && item.capacity !== undefined && item.capacity >= parseFloat(craneCapacity))
    .sort((a, b) => b.capacity - a.capacity) // Сортировка по грузоподъемности descending

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
          <h3>
            Загальна маса арматури: <span>{totalRebarMass} кг</span>
          </h3>
          <p className="calculation-info">Формула: (довжина стрічки / крок арматури) * маса арматури на метр</p>
          <p className="calculation-info">
            {foundations.map(f => `(${(parseFloat(f.length) || 0)} м / ${(parseFloat(f.longitudinalStep) || 0)} м) * ${rebarMassPerMeter[foundations[0].longitudinalReinforcement]} кг/м`).join(' + ')} = {totalRebarMass} кг
          </p>
          <h3>Маса арматури по діаметрах:</h3>
          <ul>
            {Object.entries(rebarMassByDiameter).map(([dia, mass]) => (
              <li key={dia}>
                {dia} мм: {mass.toFixed(2)} кг
              </li>
            ))}
          </ul>
          <h3>
            Загальна вартість арматури: <span>{totalRebarCost} грн</span>
          </h3>
          <p className="calculation-info">Формула: загальна маса арматури * 36 грн/кг</p>
          <p className="calculation-info">
            {totalRebarMass} кг * 36 грн/кг = {totalRebarCost} грн
          </p>
          <h3>
            Загальна вартість матеріалів: <span>{totalMaterialCost} грн</span>
          </h3>
          <p className="calculation-info">Формула: вартість бетону + вартість опалубки + вартість арматури</p>
          <p className="calculation-info">
            {totalConcreteCost} грн + {totalFormworkCost} грн + {totalRebarCost} грн = {totalMaterialCost} грн
          </p>
        </div>
      )}
      {/* Mechanization block */}
      <h2 style={{ marginTop: '3rem' }}>Механізація</h2>
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="craneBucketWeight">Вага бадді (т):</label>
          <input
            id="craneBucketWeight"
            type="number"
            step="0.1"
            placeholder="Введіть вагу бадді"
            value={craneBucketWeight}
            onChange={(e) => setCraneBucketWeight(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="craneRiggingWeight">Вага стропувального приладдя (т):</label>
          <input
            id="craneRiggingWeight"
            type="number"
            step="0.01"
            placeholder="Введіть вагу стропувального приладдя"
            value={craneRiggingWeight}
            onChange={(e) => setCraneRiggingWeight(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="craneHeightReserve">Резерв висоти крана (м):</label>
          <input
            id="craneHeightReserve"
            type="number"
            step="0.01"
            placeholder="Введіть резерв висоти"
            value={craneHeightReserve}
            onChange={(e) => setCraneHeightReserve(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="craneElementHeight">Висота елемента крана (м):</label>
          <input
            id="craneElementHeight"
            type="number"
            step="0.01"
            placeholder="Введіть висоту елемента"
            value={craneElementHeight}
            onChange={(e) => setCraneElementHeight(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="craneStrappingHeight">Висота стропування (м):</label>
          <input
            id="craneStrappingHeight"
            type="number"
            step="0.01"
            placeholder="Введіть висоту стропування"
            value={craneStrappingHeight}
            onChange={(e) => setCraneStrappingHeight(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="craneAxisDistance">Відстань до осі крана (м):</label>
          <input
            id="craneAxisDistance"
            type="number"
            step="0.01"
            placeholder="Введіть відстань до осі крана"
            value={craneAxisDistance}
            onChange={(e) => setCraneAxisDistance(e.target.value)}
          />
        </div>
      </div>
      <div className="area-result">
        <h3>
          Необхідна вантажопідйомність крану: <span>{craneCapacity} т</span>
        </h3>
        <p className="calculation-info">Формула: вага найбільшого вантажу + вага стропувального приладдя</p>
        <p className="calculation-info">
          {craneBucketWeight} т + {craneRiggingWeight} т = {craneCapacity} т
        </p>
        <h3>
          Необхідна висота підйому крюка крану: <span>{craneHookHeight} м</span>
        </h3>
        <p className="calculation-info">Формула: перевищення опори елемента + резерв висоти + висота елементу + висота стропування</p>
        <p className="calculation-info">
          {foundationAboveGroundConcrete} м + {craneHeightReserve} м + {craneElementHeight} м + {craneStrappingHeight} м = {craneHookHeight} м
        </p>
        <h3>
          Необхідний вильот стріли крана: <span>{craneBoomReach} м</span>
        </h3>
        <p className="calculation-info">Формула: 2 + 3 + відстань до осі крана + (ширина фундаменту / 2) + відстань від нульової позначки до краю фундаменту</p>
        <p className="calculation-info">
          2 + 3 + {craneAxisDistance} м + ({foundationWidth} м / 2) + {foundationOffset} м = {craneBoomReach} м
        </p>
      </div>
      {/* Suitable cranes list */}
      <h2 style={{ marginTop: '3rem' }}>Підходящі крани</h2>
      {suitableCranes.length > 0 ? (
        <ul>
          {suitableCranes.map(crane => {
            const capacityStr = crane.unit === 'kg' ? (crane.capacity / 1000).toFixed(2) : crane.capacity.toString()
            return (
              <li key={crane.craneName}>
                {crane.craneName}: {crane.boomReach} м, {capacityStr} т
              </li>
            )
          })}
        </ul>
      ) : (
        <p>Не знайдено підходящих кранів для заданих параметрів.</p>
      )}
    </div>
  )
}

export default ConcreteTab
