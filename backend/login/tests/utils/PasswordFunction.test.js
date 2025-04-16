const { hashPassword, comparePassword } = require('../../utils/PasswordFunction');

describe('Password Functions', () => {
  let hashedPassword;

  beforeAll(async () => {
    // Hash un mot de passe pour les tests de comparaison
    hashedPassword = await hashPassword('testpassword');
  });

  describe('hashPassword', () => {
    it('should return a hashed password string', async () => {
      const result = await hashPassword('password123');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      expect(result).not.toBe('password123');
    });

    it('should return different hashes for the same password', async () => {
      const hash1 = await hashPassword('password123');
      const hash2 = await hashPassword('password123');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const result = await comparePassword('testpassword', hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const result = await comparePassword('wrongpassword', hashedPassword);
      expect(result).toBe(false);
    });

    it('should return false when comparing with empty string', async () => {
      const result = await comparePassword('', hashedPassword);
      expect(result).toBe(false);
    });
  });
});