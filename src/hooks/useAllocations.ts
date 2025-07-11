// src/hooks/useAllocations.ts
import { useMemo } from 'react';
import { useBudgetStore } from '../store/budgetStore';

export const useAllocations = () => {
    const { income, needsPercent, wantsPercent, investPercent, usStocksPercent, cryptoPercent, rdpuPercent } = useBudgetStore();

    return useMemo(() => {
        const numericIncome = typeof income === 'number' ? income : parseFloat(String(income)) || 0;

        const needsAmount = numericIncome * (needsPercent / 100);
        const wantsAmount = numericIncome * (wantsPercent / 100);
        const investAmount = numericIncome * (investPercent / 100);

        const usStocksAmount = investAmount * (usStocksPercent / 100);
        const cryptoAmount = investAmount * (cryptoPercent / 100);
        const rdpuAmount = investAmount * (rdpuPercent / 100);

        const totalInvestCalculated = usStocksAmount + cryptoAmount + rdpuAmount;
        const investDifference = investAmount - totalInvestCalculated;
        const finalRdpuAmount = rdpuAmount + investDifference;

        return {
            needsAmount,
            wantsAmount,
            investAmount,
            usStocksAmount,
            cryptoAmount,
            rdpuAmount: finalRdpuAmount,
        };
    }, [income, needsPercent, wantsPercent, investPercent, usStocksPercent, cryptoPercent, rdpuPercent]);
};
