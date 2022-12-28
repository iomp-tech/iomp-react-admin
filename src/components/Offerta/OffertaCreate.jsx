import React from "react";
import {
    Create,
    SimpleForm,
	TextInput,
    required,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

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
                <RichTextInput
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
