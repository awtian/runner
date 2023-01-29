import { Slider, Button, Text } from '@mantine/core';
import { Run } from 'tabler-icons-react';

// Firebase
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";

import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

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
  if (redTeam >= 100) {
    winning = <Text fw={700} fz="xl"c="red">Red Team Win</Text>;
  } else if (blueTeam >= 100) {
    winning = <Text fw={700} fz="xl"c="blue">Blue Team Win</Text>;
  }

  const resetButton = winning ? <Button color="violet" onClick={resetGame}> Reset Game</Button> : ''
  
  return (
    <>
      <Text c="white" style={{fontFamily: 'Verdana, sans-serif', padding: '10px'}}>just another simple running game</Text>
      { winning }
      { resetButton }
      {!winning && 
        <>
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
          <code className={styles.code}>How to play?</code>
      </>}
    </>
  );
}