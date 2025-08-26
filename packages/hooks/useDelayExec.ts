/**
 * 延时执行函数
 * @param actionFn { (...args: any[]) => any } 延时执行函数
 * @param delay { number } 延时执行时间（单位毫秒）
 */
export default function useDelayExec (actionFn: (...args: any[]) => any, delay = 300) {
    let timeoutId: number | null = null;

    const start = () => {
        if (timeoutId === null) {
            timeoutId = window.setTimeout(() => {
                actionFn();
                timeoutId = null;
            }, delay)
        }
    }

    const stop = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    return {
        start,
        stop
    }
}