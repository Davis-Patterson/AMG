import React from 'react';
import { ReactSVG } from 'react-svg';

import appleIcon from 'assets/Utils/apple-icon.svg';
import fIcon from 'assets/Utils/f-icon.svg';
import igIcon from 'assets/Utils/ig-icon.svg';
import spotifyIcon from 'assets/Utils/spotify-icon.svg';
import twitterxIcon from 'assets/Utils/twitter-icon.svg';
import youtubeIcon from 'assets/Utils/youtube-icon.svg';
import soundCloudIcon from 'assets/Utils/sc-icon.svg';

import darkmodeIcon from 'assets/Utils/darkmode-icon.svg';
import lightmodeIcon from 'assets/Utils/lightmode-icon.svg';
import muteIcon from 'assets/Utils/mute-icon.svg';
import unmuteIcon from 'assets/Utils/unmute-icon.svg';
import dropDownIcon from 'assets/Utils/dropdown-icon.svg';
import dropUpIcon from 'assets/Utils/dropup-icon.svg';
import newsIcon from 'assets/Utils/news-icon.svg';
import artistsIcon from 'assets/Utils/artists-icon.svg';
import aboutIcon from 'assets/Utils/about-icon.svg';
import contactIcon from 'assets/Utils/contact-icon.svg';

import pointerIcon from 'assets/Utils/pointer-icon.svg';
import linkIcon from 'assets/Utils/link-icon.svg';

import loopIcon from 'assets/Utils/loop-icon.svg';
import loopOneIcon from 'assets/Utils/loop-one-icon.svg';
import loopNoneIcon from 'assets/Utils/loop-none-icon.svg';
import prevIcon from 'assets/Utils/prev-icon.svg';
import playIcon from 'assets/Utils/play-icon.svg';
import pauseIcon from 'assets/Utils/pause-icon.svg';
import nextIcon from 'assets/Utils/next-icon.svg';
import muteCircleIcon from 'assets/Utils/mute-circle-icon.svg';
import unmuteCircleIcon from 'assets/Utils/unmute-circle-icon.svg';
import pipeIcon from 'assets/Utils/pipe-icon.svg';

import xIcon from 'assets/Utils/x-icon.svg';

const iconComponents = {
  apple: appleIcon,
  facebook: fIcon,
  instagram: igIcon,
  spotify: spotifyIcon,
  twitter: twitterxIcon,
  youtube: youtubeIcon,
  soundcloud: soundCloudIcon,

  darkmode: darkmodeIcon,
  lightmode: lightmodeIcon,
  mute: muteIcon,
  unmute: unmuteIcon,
  'drop-down': dropDownIcon,
  'drop-up': dropUpIcon,
  news: newsIcon,
  artists: artistsIcon,
  about: aboutIcon,
  contact: contactIcon,

  pointer: pointerIcon,
  link: linkIcon,

  loop: loopIcon,
  'loop-one': loopOneIcon,
  'loop-none': loopNoneIcon,
  prev: prevIcon,
  play: playIcon,
  pause: pauseIcon,
  next: nextIcon,
  'mute-circle': muteCircleIcon,
  'unmute-circle': unmuteCircleIcon,
  pipe: pipeIcon,

  x: xIcon,
};

const Icon = ({
  name,
  svgClass = '',
  id = '',
  wrapperClass = '',
  wrapperId = '',
  ...props
}) => {
  const svgPath = iconComponents[name];
  if (!svgPath) {
    console.error(`Icon ${name} does not exist`);
    return null;
  }

  return (
    <div id={wrapperId} className={wrapperClass}>
      <ReactSVG
        src={svgPath}
        beforeInjection={(svg) => {
          if (svgClass) {
            svg.classList.add(svgClass);
          }
          if (id) {
            svg.id = id;
          }
        }}
        {...props}
      />
    </div>
  );
};

export default Icon;
