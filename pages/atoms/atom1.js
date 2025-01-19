import { atom } from 'recoil';
const { persistAtom } = recoilPersist({key: 'atom1'})
export const atom1 = atom({
  key: 'atom1', 
  default: 0, 
  effects_UNSTABLE:[persistAtom]
});
