import React from 'react';

const NestedList = ({ children, node }) => {
    let childnodes = null;
    const {title} = node;

    if (children) {
        childnodes = children.map((item) => {
            return (
                <li key={item.id}>
                    <NestedList node={item} children={item.children} />
                </li>
            );
        });
    }

    return (
        <>
            <span>{title}</span>
            {childnodes
                ? <ul>{childnodes}</ul>
                : null}
        </>
    );
};

export default NestedList;
