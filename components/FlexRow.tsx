import * as React from 'react';
import { Row, RowProps } from 'react-grid-system';

/**
 * FlexRow is a React component which wraps the React Grid System Row component.
 * 
 * The optional prop 'ref' was added to FlexRowProps simply in order to avoid an issue with the type defn of type RowProps.
 */

export type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";
export type FlexRowProps = RowProps & {
    direction?: FlexDirection;
    ref?: (instance: Row) => void; // Prevents error: "No overload matches this call-- types of property 'ref' are incompatible." 
}

const FlexRow = (props: FlexRowProps): JSX.Element => {
    const { direction, style } = props;
    return (
        <Row {...props} style={{...style, flexDirection: direction}} />
    );
};

export default FlexRow;