import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: typeof window !== 'undefined' && localStorage.getItem('theme')? localStorage.getItem('theme'): 'light', 
});
