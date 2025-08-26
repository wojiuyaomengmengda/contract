// 对话来源
export enum FromType {
    AI = 'AI',  // AI
    User = 'User'   // 用户
}

// 聊天项
export interface ChatItem {
    uuid: string
    fromType: FromType
    text: string    // 文本
    name?: string   // 名称
}

export interface ListItemProp {
    position?: 'left' | 'right'  // 文本位置
    showLoading?: boolean
    text?: string
    record?: ChatItem
}