"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Howl } from "howler";
import { playlist } from "@/data/playlist";

type MusicPlayerContextType = {
  isPlaying: boolean;
  currentSongIndex: number;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  play: (songIndex?: number) => void;
  pause: () => void;
  togglePlayPause: () => void;
  skipBack: () => void;
  skipForward: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

const VOLUME_KEY = "music-player-volume";
const MUTED_KEY = "music-player-muted";

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== "undefined") {
      const savedVolume = localStorage.getItem(VOLUME_KEY);
      return savedVolume ? parseFloat(savedVolume) : 1.0;
    }
    return 1.0;
  });
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMuted = localStorage.getItem(MUTED_KEY);
      return savedMuted ? JSON.parse(savedMuted) : false;
    }
    return false;
  });
  const [howl, setHowl] = useState<Howl | null>(null);

  // Save volume and muted state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(VOLUME_KEY, volume.toString());
      localStorage.setItem(MUTED_KEY, JSON.stringify(isMuted));
    }
  }, [volume, isMuted]);

  const play = (songIndex?: number) => {
    setIsLoading(true);
    const index = songIndex !== undefined ? songIndex : currentSongIndex;

    if (howl) {
      howl.stop();
      howl.unload();
    }

    const sound = new Howl({
      src: [playlist[index].audioUrl],
      volume: isMuted ? 0 : volume,
      onend: () => {
        // Auto advance to next song
        const nextIndex = (index + 1) % playlist.length;
        play(nextIndex);
      },
      onload: () => {
        setDuration(sound.duration());
        setIsLoading(false);
      },
      onplay: () => {
        setIsPlaying(true);
        setIsLoading(false);
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onseek: () => {
        setCurrentTime(sound.seek() as number);
      },
      onvolume: () => {
        setVolumeState(sound.volume());
      },
    });

    setHowl(sound);
    sound.play();
    setCurrentSongIndex(index);
  };

  const pause = () => {
    howl?.pause();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const skipBack = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    play(prevIndex);
  };

  const skipForward = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    play(nextIndex);
  };

  const seek = (time: number) => {
    if (howl) {
      howl.seek(time);
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.min(Math.max(newVolume, 0), 1);
    if (howl) {
      howl.volume(clampedVolume);
    }
    setVolumeState(clampedVolume);
    if (clampedVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (howl) {
      const newMutedState = !isMuted;
      howl.volume(newMutedState ? 0 : volume);
      setIsMuted(newMutedState);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (howl && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(howl.seek() as number);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [howl, isPlaying]);

  useEffect(() => {
    return () => {
      if (howl) {
        howl.stop();
        howl.unload();
      }
    };
  }, [howl]);

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        currentSongIndex,
        currentTime,
        duration,
        isLoading,
        volume,
        isMuted,
        play,
        pause,
        togglePlayPause,
        skipBack,
        skipForward,
        seek,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
