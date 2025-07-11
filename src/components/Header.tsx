import { memo } from 'react';
import { Title } from '@mantine/core';
import { COLORS } from '../constants/Colors';

const Header: React.FC = () => {
  return (
    <header>
      <Title order={1} ta="center" c={COLORS.text.primary}>
        Kalkulator Budget Bulanan
      </Title>
    </header>
  );
};

export default memo(Header);
