import React from 'react'

interface Window {
  id: string
  type: string
  width: string
  height: string
  quantity: string
}

interface Door {
  id: string
  type: string
  width: string
  height: string
  quantity: string
}

interface StoneTabProps {
  floorHeight: string
  setFloorHeight: (value: string) => void
  numberOfFloors: string
  setNumberOfFloors: (value: string) => void
}

const StoneTab: React.FC<StoneTabProps> = ({
  floorHeight,
  setFloorHeight,
  numberOfFloors,
  setNumberOfFloors,
}) => {
  const [windows, setWindows] = React.useState<Window[]>([
    { id: '1', type: 'Вікно тип 1', width: '', height: '', quantity: '' },
  ])

  const [doors, setDoors] = React.useState<Door[]>([
    { id: '1', type: 'Двері тип 1', width: '', height: '', quantity: '' },
  ])

  const totalHeight = floorHeight && numberOfFloors
    ? (parseFloat(floorHeight) * parseInt(numberOfFloors)).toFixed(2)
    : null

  const addWindow = () => {
    const newId = (Math.max(...windows.map(w => parseInt(w.id)), 0) + 1).toString()
    setWindows([...windows, { id: newId, type: `Вікно тип ${newId}`, width: '', height: '', quantity: '' }])
  }

  const removeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
  }

  const updateWindow = (id: string, field: 'type' | 'width' | 'height' | 'quantity', value: string) => {
    setWindows(windows.map(w => (w.id === id ? { ...w, [field]: value } : w)))
  }

  const addDoor = () => {
    const newId = (Math.max(...doors.map(d => parseInt(d.id)), 0) + 1).toString()
    setDoors([...doors, { id: newId, type: `Двері тип ${newId}`, width: '', height: '', quantity: '' }])
  }

  const removeDoor = (id: string) => {
    setDoors(doors.filter(d => d.id !== id))
  }

  const updateDoor = (id: string, field: 'type' | 'width' | 'height' | 'quantity', value: string) => {
    setDoors(doors.map(d => (d.id === id ? { ...d, [field]: value } : d)))
  }

  // Розрахунок площі кожного вікна та всіх вікон
  const windowsData = windows.map((w: Window) => {
    const width = parseFloat(w.width) || 0
    const height = parseFloat(w.height) || 0
    const quantity = parseInt(w.quantity) || 0
    const singleArea = (width * height).toFixed(2)
    const totalArea = (parseFloat(singleArea) * quantity).toFixed(2)

    return {
      ...w,
      singleArea: width && height ? singleArea : '0',
      totalArea: quantity ? totalArea : '0',
    }
  })

  const totalWindowsArea = windowsData
    .reduce((sum: number, w: Window & { singleArea: string; totalArea: string }) => sum + parseFloat(w.totalArea || '0'), 0)
    .toFixed(2)

  // Розрахунок площі кожних дверей та всіх дверей
  const doorsData = doors.map((d: Door) => {
    const width = parseFloat(d.width) || 0
    const height = parseFloat(d.height) || 0
    const quantity = parseInt(d.quantity) || 0
    const singleArea = (width * height).toFixed(2)
    const totalArea = (parseFloat(singleArea) * quantity).toFixed(2)

    return {
      ...d,
      singleArea: width && height ? singleArea : '0',
      totalArea: quantity ? totalArea : '0',
    }
  })

  const totalDoorsArea = doorsData
    .reduce((sum: number, d: Door & { singleArea: string; totalArea: string }) => sum + parseFloat(d.totalArea || '0'), 0)
    .toFixed(2)

  return (
    <div className="stone-tab">
      <h2>Кам'яні роботи</h2>

      <div className="input-group">
        <div className="input-field">
          <label htmlFor="floorHeight">Висота поверху (м):</label>
          <input
            id="floorHeight"
            type="number"
            step="0.1"
            placeholder="Введіть висоту поверху"
            value={floorHeight}
            onChange={(e) => setFloorHeight(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="numberOfFloors">Кількість поверхів:</label>
          <input
            id="numberOfFloors"
            type="number"
            step="1"
            min="1"
            placeholder="Введіть кількість поверхів"
            value={numberOfFloors}
            onChange={(e) => setNumberOfFloors(e.target.value)}
          />
        </div>
      </div>

      {totalHeight && (
        <div className="area-result">
          <h3>
            Загальна висота будівлі: <span>{totalHeight} м</span>
          </h3>
          <p className="calculation-info">
            Формула: висота поверху × кількість поверхів
          </p>
          <p className="calculation-info">
            {floorHeight} м × {numberOfFloors} = {totalHeight} м
          </p>
        </div>
      )}

      {/* Windows specification */}
      <h2 style={{ marginTop: '3rem' }}>Специфікація вікон</h2>

      {windows.map((window, index) => (
        <div key={window.id} style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Тип вікна {index + 1}</h3>
            {windows.length > 1 && (
              <button
                type="button"
                onClick={() => removeWindow(window.id)}
                style={{
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

          <div className="input-group">
            <div className="input-field">
              <label htmlFor={`type-${window.id}`}>Назва типу вікна:</label>
              <input
                id={`type-${window.id}`}
                type="text"
                placeholder="Введіть назву типу"
                value={window.type}
                onChange={(e) => updateWindow(window.id, 'type', e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor={`width-${window.id}`}>Ширина (м):</label>
              <input
                id={`width-${window.id}`}
                type="number"
                step="0.01"
                placeholder="Введіть ширину"
                value={window.width}
                onChange={(e) => updateWindow(window.id, 'width', e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor={`height-${window.id}`}>Висота (м):</label>
              <input
                id={`height-${window.id}`}
                type="number"
                step="0.01"
                placeholder="Введіть висоту"
                value={window.height}
                onChange={(e) => updateWindow(window.id, 'height', e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor={`quantity-${window.id}`}>Кількість вікон:</label>
              <input
                id={`quantity-${window.id}`}
                type="number"
                step="1"
                min="0"
                placeholder="Введіть кількість"
                value={window.quantity}
                onChange={(e) => updateWindow(window.id, 'quantity', e.target.value)}
              />
            </div>
          </div>

          {window.width && window.height && window.quantity && (
            <div className="area-result" style={{ marginTop: '1rem' }}>
              <p>
                <strong>Площа одного вікна:</strong> {window.width} м × {window.height} м = <span>{windowsData.find(w => w.id === window.id)?.singleArea} м²</span>
              </p>
              <p>
                <strong>Загальна площа вікон цього типу:</strong> {windowsData.find(w => w.id === window.id)?.singleArea} м² × {window.quantity} = <span>{windowsData.find(w => w.id === window.id)?.totalArea} м²</span>
              </p>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addWindow}
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
        Додати тип вікна
      </button>

      {windows.some(w => w.width && w.height && w.quantity) && (
        <div className="area-result" style={{ marginTop: '2rem' }}>
          <h3>
            Загальна площа всіх вікон: <span>{totalWindowsArea} м²</span>
          </h3>
          <p className="calculation-info">Сума площ всіх типів вікон</p>
        </div>
      )}

      {/* Doors specification */}
      <h2 style={{ marginTop: '3rem' }}>Специфікація дверей</h2>

      {doors.map((door, index) => (
        <div key={door.id} style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Тип дверей {index + 1}</h3>
            {doors.length > 1 && (
              <button
                type="button"
                onClick={() => removeDoor(door.id)}
                style={{
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

          <div className="input-group">
            <div className="input-field">
              <label htmlFor={`door-type-${door.id}`}>Назва типу дверей:</label>
              <input
                id={`door-type-${door.id}`}
                type="text"
                placeholder="Введіть назву типу"
                value={door.type}
                onChange={(e) => updateDoor(door.id, 'type', e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor={`door-width-${door.id}`}>Ширина (м):</label>
              <input
                id={`door-width-${door.id}`}
                type="number"
                step="0.01"
                placeholder="Введіть ширину"
                value={door.width}
                onChange={(e) => updateDoor(door.id, 'width', e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor={`door-height-${door.id}`}>Висота (м):</label>
              <input
                id={`door-height-${door.id}`}
                type="number"
                step="0.01"
                placeholder="Введіть висоту"
                value={door.height}
                onChange={(e) => updateDoor(door.id, 'height', e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor={`door-quantity-${door.id}`}>Кількість дверей:</label>
              <input
                id={`door-quantity-${door.id}`}
                type="number"
                step="1"
                min="0"
                placeholder="Введіть кількість"
                value={door.quantity}
                onChange={(e) => updateDoor(door.id, 'quantity', e.target.value)}
              />
            </div>
          </div>

          {door.width && door.height && door.quantity && (
            <div className="area-result" style={{ marginTop: '1rem' }}>
              <p>
                <strong>Площа одних дверей:</strong> {door.width} м × {door.height} м = <span>{doorsData.find(d => d.id === door.id)?.singleArea} м²</span>
              </p>
              <p>
                <strong>Загальна площа дверей цього типу:</strong> {doorsData.find(d => d.id === door.id)?.singleArea} м² × {door.quantity} = <span>{doorsData.find(d => d.id === door.id)?.totalArea} м²</span>
              </p>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addDoor}
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
        Додати тип дверей
      </button>

      {doors.some(d => d.width && d.height && d.quantity) && (
        <div className="area-result" style={{ marginTop: '2rem' }}>
          <h3>
            Загальна площа всіх дверей: <span>{totalDoorsArea} м²</span>
          </h3>
          <p className="calculation-info">Сума площ всіх типів дверей</p>
        </div>
      )}
    </div>
  )
}

export default StoneTab

