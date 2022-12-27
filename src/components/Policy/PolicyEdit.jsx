import React from "react";

import {
    Edit,
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    required,
} from "react-admin";

import {PreviewImage} from ".././";

import {defaultStyle} from "../../style";

const PolicyEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm redirect={false}>
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
        </Edit>
    );
};

export default PolicyEdit;
