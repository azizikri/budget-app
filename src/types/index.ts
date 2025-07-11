// --- Interfaces ---
export interface ChecklistItem {
  id: string;
  label: string;
  ariaLabel?: string;
}

export interface Allocations {
  needs: number;
  wants: number;
  invest: number;
  usStocks: number;
  crypto: number;
  rdpu: number;
}

export interface ProgressSectionData {
  value: number;
  color: string;
  label: string;
  tooltip: string;
  ariaLabel: string;
}
