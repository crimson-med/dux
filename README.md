![Dux Logo](https://raw.githubusercontent.com/crimson-med/dux/master/img/dux.jpg?token=Aa-t8qcdM9leZOWpCCKIvPCjwnPQ9HDnks5bJkbewA%3D%3D)

**Dux** (/dʌks, dʊks/; plural: ducēs)

Dux is a converter from markdown to ready to deploy websites for documentation.

It is built to lead people easily through your documentation

The idea came from the fact that I always wanted a simple consistent design for my documentation. And when I saw that services like gitbook and more were changing to become payed services. I thought why not design my own.

Markdown makes documentation writting very easy and simple and this can also be used for simple documentation.

# Things To Know

 - Each left menu item is equivalent to a `.md` file
 - The syntax highlight for inline code is js
 - If there is no Code Block design uses one main column
 - Generates a one page website in: duxOutput

# Usage

A simple command line will let you convert your directory into a beautiful documentation website.

```
npm start <projectName> <projectDirectory>
```

Example:

```
npm start DuxApi md
```

You can also install the npm package globally:

```
npm install -g dux-documentation
```

You can then execute Dux with:

```
dux <projectName> <projectDirectory>
```

Render example:

http://medericburlet.com/dux/

# Design Example

![Dux Design](https://raw.githubusercontent.com/crimson-med/dux/master/img/design.png?token=Aa-t8sG_TT-2kcdAO_C0PlMgUFMhPwYIks5bJkbzwA%3D%3D)


# To Do

 - [ ] Change css to SASS for customization
 - [ ] Add Is-Active to menu on `navigateContent`
 - [ ] Review template for menu to add ID of nav-item
 - [ ] Being able to handle Code language specification

# Future implementation

 - tables
 - .dux extension for more customizable .md
 - cards (custom example)

![Dux Card](https://raw.githubusercontent.com/crimson-med/dux/master/img/card.png?token=Aa-t8nUW8MAWzHUhOVRLPqj0G3jT8NWPks5bJkbzwA%3D%3D)

```html
<div class="box message-preview">
  <div class="top">
    <div class="avatar">
      <img src="https://placehold.it/128x128">
    </div>
    <div class="address">
      <div class="name">John Smith</div>
      <div class="email">someone@gmail.com</div>
    </div>
    <hr>
    <div class="content">
    </div>
  </div>
</div>
```
