## FUNCTION ANALYZER
###### by Lawrence Granda
---
### Description:
My project is a 1 page website that finds all real solutions for any mathematical function. My project folder contains 3 sub-folders: node_modules, res, and src. Node_modules is where the JavaScript dependencies and modules are. The res folder is where the resources are, in this case, the images used in the HTML/CSS. Last, the src folder is where all the code is. Inside the src folder we can find 2 extra folders: backend, and frontend.

In the main folder we have all the HTML and CSS. This website only contains 1 HTML file because I decided to make a 1 page website. For the CSS, I used the library bootstrap; however, I hard-coded most of it as I wanted to get proficient with it.

In the src folder we have all the JavaScript used to trigger the animations and functionality, and all the JavaScript that deals with the core of the project: finding the roots. The JavaScript files are 3: Function.js, NewtonsMethod.js, and script.js. Function.js is a JavaScript class I created where all the methods are. With this class we can evaluate the function at a value, evaluate its derivative, get the relative error, check if a value is a valid root, round a value to a given number of decimals, get the roots over an interval, etc.

The getRoot method in Function.js calls NewtonsMethod.js method *solve* to get the roots of the function. The solve method takes 1 argument: a Function object; the rest of the data needed is fetched from the public variables stored inside the Function.

*solve* uses 2 mathematical algorithms to get the roots. First, it runs a *bisection* ONE TIME to get the intervals that contain a root, and then runs *Newton–Raphson method* to get the root. This algorithm is an iterative method that produces successively better approximations to the real roots of a function using its derivative. If the method triggers the same value 2 times in a row, it is considered to be a root; however, for precision, we check again.

I chose these algorithms because they were easy to complement and work great together. Before this, I was using a more complicated combination that only worked with polynomials. I was finding 1 root over the whole domain, and then synthetically divide to get another polynomial without the root I just found, and run this until I remain with a constant. The problem with this was that it only worked with Polynomials, and it lacks precision because I was constantly dividing by the approximation of a value. So after trying a lot of combinations, I got to the *bisection* and *newton’s* combination.

The combination of both algorithms works greatly, yet it is not perfect. Even though it works for most functions, if 2 roots are extremely close (0.01 apart), the method might not work, as the bisection will define that interval as an interval with no roots.
