// import sketch from 'sketch'

export default function() {
  let appleScriptString = 'tell application "Spotify"\nprevious track\nend tell'
  let as = NSAppleScript.alloc().initWithSource(appleScriptString)
  as.executeAndReturnError(nil)
}
