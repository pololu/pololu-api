# Product

## Example URLs

[https://www.pololu.com/api/v2/product.json](https://www.pololu.com/api/v2/product.json)

[https://www.pololu.com/api/v2/product/975.json](https://www.pololu.com/api/v2/product/975.json)

## Attributes

`modification_time` - The last time significant changes have been made
to the product. Changes that come from related objects, like picture
captions in the product web page, might not affect this value.

`on_website_date` - The data the product appeared on our website.

`name` - The product name.

`status` - The product's [status designation](https://www.pololu.com/product-status).

`short_description` - A few sentences (in HTML format) describing
the most important aspects of the product.

`web_page` - The main description of the product, in HTML format.

`discontinued` - A boolean value that is true if the product has been
discontinued.  (Note that it might still be for sale until the stock
runs out).

`discontinued_description` - The discontinuation notice, in HTML
format, possibly including a link to a recommended replacement.

`description_for_customs` - Information that we include on commercial
invoices and customs forms to describe the type of product.

`country_of_origin` - The country of origin of the product.

`for_sale_with_coupon_only` - A boolean value that is true if this is
a special product that requires a coupon to be purchased.

`weight_ounces` - The product weight, in ounces.  **Note:** for a few
light products we have instead entered "dimensional weight".  Actual
product dimensions are currently unavailable.

`suggested_schedule_b_code` - Our recommended code for exporting from
the United States.

`suggested_hs_code` - The first six digits of the Schedule B code;
recommended for international trade documents.

`url` - A link to the product web page.

`prices` - An array of prices; the format is the same as the table of
prices on the product web page.

`stock_available` - The quantity that we currently have in stock to
ship immediately.

`maximum_order` - The largest order we will currently accept for this
product.  If it is larger than `stock_available`, that means we
accept backorders.

## Relationships

`brand` - The product's brand.

`main_picture` - The main picture of the product.

`other_pictures` - A list of other pictures of the product.

`resources` - A list of resources related to the product.

`main_category` - The main category of the catalog that the product
belongs to.

`categories` - A list of all categories that the product belongs to.

`related_categories` - A list of categories that a related to the
product (for example, "Wires" might be related to "Breadboards").

`related_products` - A list of other products related to this one.

`specifications` - A list of [specifications](specification.md).