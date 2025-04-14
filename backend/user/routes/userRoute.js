// usersRoute.js
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.put('/:id/ban', authMiddleware, adminMiddleware, userController.banUser);
router.delete(
    '/:id', 
    authMiddleware, 
    adminMiddleware, 
    userController.deleteUser
  );