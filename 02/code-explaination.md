# Scientific Calculator Code Explanation

This document provides a comprehensive explanation of the scientific calculator application built with HTML, CSS, and JavaScript.

## Overview

This is a fully functional scientific calculator web application that features beautiful mathematical rendering using KaTeX, support for various mathematical operations, and both degree and radian modes for trigonometric functions.

## Structure

The application is a single-page HTML file containing three main sections: HTML structure, CSS styling, and JavaScript functionality.

---

## HTML Structure

### Document Setup

The HTML document begins with standard meta tags and imports the KaTeX library for rendering mathematical expressions:

- **KaTeX CSS and JS** are loaded from CDN (version 0.16.9)
- The `defer` attribute ensures the script loads after HTML parsing
- Viewport meta tag ensures responsive design on mobile devices

### Main Layout Components

**Calculator Container**: The main wrapper that holds all calculator elements with rounded corners and shadow effects.

**Header Section**: Displays the title "Scientific Calculator" using the Libre Baskerville serif font and a subtitle with uppercase styling.

**Display Section**: Contains two display areas:
- **Expression Display**: Shows the current mathematical expression with KaTeX rendering
- **Result Display**: Shows the calculated result in real-time

**Mode Toggle**: Two buttons to switch between degree (DEG) and radian (RAD) modes for trigonometric functions.

**Button Grid**: A 5-column grid layout containing all calculator buttons organized in 6 rows.

---

## CSS Styling

### Design Theme

