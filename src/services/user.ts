import type { UserRepositoryContract } from "../domain/user/repository";

import type { 
    TokenVerifierContract, 
    PasswordHasherContract, 
    TokenSignerContract, 
    UserServiceContract
 } from "./user_types";

export function createUserService(
    repository: UserRepositoryContract,
    passwordHasher: PasswordHasherContract,
    tokenSigner: TokenSignerContract,
    tokenVerifier: TokenVerifierContract,
): UserServiceContract {
    return {
        async register(data) {
            const { email, password } = data;
            
            const hash = await passwordHasher.hashPassword(password);

            const user = await repository.createUser({
                email,
                passwordHash: hash
            });

            return {
                id: user.id,
                email: user.email
            };
        },

        async login(data) {
            const { email, password } = data;

            const user = await repository.getUserByEmail(email);

            if (!user || !await passwordHasher.verifyPassword(user.passwordHash, password)) {
                throw new Error("Invalid credentials");
            }

            return {
                user: {
                    id: user.id,
                    email: user.email
                },
                accessToken: tokenSigner.signAccessToken(user.id),
                refreshToken: tokenSigner.signRefreshToken(user.id)
            };
        },

        async refresh(refreshToken) {
            const userId = tokenVerifier.verifyRefreshToken(refreshToken);
            const user = await repository.getUserById(userId);

            if (!user) {
                throw new Error("User not found");
            }

            return {
                accessToken: tokenSigner.signAccessToken(user.id),
                refreshToken: tokenSigner.signRefreshToken(user.id)
            };
        },

        async me(id) {
            const user = await repository.getUserById(id);

            if (!user) {
                throw new Error("User not found");
            }

            return {
                id: user.id,
                email: user.email
            };
        }
    };
}