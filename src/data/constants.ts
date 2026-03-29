export const laborIntensityData = {
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

export const soilGroupMapping: Record<string, string> = {
  'Пісок': 'I',
  'Супісок': 'II',
  'Суглинок': 'IV',
  'Глина': 'V',
  'Лес': 'III',
}

export const machineRentalPrices: Record<string, number> = {
  '0.1-0.4': 800,
  '0.4-0.6': 950,
  '0.6-0.8': 1100,
  '0.8-1.0': 1400,
  '1.0-1.2': 1600,
  '1.2-1.6': 2000,
}

export const excavatorData = {
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

export const soilData = {
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

export const tabs = [
  { name: 'Земляні роботи', id: 'earthwork' },
  { name: 'Бетонні роботи', id: 'concrete' },
  { name: "Кам'яні роботи", id: 'stone' },
  { name: 'Теплоізоляційні роботи', id: 'insulation' },
]

export const rebarMassPerMeter: Record<string, number> = {
  '3': 0.055,
  '4': 0.099,
  '5': 0.154,
  '6': 0.222,
  '8': 0.395,
  '10': 0.617,
  '12': 0.886,
  '14': 1.208,
  '16': 1.578,
  '18': 1.998,
  '20': 2.466,
  '22': 2.984,
  '25': 3.840,
  '28': 4.830,
  '32': 6.310,
  '36': 7.990,
  '40': 9.870,
}

export const craneData: Record<string, { boomReaches: number[]; capacities: Record<number, (number | null)[]>; unit: 't' | 'kg' }> = {
  'XCMG XCT8L4': {
    boomReaches: [8.2, 11.8, 15.3, 18.9, 22.4, 26],
    unit: 't',
    capacities: {
      3: [8, null, null, null, null, null],
      3.5: [8, 6.5, null, null, null, null],
      4: [8, 6.5, 6.3, null, null, null],
      4.5: [7.2, 6.5, 6, 6, null, null],
      5: [6.3, 6.3, 6, 5.6, 4.6, null],
      5.5: [5.5, 5.7, 5.3, 5.2, 4.2, 3.7],
      6: [5, 5.1, 4.8, 5, 4.1, 3.5],
      6.5: [null, 4.6, 4.3, 4.5, 3.8, 3.3],
      7: [null, 4.2, 3.5, 4.3, 3.6, 3.1],
      7.5: [null, 3.8, 3.4, 4, 3.4, 2.8],
      8: [null, 3.2, 3, 3.3, 3.2, 2.7],
      9: [null, 2.5, 2.6, 2.6, 2.7, 2.4],
      10: [null, null, 2.1, 2.2, 2.2, 2.2],
      11: [null, null, 1.7, 1.7, 1.8, 1.8],
      12: [null, null, 1.5, 1.5, 1.6, 1.6],
      13: [null, null, null, 1.2, 1.4, 1.3],
      14: [null, null, null, 1.1, 1.2, 1.2],
      15: [null, null, null, 0.9, 1, 1],
      16: [null, null, null, null, 0.9, 0.9],
      17: [null, null, null, null, 0.7, 0.8],
      18: [null, null, null, null, 0.6, 0.7],
      19: [null, null, null, null, null, 0.6],
      20: [null, null, null, null, null, 0.5],
      21: [null, null, null, null, null, 0.3],
    },
  },
  'XCMG XCT12L': {
    boomReaches: [9.4, 12.8, 16.1, 21.1, 26.2, 31.2, 36.2],
    unit: 'kg',
    capacities: {
      3: [12000, 11200, null, null, null, null, null],
      3.5: [12000, 11100, 10200, 8000, null, null, null],
      4: [11500, 11000, 10100, 8000, null, null, null],
      4.5: [11000, 10400, 9800, 8000, 6400, null, null],
      5: [10400, 9500, 9000, 7600, 6200, null, null],
      5.5: [9300, 9000, 8400, 7300, 6100, 4500, null],
      6: [8400, 8100, 7800, 7100, 5700, 4500, null],
      6.5: [7600, 7300, 7200, 6800, 5400, 4400, null],
      7: [6900, 6700, 6500, 6400, 4900, 4200, 3300],
      8: [null, 5300, 5300, 5500, 4400, 3800, 3300],
      9: [null, 4250, 4200, 4550, 4000, 3500, 3300],
      10: [null, 3450, 3300, 3750, 3700, 3200, 3300],
      11: [null, null, 2650, 3150, 3300, 3000, 2900],
      12: [null, null, 2150, 2550, 2800, 2800, 2850],
      14: [null, null, null, 1750, 2000, 2250, 2250],
      16: [null, null, null, 1200, 1450, 1600, 1700],
      18: [null, null, null, 800, 1050, 1200, 1300],
      20: [null, null, null, null, 700, 850, 1030],
      22: [null, null, null, null, 450, 600, 700],
      24: [null, null, null, null, null, 400, 500],
    },
  },
  'XCMG QY30K5C': {
    boomReaches: [10.8, 14.9, 18.9, 24.9, 30.9, 37.0, 43.0],
    unit: 'kg',
    capacities: {
      3: [30000, 25000, null, null, null, null, null],
      3.5: [25000, 24700, null, null, null, null, null],
      4: [25000, 23200, 17600, null, null, null, null],
      4.5: [24000, 22000, 17600, null, null, null, null],
      5: [23000, 21000, 17600, 16900, null, null, null],
      5.5: [21300, 20200, 17400, 16000, null, null, null],
      6: [19200, 19400, 16600, 15100, null, null, null],
      6.5: [17200, 17400, 15900, 14300, 12800, null, null],
      7: [15200, 15800, 15400, 13700, 12800, null, null],
      8: [13200, 13800, 13500, 12600, 12500, 9600, null],
      9: [null, 11100, 10800, 11600, 11500, 9500, null],
      10: [null, 9100, 8800, 9600, 10100, 9100, 6100],
      11: [null, 7500, 7300, 8100, 8500, 8500, 6100],
      12: [null, null, 6100, 6900, 7300, 7600, 6100],
      13: [null, null, 5100, 5900, 6300, 6600, 5900],
      14: [null, null, 4300, 5100, 5500, 5800, 5500],
      15: [null, null, 3600, 4400, 4800, 5100, 5200],
      16: [null, null, null, 3800, 4200, 4500, 4600],
      18: [null, null, null, 2800, 3200, 3500, 3700],
      20: [null, null, null, 2100, 2500, 2800, 3000],
      22: [null, null, null, null, 1900, 2200, 2400],
      24: [null, null, null, null, 1400, 1700, 1900],
      26: [null, null, null, null, 1000, 1300, 1500],
      28: [null, null, null, null, null, 900, 1100],
      30: [null, null, null, null, null, 700, 800],
      32: [null, null, null, null, null, null, 600],
    },
  },
}

export const formworkData: Record<string, { panelAreas: string[]; installation: number[]; dismantling: number[]; dismantlingBoards: number[] }> = {
  'Деревяна': {
    panelAreas: ['До 1', 'До 2', 'До 2 (3)'],
    installation: [0.62, 0.51, 0.40],
    dismantling: [0.15, 0.13, 0.10],
    dismantlingBoards: [0.19, 0.16, 0.12],
  },
  'Деревяно-металева': {
    panelAreas: ['До 2'],
    installation: [0.45],
    dismantling: [0.26],
    dismantlingBoards: [0.34],
  },
}

export const reinforcementMeshData: Record<string, Record<string, (number | null)[]>> = {
  '16-32': {
    'Горизонтальна (низ і верх)': [0.42, 0.81, 1.4, 2.1, null],
    'Вертикальна': [0.79, 1.3, 2.7, 3.4, null],
    'Похила': [1.0, 2.1, 3.5, 5.3, null],
  },
  '33-45': {
    'Горизонтальна (низ і верх)': [null, null, 1.3, 1.7, 2.4],
    'Вертикальна': [null, null, 2.1, 3.2, 4.1],
    'Похила': [null, null, 3.2, 4.7, 6.3],
  },
  'Понад 45': {
    'Горизонтальна (низ і верх)': [null, 0.88, 1.7, 2.6, 3.5],
    'Вертикальна': [null, null, 1.7, 2.7, 3.8],
    'Похила': [null, null, 2.2, 3.1, 4.0],
  },
}

export const reinforcementMeshMassCategories = [
  { label: 'До 0.3 т', min: 0, max: 0.3 },
  { label: 'До 0.6 т', min: 0.3, max: 0.6 },
  { label: 'До 1 т', min: 0.6, max: 1.0 },
  { label: 'До 2 т', min: 1.0, max: 2.0 },
  { label: 'До 3 т', min: 2.0, max: 3.0 },
]


export const concretePoringData: Record<string, number> = {
  'Стрічкові фундаменти до 600 мм': 0.30,
  'Стрічкові фундаменти понад 600 мм': 0.23,
}
