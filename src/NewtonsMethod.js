export default function solve(exp) {
    // const Function = require('./Function') ;

    const order = exp.order;
    const dist = 0.05;
    const start = exp.interval[0];
    const end = exp.interval[1];
    var roots = [];

    if (exp.isRoot(end))
        roots.push(end);


    for (let i = 0; i < Math.round((end - start) / dist); i++) {
        let pRoot = start - 10.5;
        let x1 = start + i * dist;
        let x2 = x1 + dist;

        if (exp.f(x1) * exp.f(x2) <= 0 || exp.d(x1) * exp.d(x2) <= 0) {
            if (exp.isRoot(x1))
                pRoot = x1;
            else
                pRoot = newtonIterations((x1 + x2) / 2.0);
        }
        if (typeof(pRoot) == "number") {
            if (pRoot <= end && pRoot >= start && exp.isRoot(pRoot))
                roots.push(exp.round(pRoot));
        }
    }

    function newtonIterations(x) {
        let itMax = 100;
        let o = order + 5;

        for (let i = 0; i <= itMax; i++) {
            let x1 = x - (exp.f(x) / exp.d(x));

            if (exp.round(x, o) == exp.round(x1, o))
                return x1;

            x = x1;
        }
        return null;
    }

    if (roots.length > 0) {
        roots.sort((a, b) => a - b);
        return [...new Set(roots)];
    }
    return "Roots not found";

}