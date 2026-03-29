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

