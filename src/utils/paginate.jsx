import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber -1) * pageSize;  //0 bis pageSize ist Seite 1
    return _(items) //lodash wrapper for chaining methods
        .slice(startIndex)
        .take(pageSize)
        .value()
    //_.slice(items, startIndex) cuts at the front
    //_.take() takes a specific amount
}