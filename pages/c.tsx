import React, { useState } from 'react'
import { Center, NativeSelect, Button } from '@mantine/core';

interface ColorType {
  [index:string]: string;
}
const color: ColorType = { blue: "#228BE6", red: "#FA5252" }

export default function Control() {
  const [team, setTeam] = useState('red');


  return (
    <Center style={{ height: '100vh', flexDirection: 'column', backgroundColor: color[team], rowGap: 20 }}>
      <h1>Choose your team!</h1>
      <NativeSelect
        value={team}
        onChange={(event) => setTeam(event.currentTarget.value)}
        data={[{ value: 'red', label: 'Red Team' }, { value: 'blue', label: 'Blue Team' }]}
      />
      <Button color="green">Confirm Team</Button>

    </Center>
  )
}
