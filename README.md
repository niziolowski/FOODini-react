# FOODini

My first real-life project. App for reducing food waste by tracking storage expiration date, planning meals, shopping list generation and finally refilling the storage.

## DEMO (work in progress): https://foodini-react.netlify.app/

## Biggest challenges:

### API Database:

This app might look simple but the data is very interconnected. Recipes indicate available ingredients, meal plan is calculating and using the storage items, shopping list is generated based on meal plan and storage. This level of complexity could be easily solved on the back-end side but i'm learning Front-end so i want to focus only on one thing at once.

I am using a free API database platform that has a request limit of 10 request per 20 seconds so i have to think about how and when the app makes the requests and reduce them to bare minimum while still preserving the flexibility.

### CSS:

I wanted the app to look simple but great and while this is achievable, making it look as good on mobile devices or different web browsers is a real challenge. It might be the thing that will take me the most time overall. And i have to say Safari is by far the worst thing that could happen to me while coding.

### Forms:

Forms take forever to build, so i decided to use a library called 'react-form-hook' and it saved my life. It created some new problems but almost all of them were described in the documentation or on the community forum.

### Lack of mentoring:

I have only a single programmer friend and i try to respect his time not using him to much so i've experienced a lot of frustration in the beginning. Later i started using ChatGPT as my personal programming assistant and it is quite useful. Even when using external libraries, it can show me examples relevant to my context and specific problem. Often helps me with simple debugging and saves me time that i would spend on searching the web.

## DEMO of the previous version (MVC Prototype): https://foodini-dev.netlify.app/

I built it using only JS and MVC architecture. This was a learning project i started when i finished JS course. A lot of things don't work as expected or at all. I have never finished it as i started learning React and started from scratch.
