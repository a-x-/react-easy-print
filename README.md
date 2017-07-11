# react-easy-print [![Build Status](https://travis-ci.org/a-x-/react-easy-print.svg?branch=master)](https://travis-ci.org/a-x-/react-easy-print)

## usage

**example 1** a page with modal window with content should be only visible in the print mode:

```jsx
import PrintProvider, { Print } from 'react-easy-print';
...
<PrintProvider>
  <Router>
    <Layout>                  //
      ...                     //
        <div>                 //
          <h1>some page</h1>  //
          <Header/>           // non visible in the print mode
          <Modal>             //
            <Print name="foo">
              <span>          //
                details       // visible in the print and non-print modes
              </span>         //
            </Print>
          </Modal>            //
        </div>                // non visible in the print mode
      ...                     //
    </Layout>                 //
  </Router>
</PrintProvider>
```

p.s. `print mode` is when browser's print preview opened (e.g. after `^p` or `⌘p` pressed).

**example 2** special content should be visible in print mode only:
```jsx
...
<PrintProvider>
  ...                                   // non visible in the print mode
    <Print exclusive name="foo">
      Consectetur adipisicing elit.     // in the print mode visible only
      Alias, corrupti similique minus   //
    </Print>
  ...                                   // non visible in the print mode
</PrintProvider>
```

**example 3** complex case: almost all content visible in print mode, but some doesn't and another only in print mode visible:
```jsx
...
<PrintProvider>
  <Print name="foo">                        //
    ...                                     // visible in the print and non-print modes
      <div>                                 //
        ...                                 //
          <NoPrint>
            <Header/>                       // non visible in print mode
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

**example 4** garantee correct main printable element position:
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

| prop |   |
| --- | --- |
| loose | simple mode without re-render only printable nodes. Uses css visibility trick. It's not appliable if you have complex nested printable node with offsets |

### Print
Should wrap printable element(s).

| prop |   |
| --- | --- |
| exclusive | in the print mode visible only |
| main | garantee correct position (left, top corner) for single main printable |
| name | unique constant name (like react's `key` prop) |

### NoPrint
Should wrap nested to Print nodes to ignore them.
Useful in the some complex cases. You might not need the `NoPrint`.

| prop |   |
| --- | --- |
| force | `display: node` instead of `visibility: hidden` |

## alternatives
* [react-print](https://github.com/captray/react-print)
* [react-detect-print](https://github.com/tacomanator/react-detect-print)

## todo
* tests
