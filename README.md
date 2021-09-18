# Dev Social Media App (working title)
#Authors: Vincent Laquindanum, Buhari Maiwada, Makai Harris & James Bell

## Introduction: 
Connection. As developers, connection is the most important aspect of our careers. It is with connection that we have accomplished many great things and even shaped the entire world. And if you don't believe it, all you have to do is look at what has been accomplished since the first higher-level programming language, Fortran, founded in 1957.

In a short time, we as developers have made such incredible strides. And the credit of those achievements are due to connection, to communication with each other and to the sharing of ideas with each other.

Today, one of the greatest tools of connection, is the internet. We have been able to gather on platforms such as StackOverflow, Developer Forums, GitHub, Mozilla, and Reddit. All of which have been great and have played a valuable role in Software Development. But now a new social media site rises to the pinnacle of resources, one which a Software Developer will use to find what they need and not need to look any further. May we present to you DevBook.

## What is DevBook?
DevBook is a new social media platform where Software Developers can share their code, ask for help, share ideas, discuss events and make valuable connections. The goal of DevBook is to provide a platform which will aid the advancement of the world.

## Why DevBook?
Most resources that Software Developers use to find answers, can be out of date. Google a simple variable and it will tell you to use "var" instead of "let" or "const". DevBook is focus on keeping up with industry standards. It will be a place where you can find the answers to you development issues in a modern way.

## The Design of DevBook
When coming up with the idea of DevBook, we wanted to make a platform that had up to date answers for not only students of Software Development but Senior Developers as well. We wanted a place where all types of developers can share and help one another. 
To make us different, we first looked at our competitors. Most used out of date syntax or had a timestamp that made you uncomfortable about the answers you found. In the technology world, updates occur on a regular basis and can make code obsolete. 
To further our study we asked Software Developers and Student Software Developers a number of questions. Some of the most important questions were, "Do you find the answer you were looking for on the first try? Do you trust those answers? Are they up to date with industry standards? Do you use multiple sources to locate you answers? If you can find multiple answers to a single question and be assured it up to industry standards, would you look for a different source?" A high percentage of responses stated that if a website was able to provide an industry standard answer consistently, that was current, they would use that resource before any others. 
It is with this research we came up with a simple yet effective Social Media Platform to be that one website that all Developers are looking for. Lets show you around...

## Getting Started: 
Heroku: https://limitless-lowlands-64983.herokuapp.com/  <br>
Trello Board : https://trello.com/b/wagAN1Fm/dev-social-media

## A Guided Walk-through of DevBook
#### Login Page
We start here on the Login Page. At DevBook you would create a profile where you would be able to post content, share images, follow your favorite developers and comment on the post of you fellow Developers. But we first need to create a profile.

![Image of Login Page]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-17%20at%2010.14.12%20PM.png)

#### Sign Up Page
Below the "Sign in" button is the "Register" button or in the top right hand corner of the website is a "Sign Up" button. Click on either to be re-directed to the Sign up Page. Once on the Sign up Page enter your name, create a username, enter your email and create a password. After filling out the information, click the "Create account" button and you will be redirected to your Home Page.

![Image of Sign Up Page]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-17%20at%2010.14.36%20PM.png)

#### Home Page
The Home Page is your main page. On your homepage you have your navigation bar. The navigation bar, located on the left hand side of the screen, has the following features. You have the ability to see the developers you are following. You have a profile feature, which takes you to your profile. At the bottom of you navigation bar is the Logout feature. At the top is the search bar which you can use to find other developers. Displayed next to the navigation is the post from other users. You have access to all post on your homepage. Now if you wish to create your own post, you can navigate to the upper right hand corner of the screen and press the "+Create a Post" button. Lets create our first post.

![Image of the Home Page]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-18%20at%208.39.12%20AM.png)

#### Create a Post Popup
After pressing the "+Create a Post" button, a popup will appear on the "Home Page" and you can enter the following information: Title, Description and enter your Language Tags you are using. Now Post don't have to be all about code. You can make any kind of post. Maybe you want to get to know your fellow developers. Its up to you. Now after you create that post, the pop window will disappear and you post will now be at the top of you post section in you homepage.

![Image of Create a Post Popup]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-17%20at%2010.18.29%20PM.png)

#### Edit Post Popup
Need to change your post? You have that ability. Right on your homepage underneath your post is the ability to edit your post. Press that button and it will take you to a similar popup window as the "+Create a Post".

![Image of Update a Post Popup]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-17%20at%2010.18.49%20PM.png)

