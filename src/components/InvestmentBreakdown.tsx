import React from 'react';
import { Card, Stack, Group, Text, Button } from '@mantine/core';
import { IconBuildingStore, IconCurrencyBitcoin, IconBuildingBank, IconSettings } from '@tabler/icons-react';
import { COLORS } from '../constants/Colors';
import { formatCurrency } from '../utils/formatters';
import { useAllocations } from '../hooks/useAllocations';
import { useBudgetStore } from '../store/budgetStore';

interface InvestmentBreakdownProps {
  openInvestmentDrawer: () => void;
}

const InvestmentBreakdown: React.FC<InvestmentBreakdownProps> = ({
  openInvestmentDrawer
}) => {
  const { usStocksAmount, cryptoAmount, rdpuAmount } = useAllocations();
  const { usStocksPercent, cryptoPercent, rdpuPercent } = useBudgetStore();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder role="region" aria-label="Rincian Alokasi Investasi">
      <Group justify="flex-end" mb="md">
        <Button
          variant="dark"
          leftSection={<IconSettings size={16} />}
          onClick={openInvestmentDrawer}
          aria-label="Atur persentase alokasi investasi"
          size="xs"
        >
          Atur Persentase Investasi
        </Button>
      </Group>
      <Stack>
        <Group justify="space-between">
          <Group gap="xs">
            <IconBuildingStore size={18} color={COLORS.invest} />
            <Text size="sm" fw={500}>Saham US</Text>
          </Group>
          <Text size="sm">{formatCurrency(usStocksAmount)} ({usStocksPercent}%)</Text>
        </Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconCurrencyBitcoin size={18} color={COLORS.invest} />
            <Text size="sm" fw={500}>Cryptocurrency</Text>
          </Group>
          <Text size="sm">{formatCurrency(cryptoAmount)} ({cryptoPercent}%)</Text>
        </Group>
        <Group justify="space-between">
          <Group gap="xs">
            <IconBuildingBank size={18} color={COLORS.invest} />
            <Text size="sm" fw={500}>Reksa Dana Pasar Uang</Text>
          </Group>
          <Text size="sm">{formatCurrency(rdpuAmount)} ({rdpuPercent}%)</Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default React.memo(InvestmentBreakdown);
