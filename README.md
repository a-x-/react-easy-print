# react-easy-print [![Build Status](https://travis-ci.org/a-x-/react-easy-print.svg?branch=master)](https://travis-ci.org/a-x-/react-easy-print)

## Usage

We prepared some recipes for you.

**example 1** a page with a single printable component without anything else
```jsx
import { PrintProvider, Print, NoPrint } from 'react-easy-print';
...
<PrintProvider>
  <NoPrint>
    <Router>                    // 
      <Layout>                  // invisible in the print mode
        ...                     //
          <Print name="foo">
            <span>              //
              details           // visible in the print and non-print modes
            </span>             //
          </Print>
        ...                     //
      </Layout>                 // invisible in the print mode
    </Router>                   //
  </NoPrint>
</PrintProvider>
```

**example 2** a page with modal window with content should be only visible in the print mode:

```jsx
import { PrintProvider, Print } from 'react-easy-print';
...
<PrintProvider>
  <Router>
    <Layout>                  //
      ...                     //
        <div>                 //
          <h1>some page</h1>  //
          <Header/>           // invisible in the print mode
          <Modal>             //
            <Print name="foo">
              <span>          //
                details       // visible in the print and non-print modes
              </span>         //
            </Print>
          </Modal>            //
        </div>                // invisible in the print mode
      ...                     //
    </Layout>                 //
  </Router>
</PrintProvider>
```

p.s. `print mode` is when browser's print preview opened (e.g. after `^p` or `⌘p` pressed).

**example 3** special content should be visible in print mode only:
```jsx
...
<PrintProvider>
  ...                                   // invisible in the print mode
    <Print exclusive name="foo">
      Consectetur adipisicing elit.     // in the print mode visible only
      Alias, corrupti similique minus   //
    </Print>
  ...                                   // invisible in the print mode
</PrintProvider>
```

**example 4** complex case: almost all content visible in print mode, but some doesn't and another only in print mode visible:

// ???: <PrintProvider invert/> instead of <PrintProvider><Print>

```jsx
...
<PrintProvider>
  <Print name="foo">                        //
    ...                                     // visible in the print and non-print modes
      <div>                                 //
        ...                                 //
          <NoPrint>
            <Header/>                       // invisible in print mode
          </NoPrint>
        ...                                 //
        <Print exclusive name="foo">
          Consectetur adipisicing elit.     // in the print mode visible only
          Alias, corrupti similique minus   //
        </Print>
      </div>                                // visible in the print and non-print modes
    ...                                     //
  </Print>
</PrintProvider>
```

**example 5** guarantee correct main printable element position:
```jsx
...
<Modal>             //
  <Print main name="foo">
    <span>          //
      details       // visible in the print and non-print modes
    </span>         //
  </Print>
</Modal>            //
```

## api
### PrintProvider
Should be placed in the layout.

| prop |   |   |
| --- | --- | --- |
| loose | bool, *optional* | simple mode without re-render only printable nodes. Uses css visibility trick. It's not appliable if you have complex nested printable node with offsets |

### Print
Should wrap printable element(s).

| prop |   |   |
| --- | --- | --- |
| exclusive | bool, *optional* | in the print mode visible only |
| main | bool, *optional* | garantee correct position (left, top corner) for single main printable |
| name | string, **required** | unique constant name (like react's `key` prop) |

### NoPrint
Should wrap nested to Print nodes to ignore them.
Useful in the some complex cases. You might not need the `NoPrint`.

| prop |   |   |
| --- | --- | --- |
| force | bool, *optional* | `display: node` instead of `visibility: hidden` |

----


## Some details
### Lite (css) mode

Uses visibility cool hack:

```css
.parent { visibility: hidden; }
.child { visibility: visible; } /* overrides parent hidden style */
```

### Hard (portal) mode

When `{ position: absolute; left: 0; top: 0; }` does not work.

Renders all `<Print>` wrapped children in a separate root

### Advanced customization

You can access `context.printProvider.isPrint` in any your component.

`isPrint` uses `window.matchMedia('print').matches` and subscribed to `window.matchMedia('print').onchange`

## Alternatives
* [react-print](https://github.com/captray/react-print)
* [react-detect-print](https://github.com/tacomanator/react-detect-print)

## Roadmap
* tests
* avoid re-renders (use React portals if React.version >= 16)
* build files in npm registry only (remove build/ from git-repo)
* SSR (server-side rendering) compatibility?
* flowjs and typescript typings
* print options (page format, switch off default columns)
