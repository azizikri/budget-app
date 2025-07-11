// src/App.tsx
import React, { Suspense, lazy, useCallback } from 'react';
import { Container, Stack, Divider, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Import components
import Header from './components/Header';
import IncomeInput from './components/IncomeInput';
import AllocationProgress from './components/AllocationProgress';
import AllocationCards from './components/AllocationCards';
import InvestmentBreakdown from './components/InvestmentBreakdown';
import NeedsChecklist from './components/NeedsChecklist';

const PercentageSettingsDrawer = lazy(() => import('./components/PercentageSettingsDrawer'));
const InvestmentSettingsDrawer = lazy(() => import('./components/InvestmentSettingsDrawer'));
// import IdleOverlay from './components/IdleOverlay';

// Import constants and types
import { COLORS } from './constants/Colors';
import { useBudgetStore } from './store/budgetStore';

const App: React.FC = () => {
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const [investmentDrawerOpened, { open: openInvestment, close: closeInvestment }] = useDisclosure(false);

  const openDrawer = useCallback(() => open(), [open]);
  const closeDrawer = useCallback(() => close(), [close]);
  const openInvestmentDrawer = useCallback(() => openInvestment(), [openInvestment]);
  const closeInvestmentDrawer = useCallback(() => closeInvestment(), [closeInvestment]);
  const { needsPercent, wantsPercent, investPercent, usStocksPercent, cryptoPercent, rdpuPercent } = useBudgetStore();

  return (
    <>
      {/* <IdleOverlay isIdle={(idle && (!drawerOpened || ! investmentDrawerOpened))} /> */}

      <Header />
      <main>
        <Container size="sm" my="xl">
          <Stack gap="lg">
            <IncomeInput
              openDrawer={openDrawer}
            />

            <Divider
              label="Hasil Alokasi Utama"
              labelPosition="center"
              styles={{ label: { color: COLORS.text.primary, fontWeight: 500 } }}
            />

            <AllocationProgress />

            <AllocationCards />

            <Divider
              label="Rincian Alokasi Investasi"
              labelPosition="center"
              styles={{ label: { color: COLORS.text.primary, fontWeight: 500 } }}
            />

            <InvestmentBreakdown
              openInvestmentDrawer={openInvestmentDrawer}
            />

            <Divider
              label="Checklist Kebutuhan Pokok"
              labelPosition="center"
              styles={{ label: { color: COLORS.text.primary, fontWeight: 500 } }}
            />

            <NeedsChecklist />

            <Text size="xs" c={COLORS.text.secondary} ta="center" mt="xl">
              Perhitungan ini berdasarkan alokasi: Needs {needsPercent}%, Wants {wantsPercent}%, Invest {investPercent}%.
              Investasi dibagi lagi menjadi: Saham US {usStocksPercent}%, Crypto {cryptoPercent}%, RDPU {rdpuPercent}%.
            </Text>
          </Stack>
        </Container>
      </main>

      <Suspense fallback={null}>
        {drawerOpened && (
          <PercentageSettingsDrawer
            opened={drawerOpened}
            onClose={closeDrawer}
          />
        )}
        {investmentDrawerOpened && (
          <InvestmentSettingsDrawer
            opened={investmentDrawerOpened}
            onClose={closeInvestmentDrawer}
          />
        )}
      </Suspense>
    </>
  );
};

export default App;
