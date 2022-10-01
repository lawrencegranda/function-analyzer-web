import Function from './Function.js';

function topButton() {
    const backToTopButton = document.querySelector(".back-to-top")

    const scrollContainer = () => {
        return document.documentElement || document.body;
    };

    document.addEventListener("scroll", () => {
        if (scrollContainer().scrollTop * 100.0 / window.innerHeight > 60) {
            backToTopButton.classList.remove("hidden")
        } else {
            backToTopButton.classList.add("hidden")
        }
    });

    const goToTop = () => {
        document.body.scrollIntoView({ behavior: "smooth", });
    };

    backToTopButton.addEventListener("click", goToTop);
}


var isPolynomial = false;

function PolRadioButtons() {
    const radio_buttons = document.querySelectorAll(".isPolRadio");
    for (let i = 0; i < radio_buttons.length; i++) {
        let radioBtn = radio_buttons[i];

        radioBtn.addEventListener("click", e => {

            let radio_buttons = document.querySelectorAll(".isPolRadio");
            let button = e.target;

            for (let j = 0; j < radio_buttons.length; j++) {
                let radioBtn = radio_buttons[j];
                if (button.htmlFor == radioBtn.htmlFor) {
                    radioBtn.style.color = "black";
                    radioBtn.style.backgroundColor = "rgb(235, 200, 0)";
                } else {
                    radioBtn.style.color = "";
                    radioBtn.style.backgroundColor = "";
                }
            }

            if (e.target.innerHTML == "Yes") {
                isPolynomial = true;
                document.querySelector("#polynomial-title").innerHTML = "Your Polynomial:";
                document.querySelector("#rangeLabel").innerHTML = "Degree: ";
                document.querySelector("#degreeRange").disabled = false;
                document.querySelector("#expInput").disabled = true;
                document.querySelector("#expInput").placeholder = "Enter the coefficients in the table above";
                document.querySelector("#expInput").value = "Enter the coefficients in the table above";
            } else {
                isPolynomial = false;
                document.querySelector("#polynomial-title").innerHTML = "Your function must be a Polynomial";
                document.querySelector("#rangeLabel").innerHTML = "Your function must be a Polynomial";
                document.querySelector("#degreeRange").disabled = true;
                document.querySelector("#expInput").disabled = false;
                document.querySelector("#expInput").value = "";
                document.querySelector("#expInput").placeholder = "Type your function";
                coeffTable(0);
            }

            console.log("IsPolynomial: " + isPolynomial);
        });

    }
}


var coefficients;
var degree = undefined;

function degreeRange() {
    const range = document.querySelector("#degreeRange");
    const rangeLabel = document.querySelector("#rangeLabel");

    range.addEventListener("input", (e) => {
        if (isPolynomial == true)
            degree = e.target.value;
        rangeLabel.innerHTML = "Degree: " + degree;
        console.log(rangeLabel.innerHTML);

        coeffTable(degree);
        coefficients = new Array(degree + 1).fill(0);
    });
}


var expression;

function coeffTable(rows) {
    let table = document.querySelector("#tableBodyCoeff");
    table.innerHTML = "";
    if (rows != 0) {

        let innerHtml = "";
        for (let i = rows; i >= 0; i--) {
            innerHtml += '<tr> <td scope="row" contenteditable="true" class="coeffCell" id="coeffCell-' + i + '">0</td> <th>x<sup>' + i + '</sup></th> </tr>';
        }
        table.innerHTML = innerHtml;

        let cells = document.querySelectorAll(".coeffCell");
        for (let i = cells.length - 1; i >= 0; i--) {
            cells[i].addEventListener('blur', (e) => {
                let index = parseInt(e.target.id.match(/\d/g).join(""));
                coefficients[index] = parseFloat(e.target.innerHTML);
                if (isNaN(coefficients[index]) || coefficients[index] == undefined || coefficients[index] == null) {
                    coefficients[index] = 0;
                }
                e.target.innerHTML = coefficients[index];

                expression = new Function(coefficients);
                document.querySelector(".polynomial").innerHTML = expression.formatHtml();
            });
        }
    }
}


function getStringExpression() {
    document.querySelector("#expInput").addEventListener('blur', (e) => {
        expression = new Function(e.target.value);
        e.target.value = expression.toString();
        console.log(expression.toString());
    });
}


let minmax = new Array(2);

function getInterval() {
    let intervals = document.querySelectorAll(".myInput");

    for (let i = intervals.length - 1; i >= 0; i--) {
        intervals[i].addEventListener('blur', (e) => {
            let index = parseInt(e.target.id.match(/\d/g).join("")) - 1;

            minmax[index] = parseFloat(e.target.value);
            if (isNaN(minmax[index]) || minmax[index] == undefined || minmax[index] == null) {
                e.target.value = "";
                minmax[index] = undefined;
            } else {
                e.target.value = minmax[index];
            }
        });
    }
}


var roots;

function getRoots() {
    let div = document.querySelector("#rootsResults");

    document.querySelector("#loadRoots").addEventListener('click', (e) => {
        expression.setInterval(minmax[0], minmax[1]);
        roots = expression.getZeros();
        console.log("Interval: " + expression.interval);
        console.log("Roots: " + roots);

        if (typeof(roots) == "string") {
            div.innerHTML = '<h3>' + roots + '</h3>';
        } else {
            div.innerHTML = '<table class="table"><thead><tr><th scope="col">Order</th><th scope="col">Root</th></tr></thead><tbody id="tableBodyRoots"></tbody></table>';
            let table = document.querySelector("#tableBodyRoots");

            table.innerHTML = "";
            let innerHtml = "";

            for (let i = 0; i < roots.length; i++) {
                innerHtml += '<tr> <th scope="row">' + i + '</th> <td class="rootCell">' + roots[i] + '</td> </tr>';
            }
            table.innerHTML = innerHtml;
        }
    });
}

function main() {
    topButton();
    PolRadioButtons();
    degreeRange();
    getInterval();
    getStringExpression();
    getRoots();
}

/*
    DONE    - Decide if polynomial
    DONE        - Decide degree of polynomial
    DONE        - Enter all coefficients
    TODO    - Enter expression if not polynomial
    TODO    - Set interval of interest
    TODO    - Display roots of the polynomial 
*/

main();