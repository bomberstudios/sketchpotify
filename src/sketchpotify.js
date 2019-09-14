import sketch, { UI } from 'sketch'
import SketchToolbar from 'sketch-toolbar-item'

export function registerToolbarActions(context) {
  let prev = SketchToolbar.specifierForToolbarAction(context, 'sketchpotify.prev', 'prev.png|prev-dark.png')
  let playpause = SketchToolbar.specifierForToolbarAction(context, 'sketchpotify.playpause', 'playpause.png|playpause-dark.png')
  let next = SketchToolbar.specifierForToolbarAction(context, 'sketchpotify.next', 'next.png|next-dark.png')
  SketchToolbar.registerToolbarGroup(context, 'sketchpotify', [prev, playpause, next])
}