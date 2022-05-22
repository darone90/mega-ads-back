import {createPool} from 'mysql2/promise';
import {appConfig} from "../app.config";

export const pool = createPool({
   host: appConfig.host,
   user: appConfig.user,
   database: appConfig.database,
   namedPlaceholders: true,
   decimalNumbers: true,
});