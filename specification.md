# Specification

## Example URLs

[https://www.pololu.com/api/v2/specification.json](https://www.pololu.com/api/v2/specification.json)

[https://www.pololu.com/api/v2/specification/0J442.json](https://www.pololu.com/api/v2/specification/0J442.json)

## Attributes

`parameter_type` - The basic type (boolean, string, integer, or decimal).

`parameter_name` - Name of the parameter (e.g. "max. continuous output current").

`text_value` - The value formatted for display.

`boolean_value` - If the type is "boolean", this stores the true/false value.

`numerical_value` - If the type is "integer" or "decimal", this stores the value as a number.

`significant_digits` - For type "decimal", the number of significant digits before and after the decimal point.

`unit_name` - The name of the unit, such as "MHz".

`numerical_value_in_si_units` - The value converted to standard SI units such as meters and seconds. This is useful for sorting or for unit conversions.

`footnote` - An important note that should be displayed near the specification.
