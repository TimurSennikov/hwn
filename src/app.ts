import express from 'express';

import { createRouter as pr } from './routers/post.js';
import { createHandlers as ph } from './handlers/post.js';
import { createService as ps } from './services/post.js';
import { createRepository as pre } from './repositories/post.js';

import { createUserRouter as ur } from './routers/user.js';
import { createUserHandler as uh } from './handlers/user_handlers.js';
import { createUserService as us } from './services/user.js';
import { createUserRepositoryContract as ure } from './repositories/user.js';

import { createRouter as cr } from './routers/category.js';
import { createHandlers as ch } from './handlers/category.js';
import { createService as cs } from './services/category.js';
import { createRepository as cre } from './repositories/category.js';


import { db } from './prisma/db.js';
import { hashPassword, verifyPassword } from './lib/password.js';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from './lib/jwt.js';

const app = express();

const userService = us(ure(db),
    {
        hashPassword: hashPassword,
        verifyPassword: verifyPassword
    },
    
    {
        signAccessToken: signAccessToken,
        signRefreshToken: signRefreshToken
    },

    {
        verifyAccessToken: verifyAccessToken,
        verifyRefreshToken: verifyRefreshToken
    }
);

const postRouter = pr(ph(ps(pre(db))));
const categoryRouter = cr(ch(cs(cre(db))));
const userRouter = ur(uh(userService), (req, res, next) => {
    const authHeader = req.headers.authorization;
});

app.listen(8000, "127.0.0.1");