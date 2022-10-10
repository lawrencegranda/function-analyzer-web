import solve from './NewtonsMethod.js';

export default class Function {


    // convert to string
    toString() {
        return this.exp;
    }


    // constructor
    constructor(exp) {
        this.order = 4;

        // if the argument is a string -> format the string and parse it to a function
        if (typeof(exp) == "string") {
            this.exp = this.format(exp);
            this.isPolynomial = false;  // if it is sting, we assume it is not a polynomial
                                        // HOWEVER, it can be, but you will need to specify a interval

        // if the argument is an object, we assume it is an array of coefficients
        } else if (typeof(exp) == "object") {
            this.coefficients = [...exp];
            this.exp = this.makePolynomial(exp);
            this.isPolynomial = true;
        }

        // call the function to set an initial interval, it can be changed later
        this.setInterval();
    }


    //from a string, we format it so that some intuitive input is valid
    format(exp) {
        for (let i = 1; i < exp.length; i++) {
            if (exp.charAt(i) == 'x' && exp.charAt(i - 1) >= '0' && exp.charAt(i - 1) <= '9')
                exp = exp.substring(0, i) + "*x" + exp.substring(i + 1);
            if (exp.charAt(i - 1) == 'x' && exp.charAt(i) >= '0' && exp.charAt(i) <= '9')
                exp = exp.substring(0, i - 1) + "x^" + exp.substring(i);
        }
        return exp;
    }


    // generate html code that shows the POLYNOMIAL with its exponents
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


    // we set an interval of interest, if none is provided, we assume it is a polynomial,
    // so we bracket the roots depending on the last term that is not 0 (ideally the constant) [-c, +c]
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


    // if we are provided we the coefficients, we parse them into String form
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


    // evaluate the function at a given value
    f(x) {
        let scope = { x: x };
        return math.evaluate(this.exp, scope);
    }


    // evaluate the derivative of the function at a given value
    d(x) {
        const h = (1e-5 + 1e-6) / 2;
        return this.round((this.f(x + h) - this.f(x - h)) / (2.0 * h), 8);
    }


    // evaluate the absolute vlaue of the function at a given value
    f_abs(x) {
        return Math.abs(this.f(x));
    }


    // set the number of decimals
    setOrder(order) {
        this.order = order;
    }


    // calculate the valid difference between values at a given values
    error(x) {
        return Math.abs(this.f(x - Math.pow(10, -1 * this.order)) - this.f(x + Math.pow(10, -1 * this.order))) / 2.0;
    }


    // round a value to a given number of decimals
    // If no number of decimals is provided, it is assumed to be "order"
    round(x, digits = this.order) {
        return Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits);
    }


    // check if a given value is a root/solution (if it triggers 0)
    isRoot(x) {
        return !(this.f_abs(x) > this.error(x));
    }


    // get all the solutions of the function in a interval
    // calls the method SOLVE on Newton's Method
    getZeros() {
        this.roots = solve(this);
        return this.roots;
    }


}
