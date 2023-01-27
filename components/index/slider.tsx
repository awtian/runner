import { Slider, RangeSlider } from '@mantine/core';
import { useState } from 'react'
import { IconHeart, IconHeartBroken } from '@tabler/icons';

const styles = { thumb: { borderWidth: 5, height: 80, width: 80, padding: 4 } };

export default function SliderIcon() {
  const [redTeam, setRedteam] = useState(40);
  const [blueTeam, setBlueTeam] = useState(30);

  return (
    <>
    
      <Slider
        color="red"
        radius="xl"
        size={48}
        label={null}
        value={redTeam}
        styles={styles}
      />
      <Slider
        color="blue"
        radius="xl"
        size={48}
        label={null}
        value={blueTeam}
        onChange={setBlueTeam}
        styles={styles}
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