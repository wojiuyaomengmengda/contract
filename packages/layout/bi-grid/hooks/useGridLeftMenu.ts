import { useBiGridStore } from '../store/grid' 

export default function useGridLeftMenu () {
    const biGridStore = useBiGridStore();
    
    const enableCanGridLeftMenuHide = () => {
        biGridStore.setIsCanGridLeftMenuHide(false)
    }
    const disableCanGridLeftMenuHide = () => {
        biGridStore.setIsCanGridLeftMenuHide(true)
    }

    return {
        enableCanGridLeftMenuHide,
        disableCanGridLeftMenuHide
    }
}