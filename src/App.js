import React, { useState } from 'react';
import './App.css';

function App() {
  const [alertMsg, setAlertMsg] = useState('');
  const [player1, setPlayer1] = useState('');
  const [contestants, setContestants] = useState([
    { name: null },
    { name: null }
  ]);
  console.log('initial contestants: ', contestants)
  var mario_world = {
    mario: {
      name: "Mario",
      description: "Small and jumpy. Likes princesses.",
      celebration: "Mario wins and does a little dance",
      height: 10,
      weight: 4,
      speed: 12,
      attack_power: function () {
        return mario_world.mario.weight * mario_world.mario.speed;
      }
    },
    luigi: {
      name: "Luigi",
      description: "Tall and speedy. Likes princesses.",
      celebration: "Luigi wins and does a little dance",
      height: 12,
      weight: 3,
      speed: 12,
      attack_power: function () {
        return mario_world.luigi.weight * mario_world.luigi.speed;
      }
    },
    peach: {
      name: "Peach",
      description: "Small and jumpy. Likes princesses.",
      celebration: "Mario wins and does a little dance",
      height: 9,
      weight: 2,
      speed: 14,
      dashModeOn: function () {
        return mario_world.peach.speed + 2;
      },
      dashModeOff: function () {
        return mario_world.peach.speed - 2;
      },
      attack_power: function () {
        return mario_world.peach.weight * mario_world.peach.speed;
      }
    },
    bowser: {
      name: "Bowser",
      description: "Big and green, Hates princesses.",
      celebration: "Bowser wins and does a big roar",
      height: 16,
      weight: 6,
      speed: 4,
      boost: 0,
      attack_boost: () => {
        return mario_world.bowser.boost + 5;
      },
      attack_power: () => {
        return mario_world.bowser.weight * (mario_world.bowser.speed + mario_world.bowser.boost);
      }
    },
    boss_battle: (contestants) => {
      console.log('contestants in battle: ', contestants)
      setAlertMsg(contestants[0].name + " vs " + contestants[1].name);
      if (contestants[0].attack_power() > contestants[1].attack_power()) {
        setAlertMsg(contestants[0].celebration)
        setPlayer1('');
        
      } else {
        setAlertMsg(contestants[1].celebration)
        setPlayer1('');
        

      }
    },
    activate_dash_mode_on: () => {
      if (this.peach.speed === 14) {
        this.peach.dashModeOn();
        setTimeout(() => this.peach.dashModeOff(), 2000);
      }
    }
  }
  let challengers = [];
  let selectedPlayer = [];
  let players = ['mario', 'luigi', 'peach', 'bowser']
  const select_players = () => {
    if (player1 !== '') {
      challengers.push(mario_world[player1])
      selectedPlayer.push(players[player1])
    }
    let random = Math.floor(Math.random() * 4);
    if (challengers.length !== 2) {
      if (players[random] !== selectedPlayer[0]) {
        challengers.push(mario_world[`${players[random]}`])
        selectedPlayer.push(players[random])
      }
      select_players();
      setContestants(challengers)
      return challengers;
    }
  }

  const startGame = (player) => {
    console.log('on click player: ',player)
    setPlayer1(player);
    mario_world.boss_battle(select_players())
  }


  return (
    <div className="App">
      <h1> Mario Battle </h1>
      <div className='alert-msg'>{alertMsg}</div>
      <div className='container'>
        <div className="dropdown">
          <button className="dropbtn btn">Select Player:</button>
          <div className="dropdown-content">
            <button className="btn" value="Mario" onClick={ () => startGame("Mario") }>Mario</button>
            <button className="btn" value="Luigi" onClick={ () => startGame("Luigi") }>Luigi</button>
            <button className="btn" value="Peach" onClick={ () => startGame("Peach") }>Peach</button>
            <button className="btn" value="bowser" onClick={ () => startGame("bowser") }>Bowser</button>
            <button className='btn' onClick={ () => startGame() }> Random Player</button>
          </div>

        </div>
        <div className = 'player-container'>
        <div className='player1'>
          <img src={`/images/${contestants[0].name}.jpeg`} alt='' />
          </div>
        <div className='player2'>
          <img src={`/images/${contestants[1].name}.jpeg`} alt=''/>
          </div>
        </div>
        <label htmlFor='player1'>{contestants && contestants[0].name}</label>
          <label htmlFor='player2'>{contestants && contestants[1].name}</label>
      </div>


    </div>
  );
}

export default App;
