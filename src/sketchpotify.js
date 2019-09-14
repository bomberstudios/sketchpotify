import sketch, { UI } from 'sketch'
import SketchToolbar from 'sketch-toolbar-item'
import doAppleScript from './applescript'

export function registerToolbarActions(context) {
  let prev = SketchToolbar.specifierForToolbarAction(context, 'sketchpotify.prev', 'prev.png|prev-dark.png')
  let playpause = SketchToolbar.specifierForToolbarAction(context, 'sketchpotify.playpause', 'playpause.png|playpause-dark.png')
  let next = SketchToolbar.specifierForToolbarAction(context, 'sketchpotify.next', 'next.png|next-dark.png')
  SketchToolbar.registerToolbarGroup(context, 'sketchpotify', [prev, playpause, next])
}

export function onPlayPause () {
  doAppleScript('playpause')
}
export function onPrevious () {
  doAppleScript('previous track')
}
export function onNext () {
  doAppleScript('next track')
}
export function onShuffle () {
  doAppleScript('set shuffling to true\nplaypause')
}

