// Displays the specified product in `#main`.
function showProduct(product) {
  var main = $('#main')

  main.html('<h1>'+product.attributes.name+'</h1>')

  main.append('<img width=600 id="main_picture">')
  main.append(product.attributes.short_description)

  main.append('<h2>Main category</h2><ul id="main_category"></ul>')
  appendCategory($("#main_category"), product.relationships.main_category.data.id)

  main.append('<h2>Attributes</h2><table id="attributes"></table>')
  appendAttributeRows($('#attributes'), product.attributes)

  var main_picture_id = product.relationships.main_picture.data.id
  getAndShowPicture($('#main_picture'), main_picture_id)

  main.append('<h2>Related products</h2><ul id="related_products"></ul>')
  product.relationships.related_products.data.forEach(function(product_ref) {
    appendProduct($("#related_products"), product_ref.id)
  })

  main.append('<h2>Related categories</h2><ul id="related_categories"></ul>')
  product.relationships.related_categories.data.forEach(function(category_ref) {
    appendCategory($("#related_categories"), category_ref.id)
  })

  main.append('<h2>Other pictures</h2>')
  product.relationships.other_pictures.data.forEach(function(picture_ref) {
    picture_id = picture_ref.id
    main.append('<img class="other_picture" id="'+picture_id+'">')
    getAndShowPicture($('#'+picture_id), picture_id)
  })

}

function attributeRow(name, value) {
  return '<tr><th>'+name+':</th><td>'+value+'</td></tr>'
}

function appendAttributeRows(target, attributes) {
  price = attributes.prices[0].regular_price
  target.append(attributeRow('Price', '$'+price))
  target.append(attributeRow('For sale with coupon only', attributes.for_sale_with_coupon_only ? 'Y' : 'N'))
  target.append(attributeRow('Stock available', attributes.stock_available))
  target.append(attributeRow('Maximum order', attributes.maximum_order))

  target.append(attributeRow('Weight (ounces)', attributes.weight_ounces))

  target.append(attributeRow('On website date', attributes.on_website_date))
  target.append(attributeRow('Discontinued',
                             (attributes.discontinued ? (attributes.discontinued_description != '' ? attributes.discontinued_description : 'Y') : 'N')))
  target.append(attributeRow('Description for customs', attributes.description_for_customs))
  target.append(attributeRow('Country of origin', attributes.country_of_origin))
  target.append(attributeRow('Suggested Schedule B code', attributes.suggested_schedule_b_code))
  target.append(attributeRow('Suggested HS code', attributes.suggested_hs_code))
  target.append(attributeRow('URL', '<a href='+attributes.url+'>'+attributes.url+'</a>'))
}

// Appends a link to the product with id `id` to the JQuery element
// `target`.
function appendProduct(target, id) {
  var link_id = newUniqueId()
  var href = 'product'+id
  var product_link = '<a id="'+link_id+'" href="#'+href+'"></a>'
  target.append('<li>'+product_link+'</li>')

  withProduct(id, function(product) {
    $('#'+link_id).html(product.attributes.name)
  })
}
