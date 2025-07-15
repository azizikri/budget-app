import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand v5 best practices: persist middleware, versioning, selectors
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

const baseStore = create<BudgetState>()(
    persist(
        (set) => ({
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
        }),
        {
            name: 'budget-store',
            version: 1,
            migrate: (persisted, version) => persisted, // ready for future migrations
            partialize: (state) => ({
                income: state.income,
                needsPercent: state.needsPercent,
                wantsPercent: state.wantsPercent,
                investPercent: state.investPercent,
                usStocksPercent: state.usStocksPercent,
                cryptoPercent: state.cryptoPercent,
                rdpuPercent: state.rdpuPercent,
                checkedNeeds: state.checkedNeeds,
            }),
        }
    )
);

/**
 * Zustand selector utility for React stores (no TS error).
 * Only works with Zustand React stores (not vanilla).
 */
type WithSelectors<S> = S extends {
    (...args: any[]): infer R;
    getState: () => infer T;
}
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

function createSelectors<S extends { (...args: any[]): any; getState: () => any }>(store: S) {
    const s = store as WithSelectors<typeof store>;
    s.use = {} as any;
    for (const k of Object.keys(store.getState())) {
        (s.use as any)[k] = () => store((state: any) => state[k]);
    }
    return s;
}

export const useBudgetStore = createSelectors(baseStore as any);
