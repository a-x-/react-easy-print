declare module 'react-easy-print' {
    interface PrintProps {
        name: string;
        children?: React.ReactNode;
        main?: boolean;
        exclusive?: boolean;
        single?: boolean;
        printOnly?: boolean;
    }
    interface NoPrintProps {
        force?: boolean,
        children?: React.ReactNode,
    }
    interface PrintProviderProps {
        loose?: boolean,
        children?: React.ReactNode,
        invert?: boolean,
      }
    export class PrintProvider extends React.PureComponent<PrintProviderProps> { }
    export class Print extends React.PureComponent<PrintProps>{ }
    export class NoPrint extends React.PureComponent<NoPrintProps> { }
    export default PrintProvider;
}
