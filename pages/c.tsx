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
  const [teamConfirmed, setTeamConfirmed] = useState(false);

  function advanceTeam(team: string) {
    confirmTeam()
    if (team === 'blue') {
      set(ref(rtdb, '/' + team), blueTeam + increment);
    } else {
      set(ref(rtdb, '/' + team), redTeam + increment);
    }
  }

 function confirmTeam() {
    setTeamConfirmed(true)
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
      <h1 style={{fontFamily: 'arial'}}>Choose your team!</h1>
      <NativeSelect
        disabled={teamConfirmed}
        value={team}
        onChange={(event) => setTeam(event.currentTarget.value)}
        data={[{ value: 'red', label: 'Red Team' }, { value: 'blue', label: 'Blue Team' }]}
      />
      <Button color="green" disabled={teamConfirmed} onClick={() => {advanceTeam(team)}}> {!teamConfirmed ? 'Confirm Team' : 'Shake your device to start running!'}</Button>

    </Center>
  )
}
