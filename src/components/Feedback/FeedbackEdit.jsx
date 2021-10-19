import React from "react";

import myDataProfider from "../.././myDataProvider";

import {
    Edit,
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    SelectInput,
    SelectArrayInput,
    required,
} from "react-admin";

import {defaultStyle} from "../../style";

const FeedbackEdit = (props) => {
    const [goods, setGoods] = React.useState([]);
    const [teachers, setTeachers] = React.useState([]);

    React.useEffect(() => {
        myDataProfider
            .getList("goods", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setGoods(data);
            });

        myDataProfider
            .getList("teachers", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setTeachers(data);
            });
    }, []);
    return (
        <Edit {...props} title="Редактировать отзыв">
            <SimpleForm>
                <TextInput
                    source="name"
                    label="Имя отзыва"
                    validate={[required()]}
                    style={defaultStyle}
                />
                {goods.length ? (
                    <SelectInput
                        label="Курс"
                        source="courseId"
                        choices={goods}
                        optionValue="id"
                        optionText="title"
                        validate={[required()]}
                        style={defaultStyle}
                    />
                ) : null}
                {teachers.length ? (
                    <SelectArrayInput
                        label="Преподаватели"
                        source="auth"
                        choices={teachers}
                        optionValue="id"
                        optionText="name"
                        validate={[required()]}
                        style={defaultStyle}
                    />
                ) : null}
                <ImageInput
                    source="image"
                    label="Изображение (максимальный размер 2МБ)"
                    maxSize="2000000"
                    accept="image/*"
                    placeholder={<p>Перетащите файл сюда</p>}
                    validate={[required()]}
                    style={defaultStyle}
                >
                    <ImageField source="src" />
                </ImageInput>
                <TextInput
                    source="videoUrl"
                    label="Ссылка на видео"
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

export default FeedbackEdit;
