// import sketch from 'sketch'

export default function() {
  let appleScriptString = 'tell application "Spotify"\nset shuffling to true\nplaypause\nend tell'
  let as = NSAppleScript.alloc().initWithSource(appleScriptString)
  as.executeAndReturnError(nil)
}
