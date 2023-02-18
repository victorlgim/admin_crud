import { Router } from "express";
import { createUsersController, listProfileController, listUsersController, updateProfileController } from "../controllers/users.controllers";
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureInputIsValid.middlewares";
import ensureNameExistsMiddleware from "../middlewares/ensureNameExists.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureTokenIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middlewares";
import { createUserSchema } from "../schemas/users.schemas.";


const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(createUserSchema), ensureEmailExistsMiddleware, createUsersController)
userRoutes.get('', ensureTokenIsValidMiddleware, listUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, listProfileController)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsAdminMiddleware, ensureNameExistsMiddleware, ensureEmailExistsMiddleware, updateProfileController)

export default userRoutes