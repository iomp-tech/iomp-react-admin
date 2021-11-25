import React from "react";

import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    ImageField,
    Filter,
    TextInput,
} from "react-admin";

const UsersFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Email" source="email" alwaysOn />
    </Filter>
);

const UsersList = (props) => {
    return (
        <List
            {...props}
            title="Пользователи"
            filters={<UsersFilter />}
        >
            <Datagrid>
                <EditButton />
                <ImageField label="Аватар" source="avatar" sortable={false} />
                <TextField
                    label="ID на АвтоВебОфис"
                    source="id_awo"
                    sortable={false}
                />
                <TextField label="Имя" source="first_name" sortable={false} />
                <TextField
                    label="Фамилиля"
                    source="last_name"
                    sortable={false}
                />
                <TextField label="Email" source="email" sortable={false} />
                <BooleanField
                    label="Подтвержден"
                    source="confirmed"
                    sortable={false}
                />
            </Datagrid>
        </List>
    );
};

export default UsersList;
