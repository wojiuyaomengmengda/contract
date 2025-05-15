import { ref, onMounted, onUnmounted } from 'vue';

// 类型
type OptionsType = {
    // 重连时间 2秒一次
    reconnectInterval?: number;
    // 心跳时间默认5秒
    heartbeatInterval?: number;
    // 尝试重连次数
    tryReconnectMax?: number;
    onmessageCb?: (data: string) => void;
};

// 默认配置
const defaultOptions = {
    onmessageCb: (val: string) => {},
    reconnectInterval: 2000,
    heartbeatInterval: 5000,
    tryReconnectMax: 10,
};

export default function useWebSocket(url: string, options: OptionsType = {}) {
    let reconnectTimerId: number | undefined;
    let tryReconnectCount = 0;
    // 参数
    options = {
        ...defaultOptions,
        ...options,
    };
    const websocket = ref<WebSocket | null>(null);
    const isConnected = ref(false);
    const isReconnecting = ref(false);
    let heartbeatTimer: number | undefined;

    // 重连
    const reconnect = () => {
        if (tryReconnectCount >= (options.tryReconnectMax as number)) {
            clearTimeout(reconnectTimerId);
            console.log('重连次数上限');
            return;
        }
        tryReconnectCount += 1;
        isReconnecting.value = true;
        console.log('Reconnecting WebSocket...');
        // eslint-disable-next-line no-use-before-define
        reconnectTimerId = window.setTimeout(connect, options.reconnectInterval);
    };

    const stopHeartbeat = () => {
        clearInterval(heartbeatTimer);
        heartbeatTimer = undefined;
    };

    const startHeartbeat = () => {
        if (options.heartbeatInterval) {
            heartbeatTimer = window.setInterval(() => {
                if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
                    websocket.value.send('heartbeat');
                } else {
                    stopHeartbeat();
                    reconnect();
                }
            }, options.heartbeatInterval);
        }
    };

    const send = (data: string) => {
        if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
            websocket.value.send(data);
        } else {
            console.error('WebSocket is not open. Unable to send data.');
        }
    };

    const connect = () => {
        websocket.value = new WebSocket(url);

        // 打开连接
        websocket.value.onopen = () => {
            isConnected.value = true;
            isReconnecting.value = false;
            // 重置重连次数
            tryReconnectCount = 0;
            console.log('WebSocket connected');
            startHeartbeat();
        };

        // 关闭连接
        websocket.value.onclose = () => {
            isConnected.value = false;
            stopHeartbeat();
            console.log('WebSocket disconnected');
            if (!isReconnecting.value) {
                reconnect();
            }
        };

        // 连接错误
        websocket.value.onerror = (error) => {
            isConnected.value = false;
            stopHeartbeat();
            console.error('WebSocket error:', error);
            reconnect();
        };

        // 接受到短信
        websocket.value.onmessage = (event) => {
            // 处理数据
            if (options.onmessageCb) {
                options.onmessageCb(event.data);
            }
            // 在这里处理收到的消息
        };
    };

    onMounted(() => {
        connect();
    });

    onUnmounted(() => {
        // 卸载拒绝重连
        isReconnecting.value = true;
        if (websocket.value) {
            websocket.value.close();
        }
    });

    return {
        websocket,
        isConnected,
        isReconnecting,
        send,
    };
}
