import * as React from 'react';
import { Row } from 'react-grid-system';
import { Align, FlexDirection, Justify } from "./JustifyAlignExample";

interface IRowProps {
    align?: Align;
    justify?: Justify;
    debug?: boolean;
    style?: object;
    nogutter?: boolean;
    nowrap?: boolean;
    component?: (() => string) | string;
    gutterWidth?: number;
    children?: React.ReactNode;
}

interface IFlexRowProps extends IRowProps {
    direction?: FlexDirection;
}

const FlexRow = (props: IFlexRowProps): JSX.Element => {

    const rowProps: IRowProps = Object.fromEntries([
        ["align", props.align],
        ["justify", props.justify],
        ["debug", props.debug],
        ["nogutter", props.nogutter],
        ["nowrap", props.nowrap],
        ["component", props.component],
        ["gutterWidth", props.gutterWidth],
        ["children", props.children]

    ]);

    return (
        <Row {...rowProps} style={(props.direction ? { flexDirection: props.direction, ...props.style } : { ...props.style })} />
    );
};

export default FlexRow;