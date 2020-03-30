/**
 * Actions for the List components.
 *
 */
export const FILTER_LIST = "FILTER_LIST";
export const SORT_LIST = "SORT_LIST";
export const CHANGE_LIST_LAYOUT = "CHANGE_LIST_LAYOUT";

export const filterList = (listLabel, filter) => {

    return {
        type: FILTER_LIST,
        payload: {
            listLabel: listLabel,
            filter: filter,
        }
    }
};

export const sortList = (listLabel, sort) => {

    return {
        type: SORT_LIST,
        payload: {
            listLabel: listLabel,
            sort: sort,
        }
    }
};

export const changeListLayout = (listLabel, layout) => {

    return {
        type: CHANGE_LIST_LAYOUT,
        payload: {
            listLabel: listLabel,
            layout: layout,
        }
    }
};

