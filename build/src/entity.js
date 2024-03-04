"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
/**
 * @file entity.ts
 * @author tngan
 * @desc  An abstraction for identity provider and service provider.
 */
var utility_1 = require("./utility");
var urn_1 = require("./urn");
var uuid = __importStar(require("uuid"));
var metadata_idp_1 = __importDefault(require("./metadata-idp"));
var metadata_sp_1 = __importDefault(require("./metadata-sp"));
var binding_redirect_1 = __importDefault(require("./binding-redirect"));
var binding_post_1 = __importDefault(require("./binding-post"));
var flow_1 = require("./flow");
var dataEncryptionAlgorithm = urn_1.algorithms.encryption.data;
var keyEncryptionAlgorithm = urn_1.algorithms.encryption.key;
var signatureAlgorithms = urn_1.algorithms.signature;
var messageSigningOrders = urn_1.messageConfigurations.signingOrder;
var defaultEntitySetting = {
    wantLogoutResponseSigned: false,
    messageSigningOrder: messageSigningOrders.SIGN_THEN_ENCRYPT,
    wantLogoutRequestSigned: false,
    allowCreate: false,
    isAssertionEncrypted: false,
    requestSignatureAlgorithm: signatureAlgorithms.RSA_SHA256,
    dataEncryptionAlgorithm: dataEncryptionAlgorithm.AES_256,
    keyEncryptionAlgorithm: keyEncryptionAlgorithm.RSA_OAEP_MGF1P,
    generateID: function () { return "_" + uuid.v4(); },
    relayState: "",
};
var Entity = /** @class */ (function () {
    /**
     * @param entitySetting
     * @param entityMeta is the entity metadata, deprecated after 2.0
     */
    function Entity(entitySetting, entityType) {
        this.entitySetting = Object.assign({}, defaultEntitySetting, entitySetting);
        var metadata = entitySetting.metadata || entitySetting;
        switch (entityType) {
            case "idp":
                this.entityMeta = (0, metadata_idp_1.default)(metadata);
                // setting with metadata has higher precedence
                this.entitySetting.wantAuthnRequestsSigned =
                    this.entityMeta.isWantAuthnRequestsSigned();
                this.entitySetting.nameIDFormat =
                    this.entityMeta.getNameIDFormat() || this.entitySetting.nameIDFormat;
                break;
            case "sp":
                this.entityMeta = (0, metadata_sp_1.default)(metadata);
                // setting with metadata has higher precedence
                this.entitySetting.authnRequestsSigned =
                    this.entityMeta.isAuthnRequestSigned();
                this.entitySetting.wantAssertionsSigned =
                    this.entityMeta.isWantAssertionsSigned();
                this.entitySetting.nameIDFormat =
                    this.entityMeta.getNameIDFormat() || this.entitySetting.nameIDFormat;
                break;
            default:
                throw new Error("ERR_UNDEFINED_ENTITY_TYPE");
        }
    }
    /**
     * @desc  Returns the setting of entity
     * @return {object}
     */
    Entity.prototype.getEntitySetting = function () {
        return this.entitySetting;
    };
    /**
     * @desc  Returns the xml string of entity metadata
     * @return {string}
     */
    Entity.prototype.getMetadata = function () {
        return this.entityMeta.getMetadata();
    };
    /**
     * @desc  Exports the entity metadata into specified folder
     * @param  {string} exportFile indicates the file name
     */
    Entity.prototype.exportMetadata = function (exportFile) {
        return this.entityMeta.exportMetadata(exportFile);
    };
    /** * @desc  Verify fields with the one specified in metadata
     * @param  {string/[string]} field is a string or an array of string indicating the field value in SAML message
     * @param  {string} metaField is a string indicating the same field specified in metadata
     * @return {boolean} True/False
     */
    Entity.prototype.verifyFields = function (field, metaField) {
        if ((0, utility_1.isString)(field)) {
            return field === metaField;
        }
        if ((0, utility_1.isNonEmptyArray)(field)) {
            var res_1 = true;
            field.forEach(function (f) {
                if (f !== metaField) {
                    res_1 = false;
                    return;
                }
            });
            return res_1;
        }
        return false;
    };
    /** @desc   Generates the logout request for developers to design their own method
     * @param  {ServiceProvider} sp     object of service provider
     * @param  {string}   binding       protocol binding
     * @param  {object}   user          current logged user (e.g. user)
     * @param  {string} relayState      the URL to which to redirect the user when logout is complete
     * @param  {function} customTagReplacement     used when developers have their own login response template
     */
    Entity.prototype.createLogoutRequest = function (targetEntity, binding, user, relayState, customTagReplacement) {
        if (relayState === void 0) { relayState = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var entityEndpoint, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(binding === urn_1.wording.binding.redirect)) return [3 /*break*/, 2];
                        return [4 /*yield*/, binding_redirect_1.default.logoutRequestRedirectURL(user, {
                                init: this,
                                target: targetEntity,
                            }, relayState, customTagReplacement)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (binding === urn_1.wording.binding.post) {
                            entityEndpoint = targetEntity.entityMeta.getSingleLogoutService(binding);
                            context = binding_post_1.default.base64LogoutRequest(user, "/*[local-name(.)='LogoutRequest']", { init: this, target: targetEntity }, customTagReplacement);
                            return [2 /*return*/, __assign(__assign({}, context), { relayState: relayState, entityEndpoint: entityEndpoint, type: "SAMLRequest" })];
                        }
                        // Will support artifact in the next release
                        throw new Error("ERR_UNDEFINED_BINDING");
                }
            });
        });
    };
    /**
     * @desc  Generates the logout response for developers to design their own method
     * @param  {IdentityProvider} idp               object of identity provider
     * @param  {object} requestInfo                 corresponding request, used to obtain the id
     * @param  {string} relayState                  the URL to which to redirect the user when logout is complete.
     * @param  {string} binding                     protocol binding
     * @param  {function} customTagReplacement                 used when developers have their own login response template
     */
    Entity.prototype.createLogoutResponse = function (target, requestInfo, binding, relayState, customTagReplacement) {
        if (relayState === void 0) { relayState = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var protocol, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        protocol = urn_1.namespace.binding[binding];
                        if (!(protocol === urn_1.namespace.binding.redirect)) return [3 /*break*/, 2];
                        return [4 /*yield*/, binding_redirect_1.default.logoutResponseRedirectURL(requestInfo, {
                                init: this,
                                target: target,
                            }, relayState, customTagReplacement)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (protocol === urn_1.namespace.binding.post) {
                            context = binding_post_1.default.base64LogoutResponse(requestInfo, {
                                init: this,
                                target: target,
                            }, customTagReplacement);
                            return [2 /*return*/, __assign(__assign({}, context), { relayState: relayState, entityEndpoint: target.entityMeta.getSingleLogoutService(binding), type: "SAMLResponse" })];
                        }
                        throw new Error("ERR_CREATE_LOGOUT_RESPONSE_UNDEFINED_BINDING");
                }
            });
        });
    };
    /**
     * @desc   Validation of the parsed the URL parameters
     * @param  {IdentityProvider}   idp             object of identity provider
     * @param  {string}   binding                   protocol binding
     * @param  {request}   req                      request
     * @return {Promise}
     */
    Entity.prototype.parseLogoutRequest = function (from, binding, request) {
        var self = this;
        return (0, flow_1.flow)({
            from: from,
            self: self,
            type: "logout",
            parserType: "LogoutRequest",
            checkSignature: this.entitySetting.wantLogoutRequestSigned,
            binding: binding,
            request: request,
        });
    };
    /**
     * @desc   Validation of the parsed the URL parameters
     * @param  {object} config                      config for the parser
     * @param  {string}   binding                   protocol binding
     * @param  {request}   req                      request
     * @return {Promise}
     */
    Entity.prototype.parseLogoutResponse = function (from, binding, request) {
        var self = this;
        return (0, flow_1.flow)({
            from: from,
            self: self,
            type: "logout",
            parserType: "LogoutResponse",
            checkSignature: self.entitySetting.wantLogoutResponseSigned,
            binding: binding,
            request: request,
        });
    };
    return Entity;
}());
exports.default = Entity;
//# sourceMappingURL=entity.js.map