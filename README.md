# Pololu API: automated access to Pololu product data

The Pololu API is a way for
[Pololu distributors](https://www.pololu.com/distributors) and other
interested customers to download information about our products, in
JSON, CSV, or YAML format.  For the most part, it mirrors information
that is already available on our website, but in a format that is easy
to read into a computer program.  As an example,
[click here](example_product_975.json) to view the API data for
[the 3pi robot](https://www.pololu.com/product/975).  It looks
basically like this:

```javascript
{
    "links": {
        "self": "https://www.pololu.com/api/v2/product/975.json"
    },
    "data": {
        "type": "product",
        "id": "975",
        "attributes": {
            "modification_time": "2015-12-16T14:52:06.000-08:00",
            "on_website_date": "2008-07-23T19:43:52.000-07:00",
            "name": "Pololu 3pi Robot",
            "suggested_schedule_b_code": "8542.31.0000",
            "suggested_hs_code": "854231",
            "short_description": "<p>The Pololu 3pi robot is a complete, high-performance mobile platform featuring two micro metal gearmotors...",
            "web_page": "<h3>Overview</h3>\n<p>The 3pi robot is designed to excel in line-following and maze-solving competitions.  It has a small size...",
            "main_picture_id": "0J2415",
            "discontinued": false,
            "discontinued_description": "",
            "description_for_customs": "hobby/educational electronic kit",
            "country_of_origin": "USA",
            "for_sale_with_coupon_only": false,
            "weight_ounces": "5.0",
            "url": "https://www.pololu.com/product/975",
            "prices": [{
                "quantity": 1,
                "regular_price": 99.95
            }, {
                "quantity": 10,
                "regular_price": 89.95
            }],
            "stock_available": 177,
            "maximum_order": 277
        },
        "relationships": {
            "main_picture": {
                "data": {
                    "type": "picture",
                    "id": "0J2415"
                }
            }
        }
    },
    "included": [{
        "links": {
            "self": "https://www.pololu.com/api/v2/picture/0J2415.json"
        },
        "type": "picture",
        "id": "0J2415",
        "attributes": {
            "url": "https://a.pololu-files.com/picture/0J2415.1200.jpg?4f523fc7b561d69b453a7f38c8446991",
            "caption": "Pololu 3pi robot."
        }
    }]
}
```

The Pololu API follows the
[JSON API specification](http://jsonapi.org/), a general-purpose
specification for "hypermedia"-style APIs returning JSON data over
HTTP.  Most importanly, this means that the data includes links to
other API requests, so you can explore the data without constantly
consulting the API documentation.

## Appropriate use of the Pololu API

The Pololu API is intended for importing large amounts of data into
your own database.  Typical uses might be:

* Downloading our entire product catalog as a starting point for
  your own.
* Doing a daily check of all of our products for changes.
* Downloading stock information hourly to update availability
  information for your own customers.

It should be okay to send a series of several queries as quickly as
the server can respond to them, but the API is not fast or reliable
enough for real-time use on a live website, so you should be running
these queries and updates *as background tasks*.  Also, security restrictions make
it impossible for web pages to query the API directly with Javascript,
but see the [demos folder](demos) for a way to get around this for
testing purposes.

## Use at your own risk

While we make an effort to ensure that the API data is accurate, there
is a possibility for bugs or human error to introduce mistakes.  If
you rely on the data being correct, you are doing so at your own
risk.  We recommend checking all data returned by the API before
using it in your own system.

## Getting access to the API

To get access to the API, please
[email us](https://www.pololu.com/contact) a request.  We will set you
up with an API key, which is a long hexadecimal number displayed on
your [account page](https://www.pololu.com/account).  Visiting any API
URL requires you to authenticate with the API key as your user name
and a blank password.

*Do not share your API key with anyone outside of your team.* Future
updates to the API may give you the ability to place orders or make
other requests using your API key, so it is important to keep it
private.  If you would like to reset or cancel your key, please let us
know.

You can try it out by loading the URL for the 3pi:

[https://www.pololu.com/api/v2/product/975.json](https://www.pololu.com/api/v2/product/975.json)

**Username:** *Your API key.*<br>
**Password:** *Blank.*

## Format options and string encoding

We support three different data formats:

* **JSON:** [https://www.pololu.com/api/v2/product/975.json](https://www.pololu.com/api/v2/product/975.json)
* **YAML:** [https://www.pololu.com/api/v2/product/975.yaml](https://www.pololu.com/api/v2/product/975.yaml)
* **CSV:** [https://www.pololu.com/api/v2/product/975.csv](https://www.pololu.com/api/v2/product/975.csv)

[JSON](http://www.json.org/) is the standard for JSON API and probably
the best choice for anyone using our API within their own custom
software.  One potential point of confusion is that special HTML
characters in JSON strings are encoded with unicode escape sequences,
so you will see `\u003cblockquote\u003e` instead of `<blockquote>`.
While this is not required, it is a standard security precaution to
reduce the risk of cross-site scripting attacks.  Use a standard JSON
parsing library, which is available in just about
[any language](http://www.redversconsulting.com/cobol_json_interface.php),
and strings will be converted automatically to Unicode HTML.

[YAML](http://yaml.org/) is a human-readable data exchange format. For
additional readability, we encode strings within YAML using
[format=flowed](http://joeclark.org/ffaq.html).  We do not recommend
this format for automatic processing, but it might be useful for
debugging or for tracking changes with text-based diffs.

[CSV](https://en.wikipedia.org/wiki/Comma-separated_values) is a very
limited data format provided for use with spreadsheets.  Long strings
containing newlines (like web pages) are particularly difficult to
handle with CSV and in typical spreadsheet software, so we recommend
limiting the fields if you need to use CSV (see "Sparse fieldsets", below).

**Note:** Some versions of Microsoft Excel are only capable of
handling multi-line fields in a CSV if you save the data as a `.csv`
file and open it by double-clicking.  Doing a "text import" from
within Excel will cause data corruption.

## Pagination

Some requests return long lists of entries; these lists are paginated
to reduce load on the servers and make it possible for you to get a
result for each request in a reasonable amount of time.

Pagination is described
[in the JSON API documentation](http://jsonapi.org/format/#fetching-pagination);
basically, you use the `next` link provided in each result to go to
the next page.  Using sparse fieldsets, as described in the next
section, will sometimes allow you to load more records on each page.

The Pololu API uses the optional numerical arguments `page[limit]` and
`page[offset]` to specify the number of items per page and the initial
offset.

## Sparse fieldsets

In many applications you will only be interested in a few of the
fields we have available, so downloading the entire API result is a
waste of time.  "Sparse fieldsets" is a feature of JSON API that
lets you simplify your results, restricting them to just the fields
you want.  For example, this query fetches the pricing, name, and
main picture of the 3pi:

[https://www.pololu.com/api/v2/product/975.yaml?fields[product]=name,prices,main_picture](https://www.pololu.com/api/v2/product/975.yaml?fields[product]=name,prices,main_picture)

You can also read
[the JSON API documentation](http://jsonapi.org/format/#fetching-sparse-fieldsets)
for for information on sparse fieldsets.

## Filtering

You can limit your result set by adding a `filter` parameter, which is
a comma-separated list of record IDs to return.  For example, this
query returns the stock of our A-Star Mini boards:

[https://www.pololu.com/api/v2/product.yaml?fields[product]=name,stock_available&filter=3102,3103,3145](https://www.pololu.com/api/v2/product.yaml?fields[product]=name,stock_available&filter=3102,3103,3145)

## Objects and fields available in the API

Please make sure to read the description of each field that you are
planning to use in the pages below:

* [brand](brand.md)
* [category](category.md)
* [picture](picture.md)
* [product](product.md)
* [resource](resource.md)

## API versions

The current version of the API is v2; this is indicated by the "v2" in
the request URLs.  We may add features and fix bugs without changing
the version number, but if we need to make changes that we expect to
break existing code, we will make those changes under a new version
number at a new URL, so that the old URLs can continue to work.

## Changelog

* 2016 Apr 21: Added export codes; fixed incorrect type of related
  products.
* 2016 Mar 11: Pololu API v2 released.
