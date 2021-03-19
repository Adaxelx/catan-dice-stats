# Catan dice stats

## Motivation

As title is saying it's simple statistic tool for game Settlers of Catan ( and it extension: Cities and Knights )

Why I made it? I decided with my parents ( with whom I love to play ) that will be interesting to analyze statistics of game and learn why someone win and answer to questions: 

- If player have the most resources will he always win?
- Is it optimal to settle on port at start and risk everything to one resource?
- Is there some "unnatural" dice stats or it is as probability tells?

and many many more...

## Build status

Project is actually ended. I mailny focused on mobile version but desktop is also playable. Maybe I will create more friendly interface on desktop later on. I also added 2 languages ( Polish which is my native language and English for everyone not from Poland ).

## Code style

I used React for this project ( and Node.js + Express for backend ). For styling I used styled-components and bootstrap (for faster styling).

#### When its component file looks like:

COMPONENT_NAME.jsx

#### For export: 

index.js (in the same folder as component)

#### For styles:

COMPONENT_NAME.css.js

#### So typical folder (for example for Dashboard component) will look like:

Dashboard
|
|- Dashboard.jsx
|- Dashboard.css.js
|- index.js

#### My folder structure:

- assets - collection of images
- components - all components for views (Dashboard and History)
- config - API routes
- constants - all constants used in project (for example translations)
- context - React context used in project (GameContext and ThemeContext)
- functions - functions for fetching from API
- hooks - custom hooks ( useTranslation only for this project )
- views - 2 views of application ( Dashboard and History )

## Screenshots

As I not mentioned yet application have two "versions". One is for my use and other is for general use. Reason for that is my data base is really small (only 500mb) and I can't store everyone games. 

That's why I added feature which can share game stats with you but can't save it to data base. Therefore you should take screenshots from this stats if you want to keep it for longer. Otherwise after reloading page you will lose it.

### General version

![Zrzut ekranu 2020-11-10 o 22 40 55](https://user-images.githubusercontent.com/48855027/98737969-50f9f080-23a7-11eb-894b-c59918df79a9.jpg)<br />

This is start window. As you can see there is only one overlap above form called "Players". As you probably figured out there will be players added by us.<br />

![Zrzut ekranu 2020-11-10 o 22 41 28](https://user-images.githubusercontent.com/48855027/98737975-522b1d80-23a7-11eb-9461-450d2d3f0b13.jpg)<br />

After we addedd a player we will see new overlap called "Add building". We can choose type of building (Settlement/City) and player to which we want assign our building.<br />

![Zrzut ekranu 2020-11-10 o 22 41 59](https://user-images.githubusercontent.com/48855027/98737977-535c4a80-23a7-11eb-9f4d-ebdb6769f15f.jpg)<br />

We can pick resource and number we can click "Add resource" button to save it. As we ended adding our resorces (remember there is max 3 for settlement and max 6 for city) we can click "Add building" button or "Reset" if we made mistake somewhere.<br />

![Zrzut ekranu 2020-11-10 o 22 42 45](https://user-images.githubusercontent.com/48855027/98737983-53f4e100-23a7-11eb-8c3c-884b85ddfa7f.jpg)<br />

We are back to our "Players" overlap. As you can see in this fold we can check which buildings are asigned to which player. We can check there resources of other players buildsing and when they build them. We can also delete building or player if we made a mistake and upgrade them (or downgrade - only in extension "Cities and knights"). As we can see there is also "Start the game" button.<br />

![Zrzut ekranu 2020-11-10 o 22 42 54](https://user-images.githubusercontent.com/48855027/98737985-548d7780-23a7-11eb-8653-c74e0957c00c.jpg)

Let's see the "real game". I mean real statistic tool because real game is taking place somewhere in your house probably. There is maximum simplicity of that. You should only click numbers which are rolled on your real dice. Nothing plainer than that. You have also to add new buildings and upgrade them. That takes some more time but if you used to that you can easily do it in one turn. Reason for that simplicity is obvious - we don't want to loose fun of playing for some statistics. Prorities must be set!

![Zrzut ekranu 2020-11-10 o 23 10 16](https://user-images.githubusercontent.com/48855027/98739638-02018a80-23aa-11eb-86c9-eb2a0a8a0408.jpg)

There is also screen for extension game board. As you can compare there is 4 more dice options. Unfortunely or fortnulely they are disabled. It's because you first must pick number from regular dices and then if you click it you can pick event dice roll. It is safety move for not clicking for example two times in a row number.

![Zrzut ekranu 2020-11-10 o 22 44 01](https://user-images.githubusercontent.com/48855027/98737986-548d7780-23a7-11eb-864f-ce84800e5a6f.jpg)

You can play now! After you make some moves maybe you want to check how dice rolls looks like and check count of them. You can see it in overlap called "Game statistic". By the way I didn't mention about section above it. You can check there which queue is actually taken place and player which should roll the dice.

![Zrzut ekranu 2020-11-10 o 22 44 17](https://user-images.githubusercontent.com/48855027/98737987-55260e00-23a7-11eb-8ec2-3d83bbf2577b.jpg)

You ended your game. Finally you can check your statistics! You can find "Generate statistics" button below board. As you click it there will appear new overlap with title of your game (it's generated automaticly). Let's check what's inside!

![Zrzut ekranu 2020-11-10 o 22 44 34](https://user-images.githubusercontent.com/48855027/98737991-55260e00-23a7-11eb-8150-b5cb66788cac.jpg)

As we can see there many of tabs. We have main tabs called: General statistics and Players stats: X (where X is name of player - there are statistics for every player!). 

![Zrzut ekranu 2020-11-10 o 22 45 06](https://user-images.githubusercontent.com/48855027/98737995-55bea480-23a7-11eb-93ed-9fb7ee81a6a3.jpg)

First tab in "General statistics" is "Throws stats(total: X)" where we can see percentage splitage of every throw and count how many of which number rolled out. We have also that statistics for every player.

![Zrzut ekranu 2020-11-10 o 22 45 20](https://user-images.githubusercontent.com/48855027/98737997-56573b00-23a7-11eb-9694-4490de60234a.jpg)

Second tab in "General statistics" is "Throws history" which is similar to the "Game statistic" from main game. But there is one more difference!

![Zrzut ekranu 2020-11-10 o 22 45 32](https://user-images.githubusercontent.com/48855027/98737999-56573b00-23a7-11eb-9cf3-7278317d3b1b.jpg)

You have the longest streak of number checked by yellow colour so you can check who have most resources in this strike!

![Zrzut ekranu 2020-11-10 o 22 45 40](https://user-images.githubusercontent.com/48855027/98738000-56efd180-23a7-11eb-8deb-0cd7c07fdda4.jpg)

Next tab is "Resources stats(total: X)". We can check which resource was most common in your game and which is hardly even seen. You can also check it for every player and every building of player!

![Zrzut ekranu 2020-11-10 o 22 44 55](https://user-images.githubusercontent.com/48855027/98737993-55bea480-23a7-11eb-9817-b9541c45b423.jpg)

As I mentioned before there is also the same statistics for every player and building of player so you can check which building was most effective and answer the questions from beginning of the Readme ;)

### Private version

#### TO DO

## Tech/framework used

#### Frontend built with React.js

#### Backend built with Node.js + Express


