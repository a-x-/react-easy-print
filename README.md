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
            <Print>
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
    <Print exclusive>
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
  <Print>                                   //
    ...                                     // visible in the print and non-print modes
      <div>                                 //
        ...                                 //
          <NoPrint>
            <Header/>                       // non visible in print mode
          </NoPrint>
        ...                                 //
        <Print exclusive>
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
  <Print main>
    <span>          //
      details       // visible in the print and non-print modes
    </span>         //
  </Print>
</Modal>            //
```

## api
### PrintProvider
Should be placed in the layout.

### Print
Should wrap printable element(s).

| prop |   |
| --- | --- |
| exclusive | in the print mode visible only |
| main | garantee correct position (left, top corner) for single main printable |

### NoPrint
Should wrap nested to Print nodes to ignore them.
Useful in the come complex cases. You might not need `NoPrint`.

## alternatives
* [react-print](https://github.com/captray/react-print)
* [react-detect-print](https://github.com/tacomanator/react-detect-print)
