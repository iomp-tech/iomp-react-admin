import React from "react";

import {List, Datagrid, TextField, ChipField, EditButton} from "react-admin";

const PostTypeList = (props) => {
    return (
        <List {...props} pagination={false} title="Типы постов">
            <Datagrid>
                <EditButton />
                <TextField label="Имя" source="title" sortable={false} />
                <ChipField label="Ключ" source="key" sortable={false} />
            </Datagrid>
        </List>
    );
};

export default PostTypeList;
