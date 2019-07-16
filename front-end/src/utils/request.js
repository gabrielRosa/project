const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';

export const Request = {

  get(url, params = {}, async = true) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(GET, this._formartUrl(url, params), async);

      xhr.onload = () => {
        const { status, readyState, response, responseURL, _url = '' } = xhr;

        if (status >= 200 && status < 300 && readyState === 4) {
          try {
            resolve({ status, responseURL: responseURL || _url, response: JSON.parse(response) });

          } catch (ex) {
            reject({ status: 404, response });
          }
        } else {
          reject({ status: 404, response });
        }
      }

      xhr.onerror = () => {
        const { status, statusText } = xhr;

        reject({ status, statusText });
      }

      xhr.send();
    });
  },

  post(url, data, contentType = 'application/json; charset=utf-8', async = true) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(POST, url, async);
      xhr.setRequestHeader('Content-type', contentType);

      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          try {
            resolve(xhr.responseText);
          } catch (ex) {
            reject({ stack: ex });
          }
        }
      }
    });
  },

  delete(url, params = {}, async = true) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(DELETE, `${url}/${params}`, async);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          try {
            resolve(xhr.responseText);
          } catch (ex) {
            reject({ stack: ex });
          }
        }
      }
    });
  },

  _formartUrl(url, params) {
    return `${url}${this._formatParams(params)}`;
  },

  _formatParams(params) {
    const formatted = Object.keys(params).map(key => (key ? key + '=' + encodeURIComponent(params[key]) : '')).join('&');
    return formatted ? '?' + formatted : '';
  }

}