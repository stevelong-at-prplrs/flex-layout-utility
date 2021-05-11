import * as React from 'react';
import { Row } from 'react-grid-system';
// import JustifyAlignExample from './JustifyAlignExample';
import { Align, FlexDirection, Justify } from "./JustifyAlignExample";

// interface IFlexRowProps extends RowProps {
// //   children: React.ReactNode;
// //   justify?: Justify;
// //   align?: Align;
//   direction?: FlexDirection;
//   ref?: React.LegacyRef<Row>;
// }

interface IRowProps {
    align?: Align;
    justify?: Justify;
    debug?: boolean;
    style?: object;
    nogutter?: boolean;
    nowrap?: boolean;
    component?: (() => string) | string;
    gutterWidth?: number;
}

interface IFlexRowProps extends IRowProps {
    direction?: FlexDirection;
}

const FlexRow = (props: IFlexRowProps): JSX.Element => {

    // need to augment style, but for now, just replace it.

    const rowProps: IRowProps = Object.fromEntries([
        ["align", props.align],
        ["justify", props.justify],
        ["debug", props.debug],
        // ["style", props.style],
        ["nogutter", props.nogutter],
        ["nowrap", props.nowrap],
        ["component", props.component],
        ["gutterWidth", props.gutterWidth]
    ]);

    return (
        <Row {...rowProps} style={props.direction ? { flexDirection: props.direction } : {}} />
    );
};

export default FlexRow;