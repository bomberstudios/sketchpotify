import sketch from 'sketch'
import doAppleScript from './applescript'
import insertImage, { getImageFromURL } from 'sketch-image-downloader'

export function getArtwork(context) {
  let artworkURL = doAppleScript('set theURL to artwork url of current track')
  // For some reason, Spotify returns non-secure URLs and those won't work in Sketch. Let's fix that:
  artworkURL = artworkURL.replace('http:','https:')

  return insertImage(artworkURL, sketch.getSelectedDocument().selectedPage)
}

export function getArtist(context) {
  let data = doAppleScript('set theArtist to artist of current track')
  if (data != '') {
    return new Promise.resolve(insertTextLayer(data))
  }
}
export function getAlbum(context) {
  let data = doAppleScript('set theAlbum to album of current track')
  if (data != '') {
    return new Promise.resolve(insertTextLayer(data))
  }
}
export function getTrack(context) {
  let data = doAppleScript('set theTrack to name of current track')
  if (data != '') {
    return new Promise.resolve(insertTextLayer(data))
  }
}
export function getEverything(context) {
  sketch.getSelectedDocument().selectedLayers.clear()

  let group = new sketch.Group({
    parent: sketch.getSelectedDocument().selectedPage
  })
  group.selected = true

  getArtwork().then(artwork => {
    artwork.parent = group
    group.adjustToFit()
  })

  getArtist().then(artist => {
    group.name = artist.name
    artist.parent = group
    artist.frame.x += 340
  })

  getAlbum().then(album => {
    group.name += ` - ${album.name}`
    album.parent = group
    album.frame.x += 340
    album.frame.y += 20
  })

  getTrack().then(track => {
    track.parent = group
    track.frame.x += 340
    track.frame.y += 40
  })
}

function insertTextLayer(txt) {
  return new sketch.Text({
    text: txt,
    parent: sketch.getSelectedDocument().selectedPage
  })
}
