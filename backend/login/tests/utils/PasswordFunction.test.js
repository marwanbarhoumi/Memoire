const { hPassword, comparePwd } = require('../../utils/PasswordFunction');
const bcrypt = require('bcryptjs');

jest.mock('bcryptjs');

describe('PasswordFunction Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should hash the password', async () => {
    bcrypt.hash.mockResolvedValue('hashed_password');

    const result = await hPassword('myPassword');

    expect(bcrypt.hash).toHaveBeenCalledWith('myPassword', 10);
    expect(result).toBe('hashed_password');
  });

  it('should compare passwords and return true if match', async () => {
    bcrypt.compare.mockResolvedValue(true);

    const result = await comparePwd('plain', 'hashed');

    expect(bcrypt.compare).toHaveBeenCalledWith('plain', 'hashed');
    expect(result).toBe(true);
  });

  it('should return false if passwords do not match', async () => {
    bcrypt.compare.mockResolvedValue(false);

    const result = await comparePwd('plain', 'wronghash');

    expect(result).toBe(false);
  });
});
