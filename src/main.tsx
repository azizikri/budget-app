// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import App from './App';
import '@mantine/core/styles.css'; // Import Mantine styles
import { COLORS } from './constants/Colors';

// Create a custom theme using the accessible color palette
const theme = createTheme({
  colors: {
    // It's best practice to provide a full 10-shade palette for Mantine,
    // but for a targeted fix, we can use the defined colors.
    // We'll map your main colors to a name Mantine can use.
    needs: [COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs, COLORS.needs],
    wants: [COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants, COLORS.wants],
    invest: [COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest, COLORS.invest],
  },
  primaryColor: 'wants', // Using 'wants' blue as the primary interactive color
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '2rem' },
    },
  },
  components: {
    Text: {
      styles: () => ({
        root: {
          color: COLORS.text.primary,
        },
      }),
    },
    Button: {
      styles: () => ({
        root: {
          color: COLORS.text.onColor, // Ensure text on buttons is white
        },
      }),
    },
    Paper: {
      styles: () => ({
        root: {
          backgroundColor: COLORS.background.card, // Use the defined card background
        },
      }),
    },
  },
});


// Pastikan root element ada di index.html
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
