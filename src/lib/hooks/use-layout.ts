import { LAYOUT_OPTIONS } from '@/lib/constants';

// 2. useLayout hook to check which layout is available
export const useLayout = () => {
  const layout = LAYOUT_OPTIONS.MINIMAL;
  return {
    layout,
  };
};
