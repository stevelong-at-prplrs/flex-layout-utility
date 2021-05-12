import * as React from 'react';
import { Row, RowProps } from 'react-grid-system';
import { FlexDirection } from "./JustifyAlignExample";

type FlexRowProps = RowProps & {
    direction?: FlexDirection;
    ref?: (instance: Row) => void; // Prevents error: "No overload matches this call. Types of property 'ref' are incompatible." 
}

const FlexRow = (props: FlexRowProps): JSX.Element => {

    const { direction, style } = props;

    return (
        <Row {...props} style={{...style, flexDirection: direction}} />
    );
};

export default FlexRow;