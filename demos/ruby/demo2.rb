# This is a simple example of how to download and parse API data in
# Ruby, using the jsonapi_parser gem.  You should run "bundle" to
# install the gem.
#
# This demo downloads the stock information for all products and
# prints it out to the console, using sparse fieldsets to make the
# requests as efficient as possible.  It handles pagination by
# repeatedly following the "next" link in each document.
#
# Usage: POLOLU_API_KEY=xxxxx bundle exec ruby demo.rb
# (where xxxxx is your API key)

require_relative 'pololu_api'

url = 'https://www.pololu.com/api/v2/product.json?fields[product]=stock_available'
request = PololuAPI::PaginatingRequest.new(ENV['POLOLU_API_KEY'], url)
result = request.call

result.data.each do |product|
  puts "#{product.id},#{product.attributes.stock_available}"
end
