import React from 'react';
import { Paper, Progress, Tooltip, rem } from '@mantine/core';
import { useAllocations } from '../hooks/useAllocations';
import { useBudgetStore } from '../store/budgetStore';
import { COLORS } from '../constants/Colors';
import { formatCurrency } from '../utils/formatters';
import { ProgressSectionData } from '../types';

const AllocationProgress: React.FC = () => {
  const { needsAmount, wantsAmount, investAmount } = useAllocations();
  const { needsPercent, wantsPercent, investPercent } = useBudgetStore();

  const progressSections: ProgressSectionData[] = [
    {
      value: needsPercent,
      color: COLORS.needs,
      label: `Needs (${needsPercent}%)`,
      tooltip: `Needs: ${formatCurrency(needsAmount)}`,
      ariaLabel: `Kebutuhan pokok: ${formatCurrency(needsAmount)}, ${needsPercent} persen dari total`
    },
    {
      value: wantsPercent,
      color: COLORS.wants,
      label: `Wants (${wantsPercent}%)`,
      tooltip: `Wants: ${formatCurrency(wantsAmount)}`,
      ariaLabel: `Keinginan: ${formatCurrency(wantsAmount)}, ${wantsPercent} persen dari total`
    },
    {
      value: investPercent,
      color: COLORS.invest,
      label: `Invest (${investPercent}%)`,
      tooltip: `Invest: ${formatCurrency(investAmount)}`,
      ariaLabel: `Investasi: ${formatCurrency(investAmount)}, ${investPercent} persen dari total`
    },
  ];

  return (
    <Paper shadow="sm" p="md" radius="md">
      <Tooltip.Group openDelay={300} closeDelay={100}>
        <Progress.Root size="xl" radius="sm" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label="Alokasi budget">
          {progressSections.map((section, index) => (
            <Progress.Section
              key={index}
              value={section.value}
              color={section.color}
              aria-label={section.ariaLabel}
              role="presentation"
            >
              <Tooltip label={section.tooltip} position="top" withArrow>
                <Progress.Label
                  style={{
                    overflow: 'visible',
                    fontSize: rem(12),
                    fontWeight: 500,
                    color: '#FFFFFF'
                  }}
                >
                  {section.label}
                </Progress.Label>
              </Tooltip>
            </Progress.Section>
          ))}
        </Progress.Root>
      </Tooltip.Group>
    </Paper>
  );
};

export default React.memo(AllocationProgress);
