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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AbstractCrud = /** @class */ (function () {
    function AbstractCrud(model, primary) {
        this.primary = 'id';
        // 浅拷贝一下 避免污染全局常量
        this.model = __spreadArray([], model, true);
        primary && (this.primary = primary);
    }
    /**
     * 根据id查找符合条件的结构
     * @param id
     * @returns
     */
    AbstractCrud.prototype.findById = function (id) {
        var _this = this;
        var result = this.model.filter(function (v) {
            return v[_this.primary] === id;
        });
        return result[0];
    };
    /**
     * 根据model数据格式来查找数据
     * @param model 如果值的末尾存在%，则启用模糊搜索
     * @returns
     */
    AbstractCrud.prototype.find = function (model) {
        var keys = Object.keys(model);
        return this.model.filter(function (m) {
            return keys.every(function (k) {
                // 新构建model中的值
                var v = model[k];
                // model中记录的原始值
                var origin = m[k];
                if (typeof v === 'string' && typeof origin === 'string' && v.charAt(v.length - 1) === '%') {
                    return origin.includes(v.slice(0, v.length - 1));
                }
                return origin === model[k];
            });
        });
    };
    /**
     * 保存或者更新结果
     * @param model
     */
    AbstractCrud.prototype.save = function (model) {
        var _this = this;
        var id = model[this.primary];
        if (this.findById(id)) {
            // 如果model中已经存在，那么则更新 保持跟之前一样的顺序
            this.model = this.model.map(function (m) {
                if (m[_this.primary] === id) {
                    return __assign(__assign({}, m), model);
                }
                return m;
            });
            return;
        }
        // 如果不存在，那么则新增记录
        this.model.push(model);
    };
    /**
     * 获得全量的数据
     * @returns
     */
    AbstractCrud.prototype.findAll = function () {
        return __spreadArray([], this.model, true);
    };
    return AbstractCrud;
}());
export { AbstractCrud };
