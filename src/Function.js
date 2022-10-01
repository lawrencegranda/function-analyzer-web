import solve from './NewtonsMethod.js';

export default class Function {

    toString() {
        return this.exp;
    }

    constructor(exp) {
        this.order = 4;
        if (typeof(exp) == "string") {
            this.exp = this.format(exp);
            this.isPolynomial = false;
        } else if (typeof(exp) == "object") {
            this.coefficients = [...exp];
            this.exp = this.makePolynomial(exp);
            this.isPolynomial = true;
        }
        this.setInterval();
    }

    format(exp) {
        for (let i = 1; i < exp.length; i++) {
            if (exp.charAt(i) == 'x' && exp.charAt(i - 1) >= '0' && exp.charAt(i - 1) <= '9')
                exp = exp.substring(0, i) + "*x" + exp.substring(i + 1);
            if (exp.charAt(i - 1) == 'x' && exp.charAt(i) >= '0' && exp.charAt(i) <= '9')
                exp = exp.substring(0, i - 1) + "x^" + exp.substring(i);
        }
        return exp;
    }

    formatHtml() {
        let exp = " " + this.exp.toString() + " ";
        for (let i = 0; i < exp.length; i++) {
            if (exp.charAt(i) == 'x' && exp.charAt(i - 1) == '*')
                exp = exp.substring(0, i - 1) + exp.substring(i);
            if (exp.charAt(i) == '^') {
                let temp = parseInt(exp.substring(i + 1, exp.indexOf(' ', i + 1)));
                if (temp == 1)
                    temp = "";
                exp = exp.substring(0, i) + " <sup>" + temp + "</sup> " + exp.substring(exp.indexOf(' ', i + 1) + 1);
            }
        }
        return exp;
    }

    setInterval(a = this.f_abs(0), b = -1 * this.f_abs(0)) {
        if (isNaN(a) || isNaN(b)) {
            setInterval(this.f_abs(0), -1 * this.f_abs(0));
            console.error("Error: Invalid interval. At least one value is NaN");
            return 1;

        } else if (a == b && this.isPolynomial) {
            let tempCoeff = [...this.coefficients]
            tempCoeff = tempCoeff.filter(function(val) {
                return val !== 0 && val !== undefined && val !== null;
            });
            let temp = new Function(tempCoeff);
            this.interval = temp.interval;

        } else
            this.interval = [Math.min(a, b), Math.max(a, b)];
    }

    makePolynomial(exp) {
        let str = [];
        for (let i = exp.length - 1; i > 0; i--) {
            if (exp[i] > 0)
                str.push("+" + exp[i] + "*x^" + i);
            else if (exp[i] < 0)
                str.push(exp[i] + "*x^" + i);
        }
        if (exp[0] > 0)
            str.push("+" + exp[0]);
        else if (exp[0] < 0)
            str.push(exp[0]);
        return str.join(" ");
    }

    f(x) {
        let scope = { x: x };
        return math.evaluate(this.exp, scope);
    }

    d(x) {
        const h = (1e-5 + 1e-6) / 2;
        return this.round((this.f(x + h) - this.f(x - h)) / (2.0 * h), 8);
    }

    f_abs(x) {
        return Math.abs(this.f(x));
    }

    setOrder(order) {
        this.order = order;
    }

    error(x) {
        return Math.abs(this.f(x - Math.pow(10, -1 * this.order)) - this.f(x + Math.pow(10, -1 * this.order))) / 2.0;
    }

    round(x, digits = this.order) {
        return Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits);
    }

    isRoot(x) {
        return !(this.f_abs(x) > this.error(x));
    }

    getZeros() {
        this.roots = solve(this);
        return this.roots;
    }


}