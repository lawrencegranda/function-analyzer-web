# FUNCTION ANALYZER
###### by Lawrence Granda
---
## Description:
Function Analyzer is a one-page website that finds all real solutions for any mathematical function. The project folder contains three sub-folders: `node_modules`, `res`, and `src`. The `node_modules` folder houses JavaScript dependencies and modules, while `res` stores resources like images used in the HTML/CSS. The `src` folder holds all the project's code, further divided into `backend` and `frontend`.

In the main folder, you'll find the HTML and CSS files. As a one-page website, it includes only one HTML file. For the CSS, Bootstrap library was used, but most of the styling is hard-coded to gain proficiency in Bootstrap usage.

The `src` folder contains JavaScript files responsible for triggering animations and functionality. It also houses the core of the project - finding the roots of mathematical functions. Three JavaScript files - `Function.js`, `NewtonsMethod.js`, and `script.js` - play key roles. `Function.js` is a JavaScript class with methods to evaluate the function at a value, compute its derivative, check for valid roots, round values, get roots over an interval, and more.

The `getRoot` method in `Function.js` calls `NewtonsMethod.js` method `solve` to obtain the roots of the function. `solve` takes a `Function` object as an argument, while the rest of the data needed is fetched from public variables stored inside the `Function` class.

The `solve` method employs two mathematical algorithms. Firstly, it runs the `bisection` algorithm once to obtain intervals containing roots. Then, it uses the `Newton–Raphson method`, an iterative approach that produces successively better approximations to real roots using the function's derivative. If the method triggers the same value twice in a row, it is considered a root. However, for precision, an additional check is performed.

These chosen algorithms complement each other effectively. Previously, a more complex combination was used, limited to polynomials, which lacked precision due to constant approximation division. After experimenting with various approaches, the combination of `bisection` and `Newton's method` proved successful.

While this combination works well for most functions, there are some limitations. Extremely close roots (within 0.01 apart) may cause the method to fail as the bisection may define the interval as having no roots.

#### Website: https://analyzer.lawrencegranda.me
