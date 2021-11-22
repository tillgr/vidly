import React from 'react';

//Input: genres
//Output: clicked genre
const ListGroup = ({items, onItemSelect, selectedItem, textProperty, valueProperty}) => {

    return (
        <ul className="list-group">
            {items.map(item =>
                <li onClick={() => onItemSelect(item)}
                    key={item[valueProperty]}
                    className={item === selectedItem
                        ? "active list-group-item"
                        : "list-group-item"}
                    style={{cursor: 'pointer'}}
                >
                    {item[textProperty]}
                </li>
            )}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;
