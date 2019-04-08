"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
var dirTree = require('directory-tree');
var Architect = /** @class */ (function () {
    function Architect() {
    }
    Architect.prototype.drawBlueprint = function (name, json) {
        if (json === void 0) { json = { name: 'hi' }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1["default"].writeJSON("./templates/" + name + ".Blueprint.json", json)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Architect.prototype.buildJSON = function () {
    };
    Architect.prototype.scanning = function (path) {
        var _this = this;
        var tree = dirTree(path);
        var name = tree.name;
        var directories = [];
        var files = [];
        tree.children.forEach(function (child) {
            var _a;
            var content = _this.addSubdir(child);
            _a = _this.addContent(files, directories, content), files = _a[0], directories = _a[1];
        });
        return {
            path: path,
            name: name,
            directories: directories,
            files: files
        };
    };
    Architect.prototype.addSubdir = function (Child, path) {
        var _this = this;
        if (path === void 0) { path = ""; }
        var type = Child.type;
        var name = Child.name;
        var directories = [];
        var files = [];
        if (Child.type === 'directory') {
            Child.children.forEach(function (child) {
                var _a;
                var content = _this.addSubdir(child, path + Child.name + '/');
                _a = _this.addContent(files, directories, content), files = _a[0], directories = _a[1];
            });
        }
        return { type: type, name: name, files: files, directories: directories };
    };
    Architect.prototype.addContent = function (files, directories, content) {
        if (content.type === 'file') {
            files = files.concat([content.name]);
        }
        else if (content.type === 'directory') {
            directories = directories.concat([{
                    name: content.name,
                    files: content.files,
                    directories: content.directories
                }]);
        }
        return [files, directories];
    };
    Architect.prototype.redefJSON = function (json, path) {
        var _this = this;
        var choices = [];
        path = path === undefined ? '' : path;
        json.directories.forEach(function (dir) {
            var choice = {
                name: dir.name,
                value: path + '/' + dir.name,
                choices: _this.redefJSON(dir, path + '/' + dir.name)
            };
            choices = choices.concat([choice]);
        });
        json.files.forEach(function (file) {
            choices = choices.concat([{
                    name: path + '/' + file,
                    message: file,
                    value: path + '/' + file
                }]);
        });
        return choices;
    };
    Architect.prototype.editBlueprint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Architect.prototype.deleteBlueprint = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1["default"].unlink("./templates/" + file)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Architect.prototype.getBlueprints = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDir('./templates')];
            });
        });
    };
    Architect.prototype.getBlueprint = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fs_extra_1["default"].readJSON("./templates/" + file)];
            });
        });
    };
    Architect.prototype.getDir = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fs_extra_1["default"].readdir(path)];
            });
        });
    };
    return Architect;
}());
exports.Architect = Architect;
