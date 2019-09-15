const path = require('path')
const os = require('os')
const util = require('util')
const fs = require('@skpm/fs')

import sketch from 'sketch'
import doAppleScript from './applescript'

const FOLDER = path.join(os.tmpdir(), 'com.bomberstudios.sketchpotify')

export function getArtwork(context) {
  let artworkURL = doAppleScript('set theURL to artwork url of current track')
  // For some reason, Spotify returns non-secure URLs and those won't work in Sketch. Let's fix that:
  artworkURL = artworkURL.replace('http:','https:')

  return Promise.resolve(insertImageLayerFromURL(artworkURL))
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
  let parent = sketch.getSelectedDocument().selectedPage
  return new sketch.Text({
    text: txt,
    parent: parent
  })
}

function insertImageLayerFromURL(url) {
  let parent = sketch.getSelectedDocument().selectedPage
  return Promise.resolve(getImageFromURL(url).then(imagePath => {
    if (!imagePath) {
      // TODO: something wrong happened, show something to the user
      return
    } else {
      let bitmap = new sketch.Image({
        image: imagePath,
        frame: {
          width: 320,
          height: 320
        },
        parent: parent
      })
      // TODO: Use current viewport, instead of centering on layer
      return bitmap
    }
  }))
}

function getImageFromURL (url) {
  // TODO: cache file
  return fetch(url)
    .then(res => res.blob())
    .then(saveTempFileFromImageData)
    .catch((err) => {
      console.error(err)
    })
}

function saveTempFileFromImageData (imageData) {
  const guid = NSProcessInfo.processInfo().globallyUniqueString()
  const imagePath = path.join(FOLDER, `${guid}.jpg`)
  try {
    fs.mkdirSync(FOLDER)
  } catch (err) {
    // probably because the folder already exists
    // TODO: check that it is really because it already exists
  }
  try {
    fs.writeFileSync(imagePath, imageData, 'NSData')
    return imagePath
  } catch (err) {
    console.error(err)
    return undefined
  }
}
