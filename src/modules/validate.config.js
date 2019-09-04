
const validate_config = {
    config : {
        events: 'input|change|blur',
        locale: 'zh_CN',
        aria: true,
        classNames: {
            touched: 'touched', // the control has been blurred
            untouched: 'untouched', // the control hasn't been blurred
            valid: 'valid', // model is valid
            invalid: 'invalid', // model is invalid
            pristine: 'pristine', // control has not been interacted with
            dirty: 'dirty' // control has been interacted with
        },
        classes: false,
        delay: 0,
        // dictionary: zh_CN,
        errorBagName: 'valid_errors', // change if property conflicts
        fieldsBagName: 'valid_fields',
        i18n: null, // the vue-i18n plugin instance
        i18nRootKey: 'validations', // the nested key under which the validation messages will be located
        inject: true,
        strict: true,
        validity: false
    },
    dictionary: {
        name: "zh_CN",
        messages: {
            after: function (n, e) {
                return "必须在" + e[0] + "之后"
            },
            alpha_dash: function (n) {
                return "能够包含字母数字字符、破折号和下划线"
            },
            alpha_num: function (n) {
                return "只能包含字母数字字符"
            },
            alpha_spaces: function (n) {
                return "只能包含字母字符和空格"
            },
            alpha: function (n) {
                return "只能包含字母字符"
            },
            before: function (n, e) {
                return "必须在" + e[0] + "之前"
            },
            between: function (n, e) {
                return "必须在" + e[0] + "与" + e[1] + "之间"
            },
            confirmed: function (n, e) {
                return "不能和" + e[0] + "匹配"
            },
            date_between: function (n, e) {
                return "必须在" + e[0] + "和" + e[1] + "之间"
            },
            date_format: function (n, e) {
                return "必须符合" + e[0] + "格式"
            },
            decimal: function (n, e) {
                void 0 === e && (e = []);
                var t = e[0];
                return void 0 === t && (t = "*"), "必须是数字，且能够保留" + ("*" === t ? "" : t) + "位小数"
            },
            digits: function (n, e) {
                return "必须是数字，且精确到" + e[0] + "位数"
            },
            dimensions: function (n, e) {
                return "必须在" + e[0] + "像素与" + e[1] + "像素之间"
            },
            email: function (n) {
                return "不是一个有效的邮箱"
            },
            ext: function (n) {
                return "不是一个有效的文件"
            },
            image: function (n) {
                return "不是一张有效的图片"
            },
            included: function (n) {
                return "不是一个有效值"
            },
            ip: function (n) {
                return "不是一个有效的地址"
            },
            max: function (n, e) {
                return "不能超过" + e[0] + "个字符"
            },
            max_value: function (n, e) {
                return "必须小于或等于" + e[0]
            },
            mimes: function (n) {
                return "不是一个有效的文件类型"
            },
            min: function (n, e) {
                return "必须至少有" + e[0] + "个字符"
            },
            min_value: function (n, e) {
                return "必须大于或等于" + e[0]
            },
            excluded: function (n) {
                return "不是一个有效值"
            },
            numeric: function (n) {
                return "只能包含数字字符"
            },
            regex: function (n) {
                return "格式无效"
            },
            required: function (n) {
                return "必填项"
            },
            size: function (n, e) {
                var t, r, u, i = e[0];
                return "必须小于" + (t = i, r = 1024, u = 0 == (t = Number(t) * r) ? 0 : Math.floor(Math.log(t) / Math.log(r)), 1 * (t / Math.pow(r, u)).toFixed(2) + " " + ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][u])
            },
            url: function (n) {
                return "不是一个有效的url"
            }
        }
    }
}

module.exports = validate_config;