# ADISE20_score_4


## Demo Page 
You can try it at http://score4-front-adise.herokuapp.com/

Connect4 online game

#### Local installation
*You will need to install [node.js](https://nodejs.org/en/download/) before running it locally.*

git clone https://github.com/iee-ihu-gr-course1941/ADISE20_score_4.git

Run backend server:
```
$ cd backend
$ npm install
$ npm start
```
If there are any issues, you may need to upgrade your node version.

Run react server:
```
$ cd frontend
$ npm install
$ npm start
```
## Contributors

Samsouri Nasia: Backend Developer

Tolios Dimitris: Frontend Developer 

## Routes
| Method | URI | Description|
| --- | --- | --- |
| GET | `/` | Home Page. If the user is logged in, shows this player's history|
| GET | `/login`| Shows login page|
| POST | `/login`| Returns user's authentication Token|
| GET | `/signup`| Shows signup page|
| POST | `/signup`| Registers the user to the db and then returns user's authentication Token|
| GET | `/score4`| Initializes a new room, or joins one|



## API

### User Model
Stores the data of every registered User.
| Field | Description |
| --- | --- |
|`email`|User's email|
|`handle`| username|
|`userId`| Unique ID for every player|
|`createdAt`| Timestamp from when the user registered|

### Game Model
Stores the data of each game after it is ended.
| Field | Description |
| --- | --- |
|`board`| One Dimensional Array of the board's final state|
|`player_1`| First Player's ID|
|`player_2`| Second Player's ID|
|`draw`| Boolean Indicating if the game ended in draw|
|`winner`| Winner's ID (or null)|
|`height`| Board's number of Rows (default: 6)|
|`width`| Board's number of Columns (default: 7)|

### Room
| Field | Description |
| --- | --- |
|`maxClients` | How many Clients can join a room |
|`players {}` | Stores the 2 connected players |
|`turn`   |     Player's turn to play (1 or 2)|

**Methods**
| Method | Description |
| --- | --- |
|`onCreate` | Creates a room with null board|
|`onJoin`| Triggered with every connection that joins the room|
|`setupGame`| Initializes the board and starts the game|
|`handlePlay`| Handles the players' turn, ckecks win or draw|
|`onLeave`| Triggered when a player leaves the room|
|`onDispose`| Triggered when the game is ended|
