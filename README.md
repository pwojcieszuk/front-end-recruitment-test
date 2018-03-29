# Some remarks to this solution

 - Credit card in real life should be validated by checking against card types - not doing it here, I figure you want to check if I can implement validation in general. I am just providing some example validation like number of digits here.

 - Credit card image is not present - in real life I would probably try to detect credit card type and display related image. If possible, I ‘d use external library with good record of security precautions.

- Most solutions used should work in all standard modern browsers (IE10+, though IE9 should theoretically be ok with most of them). Tested in latest Chrome, FF and Safari on MacOs. In real life, I would probably consider broader browser range, depending on specified requirements.

- Final form submit is not handled - we could do it by either allowing standard form submit and page reload or by handling form values in some sort of fetch request. Personally, I’d probably use ajax and handle the result in promise chain.

- I am also assuming there is just one form with these values on the page. Most of the time when I would be writing a widget I would think about ways to namespace all code (js and css/scss) so that multiple instances of the same widget could be used without conflicts. I am not doing it for this task, I believe  that having multiple checkout forms on one page is quite a specific use case.

- I did refactor js code to satisfy the built-in linter complaints, but if it were my real project, I'd use different config - in my opinion, restriction like max 80 chars in a line or no alerts are debatable. Left some errors where refactoring them would be a big inconvenience (long regular expressions for example). I did not have the stamina to go through GWT linter config, sorry.

# Snowdog Front-end Recruitment test

Test is based on [Google Web Starter Kit](https://github.com/google/web-starter-kit) v0.6.5

### Task 1
Fork this repository. Remember to commit changes after every task (if necessary).

### Task 2
Follow Google Web Starter Kit ["instalation instructions"](https://github.com/google/web-starter-kit/blob/master/docs/install.md). Then you will see test page on http://localhost:3000/

### Task 3
Add [this repo](https://github.com/SnowdogApps/front-end-recruitment-test-submodule) as submodule at `/submodule` folder, then run gulp task `submodule`, to add symlink. [Here](http://localhost:3000/submodule.html) you will see beautiful page with slices of fried bacon.

Now you should write JS to clone bacon image and attach this action to **Yeah, I want more bacon!** button.

### Task 4
Back to main repo and add another tab - **Checkout**. Project is in `/projects/checkout.png` - make this tab as similar to project as you can. Use SCSS to write your styles.

### Task 5
Add simple JS validation to checkout form created earlier. Remember to show success/error message on form submit.

--

After finishing all tasks send us your CV and link to repository at jobs@snow.dog, then wait for answer. Bye!
