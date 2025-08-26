import { onBeforeMount, onMounted } from "vue";

// 注册document点击事件
export default function useDocumentClick (actionFn: (this: Document, ev: DocumentEventMap['click']) => any) {
    onMounted(() => {
        document.addEventListener('click', actionFn)
    })
    onBeforeMount(() => {
        document.removeEventListener('click', actionFn)
    })
}