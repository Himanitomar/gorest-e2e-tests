const request = require('supertest');

const apiClient = (baseURL, token) => {
  const client = request(baseURL);

  const withAuth = (req) => req.set('Authorization', `Bearer ${token}`);

  return {
    get: (path) => withAuth(client.get(path)),
    post: (path, body) => withAuth(client.post(path).send(body)),
    put: (path, body) => withAuth(client.put(path).send(body)),
    delete: (path) => withAuth(client.delete(path)),
  };
};

module.exports = apiClient;
