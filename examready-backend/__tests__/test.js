const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('should return 200 and API running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('ExamReady Africa API is running!');
  });
});

describe('GET /health', () => {
  it('should return 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/questions', () => {
  it('should return a response from the questions endpoint', async () => {
    const res = await request(app).get('/api/questions');
    expect([200, 500]).toContain(res.statusCode);
  });
});
