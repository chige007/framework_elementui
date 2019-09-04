<template>
    <div style="background-color: #444;">
        <div
            :id="videoId"
            :style="{height: height + 'px', width: width + 'px', margin: '0px auto'}"
        ></div>
    </div>
    
</template>

<script>
export default {
    name: "myCkplayer",
    props: {
        // 视频路径
        url: {
            type: String,
            default: ""
        },
        // 播放器宽度
        width: {
            type: Number,
            default: 800
        },
        // 播放器高度
        height: {
            type: Number,
            default: 450
        }
    },
    computed: {},
    data() {
        return {
            // 视频DOM节点id
            videoId: "videoId_" + this.$vnode.tag,
            // ckplayer实例化对象
            player: null
        };
    },
    components: {},
    watch: {
        url(val) {
            if (val) {
                // 路径有值
                this.init(val);
            }
        }
    },
    methods: {
        init(url) {
            if (!url) {
                // 没有视频路径
                return;
            }
            let videoObject = {
                container: "#" + this.videoId, //容器的ID或classNamenpmnp
                variable: "player", //播放函数名称
                // loaded: 'loadedHandler', //当播放器加载后执行的函数
                // cktrack: './ckplayer/material/en.srt', //字幕文件
                // poster: './ckplayer/material/poster.jpg', //封面图片
                // preview: { //预览图片
                // 	file: ['./ckplayer/material/mydream_en1800_1010_01.png', './ckplayer/material/mydream_en1800_1010_02.png'],
                // 	scale: 2
                // },
                // loop: true, //播放结束是否循环播放
                autoplay: true,
                html5m3u8: true,
                video: this._ROOT_PATH_2 + this.url //视频地址
            };
            // 定义一个对象
            this.player = new ckplayer(videoObject);
        },
        /**
         * 暂停视频
         *
         * @auther: "陈宇驰"
         * @date: 2019-09-04 09:59:16
         */
        pause() {
            console.log("pause");
            this.player.videoPause();
        },
        /**
         * 播放视频
         *
         * @auther: "陈宇驰"
         * @date: 2019-09-04 09:59:16
         */
        play() {
            console.log("play");
            this.player.videoPlay();
        }
    },
    mounted() {
        this.init(this.url);
    }
};
</script>

<style lang="less" scoped>
</style>