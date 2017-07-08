# react-media-print [![Build Status](https://travis-ci.org/a-x-/react-media-print.svg?branch=master)](https://travis-ci.org/a-x-/react-media-print)

React HOC for easy printing only components marked as printable.

## usage

**example 1** page with modal window with content should be print only:

```jsx
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
<PrintProvider>
  ...                                   // non visible in the print mode
    <Print special>
      Consectetur adipisicing elit.     // in the print mode visible only
      Alias, corrupti similique minus   //
    </Print>
  ...                                   // non visible in the print mode
</PrintProvider>
```

**example 3** complex case: almost all content visible in print mode, but some doesn't and another only in print mode visible:
```jsx
<PrintProvider>
  <Print>                                   //
    ...                                     // visible in the print and non-print modes
      <div>                                 //
        ...                                 //
          <NoPrint>
            <Header/>                       // non visible in print mode
          </NoPrint>
        ...                                 //
        <Print special>
          Consectetur adipisicing elit.     // in the print mode visible only
          Alias, corrupti similique minus   //
        </Print>
      </div>                                // visible in the print and non-print modes
    ...                                     //
  </Print>
</PrintProvider>
```


## alternatives
* [react-print](https://github.com/captray/react-print)
* [react-detect-print](https://github.com/tacomanator/react-detect-print)
