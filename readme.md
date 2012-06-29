![eg.js.screenshot](http://f.cl.ly/items/2K3e0o0M1B3s0n3b1d3b/eg_js.screenshot.png)

Checkout [this video](https://vimeo.com/44891332) to see this tool in action.

## What's this?

[eg.js](http://github.com/drio/eg.js) is a reimplementation of
[egrl](http://github.com/drio/egrl) with a twist.

[eg.js](http://github.com/drio/eg.js) is fully implemented in javascript
and it is divided in two parts: the client and the server. The server
implements all the core [egrl](http://github.com/drio/egrl)'s functionality:
Probe hashing and next-gen reads screening. Read more about it in the
[egrl](http://github.com/drio/egrl)'s site.

Once the server is fired, it creates an http server that listens for
incoming connections from browsers. If a connection is received, the
servers hashes all the probes firsts and screens the reads looking for
hits to any of the probes. When a hit to a probe is found, the information
is stored and send back to the client(s) via [socket.io](http://socket.io).
All the server side javascript is implemented thanks to
[node.js](http://nodejs.org) and google's [V8](http://code.google.com/p/v8/).

The client is a web app that visualizes in realtime the data received from
the server. It uses [d3](http://d3js.org/), html and css.

The visualization consists on a [heatmap](http://en.wikipedia.org/wiki/Heat_map)
where each cell shows the amount of probes that have a particular
reference/variant allele ratio.

Once again, checkout [this video](https://vimeo.com/44880073) to see this tool in action.

As usual comments, ideas, complains or pull requests are welcome!
