// Gets the picture URL for picture with id `id` and displays it in
// the specified target, which should be an IMG tag.
function getAndShowPicture(target, id) {
  withPicture(id, function(picture) {
    target.attr('src', picture.attributes.url)
    target.attr('title', picture.attributes.caption)
  })
}
