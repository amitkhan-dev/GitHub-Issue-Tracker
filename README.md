1. What is the difference between var, let, and const?
Ans:
var: is the old way of storing data. It can sometimes cause confusion because it doesn't stay strictly inside the "box" (block) where i create it.
let: is the modern and safer way to save data that might change later. It stays strictly inside the curly braces {} .
const:same as let but const is for data that is permanent. Once we give it a value,  cannot change it later.

2. What is the spread operator (...)?
ans:The spread operator is used to copy or "spread" all elements from one array or object into another. If we have an array and we want to copy its items into a new one, we just used (...) to "spread" them out. It’s very helpful for making copies of data without touching the original one.

3. What is the difference between map(), filter(), and forEach()?
ans:
map(): It goes through every item in an array, does something to it, and gives you a brand new array with the results.
filter(): It checks every item against a condition and only gives you the ones that pass. I used this to show only "Open" or "Closed" issues.
forEach(): It is a simple loop that just visits every item. It doesn't give a new array; it’s just for doing a task, like adding a click event to all my buttons.

4. What is an arrow function?
Ans: An arrow function is a short and clean way to write functions.Typing out the word function, we use a little arrow =>. It makes the code look much shorter and easier to read.

5. What are template literals?
Ans: These are strings that we write inside backticks (``). The coolest thing is that you can put variables directly inside the text using ${variable}. I used this to create my search API link dynamically when a user types in the search box.
