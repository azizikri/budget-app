// src/hooks/usePercentageHandlers.ts
import { useBudgetStore } from '../store/budgetStore';

export const usePercentageHandlers = () => {
    const {
        needsPercent,
        wantsPercent,
        investPercent,
        usStocksPercent,
        cryptoPercent,
        rdpuPercent,
        setAllocationPercentages,
        setInvestmentPercentages,
    } = useBudgetStore();

    const handlePercentageChange = (type: 'needs' | 'wants' | 'invest', value: number) => {
        const newValue = Math.max(0, Math.min(100, value));

        if (type === 'needs') {
            const remainingPercent = 100 - newValue;
            const currentNonNeeds = wantsPercent + investPercent;
            let newWantsPercent: number;
            let newInvestPercent: number;

            if (currentNonNeeds === 0) {
                newWantsPercent = remainingPercent / 2;
                newInvestPercent = remainingPercent / 2;
            } else {
                newWantsPercent = Math.round((wantsPercent / currentNonNeeds) * remainingPercent);
                newInvestPercent = remainingPercent - newWantsPercent;
            }
            setAllocationPercentages({ needs: newValue, wants: newWantsPercent, invest: newInvestPercent });
        } else if (type === 'wants') {
            const remainingPercent = 100 - newValue;
            const currentNonWants = needsPercent + investPercent;
            let newNeedsPercent: number;
            let newInvestPercent: number;

            if (currentNonWants === 0) {
                newNeedsPercent = remainingPercent / 2;
                newInvestPercent = remainingPercent / 2;
            } else {
                newNeedsPercent = Math.round((needsPercent / currentNonWants) * remainingPercent);
                newInvestPercent = remainingPercent - newNeedsPercent;
            }
            setAllocationPercentages({ needs: newNeedsPercent, wants: newValue, invest: newInvestPercent });
        } else if (type === 'invest') {
            const remainingPercent = 100 - newValue;
            const currentNonInvest = needsPercent + wantsPercent;
            let newNeedsPercent: number;
            let newWantsPercent: number;

            if (currentNonInvest === 0) {
                newNeedsPercent = remainingPercent / 2;
                newWantsPercent = remainingPercent / 2;
            } else {
                newNeedsPercent = Math.round((needsPercent / currentNonInvest) * remainingPercent);
                newWantsPercent = remainingPercent - newNeedsPercent;
            }
            setAllocationPercentages({ needs: newNeedsPercent, wants: newWantsPercent, invest: newValue });
        }
    };

    const handleInvestmentPercentageChange = (type: 'usStocks' | 'crypto' | 'rdpu', value: number) => {
        const newValue = Math.max(0, Math.min(100, value));

        if (type === 'usStocks') {
            const remainingPercent = 100 - newValue;
            const currentNonUsStocks = cryptoPercent + rdpuPercent;
            let newCryptoPercent: number;
            let newRdpuPercent: number;

            if (currentNonUsStocks === 0) {
                newCryptoPercent = remainingPercent / 2;
                newRdpuPercent = remainingPercent / 2;
            } else {
                newCryptoPercent = Math.round((cryptoPercent / currentNonUsStocks) * remainingPercent);
                newRdpuPercent = remainingPercent - newCryptoPercent;
            }
            setInvestmentPercentages({ usStocks: newValue, crypto: newCryptoPercent, rdpu: newRdpuPercent });
        } else if (type === 'crypto') {
            const remainingPercent = 100 - newValue;
            const currentNonCrypto = usStocksPercent + rdpuPercent;
            let newUsStocksPercent: number;
            let newRdpuPercent: number;

            if (currentNonCrypto === 0) {
                newUsStocksPercent = remainingPercent / 2;
                newRdpuPercent = remainingPercent / 2;
            } else {
                newUsStocksPercent = Math.round((usStocksPercent / currentNonCrypto) * remainingPercent);
                newRdpuPercent = remainingPercent - newUsStocksPercent;
            }
            setInvestmentPercentages({ usStocks: newUsStocksPercent, crypto: newValue, rdpu: newRdpuPercent });
        } else if (type === 'rdpu') {
            const remainingPercent = 100 - newValue;
            const currentNonRdpu = usStocksPercent + cryptoPercent;
            let newUsStocksPercent: number;
            let newCryptoPercent: number;

            if (currentNonRdpu === 0) {
                newUsStocksPercent = remainingPercent / 2;
                newCryptoPercent = remainingPercent / 2;
            } else {
                newUsStocksPercent = Math.round((usStocksPercent / currentNonRdpu) * remainingPercent);
                newCryptoPercent = remainingPercent - newUsStocksPercent;
            }
            setInvestmentPercentages({ usStocks: newUsStocksPercent, crypto: newCryptoPercent, rdpu: newValue });
        }
    };

    return {
        handlePercentageChange,
        handleInvestmentPercentageChange,
    };
};
