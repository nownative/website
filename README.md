# website
The new &amp; improved (yes, both!) Now Native website.

# installation
    sudo npm install
    npm run build

... Then direct your web server at the `./build` directory.

# releasing
In `Gruntfile.js` edit the `s3:{}` task to specifcy your AWS bucket region & name. You can also hardcode key and secret here but be careful with public repos.

Then, run this in your CLI:

    key=XXXXXX secret=XXXXXX npm run production

# future plans
- Using HTML5 `<template>` to replace HTML pre-processing.
- Somehow replace LESS preprocessing (without switching back to native CSS 😝)

I think stuff that completely runs in the browser is cool - replacing the above is currently blocked due to poor browser support (June 2015)