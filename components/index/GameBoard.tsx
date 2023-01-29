import { Slider, Button } from '@mantine/core';
import { Run } from 'tabler-icons-react';
// Firebase
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";

import { useState, useEffect } from 'react';

const styles = { thumb: { borderWidth: 5, height: 80, width: 80, padding: 4 } };
// const increment = 5;

export default function GameBoard() {
  const [redTeam, setRedteam] = useState(0);
  const [blueTeam, setBlueTeam] = useState(0);


  useEffect(() => {
    const query = ref(rtdb, "/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setRedteam(data.red)
        setBlueTeam(data.blue)
      }
    });
  }, []);

  const resetGame = () => {
    set(ref(rtdb, '/'), {blue: 0, red: 0});
  }

  let winning;
  if (redTeam > 100) {
    winning = <span>Red Win</span>;
  } else if (blueTeam > 100) {
    winning = <span>Blue Win</span>;
  }

  const resetButton = <Button color="violet" onClick={resetGame}> Reset Game</Button>
  
  return (
    <>
      <p style={{fontFamily: 'Verdana, sans-serif', padding: '10px'}}>just another simple running game</p>
      { winning }
      { resetButton }
      <Slider
        color="red"
        radius="xl"
        size={48}
        label={null}
        value={redTeam}
        styles={styles}
        // onClick={() => advanceTeam('red')}
        thumbChildren={<Run size={66} />}
      />
      <Slider
        color="blue"
        radius="xl"
        size={48}
        label={null}
        value={blueTeam}
        // onClick={() => advanceTeam('blue')}
        styles={styles}
        thumbChildren={<Run size={66} />}
      />
    </>
  );
}