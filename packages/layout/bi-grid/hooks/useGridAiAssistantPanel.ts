import { useBiGridStore } from '../store/grid' 

export default function useGridAiAssistantPanel () {
    const biGridStore = useBiGridStore();
    
    const enableCanGridAiAssistantPanelHide = () => {
        biGridStore.setIsCanGridAiAssistantPanelHide(false)
    }
    const disableCanGridAiAssistantPanelHide = () => {
        biGridStore.setIsCanGridAiAssistantPanelHide(true)
    }
      
    return {
        enableCanGridAiAssistantPanelHide,
        disableCanGridAiAssistantPanelHide
    }
}