import { ajax,jsonp } from 'common/js/jsonps'
import {commonParams, options} from './config'


export function getRecommend(){
  
  const datas = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  var ajaxData = {
      method: 'GET',
      url: 'http://hmproperty.cn/develop/api/api.php?action=recommend'
  }

  return ajax(ajaxData)
}


export function getDiscList()
{
  const url =  'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const datas = Object.assign({}, commonParams, {
    callback: 'recom8917448201767992',
    jsonpCallback: 'jsonpCallback',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    data : '%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%7D'
  })
  
  return jsonp(url,datas,options);
}


