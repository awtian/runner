import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Center, NativeSelect, Button } from '@mantine/core';
import { rtdb } from "@/utils/firebase";
import { onValue, ref, set } from "firebase/database";
import ShakeDetector from 'shake-detector';
// @ts-ignore
import swal from '@sweetalert/with-react';
interface ColorType {
  [index:string]: string;
}
const color: ColorType = { blue: "#228BE6", red: "#FA5252" }
const increment = 3;

export default function Control() {
  // states
  const [team, _setTeam] = useState('red');
  const teamRef = React.useRef(team);
  const setTeam = (data:string) => {
    teamRef.current = data;
    _setTeam(data);
  };
  const [redTeam, _setRedTeam] = useState(0);
  const redTeamRef = React.useRef(redTeam);
  const setRedTeam = (data:number) => {
    if (data > 100) gameOver('red')
    redTeamRef.current = data;
    _setRedTeam(data);
  };
  const [blueTeam, _setBlueTeam] = useState(0);
  const blueTeamRef = React.useRef(blueTeam);
  const setBlueTeam = (data:number) => {
    if (data > 100) gameOver('blue')
    blueTeamRef.current = data;
    _setBlueTeam(data);
  };
  const [teamConfirmed, _setTeamConfirmed] = useState(false);
  const teamConfirmedRef = React.useRef(teamConfirmed)
  const setTeamConfirmed = (data:boolean) => {
    teamConfirmedRef.current = data;
    _setTeamConfirmed(data)
  }

  function gameOver (winning:string) {
    if (winning === 'blue') {
      teamRef.current === 'blue' ? gameOverSwal('win') : gameOverSwal('lose')
    } else if (winning === 'red') {
      teamRef.current === 'red' ? gameOverSwal('win') : gameOverSwal('lose')
    }
  }

  function gameOverSwal (type:string) {
    if (type === 'lose') {
      swal({title: "You LOSE!", button: {text: "NOOO :(", className: 'lose-button' }, icon: "error"})
    } else if (type === 'win') {
      swal({title: "You won!", button: {text: "YAY!!", className: 'win-button' }, icon: "success"})
    }
  }

  function advanceTeam() {
    if (teamConfirmedRef.current && blueTeamRef.current < 100 && redTeamRef.current < 100) {
      if (teamRef.current === 'blue') {
        set(ref(rtdb, '/' + teamRef.current), blueTeamRef.current + increment);
      } else {
        set(ref(rtdb, '/' + teamRef.current), redTeamRef.current + increment);
      }
    }
  }

  useEffect(() => {
    // firebase
    const query = ref(rtdb, "/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setRedTeam(data.red)
        setBlueTeam(data.blue)
      }
    });
  }, [])

  useEffect(() => {
    // ShakeDetector permission and initiation
    const shakeDetector = new ShakeDetector({debounceDelay: 100});
    const requestTrigger = document.getElementById('requestTrigger') || undefined;
    
    shakeDetector.requestPermission(requestTrigger).then(() => {
      shakeDetector.start();
      window.addEventListener(ShakeDetector.SHAKE_EVENT, advanceTeam );
    });
    
    return () => {
      window.removeEventListener(ShakeDetector.SHAKE_EVENT, advanceTeam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center style={{ height: '100vh', flexDirection: 'column', backgroundColor: color[team], rowGap: 20, fontFamily: 'Verdana, sans-serif' }}>
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
