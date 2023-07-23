# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Todo app solution](#frontend-mentor---todo-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
      - [Dark Mode Desktop View](#dark-mode-desktop-view)
      - [Light Mode Mobile View](#light-mode-mobile-view)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

#### Dark Mode Desktop View
![desktop dark mode](https://i.imgur.com/uJb98TX.png)

#### Light Mode Mobile View
![mobile light mode](https://i.imgur.com/E1NTaoW.png)

### Links

- Solution URL: [Add solution URL here](https://fabulous-biscuit-872b3a.netlify.app/)
- Live Site URL: [Github](https://github.com/gab0o06)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Desktop-first workflow
- [React](https://reactjs.org/) - JS library


### What I learned

I've use the matchMedia to get a boolean to determine whether the device is mobile or desktop. 

```tsx
  useEffect(() => {
    const mql = matchMedia("(max-width: 480px)");
    mql.matches && setIsPhoneView(!isPhoneView);
  }, []);
```

Also, I use the useRef hook, to create some values that don't affect the DOM re-rendering.

```tsx
  const id = useRef<number>(1);
  const createTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let input = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      if (!input.value) return alert("Please enter a task...");
      setTasksList([
        ...tasksList,
        { id: id.current.toString(), task: input.value, completed: false },
      ]);

      id.current += 1;

      input.value = "";
    }
  };
```

### Continued development

I want to learn NextJs to improve my knowledge of Web Development, including node and express at backend level.


## Author

- Website - [gab0o06](https://github.com/gab0o06)
- Frontend Mentor - [@gab0o06](https://www.frontendmentor.io/profile/gab0o06)