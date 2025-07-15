import React from 'react';
import { Card, Text, Stack, Checkbox, Space } from '@mantine/core';
import { COLORS } from '../constants/Colors';
import { ChecklistItem } from '../types';
import { formatCurrency } from '../utils/formatters';

// --- Enhanced Checklist Items with Accessibility ---
const needsChecklistItems: ChecklistItem[] = [
  { id: 'kost', label: 'Kost / Cicilan Rumah', ariaLabel: 'Tandai pembayaran kost atau cicilan rumah' },
  { id: 'makan', label: 'Makan & Bahan Makanan', ariaLabel: 'Tandai pengeluaran makanan dan bahan makanan' },
  { id: 'transport', label: 'Transportasi', ariaLabel: 'Tandai pengeluaran transportasi' },
  { id: 'tagihan', label: 'Tagihan (Listrik, Air, Internet)', ariaLabel: 'Tandai pembayaran tagihan utilitas' },
  { id: 'pulsa', label: 'Pulsa / Paket Data', ariaLabel: 'Tandai pembayaran pulsa atau paket data' },
  { id: 'lain', label: 'Kebutuhan Pokok Lainnya', ariaLabel: 'Tandai pengeluaran kebutuhan pokok lainnya' },
];

import { useAllocations } from '../hooks/useAllocations';
import { useBudgetStore } from '../store/budgetStore';

const NeedsChecklist: React.FC = React.memo(() => {
  const { needsAmount } = useAllocations();
  const { checkedNeeds, toggleNeed } = useBudgetStore();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder role="region" aria-labelledby="needs-checklist-heading">
      <Text id="needs-checklist-heading" size="sm" c={COLORS.text.secondary} mb="md">
        Gunakan checklist ini untuk menandai pengeluaran kebutuhan pokok yang sudah dialokasikan/dibayar.
        Total budget kebutuhan pokok Anda: <Text component="span" fw={700} c={COLORS.needs}>{formatCurrency(needsAmount)}</Text>
      </Text>
      <Stack gap="xs" role="group" aria-labelledby="needs-checklist-heading">
        {needsChecklistItems.map((item: ChecklistItem) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={checkedNeeds.includes(item.id)}
            onChange={() => toggleNeed(item.id)}
            aria-label={item.ariaLabel}
            styles={{
              label: { color: COLORS.text.primary },
              input: { cursor: 'pointer' }
            }}
          />
        ))}
      </Stack>
      <Space h="md" />
      <Text size="xs" c={COLORS.text.secondary}>
        {checkedNeeds.length} dari {needsChecklistItems.length} item ditandai.
      </Text>
    </Card>
  );
});

export default NeedsChecklist;
