// src/store/budgetStore.ts
import { create } from 'zustand';

interface BudgetState {
    income: number | string;
    needsPercent: number;
    wantsPercent: number;
    investPercent: number;
    usStocksPercent: number;
    cryptoPercent: number;
    rdpuPercent: number;
    checkedNeeds: string[];
    setIncome: (income: number | string) => void;
    setAllocationPercentages: (percentages: { needs: number; wants: number; invest: number }) => void;
    setInvestmentPercentages: (percentages: { usStocks: number; crypto: number; rdpu: number }) => void;
    toggleNeed: (id: string) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
    income: 10000000,
    needsPercent: 50,
    wantsPercent: 20,
    investPercent: 30,
    usStocksPercent: 50,
    cryptoPercent: 10,
    rdpuPercent: 40,
    checkedNeeds: [],
    setIncome: (income) => set({ income }),
    setAllocationPercentages: (percentages) => set({
        needsPercent: percentages.needs,
        wantsPercent: percentages.wants,
        investPercent: percentages.invest,
    }),
    setInvestmentPercentages: (percentages) => set({
        usStocksPercent: percentages.usStocks,
        cryptoPercent: percentages.crypto,
        rdpuPercent: percentages.rdpu,
    }),
    toggleNeed: (id) => set((state) => ({
        checkedNeeds: state.checkedNeeds.includes(id)
            ? state.checkedNeeds.filter((needId) => needId !== id)
            : [...state.checkedNeeds, id],
    })),
}));
