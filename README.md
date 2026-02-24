*****. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?****

getElementById() selects a single element using its id. It returns one element.

getElementsByClassName() selects elements using a class name. It returns a live HTMLCollection

*****. How do you create and insert a new element into the DOM?****

To create and insert a new element:

Create the element using document.createElement()

Add content (textContent or innerHTML)

***. What is Event Bubbling?**

Event bubbling means the event starts from the clicked element and moves up to its parent elements.

***. What is Event Delegation? Why is it useful?**

Event delegation means adding one event listener to a parent instead of multiple child element

***.Difference between preventDefault() and stopPropagation()**

preventDefault() → stops default browser behavior.

stopPropagation() → stops the event from bubbling up.
