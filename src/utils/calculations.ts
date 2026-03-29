import { laborIntensityData, soilGroupMapping, machineRentalPrices, soilData } from '../data/constants'

export const mapCapacityToLaborIntensityKey = (capacity: string): string => {
  if (capacity in laborIntensityData) return capacity
  const capacityMap: Record<string, string> = {
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

export const getLaborIntensity = (
  selectedBucketCapacity: string,
  selectedWorkMethod: string,
  selectedSoil: string,
): number | null => {
  const mappedCapacity = mapCapacityToLaborIntensityKey(selectedBucketCapacity)
  const workData = laborIntensityData[mappedCapacity as keyof typeof laborIntensityData]
  if (!workData) return null
  const methodData = workData[selectedWorkMethod as keyof typeof workData]
  if (!methodData) return null
  const soilGroup = soilGroupMapping[selectedSoil]
  return (methodData as Record<string, number>)[soilGroup] ?? null
}

export const getSlopeModulus = (foundationDepth: string, selectedSoil: string): number | null => {
  if (!foundationDepth) return null
  const depth = parseFloat(foundationDepth)
  const soilInfo = soilData[selectedSoil as keyof typeof soilData]
  if (!soilInfo) return null
  if (depth <= 1.5) return soilInfo.slope_modulus_1_5
  if (depth <= 3) return soilInfo.slope_modulus_3
  return soilInfo.slope_modulus_5
}

export const getMachineRentalPrice = (capacity: string): number | null => {
  const capacityNum = parseFloat(capacity)
  if (capacityNum >= 0.1 && capacityNum <= 0.4) return machineRentalPrices['0.1-0.4']
  if (capacityNum > 0.4 && capacityNum <= 0.6) return machineRentalPrices['0.4-0.6']
  if (capacityNum > 0.6 && capacityNum <= 0.8) return machineRentalPrices['0.6-0.8']
  if (capacityNum > 0.8 && capacityNum <= 1.0) return machineRentalPrices['0.8-1.0']
  if (capacityNum > 1.0 && capacityNum <= 1.2) return machineRentalPrices['1.0-1.2']
  if (capacityNum > 1.2 && capacityNum <= 1.6) return machineRentalPrices['1.2-1.6']
  return null
}

