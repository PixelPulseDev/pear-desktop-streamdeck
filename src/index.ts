import streamDeck, {
  action,
  DialRotateEvent,
  KeyDownEvent,
  SingletonAction
} from "@elgato/streamdeck";

const API_BASE = "http://localhost:8080/api";

/** Helper function to send commands to Pear Desktop Music Player */
async function sendCommand(endpoint: string, payload?: object): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload ? JSON.stringify(payload) : undefined
    });
    return res.ok;
  } catch (err) {
    streamDeck.logger.error(`Failed to send command to ${endpoint}: ${err}`);
    return false;
  }
}

// 1. Play / Pause
@action({ UUID: "com.pear.desktop.streamdeck.play-pause" })
export class PlayPauseAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("play-pause");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
  override async onDialRotate(ev: DialRotateEvent): Promise<void> {
    await sendCommand("seek", { ticks: ev.payload.ticks });
  }
}

// 2. Next Track
@action({ UUID: "com.pear.desktop.streamdeck.next" })
export class NextAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("next");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 3. Previous Track
@action({ UUID: "com.pear.desktop.streamdeck.prev" })
export class PrevAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("prev");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 4. Like Song
@action({ UUID: "com.pear.desktop.streamdeck.like" })
export class LikeAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("like");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 5. Dislike Song
@action({ UUID: "com.pear.desktop.streamdeck.dislike" })
export class DislikeAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("dislike");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 6. Mute Volume
@action({ UUID: "com.pear.desktop.streamdeck.mute" })
export class MuteAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("mute");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 7. Volume Down
@action({ UUID: "com.pear.desktop.streamdeck.volume-down" })
export class VolumeDownAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("volume-down");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 8. Volume Up & Dial Control
@action({ UUID: "com.pear.desktop.streamdeck.volume-up" })
export class VolumeUpAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("volume-up");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
  override async onDialRotate(ev: DialRotateEvent): Promise<void> {
    await sendCommand("volume-adjust", { delta: ev.payload.ticks });
  }
}

// 9. Song Info
@action({ UUID: "com.pear.desktop.streamdeck.song-info" })
export class SongInfoAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    await sendCommand("refresh-info");
  }
}

// 10. Shuffle
@action({ UUID: "com.pear.desktop.streamdeck.shuffle" })
export class ShuffleAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("shuffle");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 11. Repeat
@action({ UUID: "com.pear.desktop.streamdeck.repeat" })
export class RepeatAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("repeat");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// 12. Play Playlist
@action({ UUID: "com.pear.desktop.streamdeck.play-playlist" })
export class PlayPlaylistAction extends SingletonAction {
  override async onKeyDown(ev: KeyDownEvent): Promise<void> {
    const success = await sendCommand("play-playlist");
    if (success) await ev.action.showOk(); else await ev.action.showAlert();
  }
}

// Register all actions with the SDK
streamDeck.actions.registerAction(new PlayPauseAction());
streamDeck.actions.registerAction(new NextAction());
streamDeck.actions.registerAction(new PrevAction());
streamDeck.actions.registerAction(new LikeAction());
streamDeck.actions.registerAction(new DislikeAction());
streamDeck.actions.registerAction(new MuteAction());
streamDeck.actions.registerAction(new VolumeDownAction());
streamDeck.actions.registerAction(new VolumeUpAction());
streamDeck.actions.registerAction(new SongInfoAction());
streamDeck.actions.registerAction(new ShuffleAction());
streamDeck.actions.registerAction(new RepeatAction());
streamDeck.actions.registerAction(new PlayPlaylistAction());

// Establish WebSocket connection with Stream Deck Desktop
streamDeck.connect();