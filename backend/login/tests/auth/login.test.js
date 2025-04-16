// Importations organisées
const { loginUser } = require('../../controllers/authController');
const { comparePwd } = require('../../utils/PasswordFunction');
const { createToken } = require('../../utils/Token');

// Mock des dépendances
jest.mock('../../utils/PasswordFunction');
jest.mock('../../utils/Token');
jest.mock('../../model/User');

describe('Login Controller Tests', () => {
  // Données de test communes
  const mockUser = {
    _id: '507f191e810c19729de860ea',
    email: 'marwan@gmail.com',
    password: '$2b$10$hashedpassword123',
    toObject() {
      return { _id: this._id, email: this.email }
    }
  };

  const validReq = {
    body: {
      email: 'marwan@gmail.com',
      password: 'correctPassword123'
    }
  };

  // Objet réponse mocké
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Configuration par défaut
    createToken.mockReturnValue('generated.jwt.token');
  });

  describe('Failure Cases', () => {
    it('should return 400 when email or password is missing', async () => {
      await loginUser({ body: {} }, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email and password are required'
      });
    });

    it('should return 401 when user does not exist', async () => {
      const User = require('../../model/User');
      User.findOne.mockResolvedValue(null);

      await loginUser(validReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: validReq.body.email });
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should return 401 when password is incorrect', async () => {
      const User = require('../../model/User');
      User.findOne.mockResolvedValue(mockUser);
      comparePwd.mockResolvedValue(false);

      await loginUser(validReq, mockRes);

      expect(comparePwd).toHaveBeenCalledWith(
        validReq.body.password,
        mockUser.password
      );
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe('Success Cases', () => {
    it('should return 200 with token and user data when login succeeds', async () => {
      const User = require('../../model/User');
      User.findOne.mockResolvedValue(mockUser);
      comparePwd.mockResolvedValue(true);

      await loginUser(validReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        token: 'generated.jwt.token',
        user: {
          _id: mockUser._id,
          email: mockUser.email
        },
        message: 'Login successful'
      });
      expect(createToken).toHaveBeenCalledWith({ userId: mockUser._id });
    });
  });

  describe('Error Handling', () => {
    it('should return 500 when database error occurs', async () => {
      const User = require('../../model/User');
      User.findOne.mockRejectedValue(new Error('DB Connection Error'));

      await loginUser(validReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Server error'
      });
    });
  });
});