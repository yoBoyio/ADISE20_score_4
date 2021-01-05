const { db } = require('../util/admin');
const config = require('../util/config');


exports.getHistory = (req, res) => {
  db.collection('score4')
  .get()
  .then((data) => {
    let history = [];
    data.forEach((doc) => {
        const name= req.params.handle;
        const dbname=doc.data().name
        if(name===dbname){
          history.push({
            winner: doc.data().winner,
            room_id: doc.data().room_id,
            player_1: doc.data().player_1,
            player_2: doc.data().player_2,
            draw: doc.data().draw,
            name:doc.data().name
          });
        }
      });
      return res.json(history);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

