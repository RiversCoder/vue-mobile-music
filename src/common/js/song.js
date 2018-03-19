export default class Song{
  constructor({id,mid,singer,name,album,duration,image,url}){
      this.id = id;
      this.mid = mid;
      this.singer = singer;
      this.name = name;
      this.album = album;
      this.duration = duration;
      this.image = image;
      this.url = url;
  }
}

export function createSong(musicData){
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name:  musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: 'https://y.gtimg.cn/music/photo_new/T002R500x500M000'+musicData.albummid+'.jpg?max_age=2592000',
    url:'http://dl.stream.qqmusic.qq.com/C400'+musicData.songmid+'.m4a?vkey=A8D4384CEC7C8EEF6CCA9AAEE9F25662A9AF079EADF23CDFFB05EF3967D72047DDE57FB6C49D7C2FC286D3BACA3BE07523DF9B7049D6BA63&guid=5649231837&uin=0&fromtag=664'
  })
}

function filterSinger(singer){
  let format = [];
  if(!singer){
    return ''
  }

  singer.forEach((item)=>{
    format.push(item.name)
  })

  return format.join('/')
}