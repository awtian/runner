import React, { useState, useEffect } from 'react'
import { Center, NativeSelect, Button } from '@mantine/core';
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";

interface ColorType {
  [index:string]: string;
}
const color: ColorType = { blue: "#228BE6", red: "#FA5252" }
const increment = 3;

export default function Control() {
  const [team, setTeam] = useState('red');
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
    <Center style={{ height: '100vh', flexDirection: 'column', backgroundColor: color[team], rowGap: 20 }}>
      <h1>Choose your team!</h1>
      <NativeSelect
        value={team}
        onChange={(event) => setTeam(event.currentTarget.value)}
        data={[{ value: 'red', label: 'Red Team' }, { value: 'blue', label: 'Blue Team' }]}
      />
      <Button color="green">Run!</Button>

    </Center>
  )
}
