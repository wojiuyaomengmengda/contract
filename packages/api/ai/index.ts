import '@/util/request/interceptor'
import axios from 'axios'
import { HttpResultModel } from '@/util/request/types'

const primaryName = 'ai-assistant'

export interface RequsetParams {
    role?: 'user'
    content: string
}

interface ResponseData {
    [key: string] : any
}

// 向闪闪助手提问
export const askForShanShan = async (content: string) => {
    const defaultParams: Partial<RequsetParams> = {
        role: 'user'
    }
    const finalParams: RequsetParams = {
        ...defaultParams,
        content
    }
    return (
        await axios.post<HttpResultModel<ResponseData>>(`${primaryName}/bigModel/completions`, JSON.stringify(finalParams), {
            headers: { 'Content-Type': 'application/json' },
            timeout: 60 * 1000
        })
    ).data.data
}