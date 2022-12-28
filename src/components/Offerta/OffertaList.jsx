import React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
} from "react-admin";

const OffertaList = (props) => {
    return (
        <List {...props} pagination={false} title="Политика">
            <Datagrid>
                <EditButton />
                <TextField label="Заголовок" source="title" sortable={false} />
            </Datagrid>
        </List>
    );
};

export default OffertaList;
