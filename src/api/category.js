import request from '@/utils/request'

/**
 * 獲取分類列表
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}
