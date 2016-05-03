categories = {}
products = {}
pictures = {}

function withProduct(id, callback) {
  withObject('product', products, id, callback)
}

function withCategory(id, callback) {
  withObject('category', categories, id, callback)
}

function withPicture(id, callback) {
  withObject('picture', pictures, id, callback)
}

function withObject(type, array, id, callback) {
  if(array[id]) {
    callback(array[id])
    return
  }

  jQuery.getJSON('https://www.pololu.com/api/v2/'+type+'/'+id+'.json', '',
                 function(result) {
                   array[id] = result['data']
                   callback(array[id])
                 })
}
