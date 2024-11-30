require('dotenv').config();
const request = require('supertest');

const baseURL = process.env.API_URL;
const token = process.env.BEARER_TOKEN;

describe('CRUD Operations for Users', () => {
  let userId;

  // Create a user
  it('should create a new user', async () => {
    const response = await request(baseURL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test User',
        email: `testuser${Date.now()}@example.com`, // Unique email
        gender: 'male',
        status: 'active',
      });

    expect(response.status).toBe(201); // Created status
    expect(response.body).toHaveProperty('id'); // User ID should exist
    userId = response.body.id; // Store user ID for later tests
  });

  // Retrieve a user
  it('should retrieve the created user', async () => {
    const response = await request(baseURL)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200); // Success status
    expect(response.body).toHaveProperty('id', userId); // Verify user ID
  });

  // Update a user
  it('should update the user', async () => {
    const response = await request(baseURL)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Test User',
      });

    expect(response.status).toBe(200); // Success status
    expect(response.body).toHaveProperty('name', 'Updated Test User'); // Verify update
  });

  // Delete a user
  it('should delete the user', async () => {
    const response = await request(baseURL)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204); // No Content status
  });

  //Invalid or Missing Data
  it('should return 422 for missing required fields', async () => {
    const response = await request(baseURL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: `invaliduser${Date.now()}@example.com`, // Missing 'name', 'gender', and 'status'
      });
  
    expect(response.status).toBe(422); // Unprocessable Entity
  
    // Validate that all the required fields are mentioned in the error response
    const errors = response.body;
  
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'name', message: expect.stringContaining("can't be blank") }),
        expect.objectContaining({ field: 'gender', message: expect.stringContaining("can't be blank") }),
        expect.objectContaining({ field: 'status', message: expect.stringContaining("can't be blank") }),
      ])
    );
  });
  
//Invalid email format
  it('should return 422 for invalid email format', async () => {
    const response = await request(baseURL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Invalid Email User',
        email: 'invalid-email',
        gender: 'male',
        status: 'active',
      });
  
    expect(response.status).toBe(422); // Unprocessable Entity
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email', message: 'is invalid' }),
      ])
    );
  });
  
  // Edge Case: Retrieve deleted user
  it('should return 404 for deleted user', async () => {
    const response = await request(baseURL)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404); // Not Found status
  });

  //Duplicate Data
  it('should return 422 for duplicate email', async () => {
    const email = `duplicate${Date.now()}@example.com`;
    
    // First user creation
    await request(baseURL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'User One',
        email: email,
        gender: 'male',
        status: 'active',
      });
  
    // Second user creation with the same email
    const response = await request(baseURL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'User Two',
        email: email,
        gender: 'female',
        status: 'inactive',
      });
  
    expect(response.status).toBe(422); // Unprocessable Entity
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email', message: 'has already been taken' }),
      ])
    );
  });

  //User Doest Not Exist
  it('should return 404 for a non-existent user', async () => {
    const response = await request(baseURL)
      .get('/users/9999999') // ID unlikely to exist
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toBe(404); // Not Found
    expect(response.body).toHaveProperty('message', 'Resource not found');
  });
  
  //Unauthorized Request
  it('should return 401 for unauthorized access', async () => {
    const response = await request(baseURL)
      .get('/users') // Attempt to fetch users
      .set('Authorization', `Bearer invalid_token`); // Invalid token
  
    expect(response.status).toBe(401); // Unauthorized status
    expect(response.body).toHaveProperty('message', 'Invalid token'); // Match actual response message
  });
  
  //Updating Non-Existent User
  it('should return 404 when trying to update a non-existent user', async () => {
    const response = await request(baseURL)
      .put('/users/9999999') // ID unlikely to exist
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Non Existent User',
      });
  
    expect(response.status).toBe(404); // Not Found
    expect(response.body).toHaveProperty('message', 'Resource not found');
  });

// Invalid Data
it('should return 422 for invalid update data', async () => {
    // Create a user first to ensure it exists
    const createResponse = await request(baseURL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Valid User',
        email: `validuser${Date.now()}@example.com`,
        gender: 'male',
        status: 'active',
      });
  
    const userId = createResponse.body.id; // Capture the user ID
  
    // Attempt to update the user with invalid data
    const response = await request(baseURL)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'invalid-email', // Invalid email format
      });
  
    // Validate response
    expect(response.status).toBe(422); // Unprocessable Entity
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email', message: 'is invalid' }),
      ])
    );
  });
 
  //Deleting Non-Existent User
  it('should return 404 when trying to delete a non-existent user', async () => {
    const response = await request(baseURL)
      .delete('/users/9999999') // ID unlikely to exist
      .set('Authorization', `Bearer ${token}`);
  
    expect(response.status).toBe(404); // Not Found
    expect(response.body).toHaveProperty('message', 'Resource not found');
  });

  // Unauthorized Deletion
  it('should return 401 for unauthorized deletion attempt', async () => {
    const response = await request(baseURL)
      .delete(`/users/${userId}`) // Assuming `userId` is valid
      .set('Authorization', `Bearer invalid_token`); // Use an invalid token
  
    expect(response.status).toBe(401); // Unauthorized status
    expect(response.body).toHaveProperty('message', 'Invalid token'); // Match actual API response
  });
  
});
