import React from 'react';
import { SimpleGrid, Card, Group, Text } from '@mantine/core';
import { IconCheck, IconGlassFull, IconPigMoney } from '@tabler/icons-react';
import { COLORS } from '../constants/Colors';
import { formatCurrency } from '../utils/formatters';
import { useAllocations } from '../hooks/useAllocations';
import { useBudgetStore } from '../store/budgetStore';

const AllocationCards: React.FC = () => {
  const { needsAmount, wantsAmount, investAmount } = useAllocations();
  const { needsPercent, wantsPercent, investPercent } = useBudgetStore();

  return (
    <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder role="region" aria-label={`Alokasi Kebutuhan Pokok: ${formatCurrency(needsAmount)}`}>
        <Group justify="space-between" align="center">
          <Text fw={500} c={COLORS.needs}>Kebutuhan Pokok</Text>
          <IconCheck size={20} color={COLORS.needs} />
        </Group>
        <Text size="xl" fw={700} c={COLORS.needs}>{formatCurrency(needsAmount)}</Text>
        <Text size="xs" c={COLORS.text.secondary}>({needsPercent}%)</Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder role="region" aria-label={`Alokasi Keinginan: ${formatCurrency(wantsAmount)}`}>
        <Group justify="space-between" align="center">
          <Text fw={500} c={COLORS.wants}>Keinginan</Text>
          <IconGlassFull size={20} color={COLORS.wants} />
        </Group>
        <Text size="xl" fw={700} c={COLORS.wants}>{formatCurrency(wantsAmount)}</Text>
        <Text size="xs" c={COLORS.text.secondary}>({wantsPercent}%)</Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder role="region" aria-label={`Alokasi Investasi: ${formatCurrency(investAmount)}`}>
        <Group justify="space-between" align="center">
          <Text fw={500} c={COLORS.invest}>Investasi</Text>
          <IconPigMoney size={20} color={COLORS.invest} />
        </Group>
        <Text size="xl" fw={700} c={COLORS.invest}>{formatCurrency(investAmount)}</Text>
        <Text size="xs" c={COLORS.text.secondary}>({investPercent}%)</Text>
      </Card>
    </SimpleGrid>
  );
};

export default React.memo(AllocationCards);
