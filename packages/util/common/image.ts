/**
 * 检查图片地址是否可访问
 * @param url 图片地址
 * @returns 
 */
export const checkImageAccess = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}