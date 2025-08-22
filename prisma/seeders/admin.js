"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = seedAdmin;
var prisma_1 = require("../../src/generated/prisma");
var bcrypt_1 = require("bcrypt");
var prisma = new prisma_1.PrismaClient();
function seedAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        var _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _b = (_a = prisma.admin).createMany;
                    _d = {};
                    _e = {
                        admin_id: "b31ff191-22f8-471e-a240-e183a041924c",
                        admin_email: "admin@bcd.id",
                        admin_username: "admin_bcd"
                    };
                    return [4 /*yield*/, bcrypt_1.default.hash("admin-bcd-123", 12)];
                case 1:
                    _c = [
                        (_e.admin_password = _h.sent(),
                            _e.cinema_chain_id = "8560be2d-54ba-46d5-ad35-8152bff2f618" // BCD
                        ,
                            _e)
                    ];
                    _f = {
                        admin_id: "18409cba-27f2-4072-82a1-2abd14fc3ef5",
                        admin_email: "admin@duaempat.id",
                        admin_username: "admin_duaempat"
                    };
                    return [4 /*yield*/, bcrypt_1.default.hash("admin-duaempat-123", 12)];
                case 2:
                    _c = _c.concat([
                        (_f.admin_password = _h.sent(),
                            _f.cinema_chain_id = "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1" // DuaPuluhEmpat
                        ,
                            _f)
                    ]);
                    _g = {
                        admin_id: "2e941f6c-e6fc-44e9-9819-f8e28421b399",
                        admin_email: "admin@sinampol.id",
                        admin_username: "admin_sinampol"
                    };
                    return [4 /*yield*/, bcrypt_1.default.hash("admin-sinampol-123", 12)];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_d.data = _c.concat([
                            (_g.admin_password = _h.sent(),
                                _g.cinema_chain_id = "07ccd992-19e4-4057-9f7c-64ee39fe3874" // Sinampol
                            ,
                                _g)
                        ]),
                            _d)])];
                case 4:
                    _h.sent();
                    console.log("Admins Seeded");
                    return [2 /*return*/];
            }
        });
    });
}
