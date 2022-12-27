import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    required,
} from "react-admin";

import {defaultStyle} from "../../style";

const OffertaCreate = (props) => {
    return (
        <Create {...props} title="Новый блок">
            <SimpleForm>
                <TextInput
                    source="title"
                    label="Заголовок"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <TextInput
                    source="description"
                    label="Описание"
                    validate={[required()]}
                    style={defaultStyle}
                />
            </SimpleForm>
        </Create>
    );
};

export default OffertaCreate;
