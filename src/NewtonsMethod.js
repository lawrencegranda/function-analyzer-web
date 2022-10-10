export default function solve(exp) {

    // EXP has to be a Function object
    // fetch all the data of the function
    const order = exp.order;
    const dist = 0.025;
    const start = exp.interval[0];
    const end = exp.interval[1];
    // array of all valid roots
    var roots = [];


    // if the end of the interval is a root, append it to the array of roots
    if (exp.isRoot(end))
        roots.push(end);


    // run a simple bisection method every 0.025 to check if there is a root in that interval
    for (let i = 0; i < Math.round((end - start) / dist); i++) {
        let pRoot = start - 10.5;
        let x1 = start + i * dist;
        let x2 = x1 + dist;

        // if there is a root on the interval or the derivative is 0 (might be a double root),
        // check if the beginning of the inerval is a root
        // IF NOT, run Newton's Mehtod to get the closest root to the midpoint
        if (exp.f(x1) * exp.f(x2) <= 0 || exp.d(x1) * exp.d(x2) <= 0) {
            if (exp.isRoot(x1))
                pRoot = x1;
            else
                pRoot = newtonIterations((x1 + x2) / 2.0);
        }

        // check if it found a root
        // check if the root is inside the interval
        // check that it is a valid root (triggers 0)
        if (typeof(pRoot) == "number") {
            if (pRoot <= end && pRoot >= start && exp.isRoot(pRoot))
                roots.push(exp.round(pRoot));
        }
    }


    // iterative method to find the root closest to an intial guess (midpoint of interval)
    function newtonIterations(x) {
        let itMax = 100;
        let o = order + 5;

        // uses the derivativ eto approach the root
        // There MUST be a root in the interval, or it might run forever (max interations in case)
        // If it returns the same answer 2 times in a row, it might be a root
        // it only returns 1 root
        for (let i = 0; i <= itMax; i++) {
            let x1 = x - (exp.f(x) / exp.d(x));

            if (exp.round(x, o) == exp.round(x1, o))
                return x1;

            x = x1;
        }
        return null;
    }


    // check that there were roots
    // IF NOT, return a string
    if (roots.length > 0) {
        roots.sort((a, b) => a - b);
        return [...new Set(roots)];
    }
    return "Roots not found";

}
