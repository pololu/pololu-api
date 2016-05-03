This is a demo of the API that uses Javascript to generate a
browseable copy of the Pololu catalog.  You can use this to learn how
the API works or to browse the data, but it is not not intended as a
practical example of how to build a real website.

To use this demo, you will need to start Google Chrome (or Chromium)
with the javascript "same-origin policy" disabled.  To do that, run
the browser with the `--disable-web-security` and `--user-data-dir`
options appended.  For example, in Linux, run:

    chromium-browser --disable-web-security --user-data-dir

Under Windows, you can make a desktop shortcut that includes these options.

Chrome should display a security warning when it starts up.  Browse to
`index.html`, and enter your API key into the "User Name" field when
prompted.

If nothing happens, check Chrome's Javascript console for errors.
