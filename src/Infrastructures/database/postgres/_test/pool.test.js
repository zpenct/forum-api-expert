describe('pool.js', () => {
    const originalEnv = process.env;
  
    afterEach(() => {
      process.env = { ...originalEnv };
    });
  
    it('should initialize testConfig pool when NODE_ENV is test', () => {
      process.env.NODE_ENV = 'test';
      process.env.PGHOST_TEST = 'localhost';
      process.env.PGPORT_TEST = '5432';
      process.env.PGUSER_TEST = 'user';
      process.env.PGPASSWORD_TEST = 'password';
      process.env.PGDATABASE_TEST = 'testdb';
  
      const pool = require('../pool');
      expect(pool).toBeDefined();
    });
  
    it('should initialize default pool when NODE_ENV is not test', () => {
      process.env.NODE_ENV = 'production';
  
      jest.resetModules();
      const pool = require('../pool');
      expect(pool).toBeDefined();
    });
  });
  