#### Delete Post
Users will also have the ability to delete their post from their profile page or home page. Located next to the Edit Post Button.

![Image of a post with the delete and edit button]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-18%20at%209.03.08%20AM.png)

#### User Profile
In the Navigation Bar, there is a "Profile button". Pressing this button will take you to your profile. This is what other users would see when selecting your profile. You can see all the post you have created. You can read the comments of those posts. Upload a personal photo or avitar for you profile picture.

![Image of User Profile]
(https://github.com/vincelaq/dev-social-media/blob/james-bell/Screen%20Shot%202021-09-18%20at%209.03.36%20AM.png)

#### Comment on Post
Users are able to comment on others post. And like other users post.

#### Following Page
The Following Page is used to see all the other developers you follow.

## Technologies Used: 
- JavaScript ES6
- HTML5
- CSS3
- Mongo
- Express
- React
- Node.js
- Mongoose
- Axios
- Git
- GitHub
- Insomnia

## Getting Started: 
Heroku: https://devbook-flex525.herokuapp.com/  <br>
Trello Board : https://trello.com/b/wagAN1Fm/dev-social-media

## Routes

| Method 	|              Route             	|  Access  	|                   Descroption                  	|
|:------:	|:------------------------------:	|:--------:	|:----------------------------------------------:	|
| GET    	| /api/users                     	| Public   	| Get all users information    |
| POST   	| /api/auth/signup               	| Public   	| authenticate user signup account               	|
| POST   	| /api/auth/login                	| Private  	| Post user login credential: email and password 	|
| GET    	| /api/users/profile             	| Private  	| Get user profile                               	|
| GET    	| /api/users/profile/:uid        	| Private  	| Get users profile (using user_id)              	|
| GET    	| api/users/following            	| Private  	| Get user's following (list my followings)      	|
| PUT    	| /api/users/image                	| Private  	| Post Image                                     	|
| PUT    	| /api/users/banner               	| Private  	| Post banner                                    	|
| PUT    	| /api/users/profile              	| Private  	| Upadte my profile                              	|
| PUT    	| /api/users/follow/:uid          	| Private  	| Update user's follow                           	|
| DELETE 	| /api/users                      	| Private  	| Delete/destroy users                           	|
| GET    	| /api/posts/                     	| Private  	| Get users posts                                	|
| GET    	| /api/posts/:pid                 	| Private  	| Get one user posts                             	|
| GET    	| /api/users/:uid                 	| Public   	| get all users posts                            	|
| POST   	| /api/posts/                     	| Private  	| Authentucate user posts                        	|
| PUT    	| /api/posts/:pid                 	| Private  	| Authenticate user before updating post         	|
| PUT    	| api/post/like/:pid                | Public   	| update user likes post                         	|
| PUT    	| /api/posts/dislike/:pid           | Public   	| update user dislike post                       	|
| DELETE 	| /api/posts/:pid                   | Private  	| Delete/destroy post                            	|
| POST   	| /api/user/uploads/image-upload 	| Private  	| upload image                                   	|
| GET    	| /api/comments                  	| Public   	| view comments                                  	|
| GET    	| /api/comments/:cid             	| Private  	| Get one comment                                	|
| GET    	| /api/comments/user/:uid        	| Private  	| Get all user comments                          	|
| POST   	| /api//comments/:pid            	| Private  	| Create a comment                               	|
| POST   	| /api/comments/orig/:cid        	| Public   	| Create a nested comment                        	|
| PUT    	| /api/comments/:cid             	| Private  	| Updating a comment                             	|
| PUT    	| /api/comments/like/:cid        	| Private  	| Update comment likes                           	|
| PUT    	| /api/comments/dislike/:cid     	| Private  	| Update comment dislikes                        	|
| DELETE 	| /api/comments/:cid             	| Private  	| Delets comments                                	|

## Unsolved Problems: 
List any unsolved issues.

## Future Enhancements: 
#### Phase One:
- The ability to search for other users by Name, Username, or Email.
- The ability to add images into post and/or comments.
- Update README after completion of Phase One.

#### Phase Two:
- The ability to send private messages to other developers.
- Add a "Messages" link to take you to your personal mailbox.
- Tag users in post that may interest and/or help those users.
- Update README after completion of Phase Two.

#### Phase Three:
- To be able to find posts related to my search query.
- To be able to search for posts that contain certain text or keywords.
- Create a library of all Post and liked post.
- Update README after completion of Phase Three.