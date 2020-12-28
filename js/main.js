
var app = new Vue({
  el:"#player",
  data:{
    query:'绅士',
    musicList: [],
    musicUrl:'',
    musicCover: "",
    hotComments: [],
    isPlaying:false
  },
    mounted:function(){
        this.searchMusic()
    },
  methods:{
    searchMusic:function() {
      axios.get('https://autumnfish.cn/search?keywords=' + this.query)
          .then((respone) => {
            console.log(respone)
              this.musicList = respone.data.result.songs
              console.log('this.musicList',respone)
          },function (err) {}
          )
    },
    playMusic:function (musicId) {
        axios.get('https://autumnfish.cn/song/url?id=' + musicId)
            .then((respone) => {
               this.musicUrl = respone.data.data[0].url
            },function (err) {})

          axios.get('https://autumnfish.cn/song/detail?ids=' + musicId)
              .then((response) => {
                  this.musicCover = response.data.songs[0].al.picUrl;
              }, function(err) {})
          axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId)
              .then((respone) => {
                  this.hotComments = respone.data.hotComments
              },function (err) {})
      },

    pause:function () {
        console.log('暂停')
        this.isPlaying = false
    },
      play: function() {
      this.isPlaying = true;
    },
  }
})

