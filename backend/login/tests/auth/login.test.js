const { loginuser } = require('../../controllers/authController');
const { comparePwd } = require('../../utils/PasswordFunction');
const generateToken = require('../../utils/Token');

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
      send: jest.fn(),
    };

    await loginuser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ msg: 'bad cridentials(email)' });
  });

  // Test 2: Utilisateur non trouvé
  it('should return 400 if user is not found', async () => {
    const User = require('../../model/User');
    User.findOne.mockResolvedValue(null);

    const req = {
      body: {
        email: 'nonexistent@test.com',
        password: '123456',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await loginuser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ msg: 'bad cridentials(email)' });
  });

  // Test 3: Mot de passe incorrect
  it('should return 400 if password is incorrect', async () => {
    const User = require('../../model/User');
    User.findOne.mockResolvedValue({
      _id: '123',
      email: 'marwan@gmail.com',
      password: 'hashedpassword',
    });
    comparePwd.mockResolvedValue(false);

    const req = {
      body: {
        email: 'marwan@gmail.com',
        password: 'wrongpassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await loginuser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ msg: 'bad cridentials(password)' });
  });

  // Test 4: Login réussi
  it('should return token and user data if login is successful', async () => {
    const mockUser = {
      _id: '123',
      email: 'marwan@gmail.com',
      password: 'hashedpassword',
      toObject: jest.fn().mockReturnValue({
        _id: '123',
        email: 'marwan@gmail.com',
      }),
    };

    const User = require('../../model/User');
    User.findOne.mockResolvedValue(mockUser);
    comparePwd.mockResolvedValue(true);
    generateToken.mockReturnValue('fake.jwt.token');

    const req = {
      body: {
        email: 'marwan@gmail.com',
        password: '123456789',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await loginuser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      token: 'fake.jwt.token',
      msg: 'user successfully logged in',
      user: {
        _id: '123',
        email: 'marwan@gmail.com',
      },
    });
    expect(generateToken).toHaveBeenCalledWith({ userid: '123' });
  });
});
