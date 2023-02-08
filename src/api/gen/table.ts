import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/gen/table/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/gen/table',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/gen/table/' + id,
    method: 'get'
  })
}

export function delObj(id?: string) {
  return request({
    url: '/gen/table/' + id,
    method: 'delete'
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/gen/table',
    method: 'put',
    data: obj
  })
}

export const useSyncTableApi = (dsName: string, tableName: string) => {
  return request.get('/gen/table/sync/' + dsName + "/" + tableName)
}


export const useTableApi = (dsName: string, tableName: string) => {
  return request.get('/gen/table/' + dsName + "/" + tableName)
}


export const useTableFieldSubmitApi = (dsName: string, tableName: string, fieldList: any) => {
  return request.put('/gen/table/field/' + dsName + '/' + tableName, fieldList)
}

export const useGeneratorPreviewApi = (tableId: any) => {
  return request({
    url: '/gen/generator/preview',
    method: 'get',
    params: { tableId: tableId }
  })
}
