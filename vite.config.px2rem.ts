import { defineConfig } from 'vite'
import postcssPluginPx2rem from 'postcss-plugin-px2rem';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import config from "./vite.config.base"

const px2remOptions = {
  rootValue: 100,  // 换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
  unitPrecision: 5, // 允许REM单位增长到的十进制数字，其实就是精度控制
  mediaQuery: false, // （布尔值）允许在媒体查询中转换px
  minPixelValue: 0  // 设置要替换的最小像素值(3px会被转rem)。 默认 0
}

if (config.build) {
  config.build.outDir = 'lib-px2rem'
}

config.css = {
  postcss: {
    plugins: [
        // 加入rem配置项
        postcssPluginPx2rem(px2remOptions),
        tailwindcss,
        autoprefixer
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return config
})
