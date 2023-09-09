import 'dotenv/config';
import express from 'express';
import dataSource from './db/DataSource.js';
import UserRoute from './router/User.js';
import PermissionRoute from './router/Permission.js';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/users', UserRoute);
app.use('/permission', PermissionRoute);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    dataSource
        .initialize()
        .then(() => {
        console.log("connected to DB");
    })
        .catch((error) => {
        console.log("error: ", error);
    });
});
