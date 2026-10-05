/** Fictional measurement tables shown in the Size Guide modal (values in cm). */
export interface SizeTable {
  id: string
  label: string
  note: string
  columns: string[]
  /** First cell is the size label, the rest are measurements in centimetres */
  rows: (string | number)[][]
  /** Columns (by index) that should be converted when switching to inches */
  convertible: number[]
}

export const sizeTables: SizeTable[] = [
  {
    id: 'women',
    label: 'Women',
    note: 'Body measurements. If you are between sizes, we recommend sizing up for outerwear.',
    columns: ['Size', 'UK', 'EU', 'US', 'Bust', 'Waist', 'Hip'],
    rows: [
      ['XS', 6, 34, 2, 80, 62, 88],
      ['S', 8, 36, 4, 84, 66, 92],
      ['M', 10, 38, 6, 88, 70, 96],
      ['L', 12, 40, 8, 93, 75, 101],
      ['XL', 14, 42, 10, 98, 80, 106],
    ],
    convertible: [4, 5, 6],
  },
  {
    id: 'men',
    label: 'Men',
    note: 'Body measurements. Our tailoring has a natural shoulder — choose your usual size.',
    columns: ['Size', 'EU', 'Chest', 'Waist', 'Hip', 'Sleeve'],
    rows: [
      ['S', 46, 92, 78, 94, 63],
      ['M', 48, 98, 84, 100, 64],
      ['L', 50, 104, 90, 106, 65],
      ['XL', 52, 110, 96, 112, 66],
      ['XXL', 54, 116, 102, 118, 67],
    ],
    convertible: [2, 3, 4, 5],
  },
  {
    id: 'shoes',
    label: 'Shoes',
    note: 'Measure your foot from heel to longest toe, standing, at the end of the day.',
    columns: ['EU', 'UK', 'US W', 'US M', 'Foot length'],
    rows: [
      ['36', 3, 6, '—', 23.0],
      ['37', 4, 7, '—', 23.7],
      ['38', 5, 8, 6, 24.3],
      ['39', 6, 9, 7, 25.0],
      ['40', 7, 10, 8, 25.7],
      ['41', 8, 11, 9, 26.3],
      ['42', 9, '—', 10, 27.0],
      ['43', 10, '—', 11, 27.7],
      ['44', 11, '—', 12, 28.3],
      ['45', 12, '—', 13, 29.0],
    ],
    convertible: [4],
  },
  {
    id: 'belts',
    label: 'Belts',
    note: 'Belt size is measured from the buckle pin to the centre hole.',
    columns: ['Belt size', 'Waist', 'Trouser size (EU)'],
    rows: [
      ['75', 75, '44 – 46'],
      ['80', 80, '46 – 48'],
      ['85', 85, '48 – 50'],
      ['90', 90, '50 – 52'],
      ['95', 95, '52 – 54'],
    ],
    convertible: [1],
  },
]
