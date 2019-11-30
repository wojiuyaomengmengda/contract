<template>
    <div>
        <!-- 遮罩层 -->
        <div class="details" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="拼命加载中">
            <div class="header">
                <div>
                    <span>
                        班组长: 刘吉文
                    </span>
                    <span>
                        合同编号: dzjkfh2354324642
                    </span>
                    <span>
                    截止日期: 2016-9-21 08:05:08
                    </span>
                </div>
                <div>
                    <el-button>签署合同</el-button>
                    <el-button @click="cal">取消合同</el-button>
                </div>
            </div>
            <div class="pdf-container" v-if="showPdf">
                <canvas v-for="page in pages" :id="'canvas' + page" :key="page" class="canvas"></canvas>
            </div>
        </div>

    </div>
</template>

<script>
// import mdContract from './contract.md.vue'
// import cPdf from "./CPdf";
import PDF from 'pdfjs-dist'
PDF.disableWorker = true
export default {
    // components: { cPdf },
    components: {
        // mdContract
    },    
    data() {
        return {
            contractVisable: false,
            width: 100,
            pdfDoc: null,
            pages: 0,
            showPdf: false,
            loading: true
        }
    },
    mounted() {
        this.initThePDFJSLIB();
        this.showPdf = true;
        let url = 'http://image.cache.timepack.cn/nodejs.pdf';
        this.loadFile(url);
    },
    methods: {
        /*
        * 加载PDF文件
        * url：后台提供的pdf地址或者项目中public/pdf文件（test.pdf）
        * 在需要的位置调用 this.loadFile(url)
        * */
        loadFile (url) {
            PDF.getDocument(url).then((pdf) => {
                this.pdfDoc = pdf
                this.pages = this.pdfDoc.numPages
                this.$nextTick(() => {
                    this.renderPage(1)
                })
            })
        },
        /*
        * 渲染PDF文件
        * */
        renderPage (num) {
            this.pdfDoc.getPage(num).then((page) => {
                let canvas = document.getElementById('canvas' + num)
                let ctx = canvas.getContext('2d')
                let dpr = window.devicePixelRatio || 1 // 设备像素比
                let bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1 // 浏览器在渲染canvas之前会用几个像素来来存储画布信息,类似img
                let ratio = dpr / bsr
                let viewport = page.getViewport(1.5)
                canvas.width = viewport.width * ratio // 画布大小,默认值是width:300px,height:150px
                canvas.height = viewport.height * ratio
                canvas.style.width = viewport.width + 'px' // 画布的框架大小
                canvas.style.height = viewport.height + 'px'
                let renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                }
                page.render(renderContext)
                if (this.pages > num) {
                    this.renderPage(num + 1)
                } else {
                    this.loading = false;
                    // this.closeServerLoadingHandle()
                }
            })
        },
        // 初始化pdfjs
        initThePDFJSLIB: function () {
            PDF.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
        },
        // 取消签署合同
        cal () {
            this.$emit('cancel')
        }
    }
}
</script>
<style lang="scss" scope>
    .details {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        background: rgba(12,12,12,0.6);
        // opacity: 0.7;
        z-index: 999;
        overflow: auto;
    }
    .header {
        // position: fixed;
        position: sticky;
        top: 0;
        height: 20px;
        background: #fff;
        width: 100%;
        height: 70px;
        line-height: 70px;
        justify-content: space-between;
        padding-left: 300px;
        padding-right: 200px;
        font-size: 20px;
        display: flex;
        border-bottom: 1px solid #ebeef5;
    }
    .pdf-container {
        // width: 80%;
        // height: 2000px;
        // background: #fff;
        // margin: 0 auto;
        padding-left: 300px;
    }
    .canvas {
        margin: 0 auto;
    }
</style>