The calculator uses a warm, professional color scheme:
- **Background**: Cream/beige tones (#faf8f5, #f5f2ed)
- **Primary text**: Dark brown (#1a1412)
- **Accent color**: Orange (#d4621a) for operators
- **Typography**: IBM Plex Mono for buttons and displays, Libre Baskerville for the header

### Custom Properties (CSS Variables)

The code uses CSS custom properties for easy theme customization:
```css
--bg-primary, --bg-secondary, --bg-display
--text-primary, --text-secondary
--accent, --accent-hover
--border, --shadow, --shadow-strong
```

### Key Styling Features

**Animations**: Multiple entrance animations create a polished user experience:
- `slideUp`: Container slides up with fade-in effect (0.5s)
- `fadeIn`: Elements fade in sequentially with staggered delays
- Ripple effect on button hover using pseudo-element `::before`

**Button States**: Three button types with distinct styling:
- **Standard buttons**: White background with border
- **Operator buttons**: Orange gradient background
- **Function buttons**: Light beige background

**Interactive Effects**:
- Hover effects with border color change and upward translation
- Active state returns button to normal position
- Circular ripple animation on hover using expanding pseudo-element

**Scrollbar Customization**: Custom styling for the expression display scrollbar with minimal height and rounded thumb.

---

## JavaScript Functionality

### Global Variables

```javascript
let expression = '';      // Stores current mathematical expression
let angleMode = 'deg';   // Angle mode: 'deg' or 'rad'
let lastResult = null;   // Stores last calculated result
```

### Core Functions

#### 1. `setAngleMode(mode)`
Toggles between degree and radian modes for trigonometric calculations. Updates button styling and recalculates if an expression exists.

#### 2. `addToExpression(value)`
Appends a value to the current expression, clears errors, updates the display, and automatically calculates the result.

#### 3. `addPower()`, `addSquare()`, `addFraction()`
Specialized functions for adding mathematical operators:
- Power: adds `^` symbol
- Square: adds `^2` automatically
- Fraction: adds `/` division operator

#### 4. `clearAll()`
Resets the calculator to its initial state by clearing the expression, result, and any error messages.

#### 5. `deleteLast()`
Removes the last character from the expression using `slice(0, -1)` and recalculates if expression remains.

#### 6. `updateDisplay()`
Converts the expression to LaTeX format and renders it using KaTeX. Falls back to plain text if rendering fails.

#### 7. `convertToLatex(expr)`
Transforms calculator notation into LaTeX syntax for beautiful mathematical rendering:
- Converts `×` to `\times`, `÷` to `\div`, `π` to `\pi`
- Wraps square roots: `√(` becomes `\sqrt{`
- Formats powers: `^2` becomes `^{2}`
- Converts fractions: `3/4` becomes `\frac{3}{4}`
- Formats functions: `sin(` becomes `\sin(`
- Balances braces for proper rendering

#### 8. `calculate()`
Evaluates the expression and displays the result:
- Calls `evaluateExpression()` to compute the value
- Formats very small/large numbers in exponential notation
- Handles errors gracefully and displays error messages
- Only shows errors when expression is complete (doesn't end with operator)

#### 9. `evaluateExpression(expr)`
The core calculation engine:
- Converts calculator symbols to JavaScript operators (`×` → `*`, `÷` → `/`)
- Replaces `π` with actual Math.PI value
- Handles trigonometric functions with angle mode conversion
- Uses custom wrapper functions (`sin_calc`, `cos_calc`, `tan_calc`) that respect the current angle mode
- Evaluates using the Function constructor (safer than `eval`)
- Validates result is finite, throws error otherwise

**Trigonometric Function Handling**:
```javascript
const sin_calc = (x) => {
    return angleMode === 'deg' ? Math.sin(x * Math.PI / 180) : Math.sin(x);
};
```
Converts degrees to radians when in degree mode before passing to Math.sin().

### Keyboard Support

The calculator includes comprehensive keyboard bindings:
- **Number keys (0-9)**: Input digits
- **Decimal point (.)**: Add decimal
- **Operators (+, -, *, /)**: Add operations (auto-converts * to ×, / to ÷)
- **Parentheses**: Add grouping
- **Caret (^)**: Add power operator
- **Enter/=**: Calculate result
- **Backspace**: Delete last character
- **Escape**: Clear all

The event listener prevents default browser behavior for certain keys like `/` and `Enter`.

---

## Key Features

### Real-time Calculation
The calculator evaluates expressions as you type, showing results instantly in the result display area.

### Mathematical Expression Rendering
KaTeX library renders mathematical notation beautifully, making expressions easier to read and verify.

### Error Handling
Comprehensive error handling prevents crashes and provides user-friendly error messages for invalid expressions or mathematical errors (like division by zero).

### Responsive Design
The calculator adapts to different screen sizes with flexible layouts and appropriate padding/margins.

### Function Coverage
Supports a wide range of mathematical operations:
- Basic arithmetic: +, -, ×, ÷
- Powers and square
- Square root
- Trigonometric: sin, cos, tan (with deg/rad modes)
- Logarithms: log (base 10), ln (natural log)
- Constants: π
- Parentheses for grouping

---

## Technical Implementation Details

### Safe Evaluation
Instead of using the dangerous `eval()` function, the code uses the Function constructor with a controlled context, passing only necessary mathematical functions as parameters. This prevents code injection attacks.

### Number Formatting
Results are intelligently formatted:
- Very small numbers (< 0.0001): Exponential notation
- Very large numbers (> 1e10): Exponential notation
- Normal range: Fixed decimal format with trailing zeros removed

### CSS Grid Layout
The button grid uses CSS Grid with 5 columns and automatic gap spacing, making the layout clean and maintainable. Some buttons span multiple columns using `.span-2` and `.span-3` classes.

### Animation Sequencing
Staggered animation delays create a cascading entrance effect:
- Container: 0s delay
- Header: 0.2s delay
- Display: 0.3s delay
- Mode toggle: 0.4s delay
- Button grid: 0.5s delay

---

## Browser Compatibility

The calculator uses modern web standards:
- CSS Grid (supported in all modern browsers)
- CSS Custom Properties (variables)
- Template literals in JavaScript
- Arrow functions
- Modern array methods

Requires a browser with JavaScript enabled and support for ES6+ features.

---

## Potential Improvements

While the calculator is fully functional, possible enhancements could include:
- Calculation history
- Memory functions (M+, M-, MR, MC)
- Additional functions (factorial, modulo, etc.)
- Expression editing (cursor positioning)
- Copy result to clipboard
- Dark mode toggle
- Save/load functionality using localStorage
- Support for complex numbers
- Matrix calculations

---

## Conclusion

This scientific calculator demonstrates modern web development practices with clean separation of concerns, beautiful UI design, mathematical accuracy, and comprehensive user interaction support. The code is well-structured, maintainable, and provides an excellent foundation for further enhancement.