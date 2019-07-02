import React, {useState} from 'react';
import './App.css';


function App() {
  const [attacker, setAttacker] = useState(null)
  const [defender, setDefender] = useState(null)
  const [gameState, setGameState] = useState('GAME.STARTED')
  const [playerName, setPlayerName] = useState('')
  const [players, setPlayers] = useState([])

  function createPlayer() {
    playerName.trim()

    if (playerName !== "") {
      let copyPlayers = [...players]
      copyPlayers.push({name: playerName, armor: 10, hp: 5})
      setPlayers(copyPlayers)
      setPlayerName('')
    }
  }
  
  return (
    <div className="app">
      <h1>Welcome to Evercraft</h1>
      {
          gameState === 'GAME.STARTED' && 
          <>
            <NewCharacter name={playerName} setName={setPlayerName} createCharacter={createPlayer} type='player'/>
            {players.map((player, i) => <Player {...player} type='player' key={i}/> )}
            <button onClick={() => setGameState('START.BATTLE')}>START BATTLE</button>
          </>
        }
      <div className="versus-container">
        {
          gameState === 'START.BATTLE' && <Battle players={players} attacker={attacker} setAttacker={setAttacker} defender={defender} setDefender={setDefender}/>
        }
      </div>
    </div>
  );
}

function Battle({attacker, setAttacker, defender, setDefender, players }) {
  return  (
    <>
      <div className="attacker">
      <h2>Attacker</h2>
      { 
        attacker 
        ? <Player {...attacker} type='attacker'/> 
        : <SelectCharacter players={players} setAttacker={setAttacker} type="attacker" setDefender={setDefender}/>
      }
    </div>
    <h1>VS</h1>
    <div className="defender">
      <h2>Defender</h2>
      { 
        defender 
        ? <Player {...defender} type='defender'/> 
        : <SelectCharacter players={players} setAttacker={setAttacker} type="defender" setDefender={setDefender}/>
      }
    </div>
  </>
  )
}

const Player = ({name, armor, hp, type}) => {
  return (
    <div className={'character-card'}>
      <h2 id={`character-name-${type}`}>{name}</h2>
      <div>
        <p id={`character-armor-${type}`}>Armor Class: {armor}</p>
        <p id={`character-hp-${type}`}>Hit Points: {hp}</p>
      </div>
    </div>
  )
}

function SelectCharacter({players, type, setAttacker, setDefender}) {
  return (
    <select id={`selector-${type}`} onChange={(event) => {players.filter(player => {
      if (player.name === event.target.value) {
        type === "attacker" ? setAttacker(player) : setDefender(player)
      }
    })}}>
      <option value="---">---</option>
      {players.map((player, i) => <option value={player.name} key={i}>{player.name}</option>)}
    </select> 
  )
}

function NewCharacter({name, setName, createCharacter, type}) {
  return (
    <div className={'new-character'}>
      <div className="entry">
        <input id={`new-character-name-${type}`} value={name} placeholder="Name" onChange={(event) => setName(event.target.value)}/>
        <button id={`button-create-character-${type}`} onClick={createCharacter}>Create</button>
      </div>
    </div>
  )
}

export default App;
