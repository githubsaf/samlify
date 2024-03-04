"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
/**
 * @file entity-sp.ts
 * @author tngan
 * @desc  Declares the actions taken by service provider
 */
var entity_1 = __importDefault(require("./entity"));
var urn_1 = require("./urn");
var binding_redirect_1 = __importDefault(require("./binding-redirect"));
var binding_post_1 = __importDefault(require("./binding-post"));
var binding_simplesign_1 = __importDefault(require("./binding-simplesign"));
var flow_1 = require("./flow");
/*
 * @desc interface function
 */
function default_1(props) {
    return new ServiceProvider(props);
}
exports.default = default_1;
/**
* @desc Service provider can be configured using either metadata importing or spSetting
* @param  {object} spSettingimport { FlowResult } from '../types/src/flow.d';

*/
var ServiceProvider = /** @class */ (function (_super) {
    __extends(ServiceProvider, _super);
    /**
     * @desc  Inherited from Entity
     * @param {object} spSetting    setting of service provider
     */
    function ServiceProvider(spSetting) {
        var entitySetting = Object.assign({
            authnRequestsSigned: false,
            wantAssertionsSigned: false,
            wantMessageSigned: false,
        }, spSetting);
        return _super.call(this, entitySetting, "sp") || this;
    }
    /**
     * @desc  Generates the login request for developers to design their own method
     * @param  {IdentityProvider} idp               object of identity provider
     * @param  {string}   binding                   protocol binding
     * @param  {function} customTagReplacement     used when developers have their own login response template
     */
    ServiceProvider.prototype.createLoginRequest = function (idp, binding, customTagReplacement) {
        if (binding === void 0) { binding = "redirect"; }
        return __awaiter(this, void 0, void 0, function () {
            var nsBinding, protocol, context, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nsBinding = urn_1.namespace.binding;
                        protocol = nsBinding[binding];
                        if (this.entityMeta.isAuthnRequestSigned() !==
                            idp.entityMeta.isWantAuthnRequestsSigned()) {
                            throw new Error("ERR_METADATA_CONFLICT_REQUEST_SIGNED_FLAG");
                        }
                        context = null;
                        _a = protocol;
                        switch (_a) {
                            case nsBinding.redirect: return [3 /*break*/, 1];
                            case nsBinding.post: return [3 /*break*/, 3];
                            case nsBinding.simpleSign: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, binding_redirect_1.default.loginRequestRedirectURL({ idp: idp, sp: this }, customTagReplacement)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        context = binding_post_1.default.base64LoginRequest("/*[local-name(.)='AuthnRequest']", { idp: idp, sp: this }, customTagReplacement);
                        return [3 /*break*/, 6];
                    case 4:
                        // Object context = {id, context, signature, sigAlg}
                        context = binding_simplesign_1.default.base64LoginRequest({ idp: idp, sp: this }, customTagReplacement);
                        return [3 /*break*/, 6];
                    case 5: 
                    // Will support artifact in the next release
                    throw new Error("ERR_SP_LOGIN_REQUEST_UNDEFINED_BINDING");
                    case 6: return [2 /*return*/, __assign(__assign({}, context), { relayState: this.entitySetting.relayState, entityEndpoint: idp.entityMeta.getSingleSignOnService(binding), type: "SAMLRequest" })];
                }
            });
        });
    };
    /**
     * @desc   Validation of the parsed the URL parameters
     * @param  {IdentityProvider}   idp             object of identity provider
     * @param  {string}   binding                   protocol binding
     * @param  {request}   req                      request
     */
    ServiceProvider.prototype.parseLoginResponse = function (idp, binding, request) {
        var self = this;
        return (0, flow_1.flow)({
            from: idp,
            self: self,
            checkSignature: true,
            parserType: "SAMLResponse",
            type: "login",
            binding: binding,
            request: request,
        });
    };
    return ServiceProvider;
}(entity_1.default));
exports.ServiceProvider = ServiceProvider;
//# sourceMappingURL=entity-sp.js.map