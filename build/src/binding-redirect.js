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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file binding-redirect.ts
 * @author tngan
 * @desc Binding-level API, declare the functions using Redirect binding
 */
var utility_1 = __importStar(require("./utility"));
var libsaml_1 = __importDefault(require("./libsaml"));
var url = __importStar(require("url"));
var urn_1 = require("./urn");
var binding = urn_1.wording.binding;
var urlParams = urn_1.wording.urlParams;
/**
 * @private
 * @desc Helper of generating URL param/value pair
 * @param  {string} param     key
 * @param  {string} value     value of key
 * @param  {boolean} first    determine whether the param is the starting one in order to add query header '?'
 * @return {string}
 */
function pvPair(param, value, first) {
    return (first === true ? "?" : "&") + param + "=" + value;
}
/**
 * @private
 * @desc Refractored part of URL generation for login/logout request
 * @param  {string} type
 * @param  {boolean} isSigned
 * @param  {string} rawSamlRequest
 * @param  {object} entitySetting
 * @return {string}
 */
function buildRedirectURL(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, type, isSigned, context, entitySetting, _a, relayState, noParams, queryParam, samlRequest, sigAlg, octetString, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    baseUrl = opts.baseUrl, type = opts.type, isSigned = opts.isSigned, context = opts.context, entitySetting = opts.entitySetting;
                    _a = opts.relayState, relayState = _a === void 0 ? "" : _a;
                    noParams = (url.parse(baseUrl).query || []).length === 0;
                    queryParam = libsaml_1.default.getQueryParamByType(type);
                    samlRequest = encodeURIComponent(utility_1.default.base64Encode(utility_1.default.deflateString(context)));
                    if (relayState !== "") {
                        relayState = pvPair(urlParams.relayState, encodeURIComponent(relayState));
                    }
                    if (!isSigned) return [3 /*break*/, 2];
                    sigAlg = pvPair(urlParams.sigAlg, encodeURIComponent(entitySetting.requestSignatureAlgorithm));
                    octetString = samlRequest + relayState + sigAlg;
                    _b = baseUrl +
                        pvPair(queryParam, octetString, noParams);
                    _c = pvPair;
                    _d = [urlParams.signature];
                    _e = encodeURIComponent;
                    return [4 /*yield*/, libsaml_1.default
                            .constructMessageSignature(queryParam + "=" + octetString, entitySetting.privateKey, entitySetting.privateKeyPass, undefined, entitySetting.requestSignatureAlgorithm)
                            .then(function (signature) {
                            return signature;
                        })];
                case 1: return [2 /*return*/, (_b +
                        _c.apply(void 0, _d.concat([_e.apply(void 0, [_f.sent()])])))];
                case 2: return [2 /*return*/, baseUrl + pvPair(queryParam, samlRequest + relayState, noParams)];
            }
        });
    });
}
/**
 * @desc Redirect URL for login request
 * @param  {object} entity                       object includes both idp and sp
 * @param  {function} customTagReplacement      used when developers have their own login response template
 * @return {string} redirect URL
 */
function loginRequestRedirectURL(entity, customTagReplacement) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata, spSetting, id, base, rawSamlRequest, info, nameIDFormat, selectedNameIDFormat;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    metadata = {
                        idp: entity.idp.entityMeta,
                        sp: entity.sp.entityMeta,
                    };
                    spSetting = entity.sp.entitySetting;
                    id = "";
                    if (!(metadata && metadata.idp && metadata.sp)) return [3 /*break*/, 2];
                    base = metadata.idp.getSingleSignOnService(binding.redirect);
                    rawSamlRequest = void 0;
                    if (spSetting.loginRequestTemplate && customTagReplacement) {
                        info = customTagReplacement(spSetting.loginRequestTemplate);
                        id = (0, utility_1.get)(info, "id", null);
                        rawSamlRequest = (0, utility_1.get)(info, "context", null);
                    }
                    else {
                        nameIDFormat = spSetting.nameIDFormat;
                        selectedNameIDFormat = Array.isArray(nameIDFormat)
                            ? nameIDFormat[0]
                            : nameIDFormat;
                        id = spSetting.generateID();
                        rawSamlRequest = libsaml_1.default.replaceTagsByValue(libsaml_1.default.defaultLoginRequestTemplate.context, {
                            ID: id,
                            Destination: base,
                            Issuer: metadata.sp.getEntityID(),
                            IssueInstant: new Date().toISOString(),
                            NameIDFormat: selectedNameIDFormat,
                            AssertionConsumerServiceURL: metadata.sp.getAssertionConsumerService(binding.post),
                            EntityID: metadata.sp.getEntityID(),
                            AllowCreate: spSetting.allowCreate,
                        });
                    }
                    _a = {
                        id: id
                    };
                    return [4 /*yield*/, buildRedirectURL({
                            context: rawSamlRequest,
                            type: urlParams.samlRequest,
                            isSigned: metadata.sp.isAuthnRequestSigned(),
                            entitySetting: spSetting,
                            baseUrl: base,
                            relayState: spSetting.relayState,
                        })];
                case 1: return [2 /*return*/, (_a.context = _b.sent(),
                        _a)];
                case 2: throw new Error("ERR_GENERATE_REDIRECT_LOGIN_REQUEST_MISSING_METADATA");
            }
        });
    });
}
/**
 * @desc Redirect URL for login response
 * @param  {object} requestInfo             corresponding request, used to obtain the id
 * @param  {object} entity                      object includes both idp and sp
 * @param  {object} user                         current logged user (e.g. req.user)
 * @param  {String} relayState                the relaystate sent by sp corresponding request
 * @param  {function} customTagReplacement     used when developers have their own login response template
 */
