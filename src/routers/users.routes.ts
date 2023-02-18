import { Router } from "express";
import { createUsersController, deleteProfileController, listProfileController, listUsersController, recoveryProfileController, updateProfileController } from "../controllers/users.controllers";
import ensureEmailExistsMiddleware from "../middlewares/ensureEmailExists.middleware";
import { ensureDataIsValidMiddleware, ensureDataIsValidUpdateMiddleware } from "../middlewares/ensureInputIsValid.middlewares";
import ensureNameExistsMiddleware from "../middlewares/ensureNameExists.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureTokenIsAdmin.middleware";
import ensureIsAdminIdMiddleware from "../middlewares/ensureTokenIsAdminID.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas.";




const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(createUserSchema), ensureEmailExistsMiddleware, createUsersController)
userRoutes.get('', ensureTokenIsValidMiddleware, listUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, listProfileController)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsAdminMiddleware, ensureNameExistsMiddleware, ensureEmailExistsMiddleware, ensureDataIsValidUpdateMiddleware(updateUserSchema), updateProfileController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsAdminMiddleware, deleteProfileController)
userRoutes.put('/:id/recovery', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsAdminIdMiddleware, recoveryProfileController)

export default userRoutes