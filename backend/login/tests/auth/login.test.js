// Importations regroupées et organisées
const {
  loginUser
} = require('../../controllers/authController');

const {
  comparePwd
} = require('../../utils/PasswordFunction');

const {
  createToken
} = require('../../utils/Token');

// Mock des dépendances
jest.mock('../../utils/PasswordFunction');
jest.mock('../../utils/Token');
jest.mock('../../model/User');

describe('Login Controller', () => {
  // Variables partagées pour les tests
  const mockUser = {
    _id: '123',
    email: 'marwan@gmail.com',
    password: 'hashedPassword123',
    toObject: jest.fn().mockReturnValue({
      _id: '123',
      email: 'marwan@gmail.com'
    })
  };

  const validCredentials = {
    email: 'marwan@gmail.com',
    password: '123456789'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Configuration par défaut des mocks
    createToken.mockReturnValue('fake.jwt.token');
  });

  // Test 1: Champs manquants
  describe('When email or password is missing', () => {
    it('should return 400 status with error message', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email and password are required'
      });
    });
  });

  // Test 2: Utilisateur non trouvé
  describe('When user is not found', () => {
    it('should return 401 status with invalid credentials message', async () => {
      const User = require('../../model/User');
      User.findOne.mockResolvedValue(null);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginUser({ body: validCredentials }, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });
  });

  // Test 3: Mot de passe incorrect
  describe('When password is incorrect', () => {
    it('should return 401 status with invalid credentials message', async () => {
      const User = require('../../model/User');
      User.findOne.mockResolvedValue(mockUser);
      comparePwd.mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginUser({ body: validCredentials }, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
      expect(comparePwd).toHaveBeenCalledWith(
        validCredentials.password,
        mockUser.password
      );
    });
  });

  // Test 4: Login réussi
  describe('When credentials are valid', () => {
    it('should return token and user data with 200 status', async () => {
      const User = require('../../model/User');
      User.findOne.mockResolvedValue(mockUser);
      comparePwd.mockResolvedValue(true);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginUser({ body: validCredentials }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'fake.jwt.token',
        user: {
          _id: '123',
          email: 'marwan@gmail.com'
        },
        message: 'Login successful'
      });
      expect(createToken).toHaveBeenCalledWith({ userId: '123' });
    });
  });

  // Test 5: Erreur serveur
  describe('When server error occurs', () => {
    it('should return 500 status with error message', async () => {
      const User = require('../../model/User');
      User.findOne.mockRejectedValue(new Error('Database error'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await loginUser({ body: validCredentials }, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Server error'
      });
    });
  });
});