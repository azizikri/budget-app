import React from 'react';
import { Paper, Group, Button, NumberInput, rem } from '@mantine/core';
import { IconCash, IconSettings } from '@tabler/icons-react';
import { COLORS } from '../constants/Colors';
import { useBudgetStore } from '../store/budgetStore';

interface IncomeInputProps {
  openDrawer: () => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ openDrawer }) => {
  const { income, setIncome } = useBudgetStore();
  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group justify="flex-end" mb="md">
        <Button
          variant="light"
          leftSection={<IconSettings size={16} />}
          onClick={openDrawer}
          aria-label="Atur persentase alokasi budget"
        >
          Atur Persentase Alokasi
        </Button>
      </Group>
      <NumberInput
        label="Masukkan Gaji Bulanan Anda (Rp)"
        description="Masukkan gaji bulanan Anda untuk menghitung alokasi budget"
        placeholder="Contoh: 10000000"
        value={income}
        onChange={(value) => setIncome(value)}
        min={0}
        step={100000}
        allowDecimal={false}
        thousandSeparator="."
        decimalSeparator=","
        hideControls
        leftSection={<IconCash size={rem(20)} />}
        aria-label="Input gaji bulanan dalam Rupiah"
        styles={{
          label: { fontSize: rem(16), marginBottom: rem(8), color: COLORS.text.primary },
          description: { color: COLORS.text.secondary },
          input: {
            '&:focus': {
              borderColor: COLORS.background.focus,
              boxShadow: `0 0 0 2px ${COLORS.background.focus}40`
            }
          }
        }}
      />
    </Paper>
  );
};

export default React.memo(IncomeInput);
