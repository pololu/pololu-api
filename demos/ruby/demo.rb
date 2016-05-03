# This is a simple example of how to download and parse API data in
# Ruby, using the jsonapi_parser gem.  You should run "bundle" to
# install the gem.
#
# This demo downloads all the information for product 975 and prints
# out the values of various fields.  Note that it uses included
# records to avoid having to make multiple API requests.
#
# Usage: POLOLU_API_KEY=xxxxx bundle exec ruby demo.rb
# (where xxxxx is your API key)

require_relative 'pololu_api'

url = 'https://www.pololu.com/api/v2/product/975.json'
request = PololuAPI::Request.new(ENV['POLOLU_API_KEY'], url)

result = request.call

product = result.data
main_category = result.find_item_in_included(product.relationships.main_category.data)

puts <<END
# Product #{product.id}
Name: #{product.attributes.name}
Main category: ##{main_category.id} #{main_category.attributes.name} - #{main_category.links.self.value}
Price: $#{product.attributes.prices[0]['regular_price']}
Stock available: #{product.attributes.stock_available}
Related products:
END

product.relationships.related_products.data.each do |related_product_ref|
  related_product = result.find_item_in_included(related_product_ref)
  puts <<END
  ##{related_product.id} #{related_product.attributes.name}
END
end
