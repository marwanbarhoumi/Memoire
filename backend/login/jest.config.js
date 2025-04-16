module.exports = {
  // Environnement d'exécution des tests
  testEnvironment: 'node',
  
  // Fichiers de test à inclure
  testMatch: [
    '**/tests/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Dossiers à ignorer
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/'
  ],
  
  // Configuration de la couverture de code
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'utils/**/*.js',
    'middlewares/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/config/**'
  ],
  
  // Seuils minimum de couverture
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Fichiers à exécuter avant les tests
  setupFilesAfterEnv: [],
  
  // Transformations pour les fichiers
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};