function loginResponseRedirectURL(requestInfo, entity, user, relayState, customTagReplacement) {
    if (user === void 0) { user = {}; }
    var idpSetting = entity.idp.entitySetting;
    var spSetting = entity.sp.entitySetting;
    var metadata = {
        idp: entity.idp.entityMeta,
        sp: entity.sp.entityMeta,
    };
    var id = idpSetting.generateID();
    if (metadata && metadata.idp && metadata.sp) {
        var base = metadata.sp.getAssertionConsumerService(binding.redirect);
        var rawSamlResponse = void 0;
        //
        var nameIDFormat = idpSetting.nameIDFormat;
        var selectedNameIDFormat = Array.isArray(nameIDFormat)
            ? nameIDFormat[0]
            : nameIDFormat;
        var nowTime = new Date();
        // Five minutes later : nowtime  + 5 * 60 * 1000 (in milliseconds)
        var fiveMinutesLaterTime = new Date(nowTime.getTime() + 300000);
        var tvalue = {
            ID: id,
            AssertionID: idpSetting.generateID(),
            Destination: base,
            SubjectRecipient: base,
            Issuer: metadata.idp.getEntityID(),
            Audience: metadata.sp.getEntityID(),
            EntityID: metadata.sp.getEntityID(),
            IssueInstant: nowTime.toISOString(),
            AssertionConsumerServiceURL: base,
            StatusCode: urn_1.namespace.statusCode.success,
            // can be customized
            ConditionsNotBefore: nowTime.toISOString(),
            ConditionsNotOnOrAfter: fiveMinutesLaterTime.toISOString(),
            SubjectConfirmationDataNotOnOrAfter: fiveMinutesLaterTime.toISOString(),
            NameIDFormat: selectedNameIDFormat,
            NameID: user.email || "",
            InResponseTo: (0, utility_1.get)(requestInfo, "extract.request.id", ""),
            AuthnStatement: "",
            AttributeStatement: "",
        };
        if (idpSetting.loginResponseTemplate && customTagReplacement) {
            var template = customTagReplacement(idpSetting.loginResponseTemplate.context);
            id = (0, utility_1.get)(template, "id", null);
            rawSamlResponse = (0, utility_1.get)(template, "context", null);
        }
        else {
            if (requestInfo !== null) {
                tvalue.InResponseTo = requestInfo.extract.request.id;
            }
            rawSamlResponse = libsaml_1.default.replaceTagsByValue(libsaml_1.default.defaultLoginResponseTemplate.context, tvalue);
        }
        var privateKey = idpSetting.privateKey, privateKeyPass = idpSetting.privateKeyPass, signatureAlgorithm = idpSetting.requestSignatureAlgorithm;
        var config = {
            privateKey: privateKey,
            privateKeyPass: privateKeyPass,
            signatureAlgorithm: signatureAlgorithm,
            signingCert: metadata.idp.getX509Certificate("signing"),
            isBase64Output: false,
        };
        // step: sign assertion ? -> encrypted ? -> sign message ?
        if (metadata.sp.isWantAssertionsSigned()) {
            rawSamlResponse = libsaml_1.default.constructSAMLSignature(__assign(__assign({}, config), { rawSamlMessage: rawSamlResponse, transformationAlgorithms: spSetting.transformationAlgorithms, referenceTagXPath: "/*[local-name(.)='Response']/*[local-name(.)='Assertion']", signatureConfig: {
                    prefix: "ds",
                    location: {
                        reference: "/*[local-name(.)='Response']/*[local-name(.)='Assertion']/*[local-name(.)='Issuer']",
                        action: "after",
                    },
                } }));
        }
        // Like in post binding, SAML response is always signed
        return {
            id: id,
            context: buildRedirectURL({
                baseUrl: base,
                type: urlParams.samlResponse,
                isSigned: true,
                context: rawSamlResponse,
                entitySetting: idpSetting,
                relayState: relayState,
            }),
        };
    }
    throw new Error("ERR_GENERATE_REDIRECT_LOGIN_RESPONSE_MISSING_METADATA");
}
/**
 * @desc Redirect URL for logout request
 * @param  {object} user                        current logged user (e.g. req.user)
 * @param  {object} entity                      object includes both idp and sp
 * @param  {function} customTagReplacement     used when developers have their own login response template
 * @return {string} redirect URL
 */
