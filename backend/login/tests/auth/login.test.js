const { login } = require('../../controllers/authController');
const { comparePassword } = require('../../utils/PasswordFunction');
const { generateToken } = require('../../utils/Token');

// Mock des dépendances
jest.mock('../../utils/PasswordFunction');
jest.mock('../../utils/Token');
jest.mock('../../model/User');

describe('Login Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Champs manquants
  it('should return 400 if email or password is missing', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email and password are required',
    });
  });

  // Test 2: Utilisateur non trouvé
  it('should return 401 if user is not found', async () => {
    const User = require('../../model/User');
    User.findOne.mockResolvedValue(null);

    const req = { 
      body: { 
        email: 'nonexistent@test.com', 
        password: 'password' 
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid credentials',
    });
  });

  // Test 3: Mot de passe incorrect
  it('should return 401 if password is incorrect', async () => {
    const User = require('../../model/User');
    User.findOne.mockResolvedValue({
      email: 'test@test.com',
      password: 'hashedpassword',
    });
    comparePassword.mockResolvedValue(false);

    const req = { 
      body: { 
        email: 'test@test.com', 
        password: 'wrongpassword' 
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid credentials',
    });
  });

  // Test 4: Login réussi
  it('should return token and user data if login is successful', async () => {
    const mockUser = {
      _id: '123',
      email: 'test@test.com',
      password: 'hashedpassword',
      toObject: jest.fn().mockReturnValue({
        _id: '123',
        email: 'test@test.com',
      }),
    };

    const User = require('../../model/User');
    User.findOne.mockResolvedValue(mockUser);
    comparePassword.mockResolvedValue(true);
    generateToken.mockReturnValue('fake.jwt.token');

    const req = { 
      body: { 
        email: 'test@test.com', 
        password: 'correctpassword' 
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: 'fake.jwt.token',
      user: {
        _id: '123',
        email: 'test@test.com',
      },
    });
    expect(generateToken).toHaveBeenCalledWith({ userId: '123' });
  });
});