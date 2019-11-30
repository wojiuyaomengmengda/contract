<template>
    <div>
        <!-- 遮罩层 -->
        <div class="details" id="details" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="拼命加载中">
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
                    <!-- <el-button>签署合同</el-button> -->
                    <el-button @click="cal">确定</el-button>
                </div>
            </div>
           
            <div 
                class="pdf-container" 
                v-if="showPdf"
                @dragenter="handleDragEnter"
                @dragover="handleDragOver($event)"
                @drop="allowDrop($event)"
            >
                <canvas 
                    v-for="page in pages" 
                    :id="'canvas' + page" 
                    :key="page" 
                    class="canvas"
                ></canvas>
            </div>
            <div class="signRight border" draggable="true" @dragstart="handleDragStart($event)" id="signRight">
                <div class="title">将签署区方框拖动至合同页面上，签约时将在指定区域盖章/签字</div>
            </div>
            <div class="partyA border" draggable="true" id="partyA" @dragstart="handleDragStart($event)" data-h="1">甲方签署区</div>
            <div class="partyB border" draggable="true" id="partyB" @dragstart="handleDragStart($event)" data-h="1">乙方签署区</div>
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
            loading: true,
            partyA: {
                page: '',
                x: '',
                y: ''
            },
            partyB: {
                page: '',
                x: '',
                y: ''
            }
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
                // canvas.style.width = viewport.width + 'px' // 画布的框架大小
                // canvas.style.height = viewport.height + 'px'
                canvas.style.width = '210mm' // A4纸大小
                canvas.style.height = '297mm'
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
        },
        // 拖动进入
        handleDragEnter() {

        },
        // 拖动结束
        handleDragOver(ev) {
            ev.preventDefault();
        },
        // 拖拽放入
        allowDrop(ev) {
            console.log(ev);
            ev.preventDefault();
            var data=ev.dataTransfer.getData("Text");
            var left = ev.dataTransfer.getData("Left");
            var top  = ev.dataTransfer.getData("Top");
            var X1 = ev.dataTransfer.getData("X1");
            var Y1 = ev.dataTransfer.getData("Y1");
        
        
            var domObj = document.getElementById(data);
            // console.log(domObj.getAttribute("data-h"));
            if (domObj.getAttribute("data-h") == '1') {
                domObj.setAttribute("data-h","0");
                //获取滚动条得高度
                let ht = document.getElementById('details').scrollTop;
                top = Number(top) + Number(ht);
            }
            // var h = domObj.clientHeight;
            // var w = domObj.clientWidth;
            domObj.style.position = "absolute";

        
            var e = event || window.event; 
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            
            domObj.style.top = top -(Y1 - mouseY) + "px";
            domObj.style.left = left - (X1 - mouseX) + "px";

            let page = ev.target.getAttribute("id").split("canvas")[1];
            let evX = ev.target.offsetLeft;
            let evY = ev.target.offsetTop;
            if(data == 'partyA') {
                this.partyA.page = page;
                this.partyA.x = document.getElementById('partyA').offsetLeft - evX;
                this.partyA.y = document.getElementById('partyA').offsetTop - evY;
            } else {
                this.partyB.page = page;
                this.partyB.x = document.getElementById('partyB').offsetLeft - evX;
                this.partyB.y = document.getElementById('partyB').offsetTop - evY;
            }
            console.log(this.partyA, this.partyB);
            //获取页数 ev.target.getAttribute("id").split("canvas")[1]
        },
        // 开始拖拽
        handleDragStart(ev) {
            console.log('开始拖动拉');
            ev.dataTransfer.setData("text", ev.target.id);
            //获取div初始位置距离窗口的偏移量

            ev.dataTransfer.setData("Left",ev.target.offsetLeft);
            //获取滚动条得高度
            // let h = document.getElementById('details').scrollTop;
            ev.dataTransfer.setData("Top",ev.target.offsetTop);
        
            //获取开始拖动时，鼠标的初始位置
            var e = event || window.event; 
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            ev.dataTransfer.setData("X1",mouseX);
            ev.dataTransfer.setData("Y1",mouseY);
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
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .canvas {
        margin: 0 auto;
    }
    .signRight {
        position: fixed;
        top: 177px;
        right: 76px;
        width: 400px;
        height: 400px;
        z-index: 111;
        
    }
    .title {
        padding: 15px 45px;
    }
    .border {
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        color: #303133;
    }
    .PartyBox {
        display: flex;
    }
    .partyA {
        width: 159px;
        height: 159px;
        text-align: center;
        line-height: 159px;
        // margin-left: 40px;
        // margin-top: 40px;
        position: fixed;
        top: 260px;
        right: 256px;
        z-index: 222;
    }
    .partyB {
        width: 95px;
        height: 95px;
        text-align: center;
        line-height: 95px;
        position: fixed;
        top: 260px;
        right: 100px;
        z-index: 223;
    }
</style>