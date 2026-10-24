import express from 'express';

import { createRouter as pr } from './routers/post.js';
import { createHandlers as ph } from './handlers/post.js';
import { createService as ps } from './services/post.js';
import { createRepository as pre } from './repositories/post.js';

import { createRouter as cr } from './routers/category.js';
import { createHandlers as ch } from './handlers/category.js';
import { createService as cs } from './services/category.js';
import { createRepository as cre } from './repositories/category.js';


import { db } from './prisma/db.js';

const app = express();

const postRouter = pr(ph(ps(pre(db))));
const categoryRouter = cr(ch(cs(cre(db))));

app.use("/posts", postRouter);
app.use("/categories", categoryRouter);

app.listen(8000, "127.0.0.1");