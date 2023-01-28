import { Slider } from '@mantine/core';
import { Run } from 'tabler-icons-react';
// Firebase
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";

import { useState, useEffect } from 'react';

const styles = { thumb: { borderWidth: 5, height: 80, width: 80, padding: 4 } };
const increment = 5;

export default function GameBoard() {
  const [redTeam, setRedteam] = useState(0);
  const [blueTeam, setBlueTeam] = useState(0);

  function advanceTeam(team: string) {
    if (team === 'blue') {
      set(ref(rtdb, '/'), {
        blue: blueTeam + increment,
        red: redTeam
      });
    } else {
      set(ref(rtdb, '/'), {
        blue: blueTeam,
        red: redTeam + increment
      });
    }
  }

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
  
  return (
    <>
      <Slider
        color="red"
        radius="xl"
        size={48}
        label={null}
        value={redTeam}
        styles={styles}
        onClick={() => advanceTeam('red')}
        thumbChildren={<Run size={66} onClick={() => advanceTeam('red')}/>}
      />
      <Slider
        color="blue"
        radius="xl"
        size={48}
        label={null}
        value={blueTeam}
        onClick={() => advanceTeam('blue')}
        styles={styles}
        thumbChildren={<Run size={66} onClick={() => advanceTeam('blue')}/>}
      />

      {/* <RangeSlider
        mt="xl"
        styles={styles}
        thumbSize={26}
        color="red"
        label={null}
        defaultValue={[20, 60]}
        // thumbChildren={[
        //   <IconHeart size={16} stroke={1.5} key="1" />,
        //   <IconHeartBroken size={16} stroke={1.5} key="2" />,
        // ]}
      /> */}
    </>
  );
}