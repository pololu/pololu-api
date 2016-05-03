function showCategory(category) {
  var main = $('#main')
  main.html('<h1>'+category.attributes.name+'</h1>')

  main.append('<h2>Products</h2><ul id="related_products"></ul>')
  main.append('<ul id="products"></ul>')
  appendProducts($('#products'), category)

  main.append('<h2>Subcategories</h2><ul id="subcategories"></ul>')
  category.relationships.subcategories.data.forEach(function(category_ref) {
    appendCategory($("#subcategories"), category_ref.id)
  })
}

function appendProducts(target, category) {
  category.relationships.products.data.forEach(function(product_ref) {
    appendProduct(target, product_ref.id)
  })
}

function expandSubcategory(li_element, category_id) {
  withCategory(category_id, function(category) {
    var existing_ul = li_element.children('ul')
    if(existing_ul.length) {
      existing_ul.remove()
    }
    else {
      var ul = $('<ul></ul>')
      li_element.append(ul)
      appendSubcategories(ul, category)
    }
  })
}

function appendCategory(target, category_id) {
  var li_id = newUniqueId()
  var link_id = newUniqueId()
  var link =
    '<a id="'+link_id+'" href="#category'+category_id+'"></a>'

  target.append('<li id="'+li_id+'">'+link+'</li>')

  withCategory(category_id, function(category) {
    $('#'+link_id).html(category.attributes.name)
  })
}

function appendSubcategory(target, subcategory_id) {
  var li_id = newUniqueId()
  var link_id = newUniqueId()
  var plus_id = newUniqueId()
  var link =
    '<a class="plus" id="'+plus_id+'" href="#"></a> ' +
    '<a id="'+link_id+'" href="#category'+subcategory_id+'">' +
    '</a>'

  target.append('<li id="'+li_id+'">'+link+'</li>')
  $('#'+plus_id).click(function() {
    expandSubcategory($('#'+li_id), subcategory_id)
    return false
  })

  withCategory(subcategory_id, function(subcategory) {
    $('#'+link_id).html(subcategory.attributes.name)

    if(subcategory.relationships.subcategories.data.length > 0) {
      $('#'+plus_id).html('+').addClass('visible')
    }
  })
}

function appendSubcategories(target, category) {
  category.relationships.subcategories.data.forEach(function(subcategory_ref) {
    appendSubcategory(target, subcategory_ref.id)
  })
}

function displayTopLevel(category) {
  var target = $('#categories')
  target.html('')
  appendSubcategories(target, category)
}
