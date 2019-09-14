export default function(script) {
  let appleScriptString = `tell application "Spotify"
  ${script}
  end tell`
  let as = NSAppleScript.alloc().initWithSource(appleScriptString)
  return as.executeAndReturnError(nil).stringValue()
}