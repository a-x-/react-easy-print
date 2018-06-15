declare module 'react-easy-print' {
    interface PrintProps {
        name: string;
        main?: boolean;
        children?: React.ReactNode;
        exclusive?: boolean;
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
