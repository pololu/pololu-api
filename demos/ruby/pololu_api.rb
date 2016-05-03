# PololuAPI contains classes that create a simple Ruby interface to
# the Pololu API.  This is only intended as a basic example; you will
# probably want to add more functionality when using it in your
# application.
#
# Two kinds of requests are supported:
#
# PololuAPI::Request makes a single API call, which is appropriate for
# single records.
#
# PololuAPI::PaginatingRequest is intended for fetching a collection
# (e.g. all of the products).  It gives a result with a 'data' method
# that iterates over all the results, automatically handling pagination.

require 'open-uri'
require 'json/api'

module PololuAPI
  class Request
    def initialize(api_key, url)
      @url = url
      @open_params = { http_basic_authentication: [api_key, ''] }
    end

    def call
      data = open(@url, @open_params) do |io|
        io.read
      end

      result = Result.new(JSON::API.parse(data))

      if block_given?
        yield result
      else
        return result
      end
    end
  end

  class Result
    def initialize(document)
      @document = document
    end

    def find_item_in_included(item)
      @document.included.find do |included_item|
        included_item.type == item.type && included_item.id == item.id
      end
    end

    def next_url
      @document.links[:next] && @document.links.next.value
    end

    def data
      @document.data
    end
  end

  class PaginatingRequest
    def initialize(api_key, url)
      @url = url
      @api_key = api_key
    end

    def call
      result = PaginatingResult.new(@api_key, @url)

      if block_given?
        yield result
      else
        return result
      end
    end
  end

  class PaginatingResult
    def initialize(api_key, url)
      @api_key = api_key
      @url = url
    end

    def data
      to_enum(:each_data)
    end

    private
    def each_data(&block)
      yield_data(@url, &block)
    end

    def yield_data(url, &block)
      return if url.nil?

      request = Request.new(@api_key, url)
      result = request.call
      result.data.each do |data|
        yield data
      end

      yield_data(result.next_url, &block)
    end
  end
end
