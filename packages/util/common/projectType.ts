/**
 * 判断当前是否为市场化项目
 */
export function isMarketization(): boolean {
    // 1. 从window全局配置获取（最高优先级）
    if (typeof window !== 'undefined' && 
        window.__CUS_PROJECT_CONFIG__?.projectNameEnv === 'marketization') {
      return true;
    }
    
    // 2. 从环境变量获取（向后兼容）
    if (typeof process !== 'undefined' && 
        process.env && 
        process.env.PROJECT_NAME === 'marketization') {
      return true;
    }
    
    return false;
  }
  
  /**
   * 判断当前是否为sunley项目
   */
  export function isSunley(): boolean {
    // 类似逻辑
    if (typeof window !== 'undefined' && 
        window.__CUS_PROJECT_CONFIG__?.projectNameEnv === 'sunley') {
      return true;
    }
    
    if (typeof process !== 'undefined' && 
        process.env && 
        process.env.PROJECT_NAME === 'sunley') {
      return true;
    }
    
    return false;
  }
  
  /**
   * 获取当前项目类型
   */
  export function getProjectType(): string {
    if (typeof window !== 'undefined' && window.__CUS_PROJECT_CONFIG__?.projectNameEnv) {
      return window.__CUS_PROJECT_CONFIG__.projectNameEnv;
    }
    
    if (typeof process !== 'undefined' && process.env && process.env.PROJECT_NAME) {
      return process.env.PROJECT_NAME;
    }
    
    return '';
  }