// script.js

// Initialization function
function initMathEditor() {
    // Get MathQuill interface
    var MQ = MathQuill.getInterface(2);

    // Create the editable math field
    var mathField = MQ.MathField(document.getElementById('math-field'), {
        // Handler for when the field is edited
        handlers: {
            edit: function () {
                // Get the current LaTeX from the field
                var latex = mathField.latex();

                // Update the LaTeX display
                document.getElementById('latex-output').innerText = 'LaTeX: ' + latex;

                // Render the LaTeX statically using KaTeX in the rendered div
                katex.render(latex, document.getElementById('rendered'), {
                    throwOnError: false,  // Don't throw errors for invalid LaTeX
                    displayMode: false    // Inline mode for rendering
                });
            }
        }
    });

    // Render button labels using KaTeX for nice math symbols
    document.getElementById('btn-frac').innerHTML = katex.renderToString('\\frac{a}{b}', { throwOnError: false });
    document.getElementById('btn-sqrt').innerHTML = katex.renderToString('\\sqrt{a}', { throwOnError: false });
    document.getElementById('btn-sum').innerHTML = katex.renderToString('\\sum_{i=1}^{n}', { throwOnError: false });
    document.getElementById('btn-sup').innerHTML = katex.renderToString('a^{b}', { throwOnError: false });
    document.getElementById('btn-sub').innerHTML = katex.renderToString('a_{b}', { throwOnError: false });
    document.getElementById('btn-paren').innerHTML = katex.renderToString('(\\ )', { throwOnError: false });

    // Add event listeners for toolbar buttons
    // Each button inserts the corresponding LaTeX structure at the cursor position
    document.getElementById('btn-frac').addEventListener('click', function () {
        mathField.focus();          // Focus the field
        mathField.cmd('\\frac');    // Insert fraction structure
    });

    document.getElementById('btn-sqrt').addEventListener('click', function () {
        mathField.focus();
        mathField.cmd('\\sqrt');    // Insert square root structure
    });

    document.getElementById('btn-sum').addEventListener('click', function () {
        mathField.focus();
        mathField.cmd('\\sum');     // Insert summation structure (limits can be added with _ and ^)
    });

    document.getElementById('btn-sup').addEventListener('click', function () {
        mathField.focus();
        mathField.cmd('^');         // Insert superscript
    });

    document.getElementById('btn-sub').addEventListener('click', function () {
        mathField.focus();
        mathField.cmd('_');         // Insert subscript
    });

    document.getElementById('btn-paren').addEventListener('click', function () {
        mathField.focus();
        mathField.write('\\left( \\right)');  // Insert matching parentheses
        mathField.keystroke('Left');          // Move cursor inside the parentheses
    });

    // Trigger initial edit to render empty field
    mathField.handlers.edit();
}

// Run initialization when the document is ready
document.addEventListener('DOMContentLoaded', initMathEditor);