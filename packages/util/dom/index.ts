// 滚动到底部
export const scrollToBottom = (dom: HTMLElement) => {
    dom.scroll({
        top: dom.scrollHeight,
        behavior: "smooth"
    });
}