function logoutRequestRedirectURL(user, entity, relayState, customTagReplacement) {
    var metadata = {
        init: entity.init.entityMeta,
        target: entity.target.entityMeta,
    };
    var initSetting = entity.init.entitySetting;
    var id = initSetting.generateID();
    var nameIDFormat = initSetting.nameIDFormat;
    var selectedNameIDFormat = Array.isArray(nameIDFormat)
        ? nameIDFormat[0]
        : nameIDFormat;
    if (metadata && metadata.init && metadata.target) {
        var base = metadata.target.getSingleLogoutService(binding.redirect);
        var rawSamlRequest = "";
        var requiredTags = {
            ID: id,
            Destination: base,
            EntityID: metadata.init.getEntityID(),
            Issuer: metadata.init.getEntityID(),
            IssueInstant: new Date().toISOString(),
            NameIDFormat: selectedNameIDFormat,
            NameID: user.logoutNameID,
            SessionIndex: user.sessionIndex,
        };
        if (initSetting.logoutRequestTemplate && customTagReplacement) {
            var info = customTagReplacement(initSetting.logoutRequestTemplate, requiredTags);
            id = (0, utility_1.get)(info, "id", null);
            rawSamlRequest = (0, utility_1.get)(info, "context", null);
        }
        else {
            rawSamlRequest = libsaml_1.default.replaceTagsByValue(libsaml_1.default.defaultLogoutRequestTemplate.context, requiredTags);
        }
        return {
            id: id,
            context: buildRedirectURL({
                context: rawSamlRequest,
                relayState: relayState,
                type: urlParams.logoutRequest,
                isSigned: entity.target.entitySetting.wantLogoutRequestSigned,
                entitySetting: initSetting,
                baseUrl: base,
            }),
        };
    }
    throw new Error("ERR_GENERATE_REDIRECT_LOGOUT_REQUEST_MISSING_METADATA");
}
/**
 * @desc Redirect URL for logout response
 * @param  {object} requescorresponding request, used to obtain the id
 * @param  {object} entity                      object includes both idp and sp
 * @param  {function} customTagReplacement     used when developers have their own login response template
 */
function logoutResponseRedirectURL(requestInfo, entity, relayState, customTagReplacement) {
    var metadata = {
        init: entity.init.entityMeta,
        target: entity.target.entityMeta,
    };
    var initSetting = entity.init.entitySetting;
    var id = initSetting.generateID();
    if (metadata && metadata.init && metadata.target) {
        var base = metadata.target.getSingleLogoutService(binding.redirect);
        var rawSamlResponse = void 0;
        if (initSetting.logoutResponseTemplate && customTagReplacement) {
            var template = customTagReplacement(initSetting.logoutResponseTemplate);
            id = (0, utility_1.get)(template, "id", null);
            rawSamlResponse = (0, utility_1.get)(template, "context", null);
        }
        else {
            var tvalue = {
                ID: id,
                Destination: base,
                Issuer: metadata.init.getEntityID(),
                EntityID: metadata.init.getEntityID(),
                IssueInstant: new Date().toISOString(),
                StatusCode: urn_1.namespace.statusCode.success,
            };
            if (requestInfo && requestInfo.extract && requestInfo.extract.request) {
                tvalue.InResponseTo = requestInfo.extract.request.id;
            }
            rawSamlResponse = libsaml_1.default.replaceTagsByValue(libsaml_1.default.defaultLogoutResponseTemplate.context, tvalue);
        }
        return {
            id: id,
            context: buildRedirectURL({
                baseUrl: base,
                type: urlParams.logoutResponse,
                isSigned: entity.target.entitySetting.wantLogoutResponseSigned,
                context: rawSamlResponse,
                entitySetting: initSetting,
                relayState: relayState,
            }),
        };
    }
    throw new Error("ERR_GENERATE_REDIRECT_LOGOUT_RESPONSE_MISSING_METADATA");
}
var redirectBinding = {
    loginRequestRedirectURL: loginRequestRedirectURL,
    loginResponseRedirectURL: loginResponseRedirectURL,
    logoutRequestRedirectURL: logoutRequestRedirectURL,
    logoutResponseRedirectURL: logoutResponseRedirectURL,
};
exports.default = redirectBinding;
//# sourceMappingURL=binding-redirect.js.map