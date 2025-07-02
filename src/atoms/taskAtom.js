import {atom} from 'recoil';
export const taskAtom=atom({
    key:"taskAtom",
    default:{
        task:"",
        date:"",
        time:"",
    }
})