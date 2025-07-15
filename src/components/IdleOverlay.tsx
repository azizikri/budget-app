import React from 'react';
import { Overlay } from '@mantine/core';

interface IdleOverlayProps {
  isIdle: boolean;
}

const IdleOverlay: React.FC<IdleOverlayProps> = React.memo(({ isIdle }) => {
  if (!isIdle) return null;

  return (
    <Overlay
      blur={5}
      opacity={1}
      color="#fff"
      zIndex={999}
    />
  );
});

export default IdleOverlay;
