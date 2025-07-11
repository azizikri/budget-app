import React from 'react';
import { Drawer, Stack, Text, Group, NumberInput, Divider } from '@mantine/core';
import { COLORS } from '../constants/Colors';

import { useBudgetStore } from '../store/budgetStore';
import { usePercentageHandlers } from '../hooks/usePercentageHandlers';

interface PercentageSettingsDrawerProps {
  opened: boolean;
  onClose: () => void;
}

const PercentageSettingsDrawer: React.FC<PercentageSettingsDrawerProps> = ({
  opened,
  onClose,
}) => {
  const { needsPercent, wantsPercent, investPercent } = useBudgetStore();
  const { handlePercentageChange } = usePercentageHandlers();
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Atur Persentase Alokasi Budget"
      position="right"
      size="md"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Stack gap="md">
        <Text size="sm">
          Sesuaikan persentase alokasi budget Anda. Total persentase harus 100%.
        </Text>

        <Group align="center">
          <Text size="sm" w={100} c={COLORS.needs}>Needs:</Text>
          <NumberInput
            value={needsPercent}
            onChange={(value) => handlePercentageChange('needs', Number(value))}
            min={0}
            max={100}
            step={5}
            w="100%"
            rightSection={<Text size="xs">%</Text>}
            aria-label="Persentase untuk kebutuhan pokok"
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
          <Text size="sm" w={100} c={COLORS.wants}>Wants:</Text>
          <NumberInput
            value={wantsPercent}
            onChange={(value) => handlePercentageChange('wants', Number(value))}
            min={0}
            max={100}
            step={5}
            w="100%"
            rightSection={<Text size="xs">%</Text>}
            aria-label="Persentase untuk keinginan"
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
          <Text size="sm" w={100} c={COLORS.invest}>Invest:</Text>
          <NumberInput
            value={investPercent}
            onChange={(value) => handlePercentageChange('invest', Number(value))}
            min={0}
            max={100}
            step={5}
            w="100%"
            rightSection={<Text size="xs">%</Text>}
            aria-label="Persentase untuk investasi"
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
          c={needsPercent + wantsPercent + investPercent === 100 ? COLORS.status.success : COLORS.status.warning}
          ta="center"
          fw={500}
          role="status"
          aria-live="polite"
        >
          Total: {needsPercent + wantsPercent + investPercent}%
          {needsPercent + wantsPercent + investPercent === 100
            ? ' ✓ (Persentase sudah benar)'
            : ' ⚠️ (Total harus 100%)'}
        </Text>

        <Divider my="md" />

        <Text size="xs" c={COLORS.text.secondary}>
          Persentase ini akan menentukan bagaimana gaji Anda dibagi ke dalam kategori kebutuhan pokok (needs),
          keinginan (wants), dan investasi (invest).
        </Text>
      </Stack>
    </Drawer>
  );
};

export default PercentageSettingsDrawer;
