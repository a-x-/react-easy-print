# react-easy-print

📦 Try out the `0.6.0-beta.2` with decreased bundle size and state issue fix

## High Browser Compatibility
[All >25% browsers by browserlist](https://github.com/a-x-/react-easy-print/blob/master/.babelrc#L9).

Look also: https://jamie.build/last-2-versions

## Low Size
About 3KiB gzipped

## No dependencies
We're using only one tiny build-time dependency to inject styles into a head

## Usage

> Look for [API below](#api).

**example 1** a page with a single printable component without anything else
```jsx
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
...
<PrintProvider>
  <NoPrint>
    <Router>                    //
      <Layout>                  // invisible in the print mode
        ...                     //
          <Print single name="foo">
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
import PrintProvider, { Print } from 'react-easy-print';
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
    <Print printOnly name="foo">
      Consectetur adipisicing elit.     // in the print mode visible only
      Alias, corrupti similique minus   //
    </Print>
  ...                                   // invisible in the print mode
</PrintProvider>
```

**example 4** complex case: almost all content visible in print mode, but some doesn't and another only in print mode visible:
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
        <Print printOnly name="foo">
          Consectetur adipisicing elit.     // in the print mode visible only
          Alias, corrupti similique minus   //
        </Print>
      </div>                                // visible in the print and non-print modes
    ...                                     //
  </Print>
</PrintProvider>
```

## API
### PrintProvider
Should be placed in the layout.

| prop |   |   |
| --- | --- | --- |
| loose | bool, *optional* | simple mode without re-render only printable nodes. Uses css visibility trick. It's not appliable if you have complex nested printable node with offsets |

### Print
Should wrap printable element(s).

| prop |   |   |
| --- | --- | --- |
| printOnly | bool, *optional* | in the print mode visible only |
| ~~exclusive~~ | bool, *optional* | *deprecated* alias for printOnly |
| single | bool, *optional* | garantee correct position (left, top corner) for single main printable |
| ~~main~~ | bool, *optional* | *deprecated* alias for single |
| name | string, **required** | unique constant name (like react's `key` prop) |

### NoPrint
Should wrap nested to Print nodes to ignore them.
Useful in the some complex cases. You might not need the `NoPrint`.

| prop |   |   |
| --- | --- | --- |
| force | bool, *optional* | `display: node` instead of `visibility: hidden` |

## Alternatives
* [react-print](https://github.com/captray/react-print)
* [react-detect-print](https://github.com/tacomanator/react-detect-print)

## Roadmap

* [ ] [jest tests #15](https://github.com/a-x-/react-easy-print/issues/15)
* [x] [don't store build files in the repo. (use npm registry) #6](https://github.com/a-x-/react-easy-print/issues/6)
* [ ] [aviod blank pages #9](https://github.com/a-x-/react-easy-print/issues/9)
* [x] [fix printOnly #11](https://github.com/a-x-/react-easy-print/issues/11)
* [ ] [print options (page format, switch off default columns)](https://github.com/a-x-/react-easy-print/issues/5)

----

# Sponsored with ❤️ by <a href="https://rocketbank.ru">RocketBank</a> <img src="https://user-images.githubusercontent.com/6201068/41535008-57abc544-7309-11e8-9259-4b38bc1e7370.png" width="24"/>
Russian Fintech startup
