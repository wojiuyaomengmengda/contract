import { useBiGridStore } from '../store/grid' 

export default function useGridOrgSearchPanel () {
    const biGridStore = useBiGridStore();
    
    const enableCanGridOrgSearchPanelHide = () => {
        biGridStore.setIsCanGridOrgSearchPanelHide(false)
    }
    const disableCanGridOrgSearchPanelHide = () => {
        biGridStore.setIsCanGridOrgSearchPanelHide(true)
    }

    return {
        enableCanGridOrgSearchPanelHide,
        disableCanGridOrgSearchPanelHide
    }
}