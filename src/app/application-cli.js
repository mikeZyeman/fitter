"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var chalk_1 = require("chalk");
var prompt = require('enquirer').prompt;
var application_1 = require("./application");
var ApplicationCli = /** @class */ (function (_super) {
    __extends(ApplicationCli, _super);
    function ApplicationCli() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fileSelect = {
            type: 'select',
            name: 'blueprint',
            message: '',
            initial: 1,
            choices: []
        };
        _this.fileConfirm = {
            type: 'confirm',
            name: 'confirm',
            message: ''
        };
        return _this;
    }
    ApplicationCli.prototype.drawBlue = function (path) {
        var dirtree = this.scanDir(path);
        var questions = [
            {
                type: 'input',
                name: 'bpname',
                message: 'Step 1: how would you name your blueprint'
            },
            {
                type: 'multiselect',
                name: 'selected-files',
                message: 'Step 2: Mark the files you want to copy.',
                initial: '',
                choices: this.redefJSON(dirtree),
                result: function (values) {
                    return this.map(values);
                }
            }
        ];
        this.promptout(questions)
            .then(function (answer) { return console.log(answer); })["catch"](console.error);
    };
    ApplicationCli.prototype.dropBlue = function () {
        var _this = this;
        this.getBlueprints()
            .then(function (list) {
            if (list === null)
                throw new Error('There are no blueprints in templates folder');
            var question = list.length === 1 ? _this.fileConfirm : _this.fileSelect;
            question.message = list.length === 1 ? list[0] + ' is the only file. Do you still want to delete it?'
                : 'Which blueprint do you want to delete?';
            // @ts-ignore
            question.choices = list.length !== 1 ? list : null;
            _this.promptout([question])
                .then(function (answer) {
                if (answer.confirm)
                    _this.deleteBlueprint(list[0]);
                if (answer.blueprint)
                    _this.deleteBlueprint(answer.blueprint);
            });
        })["catch"](this.handleListError);
    };
    ApplicationCli.prototype.listBlues = function () {
        this.getBlueprints()
            .then(function (list) {
            if (list === null) {
                console.log(chalk_1["default"].redBright('There are no Blueprints'));
                return;
            }
            // @ts-ignore
            list.forEach(function (file) {
                console.log(file);
            });
        })["catch"](this.handleListError);
    };
    ApplicationCli.prototype.infoDetail = function () {
        var _this = this;
        this.getBlueprints()
            .then(function (list) {
            if (list === null)
                throw new Error('There are no blueprints in templates folder');
            var question = list.length === 1 ? _this.fileConfirm : _this.fileSelect;
            question.message = list.length === 1 ? list[0] + ' is the only file. Do you want to view it?'
                : 'Which blueprint do you want to view in detail?';
            // @ts-ignore
            question.choices = list.length !== 1 ? list : null;
            _this.promptout([question]).then(function (answer) {
                if (answer.confirm)
                    _this.getBlueprint(list[0]).then(console.log);
                if (answer.blueprint)
                    _this.getBlueprint(answer.blueprint).then(console.log);
            });
        })["catch"](this.handleListError);
    };
    ApplicationCli.prototype.infoBlue = function (name) {
        this.getBlueprint(name)
            .then(function (data) {
            console.log(data);
        })["catch"](function (err) {
            console.log(chalk_1["default"].bgRedBright('Something went wrong while getting information from selected blueprint'));
            console.error(err);
        });
    };
    ApplicationCli.prototype.promptout = function (questions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, prompt(questions)];
            });
        });
    };
    ApplicationCli.prototype.handleListError = function (err) {
        console.log(chalk_1["default"].bgRedBright('Something went wrong while listing up blueprints'));
        console.error(err);
    };
    return ApplicationCli;
}(application_1.Application));
exports.ApplicationCli = ApplicationCli;
