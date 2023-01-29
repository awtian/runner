import { Slider, Button, Text, useMantineTheme, Modal, List  } from '@mantine/core';
import { Run } from 'tabler-icons-react';
import Link from 'next/link'

// Firebase
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";

import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'


export default function GameBoard() {
  const [redTeam, setRedteam] = useState(0);
  const [blueTeam, setBlueTeam] = useState(0);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const theme = useMantineTheme();


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
            thumbChildren={<Run size={66} />}
          />
          <Slider
            color="blue"
            radius="xl"
            size={48}
            label={null}
            value={blueTeam}
            styles={styles}
            thumbChildren={<Run size={66} />}
          /> 
          <code className={styles.code} onClick={()=> setShowHowToPlay(true)}>How to play?</code>
          <Modal 
            size="lg" 
            opened={showHowToPlay} 
            onClose={() => setShowHowToPlay(false)}
            centered
            withCloseButton={false}
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            >
              <List withPadding>
                <List.Item>Open the controller page with your phone on <Link href="/c" className={styles['controller-link']}>runner.awtian.com/c</Link></List.Item>
                <List.Item>Choose your team then make sure you pressed the confirm button</List.Item>
                <List.Item>Shake your phone as hard as you can, against the enemy team!</List.Item>
              </List>
          </Modal>
      </>}
    </>
  );
}