require('dotenv').config();

const request = require('supertest');
const baseURL = process.env.API_URL;
const token = process.env.BEARER_TOKEN;

if(!baseURL || !token){
    throw new Error('Missing API_URL or BEARER_TOKEN in environment variables');
}

describe('Sample Jest Test', () => {
  it('should fetch users from GoRest API', async () => {
    const response = await request(baseURL)
    .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200); // Check for success response
    expect(response.body).toBeInstanceOf(Array); // Expect an array of users
  });
});
