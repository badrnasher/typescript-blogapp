"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
// Create a connection pool
const pool = mysql2_1.default.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: 'localhost',
    user: 'root',
    password: 'badr',
    database: 'mysql',
});
exports.pool = pool;
