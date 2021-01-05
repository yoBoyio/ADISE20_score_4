# ADISE20_score_4


## Demo Page 
You can try it at http://score4-front-adise.herokuapp.com/

Connect4 online game

#### Local installation
git clone https://github.com/iee-ihu-gr-course1941/ADISE20_score_4.git

from the backend directory:
```
$ npm install
$ npm start
```
If there are any issues, you may need to upgrade your node version.

from the frontend directory:
```
$ npm install
$ npm start
```

## API

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
|`onJoin`| Triggered with ever connection that joins the room|
|`setupGame`| Initialise the board and starts the game|
|`handlePlay`| Handles the players' turn, ckecks win or draw|
|`onLeave`| Triggers when a player leaves the room|
|`onDispose`| Triggers when the game is ended|
