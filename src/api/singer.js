import { ajax,jsonp } from 'common/js/jsonps'
import {commonParams, singerOptions } from './config'


export function getSingerList()
{
  const url =  'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const datas = Object.assign({}, commonParams, {
    channel:'singer',
    page:'list',
    key: 'all_all_all',
    pagesize:100,
    pagenum:1,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  
  return jsonp(url,datas,singerOptions);
}