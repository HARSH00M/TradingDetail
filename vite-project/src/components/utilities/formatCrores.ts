export default function formatCrores(value: number): string {
    // Divide by 1 crore (10,000,000)
    const croreValue = value / 10000000;
    // Format to 2 decimal places and append 'Cr'
    return croreValue.toFixed(2) + ' Cr';
  }
