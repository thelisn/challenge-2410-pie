import httpClient from '@/tools/httpClient'

class HomeApi {
  getList(data: any): Promise<any> {
    return httpClient.post('/list', data);
  }

  postInsert(data: any): Promise<any> {
    return httpClient.post('/insert', data);
  }
}

export default new HomeApi();
