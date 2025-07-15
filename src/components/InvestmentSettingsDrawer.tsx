import React from 'react';
import { Drawer, Stack, Text, Group, NumberInput, Divider } from '@mantine/core';
import { COLORS } from '../constants/Colors';

import { useBudgetStore } from '../store/budgetStore';
import { usePercentageHandlers } from '../hooks/usePercentageHandlers';

interface InvestmentSettingsDrawerProps {
  opened: boolean;
  onClose: () => void;
}

const InvestmentSettingsDrawer: React.FC<InvestmentSettingsDrawerProps> = React.memo(({
  opened,
  onClose,
}) => {
  const { usStocksPercent, cryptoPercent, rdpuPercent } = useBudgetStore();
  const { handleInvestmentPercentageChange } = usePercentageHandlers();
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Atur Persentase Alokasi Investasi"
      position="right"
      size="md"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Stack gap="md">
        <Text size="sm">
          Sesuaikan persentase alokasi investasi Anda. Total persentase harus 100%.
        </Text>

        <Group align="center">
          <Text size="sm" w={150} c={COLORS.invest}>Saham US:</Text>
          <NumberInput
            value={usStocksPercent}
            onChange={(value) => handleInvestmentPercentageChange('usStocks', Number(value))}
            min={0}
            max={100}
            step={5}
            w="100%"
            rightSection={<Text size="xs">%</Text>}
            aria-label="Persentase untuk Saham US"
            styles={{
              input: {
                '&:focus': {
                  borderColor: COLORS.background.focus,
                  boxShadow: `0 0 0 2px ${COLORS.background.focus}40`
                }
              }
            }}
          />
        </Group>

        <Group align="center">
          <Text size="sm" w={150} c={COLORS.invest}>Cryptocurrency:</Text>
          <NumberInput
            value={cryptoPercent}
            onChange={(value) => handleInvestmentPercentageChange('crypto', Number(value))}
            min={0}
            max={100}
            step={5}
            w="100%"
            rightSection={<Text size="xs">%</Text>}
            aria-label="Persentase untuk Cryptocurrency"
            styles={{
              input: {
                '&:focus': {
                  borderColor: COLORS.background.focus,
                  boxShadow: `0 0 0 2px ${COLORS.background.focus}40`
                }
              }
            }}
          />
        </Group>

        <Group align="center">
          <Text size="sm" w={150} c={COLORS.invest}>Reksa Dana Pasar Uang:</Text>
          <NumberInput
            value={rdpuPercent}
            onChange={(value) => handleInvestmentPercentageChange('rdpu', Number(value))}
            min={0}
            max={100}
            step={5}
            w="100%"
            rightSection={<Text size="xs">%</Text>}
            aria-label="Persentase untuk Reksa Dana Pasar Uang"
            styles={{
              input: {
                '&:focus': {
                  borderColor: COLORS.background.focus,
                  boxShadow: `0 0 0 2px ${COLORS.background.focus}40`
                }
              }
            }}
          />
        </Group>

        <Text
          size="sm"
          c={usStocksPercent + cryptoPercent + rdpuPercent === 100 ? COLORS.status.success : COLORS.status.warning}
          ta="center"
          fw={500}
          role="status"
          aria-live="polite"
        >
          Total: {usStocksPercent + cryptoPercent + rdpuPercent}%
          {usStocksPercent + cryptoPercent + rdpuPercent === 100
            ? ' ✓ (Persentase sudah benar)'
            : ' ⚠️ (Total harus 100%)'}
        </Text>

        <Divider my="md" />

        <Text size="xs" c={COLORS.text.secondary}>
          Persentase ini akan menentukan bagaimana dana investasi Anda dibagi ke dalam kategori Saham US,
          Cryptocurrency, dan Reksa Dana Pasar Uang.
        </Text>
      </Stack>
    </Drawer>
  );
});

export default InvestmentSettingsDrawer;
