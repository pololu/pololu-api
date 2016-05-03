unique_id_count = 0

function newUniqueId() {
  unique_id_count ++
  return 'item'+unique_id_count
}

function checkHash() {
  var hash = window.location.hash
  if(hash.startsWith('#category')) {
    var id = hash.substr(9)
    withCategory(id, showCategory)
  }
  if(hash.startsWith('#product')) {
    var id = hash.substr(8)
    withProduct(id, showProduct)
  }
}

function load() {
  withCategory(1, displayTopLevel)
  $(window).bind('hashchange', checkHash)
  checkHash()
}

$(load)
