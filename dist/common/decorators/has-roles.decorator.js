"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRoleEnums = void 0;
const common_1 = require("@nestjs/common");
const HasRoleEnums = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.HasRoleEnums = HasRoleEnums;
//# sourceMappingURL=has-roles.decorator.js.map