// import sketch from 'sketch'

export default function() {
  let appleScriptString = 'tell application "Spotify"\nplaypause\nend tell'
  let as = NSAppleScript.alloc().initWithSource(appleScriptString)
  as.executeAndReturnError(nil)
}
