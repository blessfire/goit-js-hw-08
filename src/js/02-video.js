import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const player = new Player('vimeo-player');

onPageloading();
player.on('timeupdate', throttle(onSaveTime, 1000));

function onSaveTime({seconds}) {
    const currentTime = seconds;
    localStorage.setItem(STORAGE_KEY, currentTime);
}

function onPageloading() {
    const saveCurrentTime = localStorage.getItem(STORAGE_KEY);
    if (saveCurrentTime) {
        player.setCurrentTime(saveCurrentTime);
    }
}

