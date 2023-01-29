import React, { useState, useEffect, useCallback, Component } from 'react'
import { Center, NativeSelect, Button } from '@mantine/core';
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";
import ShakeDetector from 'shake-detector';

export default class ControllerClass extends Component {
  render() {
    
  return (
    <Center style={{ height: '100vh', flexDirection: 'column', backgroundColor: color[team], rowGap: 20 }}>
      <h1 style={{fontFamily: 'arial'}}>Choose your team!</h1>
      <NativeSelect
        disabled={teamConfirmed}
        value={team}
        onChange={(event) => setTeam(event.currentTarget.value)}
        data={[{ value: 'red', label: 'Red Team' }, { value: 'blue', label: 'Blue Team' }]}
      />
      <Button id="requestTrigger" color="green" disabled={teamConfirmed} onClick={() => {setTeamConfirmed(true)}}> {!teamConfirmed ? 'Confirm Team' : 'Shake your device to start running!'}</Button>

    </Center>
  )
  }
}
