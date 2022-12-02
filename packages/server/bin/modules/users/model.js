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
import { isEmpty } from '../function';
import { AbstractCrud } from '../crud';
export var users = [
    { username: 'Kitetop', password: '1', id: '10000' },
    { username: 'Null', password: '2', id: '10001' }
];
var UserModle = /** @class */ (function (_super) {
    __extends(UserModle, _super);
    function UserModle(model, primary) {
        return _super.call(this, model, primary) || this;
    }
    UserModle.getInstance = function (model, primary) {
        if (!this.instance) {
            this.instance = new UserModle(model, primary);
        }
        return this.instance;
    };
    /**
     * 获得用户token
     * @param username
     * @param password
     * @returns
     */
    UserModle.prototype.getToken = function (username, password) {
        var user = this.searchUser({ username: username, password: password });
        if (user) {
            return "".concat(username, "_").concat(password);
        }
        return null;
    };
    /**
     * 根据用户名和密码查找指定信息
     * @param username
     * @param password
     */
    UserModle.prototype.searchUser = function (user) {
        var result = this.find(user);
        if (!isEmpty(result))
            return result;
        return null;
    };
    /**
     * 生成自增为1的id
     * @returns
     */
    UserModle.prototype.generateId = function () {
        var lastId = +(this.model[this.model.length - 1].id || 0);
        return "".concat(lastId + 1);
    };
    return UserModle;
}(AbstractCrud));
export var getUserModle = function () { return UserModle.getInstance(users); };
