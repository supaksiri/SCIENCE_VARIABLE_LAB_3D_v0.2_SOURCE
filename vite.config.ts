import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SCIENCE_VARIABLE_LAB_3D_v0.2_SOURCE/',
  test: { environment: 'node' },
});
