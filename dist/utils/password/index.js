"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
    return await bcrypt.hash(password, +process.env.HASH_SALT);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=index.js.map