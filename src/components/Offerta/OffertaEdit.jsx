import React from "react";

import {
    Edit,
    SimpleForm,
	TextInput,
    required,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

import {defaultStyle} from "../../style";

const OffertaEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm redirect={false}>
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
        </Edit>
    );
};

export default OffertaEdit;
