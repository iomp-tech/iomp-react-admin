import React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceManyField,
    ChipField,
    SingleFieldList,
    ImageField,
    EditButton,
} from "react-admin";

const FeedbackList = (props) => {
    return (
        <List {...props} pagination={false} title="Отзывы">
            <Datagrid>
                <EditButton />
                <TextField label="ID" source="id" sortable={false} />
                <ImageField
                    label="Изображение"
                    source="image"
                    sortable={false}
                />
                <TextField label="Имя" source="name" sortable={false} />
                <TextField
                    label="Описание"
                    source="description"
                    sortable={false}
                />
                <TextField
                    label="Видео"
                    source="videoUrl"
                    sortable={false}
                />
                <TextField label="Имя" source="name" sortable={false} />
                <ReferenceManyField
                    label="Курс"
                    reference="goods"
                    source="courseId"
                    target="id"
                    sortable={false}
                >
                    <SingleFieldList>
                        <ChipField source="title" />
                    </SingleFieldList>
                </ReferenceManyField>
            </Datagrid>
        </List>
    );
};

export default FeedbackList;
