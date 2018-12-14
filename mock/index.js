import Mock from 'mockjs'
import data from './data.json'
Mock.mock('htt', {
  code: 0,
  codeMessage: '成功',
  data: data
})